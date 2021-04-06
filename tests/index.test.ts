import * as dbots from '../src/index'

describe('Library exports', () => {
  test('Check export types', () => {
    expect(typeof dbots).toBe('object')
    expect(typeof dbots.Poster).toBe('function')
    expect(typeof dbots.Constants).toBe('object')
    expect(typeof dbots.DBotsError).toBe('object')
    expect(typeof dbots.ensurePromise).toBe('function')
    expect(typeof dbots.formatRequest).toBe('function')
    expect(typeof dbots.Util).toBe('object')
    expect(typeof dbots.Service).toBe('function')
    expect(typeof dbots.getService).toBe('function')
  })
})
