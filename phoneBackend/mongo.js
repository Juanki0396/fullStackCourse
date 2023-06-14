const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("Please, enter the password")
    process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
    `mongodb+srv://fullstack:${password}@mymongodb.osu8uxt.mongodb.net/phoneBookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const phoneSchema = mongoose.Schema({
    name: String,
    number: String,
})

const Phone = mongoose.model('Phone', phoneSchema)

if (!name || !number) {
    Phone
        .find({})
        .then(res => {
            console.log("Phonebook:")
            res.forEach(p => console.log(`${p.name}: ${p.number}`))
            mongoose.connection.close()
        })
        .catch(_ => {
            console.log("Cannot retreive data from DB")
            mongoose.connection.close()
            process.exit(1)
        })

}
else {
    const phone = Phone({
        name: name,
        number: number
    })
    phone
        .save()
        .then(res => {
            console.log(`Added ${res.name} number ${res.number} to phonebook`)
            mongoose.connection.close()
        })
        .catch(_ => {
            console.log(`Cannot add ${name} number ${number} to phonebook`)
            mongoose.connection.close()
            process.exit(1)
        })
}

    
