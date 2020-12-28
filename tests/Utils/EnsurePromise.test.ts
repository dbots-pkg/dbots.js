import { ensurePromise } from '../../src/Utils/EnsurePromise'

describe('EnsurePromise function', () => {
  it('should return undefined when an invalid argument is provided', () => {
    // @ts-expect-error
    expect(ensurePromise('abc')).toBe(undefined)
  })

  it('should return a Promise when a Promise is passed', () => {
    const p = ensurePromise(
      new Promise((res) => {
        res('a')
      })
    )
    expect(p instanceof Promise).toBeTruthy()
    expect(p).resolves.toBe('a')
  })

  it('should return a Promise when a function is passed', () => {
    const p = ensurePromise(() => 'a')
    expect(p instanceof Promise).toBeTruthy()
    expect(p).resolves.toBe('a')
  })
})
