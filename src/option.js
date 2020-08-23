const {isFunction} = require('./higher-order-functions')
const {fold} = require('./array-functions')
const {appendTo} = require('./string-or-array-functions')

function some(value) {
    return {
        value,
        kind: 'Some'
    }
}

const None = {
    kind: 'None'
}

function chainOption(f) {
    return opt => opt.kind === 'Some'
        ? f(opt.value)
        : None
}

function mapOption(f) {
    return opt => opt.kind === 'Some'
        ? some(f(opt.value))
        : None
}

function testOption(p) {
    return opt => opt.kind === 'Some' && p(opt.value)
        ? opt
        : None
}

function foldOption(ifSome) {
    return ifNone => opt => opt.kind === 'Some'
        ? (isFunction(ifSome) ? ifSome(opt.value) : ifSome)
        : (isFunction(ifNone) ? ifNone() : ifNone)
}

function alternativeOption(f) {
    return opt => opt.kind === 'Some' ? opt : f()
}

/*
    [ some(x), some(y) ] = some([x, y])
    [ None, None ] = None
    [ None, some(x) ] = None
    [ some(x), None ] = None
 */
function invertOptions(arr) {
    return arr.reduce(
        (acc, maybe) => chainOption(inner => mapOption(value => [...inner, value])(maybe))(acc),
        some([])
    )
}

/*
    [ some(x), some(y) ] = [x, y]
    [ None, None ] = []
    [ None, some(x) ] = [x]
    [ some(x), None ] = [x]
 */
function concatOptions(options) {
    return fold
        (acc => secondOpt => foldOption
            (appendTo(acc))
            (acc)
            (secondOpt))
        ([])
        (options)
}

function fromNullable(nullable) {
    return nullable === null ? None : some(nullable)
}

function fromUndefinable(undefinable) {
    return undefinable === undefined ? None : some(undefinable)
}

module.exports = {
    some,
    None,

    chainOption,
    mapOption,
    testOption,
    foldOption,
    alternativeOption,

    invertOptions,
    concatOptions,

    fromNullable,
    fromUndefinable
}
