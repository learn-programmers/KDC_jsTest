const fs = require('fs')

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

const readFile = (path) =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (error, data) => {
      if (error) {
        return reject(error)
      }

      resolve(JSON.parse(data.toString()))
    })
  })

module.exports = {
  getRandomNumber,
  readFile,
}
