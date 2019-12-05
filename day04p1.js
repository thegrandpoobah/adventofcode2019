const from = 123257
const to = 647015

function test(num) {
    const str = '' + num
    const digits = str.split('').map(x => parseInt(x, 10))

    let monotonic = true
    let same = false
    for (let i = 0; i < digits.length; i++) {
        const v = digits[i] - digits[i - 1]
        if (v === 0) same = true
        if (v < 0) monotonic = false
    }

    return same && monotonic
}

console.log(test(122345))
console.log(test(111123))
console.log(test(111111))
console.log(test(223450))
console.log(test(123789))

let matches = 0
for (let i = from; i < to + 1; i++) {
    if (test(i)) matches++
}

console.log(matches)