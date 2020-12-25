import * as Util from '../../src/Utils/Util'

const UtilClass = Util.default

describe('Util module', () => {
  describe('Util class', () => {
    it("shouldn't be instantiated", () => {
      expect(() => new UtilClass()).toThrow()
    })

    describe('resolveID method', () => {
      const { resolveID } = UtilClass,
        validID = '123456789012345678'

      it('should throw when used with undefined or null', () => {
        // @ts-ignore
        expect(() => resolveID(undefined)).toThrow()
        // @ts-ignore
        expect(() => resolveID(null)).toThrow()
      })

      it('should accept strings', () => {
        expect(resolveID(validID)).toBe(validID)
      })

      it('should parse numbers', () => {
        expect(Number(resolveID(Number(validID)))).toBeCloseTo(Number(validID))
      })

      it('should parse objects', () => {
        expect(resolveID({ id: validID })).toBe(validID)
      })

      it('should throw when used with other types', () => {
        // @ts-expect-error
        expect(() => resolveID(true)).toThrow()
        // @ts-expect-error
        expect(() => resolveID(() => {})).toThrow()
        // @ts-expect-error
        expect(() => resolveID(Symbol())).toThrow()
      })

      it('should throw when the string is too short or too long', () => {
        expect(() => resolveID('aaaaaaaaaaaaaaaaaaaa')).toThrow()
        expect(() => resolveID('a')).toThrow()
      })
    })

    const { resolveCount } = UtilClass
    describe('resolveCount method', () => {
      it("should throw when the value can't be parsed", () => {
        expect(() => resolveCount('abc')).toThrow()
      })

      it('should throw when the parsed count is negative', () => {
        expect(() => resolveCount(-3)).toThrow()
      })

      it('should return the correct number when used right', () => {
        expect(resolveCount(100)).toBe(100)
        expect(resolveCount('100')).toBe(100)
      })
    })
  })
})
