// REF: https://blog.risingstack.com/mastering-the-node-js-cli-command-line-options/
// REF: https://stackabuse.com/executing-shell-commands-with-node-js/

const { spawn } = require('child_process')

const run = (command, options = []) => {
  const cmd = spawn(command, options)

  console.log(`command: ${command}, options: ${options}`)
  cmd.stdout.on('data', data => console.log(`stdout: ${data}`))
  cmd.stderr.on('data', data => console.log(`stderr: ${data}`))
  cmd.on('error', error => console.log(`error: ${error}`))
  cmd.on('close', code => console.log(`child process exit with code: ${code}`))
}

//run('node', ['-v'])
//run('node', ['-e', 'console.log(3 + 2)'])
//run('node', ['-p', '3 + 2']) // same as eval without console.log
run('node', ['-c', 'example1.1.js']) // checks syntax without executing file
