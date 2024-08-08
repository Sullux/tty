const { Enum } = require('./enum')

const Option = Enum('None', { Some: (v) => v })
const { None, Some } = Option

describe('Enum', () => {
  describe('Option', () => {
    it('should be instance of Enum', () => {
      expect(Option instanceof Enum).toBe(true)
    })
    it('should be named', () => {
      expect(Option.name).toBe('Enum(None,Some)')
    })
    describe('None', () => {
      it('should be instance of Enum and Option', () => {
        expect(None instanceof Option).toBe(true)
        expect(None instanceof Enum).toBe(true)
      })
      it('should not be instance of Some', () => {
        expect(None instanceof Some).toBe(false)
      })
      it('should return a self reference', () => {
        expect(None()).toBe(None)
      })
    })
    describe('Some', () => {
      it('should be instance of Enum and Option', () => {
        expect(Some instanceof Option).toBe(true)
        expect(Some instanceof Enum).toBe(true)
      })
      it('should be instance of Some and Option given a Some value', () => {
        expect(Some(42) instanceof Some).toBe(true)
        expect(Some('foo') instanceof Some).toBe(true)
      })
      it('should not be an instance of Some with a different value', () => {
        expect(Some(42) instanceof Some('foo')).toBe(false)
      })
      it('should self match with is', () => {
        expect(Some(42).is(Some(42))).toBe(true)
      })
      it('should coerce to number', () => {
        expect(Some(21) + Some(21)).toBe(42)
      })
      it('should coerce to string', () => {
        expect(`${Some(42)}`).toBe('42')
      })
      it('should not match a different value', () => {
        expect(Some(42).is(Some('foo'))).toBe(false)
      })
    })
  })
})
