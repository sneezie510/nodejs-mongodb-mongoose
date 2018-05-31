console.log('Starting app.js')

const fs = require('fs')
const os = require('os')
const _ = require('lodash')
const notes = require('./notes.js')

// console.log(_.isString(true))
// console.log(_.isString('Sandi'))
var filteredArray = _.uniq(['Sandi', 1, 'Sandi', 1, 2, 3, 4])
console.log(filteredArray)

var res = notes.add(1, 12)
  console.log(res)

// var user = os.userInfo()

// fs.appendFile('greetings.txt', `Hello ${ user.username }! You are ${ notes.age }.`, (err) => {
//   if (err) {
//     console.log('Unable to write to file')
//   }
// })