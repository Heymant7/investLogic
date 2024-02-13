const crypto = require('crypto')
const {func} = require('../utils/index')

const { loginQuery, signupQuery}  = require("../repo")

// const logService = async (loginData) => {
//     try {
//         const result = await loginQuery(loginData);
//         return result;
//     } catch (error) {
//         console.log(error);
//         return "error";
//     }
// };

const logService = async (loginData) => {
        const {password} = loginData;

        const result = await loginQuery(loginData);
        console.log(result)

        if(result.length < 0){
            throw new Error('user not exists') 
        }
        const dbSalt = result.salt
        const dbPass = result.password
        // const myHash = crypto.createHash('sha256');
        // const myData = myHash.update(password + dbSalt).digest('hex'); 

        const myData = func(dbSalt,password)

        if(myData != dbPass){
           throw new Error('pasword not match')    
        }

        return result;
};

// const signService = async(signupData) => {
//     try {
//         const result = await signupQuery(signupData);
//         return result;
//     } catch (error) {
//         console.log("Error in sign up service");
//         return "error"   
//     }
// }

const signService = async(signupData) => {

    const {name, email, password} = signupData;

    const mySalt = crypto.randomBytes(16).toString('hex');
    // let myHash = crypto.createHash('sha256');
    // const data = myHash.update(password + mySalt).digest('hex');

    const myPass = func(mySalt,password)

    signupData.password = myPass;
    signupData.salt = mySalt
    const result = await signupQuery(signupData);
    return result;
}


module.exports = {logService,signService}