const fs = require('fs')

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json')
    return JSON.parse(notesString)
  } catch (error) {
    return []
  }
}

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}

var addNote = (title, body) => {
  var notes = fetchNotes()
  var note = {
    title,
    body
  }
  var duplicateNotes = notes.filter((note) => note.title === title)

  if (duplicateNotes.length === 0) {
    notes.push(note)
    saveNotes(notes)
    return note
  }
}

var getAll = () => {
  return fetchNotes()
}

var getNote = (title) => {
  // fetch
  var notes = fetchNotes()
  // filter
  var matchedNotes = notes.filter((note) => note.title === title)
  // return statement
  return matchedNotes[0]
}

var removeNote = (title) => {
  // fetch notes
  var notes = fetchNotes()
  // filter notes, removing the one with title of arg
  var matchedNotes = notes.filter((note) => note.title !== title)
  // save new notes array
  saveNotes(matchedNotes)

  return notes.length !== matchedNotes.length
}

var logNote = (note) => {
  debugger
  console.log('--')
  console.log(`Title: ${note.title}`)
  console.log(`Body: ${note.body}`)
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
}