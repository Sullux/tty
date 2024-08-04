beforeAll(() => require('./src/globals'))

describe('globals', () => {
  it('should require globals', () => {
    expect(isString('foo')).toBe(true)
  })
})
