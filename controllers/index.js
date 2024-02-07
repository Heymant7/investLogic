const {logService, signService} = require('../services')
const cryptoJs = require('crypto-js')

const crypto = require('crypto')

// const lol = ()=>{
//     console.log(">>>>>>>>>> ", (crypto.randomBytes(8)))
// }
// lol()

const loginController = async (req,res) => {

    try{
        const {email,password} = req.body

        if(! email || !password){
            return res.send({
                success : false,
                message : "enter email or password",
                result : {}
            });
        }

        else{
            const loginData = {email,password}
            const loginServiceOutput = await logService(loginData)
            
            if(loginServiceOutput === 'error'){
                return res.send({
                    success : false,
                    message : "error in logging",
                    loginServiceOutput : {}
                });
            }
            else if(loginServiceOutput.length == 0){
                return res.send({
                    success: false,
                    message: "User not found",
                    loginServiceOutput : {},
                });
            }
            else{
                // const salt = loginServiceOutput[0].salt;
                // const hash = cryptoJs.SHA256(password + salt).toString();
                // console.log(hash);
                return res.send({
                        success: true,
                        message: "logged In!!",
                        loginServiceOutput,
                    });
                
            }
        }
    }
    catch(error){
        console.log(error);
        if(error.message == "pasword not match")
       {
        return res.send({
            success: false,
            message: "wrong password",
            loginServiceOutput:{}
        });
       }
        return res.send({
            success: false,
            message: "Error",
            result: {},
        });
    }
}

const signupController = async (req,res) => {

    try{
        const {name,email,password} = req.body  
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[a-zA-Z]+$/;
        if(!name || !email || !password){
            return res.send({
                success : false,
                message : "enter name, email or password",
                result : {}
            })
        }
        else if (!password.match(passwordRegex)){
            return res.send({
                success : false,
                message : "Password must be at least 6 characters long and include at least one letter, one digit, and one special character.",
                result : {}
            })
        }
        else if(!email.match(emailRegex)){
            return res.send({
                success: false,
                message: "Invalid email format",
                result: {},
              });
        }else if(!name.match(nameRegex)){
            return res.send({
                success: false,
                message: "Name should contain only letters (upper or lower case)",
                result: {},
            });
        }
        else{
            // const salt = cryptoJs.lib.WordArray.random(16).toString();
            // const hashedPass = cryptoJs.SHA256(password + salt).toString()
            const signupData = {name,email,password};
            const signupSerivceOutput = await signService(signupData)

            if(signupSerivceOutput === "error"){
                return res.send({
                    success: false,
                    message: "unable to create user",
                    signupSerivceOutput: {},
                });
            }
            else if (signupSerivceOutput === 'exists!!'){
                return res.send({
                    success: false,
                    message: "User already exists!",
                    signupSerivceOutput,
                });
            }
            else{
                return res.send({
                    success : true,
                    message : "Registered!!",
                    signupSerivceOutput
                })
            }
        }
    }
    catch(error){
        console.log(error);
        return res.send({
            success:false,
            message : "Error in Signup controller",
            result : {}
        })
    }
}

module.exports = {loginController,signupController}
// module.exports = signupController
