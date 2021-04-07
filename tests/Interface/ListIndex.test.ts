import { Service } from '../../src/Interface/Service'
import * as ListIndexModule from '../../src/Interface/ListIndex'
import { AnyObject } from '../../src/Utils/Util'

describe('ListIndex module', () => {
  describe('serviceList constant', () => {
    const { serviceList } = ListIndexModule

    it('should be an object', () => {
      expect(typeof serviceList).toBe('object')
    })

    it('should be a Record<string, class>', () => {
      expect(
        Object.keys(serviceList).every((s) => typeof s == 'string')
      ).toBeTruthy()
      expect(
        Object.values(serviceList).every((f) => typeof f == 'function')
      ).toBeTruthy()
    })

    describe('should only contain existing services', () => {
      Object.entries(serviceList).forEach(([alias, clarse]) => {
        test(alias, () => {
          expect(Service.get(alias)).toEqual(clarse)
        })
      })
    })

    describe('should contain every existing alias', () => {
      Object.values(Service.getAll()).forEach((clarse) => {
        clarse.aliases.forEach((alias) => {
          test(alias, () => {
            expect((serviceList as AnyObject)[alias]).toEqual(clarse)
          })
        })
      })
    })
  })
})
