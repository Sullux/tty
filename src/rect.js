// https://cloford.com/resources/charcodes/utf-8_box-drawing.htm

const borderWeight = Object.fromEntries([
  'light',
  'heavy',
  'solid',
].map((v, i) => ([v, i])))

const borderStyle = Object.fromEntries([
  'solid',
  'dot',
  'dash',
  'dash2',
  'dash3',
  'dash4',
  'double',
].map((v, i) => ([v, i])))

const cornerStyle = Object.fromEntries([
  'square',
  'rounded',
].map((v, i) => ([v, i])))

const defaultRectOptions = {
  border: {},
  width: 1.0,
  height: 1.0,
  top: 0,
  left: 0,
  margin: 0.0,
  padding: 0.0,
  bg: [],
  fg: [255, 255, 255],
}

const Rect = function Rect (options = {}) {
  const self = new.target
    ? this
    : Object.setPrototypeOf({}, Rect.prototype)
  Object.assign(self, defaultRectOptions, options)
  return self
}

module.exports = {
  borderWeight,
  borderStyle,
  cornerStyle,
  defaultRectOptions,
  Rect,
}
