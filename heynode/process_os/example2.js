// REF: https://nodejs.org/en/knowledge/getting-started/the-process-module/#header-other-properties

// process properties
const run1 = () => {
  console.log('process.pid',process.pid)
  console.log('process.version',process.version)
  console.log('process.platform',process.platform)
  console.log('process.title',process.title)

  console.log('process.argv',process.argv)
  console.log('process.argc',process.argc)
  console.log('process.execPath',process.execPath)
  console.log('process.env.HOME',process.env.HOME)
  console.log('process.env',process.env)
}
//run1()


// REF: https://nodejs.org/en/knowledge/getting-started/the-process-module/#methods

// process methods

const run2 = () => {
  console.log('process.cwd()',process.cwd())
  console.log('process.chdir("/home")',process.chdir("/home"))
  console.log('process.cwd()',process.cwd())
}
//run2()

const run3 = () => {
  process.nextTick(() => console.log('nextTick done.'))
}
run3()
