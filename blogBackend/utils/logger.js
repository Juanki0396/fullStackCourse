const config = require("./config")

const info = (...params) => {
    if(process.env.NODE_ENV !== "test" || config.TEST_LOGS ) {
        console.log("INFO:", ...params)
    }
}

const error = (...params) => {
    if(process.env.NODE_ENV !== "test" || config.TEST_LOGS ) {
        console.error("ERROR:", ...params)
    }
}

module.exports = { info, error }
