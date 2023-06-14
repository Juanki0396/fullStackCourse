const mongoose = require('mongoose')

const url = process.env.MONGO_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phoneSchema = mongoose.Schema({
    name: String,
    number: String,
})

phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phone', phoneSchema)
