const from = 123257
const to = 647015

function testp1(num) {
    const str = '' + num
    const digits = str.split('').map(x => parseInt(x, 10))

    let monotonic = true
    let same = false
    for (let i = 0; i < digits.length; i++) {
        const v = digits[i] - digits[i - 1]
        if (v === 0 && !same) same = true
        if (v < 0) monotonic = false
    }

    return same && monotonic
}

function testp2(num) {
    const str = '' + num
    const digits = str.split('').map(x => parseInt(x, 10))

    let monotonic = true
    let ranges = {}
    for (let i = 0; i < digits.length; i++) {
        const v = digits[i] - digits[i - 1]
        if (v === 0) {
            if (!ranges[digits[i]]) ranges[digits[i]] = 1
            ranges[digits[i]]++
        }
        if (v < 0) monotonic = false
    }

    const same = Object.keys(ranges).map(key => ranges[key]).filter(x => x === 2).length >= 1
    return same && monotonic
}

/*
Unit Tests
console.log(testp1(122345))
console.log(testp1(111123))
console.log(testp1(111111))
console.log(testp1(223450))
console.log(testp1(123789))
console.log(testp2(112233))
console.log(testp2(123444))
console.log(testp2(111122))
*/

let matchesp1 = 0
let matchesp2 = 0
for (let i = from; i < to + 1; i++) {
    if (testp1(i)) matchesp1++
    if (testp2(i)) matchesp2++
}

console.log('p1', matchesp1)
console.log('p2', matchesp2)