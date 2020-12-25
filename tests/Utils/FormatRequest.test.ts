import * as FormatRequest from '../../src/Utils/FormatRequest'
import axios from 'axios'

jest.mock('axios')

const formatRequest = FormatRequest.default

describe('FormatRequest function', () => {
  it('should call the axios with the config object', async () => {
    formatRequest({ url: 'test1' })
    expect(axios).toHaveBeenCalledWith(expect.any(Object))
  })

  it('should use the default method and headers', () => {
    formatRequest({ url: 'test2' })
    expect(axios).toHaveBeenCalledWith({
      url: 'test2',
      method: 'get',
      headers: {
        'User-Agent': expect.any(String)
      }
    })
  })

  it('should correctly handle a custom config', () => {
    formatRequest({
      url: 'test3',
      data: {
        a: 'a',
        b: 'b'
      },
      headers: {
        c: 'c',
        d: 'd'
      },
      method: 'post',
      params: {
        e: 'e',
        f: 3,
        g: true
      }
    })

    expect(axios).toHaveBeenCalledWith({
      url: 'test3',
      data: {
        a: 'a',
        b: 'b'
      },
      headers: {
        c: 'c',
        d: 'd',
        'User-Agent': expect.any(String)
      },
      method: 'post',
      params: {
        e: 'e',
        f: 3,
        g: true
      }
    })
  })
})
