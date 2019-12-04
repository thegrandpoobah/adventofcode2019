const fs = require('fs')

const input = fs.readFileSync('day03input.txt', { encoding: 'utf8' }).split('\n')
const wires = input.map((x) => {
    return x.split(',').map((y) => {
        return {
            direction: y.substr(0, 1),
            distance: y.substr(1)
        }
    })
})

const traces = {}

wires.forEach((wire, idx) => {
    let x = 0, y = 0, steps = 0

    wire.forEach(({distance, direction}) => {
        for (let i = 0; i < distance; i++) {
            steps++

            switch (direction) {
                case 'U':
                    y--
                    break
                case 'D':
                    y++
                    break
                case 'L':
                    x--
                    break
                case 'R':
                    x++
                    break
            }

            const t = `${x}:${y}`
            if (!traces[t]) {
                traces[t] = {
                    x,
                    y,
                    wires: {}
                }
            }

            if (!traces[t].wires[idx] || steps < traces[t].wires[idx]) {
                traces[t].wires[idx] = steps
            }
        }
    })
})

const p2 = Math.min(...Object.keys(traces)
    .filter(k => Object.keys(traces[k].wires).length > 1)
    .map(k => {
        return Object.keys(traces[k].wires).reduce((accum, x) => {
            return accum + traces[k].wires[x]
        }, 0)
    }))

console.log(p2)
