import {isFunction} from './higher-order-functions'
import {isArray, map} from './array-functions'
import {first, isOfLengthOne} from './string-or-array-functions'

export function resolve(value) {
    return Promise.resolve(value)
}

export function reject(reason) {
    return Promise.reject(reason)
}

export function parallel(...promises) {
    if (isOfLengthOne(promises) && isArray(first(promises))) {
        return parallel(...promises)
    }

    return Promise.all(promises)
}

export function mapFulfilled(functionOrValue) {
    return promise => promise.then(
        isFunction(functionOrValue) ? functionOrValue : () => functionOrValue
    )
}

export function mapPromise(ifFulfilled) {
    return ifRejected => promise => promise.then(
        isFunction(ifFulfilled) ? ifFulfilled : () => ifFulfilled,
        isFunction(ifRejected) ? ifRejected : () => ifRejected
    )
}

export function asyncMap(f) {
    return arr => Promise.all(map(f) (arr))
}