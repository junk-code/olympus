const { exec } = require('child_process')

const shellCommand = commandString =>
  new Promise((resolve, reject) => {
    exec(commandString, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(error, { error, stderr, stdout }))
      } else {
        resolve({ stdout, stderr })
      }
    })
  })

module.exports = { shellCommand }
