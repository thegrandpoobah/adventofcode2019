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
    let x = 0, y = 0
    wire.forEach(({distance, direction}) => {
        for (let i = 0; i < distance; i++) {
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
            traces[t].wires[idx] = true
        }
    })
})

const p1 = Math.min(...Object.keys(traces)
    .filter(k => Object.keys(traces[k].wires).length > 1)
    .map(k => {
        return Math.abs(traces[k].x) + Math.abs(traces[k].y)
    }))

console.log(p1)
