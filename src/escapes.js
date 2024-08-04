const escapeSeparator = ';' // todo: make this dependent on type of terminal?
const escape = (...values) => `\x1b[${values.flat().join(escapeSeparator)}m`

const codes = {
  reset: '0',
  bright: '1',
  dim: '2',
  underscore: '4',
  blink: '5',
  reverse: '7',
  hidden: '8',
  fg: {
    rgb8: `38${escapeSeparator}5`,
    rgb24: `38${escapeSeparator}2`,
    black: '30',
    red: '31',
    green: '32',
    yellow: '33',
    blue: '34',
    magenta: '35',
    cyan: '36',
    white: '37',
    gray: '90',
  },
  bg: {
    rgb8: `48${escapeSeparator}5`,
    rgb24: `48${escapeSeparator}2`,
    black: '40',
    red: '41',
    green: '42',
    yellow: '43',
    blue: '44',
    magenta: '45',
    cyan: '46',
    white: '47',
    gray: '100',
  },
}

module.exports = {
  codes,
  escape,
  escapeSeparator,
}
