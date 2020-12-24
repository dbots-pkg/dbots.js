import * as dbots from '../src/index'

test('Check export types', () => {
  expect(typeof dbots).toBe('object')
  expect(typeof dbots.Poster).toBe('function')
  expect(typeof dbots.Constants).toBe('object')
  expect(typeof dbots.DBotsError).toBe('object')
  expect(typeof dbots.EnsurePromise).toBe('function')
  expect(typeof dbots.FormatRequest).toBe('function')
  expect(typeof dbots.Util).toBe('object')
  expect(typeof dbots.getService).toBe('function')
  expect(typeof dbots.serviceClasses).toBe('object')
})
