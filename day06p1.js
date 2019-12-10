const fs = require('fs')

const input = fs.readFileSync('day06input.txt', { encoding: 'utf8' }).split('\n').map(x => {
  const [parent, child] = x.split(')')
  return { parent, child }
})

const forestIndex = new Map()
const isRoot = new Map()

input.forEach(({ parent, child }) => {
  if (!forestIndex.has(parent)) {
    forestIndex.set(parent, new Map())
    isRoot.set(parent, true)
  }
  if (!forestIndex.has(child)) {
    forestIndex.set(child, new Map())
    isRoot.set(child, true)
  }

  const map = forestIndex.get(parent)

  map.set(child, forestIndex.get(child))
  isRoot.set(child, false)
})

forestIndex.forEach((v, k, m) => {
  if (!isRoot.get(k)) {
    forestIndex.delete(k)
  }
})

let accum = 0
function traverse (map, route) {
  map.forEach((v, k, m) => {
    const r = route.map(x => x)
    r.unshift(k)
    accum += r.length - 1
    traverse(v, r)
  })
}

const t = new Set()
traverse(forestIndex, [])

console.log(accum)
