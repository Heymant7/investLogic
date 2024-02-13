const myDatabase = require('../db')

const loginQuery = async (logData) => {
    return new Promise((resolve,reject) => {
        const {email,password} = logData
        myDatabase.query(`SELECT * FROM userData WHERE email = ?`, [email], 
        (error,result)=>{
            console.log(result);
            if(error){
                console.log(error);
                reject('error')
            }else{
                resolve(result[0])
            }
        });
    }); 
};

const signupQuery = async (signData) => {
    return new Promise((resolve,reject)=>{
        const {name,email,password,salt} = signData

        myDatabase.query(`SELECT * FROM userData WHERE email = ?`, [email], (error,result)=>{
            if(error){
                console.log(error)
                reject('error');
            }
            else if(result.length != 0){
                resolve('exists!!')
            }
            else {
                myDatabase.query(`INSERT INTO userData(name,email,password,salt) VALUES(?,?,?,?)`, 
                [name,email,password,salt], (error,result)=>{
                    if(error){
                        reject('error');
                    }
                    else{
                        resolve(result)
                    }
                })
            }
        })
    })
}

// const getQuery = async (data) => {
//     return new Promise((resolve,reject)=>{
//         const {id} = data

//         myDatabase.query(`SELECT * FROM userData WHERE email = ?`, [email], (error,result)=>{
//             if(error){
//                 console.log(error)
//                 reject('error');
//             }
//             else if(result.length != 0){
//                 resolve('exists!!')
//             }
//             else {
//                 myDatabase.query(`INSERT INTO userData(name,email,password,salt) VALUES(?,?,?,?)`, 
//                 [name,email,password,salt], (error,result)=>{
//                     if(error){
//                         reject('error');
//                     }
//                     else{
//                         resolve(result)
//                     }
//                 })
//             }
//         })
//     })
// }

module.exports = {loginQuery,signupQuery}