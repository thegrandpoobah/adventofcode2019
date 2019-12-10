const fs = require('fs')

const input = fs.readFileSync('day06input.txt', { encoding: 'utf8' }).split('\n').map(x => {
  // const input = fs.readFileSync('day06sample2.txt', { encoding: 'utf8' }).split('\n').map(x => {
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

  forestIndex.get(parent).set(child, forestIndex.get(child))
  forestIndex.get(child).set('_', parent)

  // map.set(child, forestIndex.get(child))

  isRoot.set(child, false)
})

const orbitTrees = new Map()
forestIndex.forEach((v, k, m) => {
  if (isRoot.get(k)) {
    orbitTrees.set(k, v)
  }
})

let accum = 0
function traverse (map, route) {
  map.forEach((v, k, m) => {
    if (k === '_') return

    const r = route.map(x => x)
    r.unshift(k)
    accum += r.length - 1
    traverse(v, r)
  })
}

const t = new Set()
traverse(orbitTrees, [])

console.log('p1', accum)

function findNode (idx, key) {
  const trace = []
  let k = key
  for (; ;) {
    const v = idx.get(k).get('_')
    k = v
    if (!v) break
    trace.unshift(v)
  }
  return trace
}

const youToRoot = findNode(forestIndex, 'YOU')
const santaToRoot = findNode(forestIndex, 'SAN')

let lastCommonNode = 0
for (let i = 0; ; i++) {
  if (santaToRoot[i] !== youToRoot[i]) {
    lastCommonNode = i - 1
    break
  }
}

console.log('p2', youToRoot.length - lastCommonNode - 1 + santaToRoot.length - lastCommonNode - 1)

// console.log(forestIndex.get('YOU'))