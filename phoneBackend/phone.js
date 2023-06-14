const mongoose = require("mongoose")

const url = process.env.MONGO_URI

mongoose.set("strictQuery",false)
mongoose.connect(url)

const phoneSchema = mongoose.Schema({
	name: {
		type: String,
		required: true, 
		minLength: 3,
		maxLength: 64,
	},
	number: {
		type: String,
		required: true,
		minLength: 8,
		maxLength: 32,
		validate: [
			n => /\d{2,3}-\d*/.test(n),
			"The number should be formated dd-ddddd... ddd-dddddd..."
		]
	}
})

phoneSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model("Phone", phoneSchema)
