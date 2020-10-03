'use strict'

console.log(`file location: ${__filename}`)
console.log(`dir location: ${__dirname}`)

// Path Builders

const { join, relative, resolve, normalize } = require('path')
const outFile = join(__dirname, 'out.txt')
console.log(`outFile location: ${outFile}`)
const outFile2 = join(__dirname, 'dir1', 'out.txt')
console.log(`outFile2 location: ${outFile2}`)


let path1,
    path2,
    result

path1 = join(__dirname,'foo','out1.txt')
path2 = join(__dirname,'bar','out2.txt')
result = relative(path1, path2)

result = resolve('/foo','bar','..','baz','out.txt')
console.log(`result: ${result}`)

result = normalize('/foo/bar/../baz/out.txt')
console.log(`result: ${result}`)


// Path Deconstructors

const { parse, basename, dirname, extname } = require('path')

console.log('parse:', parse(__filename))
console.log('basename:', basename(__filename))
console.log('dirname:', dirname(__filename))
console.log('extname:', extname(__filename))

