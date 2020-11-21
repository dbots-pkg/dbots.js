// Taken from Discord.JS's way of making errors

export const codeSymbol = Symbol('code')
export const messages = new Map()

// This is just a mock class to make docs work
/**
 * Extend an error of some sort into a DBotsError.
  * @param {string} key Error key
  * @param {any[]} args Arguments to pass for util format or as function args
  * @extends Error
  * @private
  */
class DBotsError extends Error { /* eslint-disable-line */ /* lgtm [js/unused-local-variable] */
  name: string
  code: string

  constructor() {
    super()
    this.name = ''
    this.code = ''
  }
}

/**
 * Extend an error of some sort into a DBotsError.
 * @param Base Base error to extend
 * @returns The resulting class (as a class, not an instance)
 */
function makeDbotsError(Base: typeof Error) {
  return class DBotsError extends Base {
    constructor(key: string, ...args: any[]) {
      super(message(key, args))
      // @ts-expect-error
      this[codeSymbol] = key
      if (Error.captureStackTrace)
        Error.captureStackTrace(this, DBotsError)
    }

    get name() {
      // @ts-expect-error
      return `${super.name} [${this[codeSymbol]}]`
    }

    get code() {
      // @ts-expect-error
      return this[codeSymbol]
    }
  }
}

/**
 * Format the message for an error.
 * @param key Error key
 * @param {Array<*>} args Arguments to pass for util format or as function args
 * @returns Formatted string
 */
function message(key: string, args: any[]): string {
  if (typeof key !== 'string') throw new Error('Error message key must be a string')
  const msg = messages.get(key)
  if (!['string', 'function'].includes(typeof msg))
    throw new Error(`An invalid error message key was used: ${key}.`)
  if (typeof msg === 'function') return msg(...args)
  if (args === undefined || args.length === 0) return msg
  args.unshift(msg)
  return String(...args)
}

/**
 * Register an error code and message.
 * @param sym Unique name for the error
 * @param val Value of the error
 */
export function register(sym: string, val: any) {
  messages.set(sym, typeof val === 'function' ? val : String(val))
}

const messageObject = {
  INVALID_POSTER_OPTIONS: 'An object is required a parameter to construct a poster.',
  NO_CLIENT_OR_ID: 'clientID must be defined when client is non-existant.',

  UNKNOWN_CLIENT: (count_name: string) => `Can't retrieve ${count_name} count from non-existant client.`,
  NO_CLIENT: (count_name: string) => `Can't retrieve ${count_name} count from unknown client.`,

  NO_API_KEYS: 'Can\'t post with a poster that has no API keys.',
  SERVICE_NO_KEY: (service: string) => `Can't post to "${service}" without an API key.`,
  INVALID_SERVICE: (service: string) => `"${service}" is an invalid service.`,

  HANDLER_INVALID: 'Given handler is not a PromiseResolvable.',
  UNSUPPORTED_EVENT: (action: string) => `Can't ${action} handler for an unsupported event.`,

  CALLED_FROM_BASE: 'This function needs to be called by an extended class.',
  REQUIRES_TOKEN: 'This endpoint requires a token.',
  POSTING_UNSUPPORTED: (service: string) => `The service ${service} does not support posting.`,

  INVALID_ID: 'An invalid ID was given.',
  INVALID_COUNT: 'An invalid countable number was given.',
  COUNT_NEGATIVE: 'A countable number cannot be negative.',

  GENERIC: (err: string) => err,
}

for (const [name, message] of Object.entries(messageObject)) register(name, message)

export const errors = {
  Error: makeDbotsError(Error),
  TypeError: makeDbotsError(TypeError),
  RangeError: makeDbotsError(RangeError),
}
