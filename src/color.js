const { supported } = require('./colors')

const min = byte(0)
const max = byte(255)

const Color = function Color (...params) {
  if (new.target) {
    throw new Error('Color is a factory and cannot be instantiated with new')
  }
  if (!params.length) {
    return defaultColor
  }
  if (params.length === 1) {
    return from(params[0])
  }
  if (isNumber(params[0])) {
    return rgba(...params)
  }
  return blend(...params.map(Color))
}
const defaultColor = Color(0, 0, 0, 255)
Color.default = defaultColor

const blend = (...colors) => {
  const { length } = colors
  if (!length) return defaultColor
  if (length < 2) return from(colors[0])
  const { r, g, b, a } = colors.map(from).reduce(
    ({ r: r1, g: g1, b: b1, a: a1 }, { r: r2, g: g2, b: b2, a: a2 }) => ({
      r: r1 + r2,
      g: g1 + g2,
      b: b1 + b2,
      a: a1 + a2,
    }),
    { r: 0, g: 0, b: 0, a: 0 },
  )
  const { length: l } = colors
  return rgba(r / l, g / l, b / l, a / l)
}
Color.blend = blend

const fromString = (s) => {
  throw new Error('color from string is not yet supported') // todo
}
Color.fromString = fromString

const fromNumber = (n) => {
  const b = Buffer.allocUnsafe(4)
  b.writeUInt32LE(n | 0)
  return [...b]
}
Color.fromNumber = fromNumber

const rgb = (r, g, b) => rgba(r, g, b, max)
Color.rgb = rgb

const rgba = (...value) => {
  const self = Object.setPrototypeOf({}, Color.prototype)
  value = value.map(byte)
  while (value.length < 3) value.push(min)
  if (value.length < 4) value.push(max)
  const [r, g, b, a] = value
  self.a = a
  self.r = r
  self.g = g
  self.b = b
  self.value = value
  self.blend = (...colors) => blend(self, ...colors)
  self.toBg = () => toBg(self)
  self.toFg = () => toFg(self)
  self.rgba = Buffer.from(value).readUInt32LE()
  return Object.freeze(self)
}
Color.rgba = rgba

const from = (any) => !any
  ? defaultColor
  : isString(any)
    ? Color.fromString(any)
    : isNumber(any)
      ? Color.fromNumber(any)
      : any instanceof Color
        ? any
        : Array.isArray(any)
          ? Color(...any)
          : rgba(any.r, any.g, any.b, any.a)
Color.from = from

const BgColor = function BgColor (...params) {
  if (new.target) {
    throw new Error('BgColor is a factory and cannot be instantiated with new')
  }
  if (!params.length) {
    return defaultBgColor
  }
  return toBg(Color(...params))
}
BgColor.prototype = Object.create(Color.prototype)
const defaultBgColor = BgColor(0, 0, 0, 255)
BgColor.default = defaultBgColor

const toBg = (fromColor) => {
  const color = { ...fromColor }
  Object.setPrototypeOf(color, BgColor.prototype)
  color.blend = (...colors) => BgColor(color.blend(...colors))
  color[Symbol.toPrimitive] = (hint) => hint === 'number'
    ? color.rgba
    : supported.bg(color.r, color.g, color.b)
  return Object.freeze(color)
}

const FgColor = function FgColor (...params) {
  if (new.target) {
    throw new Error('FgColor is a factory and cannot be instantiated with new')
  }
  if (!params.length) {
    return defaultFgColor
  }
  return toFg(Color(...params))
}
FgColor.prototype = Object.create(Color.prototype)
const defaultFgColor = FgColor(255, 255, 255, 255)
FgColor.default = defaultFgColor

const toFg = (fromColor) => {
  const color = { ...fromColor }
  Object.setPrototypeOf(color, FgColor.prototype)
  color.blend = (...colors) => FgColor(color.blend(...colors))
  color[Symbol.toPrimitive] = (hint) => hint === 'number'
    ? color.rgba
    : supported.fg(color.r, color.g, color.b)
  return Object.freeze(color)
}

module.exports = { BgColor, Color, FgColor }
