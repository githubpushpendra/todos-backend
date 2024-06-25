const bcrypt = require('bcryptjs')

const pass = 'Krisna@108'

const encryptPass = async(pass) => {
    // salt generation
    const salt = await bcrypt.genSalt(5)
    console.log("Salt is: ", salt)

    const hashedPass = await bcrypt.hash(pass, salt)
    console.log(hashedPass)

    const isMatched = await bcrypt.compare(pass, hashedPass)
    console.log(isMatched)
}

encryptPass(pass)