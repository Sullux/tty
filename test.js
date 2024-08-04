const bar = '—'
const single = '┌──────┐ └──────┘'
const double = '╔══════╗ ╚══════╝'
const singleBold = '┏━━━┓ ┗━━━┛'
const dots = '･ • ◦ ◘ ◙ ○ ◈ ◉'
const blocks = '▒ ▁ ▂ ▃ ▄ ▅ ▆ █ ☰ ☱ ☲ ☳ ☴ ☵ ☶ ☷ ⚿ '
const lines = ''

console.log(`
  ${bar.repeat(20)}
  |${' '.repeat(18)}|
  |${' '.repeat(18)}|
  |${' '.repeat(18)}|
  ${bar.repeat(20)}
  \x1b[32m▒ ▒ ▒ █ █ █\x1b[0m
`)
