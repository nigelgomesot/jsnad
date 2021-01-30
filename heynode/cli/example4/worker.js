const debug_work_a = require('debug')('work:a'),
      debug_work_b = require('debug')('work:b')

const work_a = () => {
  debug_work_a('work_a processing...')
  setTimeout(work_a, Math.random() * 1000)
}

const work_b = () => {
  debug_work_b('work_b processing...')
  setTimeout(work_b, Math.random() * 1000)
}

work_a()
work_b()
