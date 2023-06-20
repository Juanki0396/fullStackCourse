require("dotenv").config()

const PORT = process.env.PORT
const MONGO_URI = process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGO_URI
    : process.env.MONGO_URI
const SECRET = process.env.SECRET
const TEST_LOGS = process.env.TEST_LOGS === "true"
    ? true
    : false
 
module.exports = {
    MONGO_URI,
    PORT,
    TEST_LOGS,
    SECRET
}
