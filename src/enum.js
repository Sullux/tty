/* eslint-disable no-return-assign, no-cond-assign */
const noop = () => {}

const parentSymbol = Symbol('parent')

const functionProxy = (fn, props) => {
  let parentFn
  const ownKeys = [...(new Set([
    props,
    ...Reflect.ownKeys(fn),
  ]))]
  const result = new Proxy(fn, {
    get: (target, prop) => prop === parentSymbol
      ? parentFn
      : prop === Symbol.hasInstance
        ? isType(result)
        : props[prop] || fn[prop],
    set: (target, prop, value) => {
      if (prop === parentSymbol) parentFn = value
    },
    deleteProperty: noop,
    defineProperty: noop,
    ownKeys: (target) => ownKeys,
    has: (target, prop) => ownKeys.includes(prop),
    isExtensible: () => false,
    preventExtension: () => true,
    getOwnPropertyDescriptor: (target, prop) => (prop in props)
      ? { configurable: false, enumerable: true, value: props[prop] }
      : Object.getOwnPropertyDescriptor(fn, prop),
  })
  return result
}

const enumConstFunction = (name, ordinal) => {
  const props = {
    name,
    [Symbol.toPrimitive]: () => name,
    [name]: true,
    value: name,
    ordinal,
    is: (v) => (v instanceof result) || (v === name),
  }
  const result = functionProxy(
    function EnumConst () { return result },
    props,
  )
  return result
}

const enumValueFunction = (name, ordinal, value) => {
  const primitive = ((typeof value) === 'number')
    ? (hint) => hint === 'string' ? String(value) : value
    : () => String(value)
  const props = {
    name: `${name}(${String(value)})`,
    [Symbol.toPrimitive]: primitive,
    [name]: true,
    value,
    ordinal,
    is: (v) => ((v instanceof result[parentSymbol]) && v.value === value) ||
      v === value,
  }
  const result = functionProxy(
    function EnumValue () { return value },
    props,
  )
  return result
}

const enumVarFunction = (name, ordinal, fn) => {
  const props = {
    name,
    [Symbol.toPrimitive]: () => name,
    [name]: true,
    ordinal,
    is: (v) =>
      (v === result) || (v === name) || (v instanceof result),
  }
  const result = functionProxy(
    function EnumVar (v) {
      const val = enumValueFunction(name, ordinal, fn(v))
      val[parentSymbol] = result
      return val
    },
    props,
  )
  return result
}

const enumValue = (name, ordinal) => {
  if (!name) {
    throw new Error(`Enum options must be string or object; got ${JSON.stringify(name)}`)
  }
  if ((typeof name) === 'string') {
    return enumConstFunction(name, ordinal)
  }
  if (name.constructor !== Object) {
    throw new Error(`Enum options must be string or object; got ${name.constructor.name}`)
  }
  return Object.entries(name).map(([name, fn]) =>
    enumVarFunction(name, ordinal, fn),
  )
}

const isType = (t) => (v) => {
  if (t === v) return true
  let p = v
  while (p = p?.[parentSymbol]) if (p === t) return true
  return false
}

const Enum = function Enum (...options) {
  const enumInstance = function EnumInstance (n) { return optionsByName[n] }
  const optionValues = options.map(enumValue).flat()
  const optionsByName =
    Object.fromEntries(optionValues.map((o) => ([String(o), o])))
  const name = `Enum(${optionValues.join(',')})`
  const props = {
    ...optionsByName,
    name,
    [Symbol.iterator]: optionValues[Symbol.iterator],
    [Symbol.toPrimitive]: () => name,
  }
  const result = functionProxy(enumInstance, props, Enum)
  result[parentSymbol] = Enum
  optionValues.forEach((o) => o[parentSymbol] = result)
  return result
}

const isEnum = isType(Enum)

Object.defineProperty(Enum, Symbol.hasInstance, {
  value: isEnum,
})

module.exports = { Enum, isEnum }
