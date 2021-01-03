import * as DBotsError from '../../src/Utils/DBotsError'

describe('DBotsError module', () => {
  describe('codeSymbol', () => {
    it('should be a symbol', () => {
      expect(typeof DBotsError.codeSymbol).toBe('symbol')
    })
  })

  describe('messages', () => {
    it('should be a Map', () => {
      expect(DBotsError.messages instanceof Map).toBeTruthy()
    })

    describe('map entries', () => {
      DBotsError.messages.forEach((value, key) => {
        describe(key, () => {
          test('the key should be a string', () => {
            expect(typeof key).toBe('string')
          })

          test('the value should either be a string or a function that returns a string', () => {
            if (typeof value == 'function')
              expect(typeof value('', '', '')).toBe('string')
            else expect(typeof value).toBe('string')
          })
        })
      })
    })
  })

  describe('errors', () => {
    it('should be an object', () => {
      expect(typeof DBotsError.errors).toBe('object')
    })

    describe('elements', () => {
      Object.entries(DBotsError.errors).forEach(([key, ErrorClass]) => {
        describe(key, () => {
          it('should be a class/function', () => {
            expect(typeof ErrorClass).toBe('function')
          })

          it('should throw with no arguments', () => {
            // @ts-expect-error
            expect(() => new ErrorClass()).toThrow()
          })

          it('should throw with an invalid code', () => {
            // @ts-expect-error
            expect(() => new ErrorClass('invalid code')).toThrow()
          })

          it('should not throw with a valid code', () => {
            expect(() => new ErrorClass('GENERIC', 'abc')).not.toThrow()
          })
        })
      })
    })
  })
})
