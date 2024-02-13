const fs = require('fs')
const path = require('path')
const dirName = path.join(__dirname, 'pdfs')
// console.warn(dirName);

fs.readdir(dirName, (err,files)=>{
//    console.warn(files);
   files.forEach((item)=>{
      console.log(item);
      const newPath = path.join(dirName,item)
      console.log(newPath);
    //   fs.readFile(newPath, 'utf-8', (err,data)=>{
    //      if(err){
    //         console.log(err);
    //         return
    //      }
    //      else{
    //         console.log(data);
    //      }
    //   })
    //   console.log(dirName);
   })
})
