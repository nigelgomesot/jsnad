'use strict'

const uptime = () => {
  console.log('uptime:', process.uptime())

  setTimeout(() => {
    console.log('uptime:', process.uptime())
  }, 5000)
}
// uptime()

const cpuUsageStats = () => {
  const uptime = process.uptime()
  const { user, system } = process.cpuUsage()
  console.log(`uptime: ${uptime}, cpu usage - user: ${user}, system: ${system}, total in secs: ${(user + system)/ 1000000}`)
}
//cpuUsageStats()

const cpuUsage = () => {
  setTimeout(() => {
    cpuUsageStats()
    const now = Date.now()
    while (Date.now() - now < 5000) {}
    cpuUsageStats()
  }, 500)
}
//cpuUsage()

const memoryUsage = () => {
  const stats = [process.memoryUsage()]

  let iterations = 5

  while (iterations--) {
    const arr = []
    let i = 10000
    while (i--) {
      arr.push({[Math.random()]: Math.random()})
    }

    stats.push(process.memoryUsage())
  }

  console.table(stats)
}
memoryUsage()
