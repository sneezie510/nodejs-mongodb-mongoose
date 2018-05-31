// converts json object into string
// var obj = {
//   name: 'Sandi'
// }
// var stringObj = JSON.stringify(obj)
// console.log(typeof stringObj)
// console.log(stringObj)

// converts json string back to json object
// var personString = '{"name": "Sandi", "age": 30}'
// var person = JSON.parse(personString)
// console.log(typeof person)
// console.log(person)

const fs = require('fs')
// define JSON obj
var originalNote = {
  title: 'Some title',
  body: 'Some body'
}
// convert the JSON obj to string then store it in a variable
var originalNoteString = JSON.stringify(originalNote)
// save the JSON value into a file called notes.json using writeFileSync
fs.writeFileSync('notes.json', originalNoteString)

// read the newly created file and store in a var and convert it back to a JSON obj
var noteString = fs.readFileSync('notes.json')
var note = JSON.parse(noteString)
console.log(typeof note)
console.log(note.title)