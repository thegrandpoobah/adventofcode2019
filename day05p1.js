const fs = require('fs')
const rl = require('readline')

async function getInput() {
    return new Promise((resolve, reject) => {
        const i = rl.createInterface({
            input: process.stdin,
            output: process.stdout,
        })

        i.question('>', (answer) => {
            resolve(answer)

            i.close()
            process.stdin.destroy()
    
        })
    })
}

const input = fs.readFileSync('day05input.txt', { encoding: 'utf8' }).split(',').map(x => parseInt(x, 10))
// const input = [1002,4,3,4,33]

function digits(num) {
    return ('' + num).padStart(5, '0').split('').map(x => parseInt(x, 10))
}

async function computate(program, noun, verb) {
    const input = program.map(x => x)

    // input[1] = noun
    // input[2] = verb
    
    out:
    for (let p = 0;;) {
        const d = digits(input[p])
        const opcode = d[3] * 10 + d[4]

        switch (opcode) {
            case 1:
                const m11 = d[2] === 0 ? input[input[p + 1]] : input[p + 1] 
                const m12 = d[1] === 0 ? input[input[p + 2]] : input[p + 2]

                input[input[p + 3]] = m11 + m12
                p += 4
                break
            case 2:
                const m21 = d[2] === 0 ? input[input[p + 1]] : input[p + 1] 
                const m22 = d[1] === 0 ? input[input[p + 2]] : input[p + 2]

                input[input[p + 3]] = m21 * m22
                p += 4
                break
            case 3:
                input[input[p + 1]] = parseInt(await getInput(), 10)
                p += 2
                break
            case 4:
                const m41 = d[2] === 0 ? input[input[p + 1]] : input[p + 1]
                console.log(m41)
                p += 2
                break
            case 99:
                break out
            default:
                console.log('bad opcode', opcode)
                break out
        }
    }
}

computate(input)