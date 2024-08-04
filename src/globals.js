const byte = (v) => (v < 0
  ? 0
  : v > 255 ? 255 : v) | 0

const isString = (v) => (typeof v) === 'string'

const isNumber = (v) => (typeof v) === 'number'

module.exports = {
  byte,
  isNumber,
  isString,
}

Object.assign(globalThis, module.exports)
