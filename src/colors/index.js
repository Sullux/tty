const c1b = require('./c1b')
const c4b = require('./c4b')
const c8b = require('./c8b')
const c24b = require('./c24b')

const colorsByDepth = {
  1: c1b,
  4: c4b,
  8: c8b,
  24: c24b,
}
const maybeSupported = process.platform === 'win32'
  ? c4b
  : process.env.COLORTERM === 'truecolor'
    ? c24b
    : (process.env.TERM || '').includes('256color')
        ? c8b
        : c1b

const { bits } = maybeSupported
const reportedBits = process.stdout.getColorDepth()

const colorDepth = bits > reportedBits ? bits : reportedBits
const supported = colorsByDepth[colorDepth]

module.exports = {
  c1b,
  c4b,
  c8b,
  c24b,
  supported,
}
