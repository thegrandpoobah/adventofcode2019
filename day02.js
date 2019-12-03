const fs = require('fs')

const input = fs.readFileSync('day02input.txt', { encoding: 'utf8' }).split(',').map(x => parseInt(x, 10))
//const input = [1,9,10,3,2,3,11,0,99,30,40,50]

function computate(program, noun, verb) {
    const input = program.map(x => x)

    input[1] = noun
    input[2] = verb
    
    out:
    for (let p = 0; input[p] !== 99; p += 4) {
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

    return input[0]
}

console.log('p1', computate(input, 12, 2))

far:
// limits are entirely arbitrary
for (let n = 0; n < 100; n++) {
    for (let v = 0; v < 100; v++) {
        if (computate(input, n, v) === 19690720) {
            console.log('p2', n * 100 + v)
            break far
        }
    }
}
