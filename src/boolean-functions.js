function equals(b) {
    return a => a === b
}

function not(predicate) {
    return x => !predicate(x)
}

function or(...predicates) {
    return (x, i_x) => {
        for(let i_p = 0; i_p < predicates.length; i_p++) {
            if (predicates[i_p](x, i_x)) {
                return true
            }
        }

        return false
    }
}

function and(...predicates) {
    return (x, i_x) => {
        for(let i_p = 0; i_p < predicates.length; i_p++) {
            if (!predicates[i_p](x, i_x)) {
                return false
            }
        }

        return true
    }
}

function onlyIf(predicate) {
    return f => input => predicate(input) ? f(input) : input
}

function ifElse(predicate) {
    return ifTrue => ifFalse => input => predicate(input) ? ifTrue : ifFalse
}

function match(pairs) {
    return input => {
        for (let i = 0; i < pairs.length; i++) {
            const [ predicate, transformer ] = pairs[i]

            if (predicate(input)) {
                return transformer(input)
            }
        }
    }
}

module.exports = {
    not,
    or,
    and,

    equals,

    onlyIf,
    ifElse,
    match
}
