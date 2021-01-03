import { errors } from '../Utils/DBotsError'
import { Library, Shard } from '../Utils/Constants'
import { AnyObject } from '../Utils/Util'

/**
 * A class that gets certain values from a client.
 * @private
 */
export class ClientFiller {
  /** The client that will be used for the filler. */
  client: AnyObject

  /**
   * @param client The client that will be used
   */
  constructor(client: object) {
    if (!client || typeof client != 'object')
      throw new errors.Error('UNKNOWN_CLIENT')
    this.client = client
  }

  /** Gets the amount of users the bot has cached. */
  get userCount(): number | undefined {
    return 0
  }

  /** Gets the amount of servers the bot has cached. */
  get serverCount(): number | undefined {
    return 0
  }

  /** Gets the amount of voice connectinos the bot is using. */
  get voiceConnections(): number | undefined {
    return 0
  }

  /** Gets the client ID (technically the user ID) of the bot. */
  get clientID(): string | undefined {
    return undefined
  }

  /** Gets the shard of the bot. */
  get shard(): Shard | undefined {
    return undefined
  }
}

/**
 * Gets a client filler from a library.
 * @param libraryName The name of the library to get
 * @param client The client that the library made
 */
export function getClientFiller(
  libraryName: Library,
  client: object
): ClientFiller {
  if (!client) throw new Error('No client was provided!')

  switch (libraryName) {
    case 'discordie': {
      return new (require('./Clients/Discordie')
        .default as typeof ClientFiller)(client)
    }

    case 'discord.io': {
      return new (require('./Clients/DiscordIO')
        .default as typeof ClientFiller)(client)
    }

    case 'discord.js': {
      return new (require('./Clients/DiscordJS')
        .default as typeof ClientFiller)(client)
    }

    case 'eris': {
      return new (require('./Clients/Eris').default as typeof ClientFiller)(
        client
      )
    }

    case 'paracord': {
      return new (require('./Clients/Paracord').default as typeof ClientFiller)(
        client
      )
    }

    default: {
      throw new Error(`Unknown client '${libraryName}'`)
    }
  }
}
