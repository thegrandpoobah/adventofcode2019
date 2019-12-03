const fs = require('fs')

const input = fs.readFileSync('day02input.txt', { encoding: 'utf8' }).split(',').map(x => parseInt(x, 10))
//const input = [1,9,10,3,2,3,11,0,99,30,40,50]

input[1] = 12
input[2] = 2

out:
for (let p = 0; input[p] !== 99; p += 4) {
    console.log(input[p])
    // console.log(input[p + 1], input[p + 2], input[p + 3])
    switch (input[p]) {
        case 1:
            input[input[p + 3]] = input[input[p + 1]] + input[input[p + 2]]
            break
        case 2:
            input[input[p + 3]] = input[input[p + 1]] * input[input[p + 2]]
            break
        default:
            break out
    }
}

console.log(input[0])
