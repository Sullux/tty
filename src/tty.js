const streamsFromArgs = (rstream, wstream) => {
  if (!rstream) {
    return { r: process.stdin, w: process.stdout }
  }
  if (rstream?.stdin) {
    return { r: rstream.stdin, w: rstream.stdout }
  }
  return { r: rstream, w: wstream }
}

const Tty = function Tty (rstream, wstream) {
  const { r, w } = streamsFromArgs(rstream, wstream)
  const self = new.target
    ? this
    : Object.setPrototypeOf({}, Tty.prototype)
  if (!r.isTTY) {
    const error = new Error(`expected a TTY read stream; got type ${r?.constructor?.name || '<unknown>'}`)
    self.status = () => error
    return self
  }
  w.on('resize', self.redraw)
  let isConnected = true
  Object.assign(self, {
    status: () => isConnected ? 'connected' : 'disconnected',
    disconnect: () => {
      isConnected = false
      w.off('resize', self.redraw)
    },
    redraw: () => {
      if (!isConnected) return false
      self.width = w.columns
      self.height = w.rows
      // todo
    },
    width: w.columns,
    height: w.rows,
  })
  return self
}

const Rect = () => {
  //
}

module.exports = { Tty }
