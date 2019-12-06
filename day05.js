const fs = require('fs')

const input = fs.readFileSync('day05input.txt', { encoding: 'utf8' }).split(',').map(x => parseInt(x, 10))
//  const input = [3,3,1105,-1,9,1101,0,0,12,4,12,99,1]

function digits(num) {
    return ('' + num).padStart(5, '0').split('').map(x => parseInt(x, 10))
}

async function computate(program, user_input) {
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
                input[input[p + 1]] = user_input
                p += 2
                break
            case 4:
                const m41 = d[2] === 0 ? input[input[p + 1]] : input[p + 1]
                console.log(m41)
                p += 2
                break
            case 5:
                const m51 = d[2] === 0 ? input[input[p + 1]] : input[p + 1]
                const m52 = d[1] === 0 ? input[input[p + 2]] : input[p + 2]

                if (m51 !== 0) {
                    p = m52
                } else {
                    p += 3  
                }

                break
            case 6: 
                const m61 = d[2] === 0 ? input[input[p + 1]] : input[p + 1]
                const m62 = d[1] === 0 ? input[input[p + 2]] : input[p + 2]

                if (m61 === 0) {
                    p = m62
                } else {
                    p += 3
                }

                break
            case 7:
                const m71 = d[2] === 0 ? input[input[p + 1]] : input[p + 1]
                const m72 = d[1] === 0 ? input[input[p + 2]] : input[p + 2]

                if (m71 < m72) {
                    input[input[p + 3]] = 1
                } else {
                    input[input[p + 3]] = 0
                }
                
                p += 4

                break
            case 8:
                const m81 = d[2] === 0 ? input[input[p + 1]] : input[p + 1]
                const m82 = d[1] === 0 ? input[input[p + 2]] : input[p + 2]

                if (m81 === m82) {
                    input[input[p + 3]] = 1
                } else {
                    input[input[p + 3]] = 0
                }
                
                p += 4

                break
            case 99:
                break out
            default:
                console.log('bad opcode', opcode)
                break out
        }
    }
}

console.log('p1')
computate(input, 1)

console.log('p2')
computate(input, 5)
