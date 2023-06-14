require("dotenv").config()
const Phone = require("./phone")

const name = process.argv[2]
const number = process.argv[3]

if (!name || !number) {
	Phone
		.find({})
		.then(res => {
			console.log("Phonebook:")
			res.forEach(p => console.log(`${p.name}: ${p.number}`))
			process.exit(0)
		})
		.catch(() => {
			console.log("Cannot retreive data from DB")
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
			process.exit(0)
		})
		.catch(() => {
			console.log(`Cannot add ${name} number ${number} to phonebook`)
			process.exit(1)
		})
}

    
