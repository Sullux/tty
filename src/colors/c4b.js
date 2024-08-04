const {
  codes: {
    escapeSeparator,
    fg,
    bg,
    bright,
    dim,
  },
} = require('../escapes')

const light = (c) => `${bright}${escapeSeparator}${c}`
const dark = (c) => `${dim}${escapeSeparator}${c}`

// [r[g[b]]]
const fgColors = [
  [
    [[fg.black], [dark(fg.blue)], [fg.blue]],
    [[fg.green], [dark(fg.cyan)], [fg.blue]],
    [[fg.green], [fg.cyan], [light(fg.cyan)]],
  ],
  [
    [[dark(fg.magenta)], [fg.magenta], [fg.blue]],
    [[dark(fg.yellow)], [fg.gray], [light(fg.blue)]],
    [[dark(fg.yellow)], [fg.yellow], [light(fg.cyan)]],
  ],
  [
    [[dark(fg.red)], [fg.red], [fg.magenta]],
    [[dark(fg.yellow)], [fg.yellow], [fg.magenta]],
    [[fg.yellow], [light(fg.yellow)], [fg.white]],
  ],
  [
    fg.black,
    dark(fg.gray),
    fg.gray,
    light(fg.gray),
    fg.white,
  ],
]

// [r[g[b]]]
const bgColors = [
  [
    [[bg.black], [bg.blue], [bg.blue]],
    [[bg.green], [bg.cyan], [bg.blue]],
    [[bg.green], [bg.cyan], [bg.cyan]],
  ],
  [
    [[bg.magenta], [bg.magenta], [bg.blue]],
    [[bg.yellow], [bg.gray], [bg.blue]],
    [[bg.yellow], [bg.yellow], [bg.cyan]],
  ],
  [
    [[bg.red], [bg.red], [bg.magenta]],
    [[bg.yellow], [bg.yellow], [bg.magenta]],
    [[bg.yellow], [bg.yellow], [bg.white]],
  ],
  [
    bg.black,
    bg.gray,
    bg.gray,
    bg.gray,
    bg.white,
  ],
]

const rgbTo4Bit = (colors) => (red, green, blue) => {
  const r = Math.floor((byte(red) / 256) * 3)
  const g = Math.floor((byte(green) / 256) * 3)
  const b = Math.floor((byte(blue) / 256) * 3)
  return r === g === b
    ? colors[3][Math.round(((red + green + blue) / 765) * 5)]
    : colors[r][g][b]
}

const background4b = rgbTo4Bit(bgColors)
const foreground4b = rgbTo4Bit(fgColors)

module.exports = {
  bits: 4,
  colors: 16,
  bg: background4b,
  fg: foreground4b,
}
