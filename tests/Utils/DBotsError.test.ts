import * as DBotsError from '../../src/Utils/DBotsError'

test('Check codeSymbol', () => {
  expect(typeof DBotsError.codeSymbol).toBe('symbol')
})

test('Check messages', () => {
  expect(DBotsError.messages instanceof Map).toBeTruthy()
  DBotsError.messages.forEach((value, key) => {
    expect(typeof key).toBe('string')
    if (typeof value == 'function')
      expect(typeof value('', '', '')).toBe('string')
    else expect(typeof value).toBe('string')
  })
})

test('Check error classes', () => {
  expect(typeof DBotsError.errors).toBe('object')
  Object.values(DBotsError.errors).forEach((ErrorClass) => {
    expect(typeof ErrorClass).toBe('function')
    // @ts-expect-error
    expect(() => new ErrorClass()).toThrow()
    // @ts-expect-error
    expect(() => new ErrorClass('invalid code')).toThrow()
    expect(() => new ErrorClass('GENERIC', 'abc')).not.toThrow()
  })
})
