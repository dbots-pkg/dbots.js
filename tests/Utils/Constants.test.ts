import * as Constants from '../../src/Utils/Constants'

describe('Constants module', () => {
  test('Check export types', () => {
    expect(typeof Constants.Package).toBe('object')
    expect(
      Constants.SupportedEvents.every((e) => typeof e == 'string')
    ).toBeTruthy()
  })
})
