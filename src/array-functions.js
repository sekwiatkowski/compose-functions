function isArray(val) {
    return Array.isArray(val)
}

function map(f) {
    return arr => arr.map(f)
}

function reduce(f) {
    return initialValue => arr => arr.reduce(f, initialValue)
}

function unique(arr) {
    return arr.filter((item, index) => index === arr.indexOf(item))
}

function head(arr) {
    return arr[0]
}

function tail(arr) {
    let size = arr.length-1
    const res = Array(size)

    for (let i = 0; i < size; i++) {
        res[i] = arr[i+1]
    }

    return res
}

function headAndTail(arr) {
    return [ head(arr), tail(arr) ]
}

function last(arr) {
    return arr[arr.length - 1]
}

function find(predicate) {
    return arr => {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i]
            if (predicate(item)) {
                return item
            }
        }
        return null
    }
}

function findIndex(predicate) {
    return arr => {
        for (let i = 0; i < arr.length; i++) {
            if (predicate(arr[i])) {
                return i
            }
        }
        return null
    }
}

function indexOf(item) {
    return arr => {
        for (let i = 0; i < arr.length; i++) {
            if (item === arr[i]) {
                return i
            }
        }
        return null
    }
}

function take(n) {
    return arr => arr.slice(0, n)
}

function takeLast(n) {
    return arr => arr.slice(Math.max(arr.length - n, 0))
}

function takeWhile(predicate) {
    return arr => {
        const res = []
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i]
            if (!predicate(item, i)) {
                return res
            }

            res.push(item)
        }

        return res
    }
}

function drop(n) {
    return arr => arr.slice(n)
}

function dropLast(n) {
    return arr => arr.slice(0, -n)
}

function before(n) {
    return arr => arr.slice(0, n)
}

function after(n) {
    return arr => arr.slice(n+1)
}

function partition(predicate) {
    return arr => {
        const positive = []
        const negative = []

        for (let i = 0; i < arr.length; i++) {
            const item = arr[i]

            const partition = predicate(item) ? positive : negative

            partition.push(item)
        }

        return [positive, negative]
    }
}

function difference(as) {
    return bs => as.filter(a => !bs.includes(a))
}

function isEmpty(arr) {
    return arr.length ===  0
}

function isNotEmpty(arr) {
    return arr.length > 0
}

function isOfLength(length) {
    return arr => arr.length === length
}

function maxBy(f) {
    return arr => {
        let highestScore = Number.NEGATIVE_INFINITY
        let index = -1

        for (let i = 0; i < arr.length; i++) {
            const score = f(arr[i])

            if (score > highestScore) {
                highestScore = score
                index = i
            }
        }

        return arr[index]
    }
}

function length(arr) {
    return arr.length
}

function chunk(size) {
    return arr => {
        const chunks = []

        let i = 0
        while (i < arr.length) {
            const chunk = []
            for (let step = 0; step < size; step++) {
                chunk.push(arr[i])
                i++
            }
            chunks.push(chunk)
        }

        return chunks
    }
}

function splitAt(position) {
    return arr => [ arr.slice(0, position), arr.slice(position) ]
}

function contains(arr) {
    return item => arr.includes(item)
}

function containsAll(arr) {
    return items => {
        for (let i = 0; i < items.length; i++) {
            if (!arr.includes(items[i])) {
                return false
            }
        }

        return true
    }
}

function hasSameItems(arr) {
    return other => {
        if (arr.length !== other.length) {
            return false
        }

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] !== other[i]) {
                return false
            }
        }

        return true
    }
}

function join(separator) {
    return arr => arr.join(separator)
}

const joinWithComma = join(',')
const joinWithCommaSpace = join(', ')
const joinWithSpace = join(' ')

function all(p) {
    return arr => {
        for (let i = 0; i < arr.length; i += 1) {
            if (!p(arr[i])) {
                return false
            }
        }

        return true
    }
}

function any(p) {
    return arr => {
        for (let i = 0; i < arr.length; i += 1) {
            if (p(arr[i])) {
                return true
            }
        }

        return false
    }
}

function append(item) {
    return arr => [...arr, item]
}

function cartesianProduct(as) {
    return bs => {
        const aLength = as.length
        const bLength = bs.length

        const product = new Array(aLength * bLength)

        for (let i = 0; i < aLength; i += 1) {
            for (let j = 0; j < bLength; j += 1) {
                product[i * bLength + j] = [as[i], bs[j]]
            }
        }

        return product
    }
}

function zip(as) {
    return bs => {
        const aLength = as.length
        const bLength = bs.length

        const zipLength = Math.min(aLength, bLength)

        const result = new Array(zipLength)

        for (let i = 0; i < zipLength; i += 1) {
            result[i] = [as[i], bs[i]]
        }

        return result
    }
}

function intoArray(value) {
    return [ value ]
}

module.exports = {
    map,
    reduce,

    // Check type
    isArray,

    // Select n items
    tail,
    headAndTail,

    take,
    takeLast,

    takeWhile,

    drop,
    dropLast,

    after,
    before,

    // Select a single item
    head,
    first: head,
    last,

    // Search using a predicate
    find,
    findIndex,
    indexOf,

    // Set-like operations
    unique,
    difference,

    // Get length
    length,

    // Length-based predicates
    isEmpty,
    isNotEmpty,
    isOfLength,

    // Item-based predicates
    contains,
    containsAll,
    hasSameItems,

    // Sort
    maxBy,

    // Split
    partition,
    chunk,
    splitAt,

    // Combine
    cartesianProduct,
    zip,

    // Join to string
    joinWithComma,
    joinWithCommaSpace,
    joinWithSpace,

    // Check items
    all,
    any,

    append,

    intoArray
}