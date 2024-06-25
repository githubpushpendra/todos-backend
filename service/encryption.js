const bcrypt = require('bcryptjs')

const encryptPass = (pass) => {
    return new Promise(
        async(resolve, reject) => {
            try{
                const salt = await bcrypt.genSalt(5)
                const hashedPass = await bcrypt.hash(pass, salt)
                resolve(hashedPass)
            } catch(e){
                reject(e.message)
            }
        }
    )
} 

const matchPass = (pass, hashedPass) => {
    return new Promise(async(resolve, reject) => {
        try{
            const isMatched = await bcrypt.compare(pass, hashedPass)
            resolve(isMatched)
        } catch(e){
            reject(e.message)
        }
    })
}
 
// const mainFun = async()=>{
//     const pass = "Krishna@108"
//     const hashedPass = await encryptPass(pass);
//     console.log(hashedPass)

//     // console.log(await matchPass(pass, hashedPass))
// }

// mainFun()

module.exports = {encryptPass, matchPass}