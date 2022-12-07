const fs = require('fs');
const path = require('path');


const readFile = (path) => {
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err) {
            console.log('erros: ', err)
        } else {
            console.log(data)
        }
    })
}

 const extName = (dir) => {
    let fileExtension = path.extname(dir);
    console.log(fileExtension)
 }

module.exports = {readFile, extName};




//****usando promistify****//


// const fs = require('fs/promises');
// const util = require('util');

// const readingFile= (path) => {
//     const readFile = util.promisify(fs.readFile);
//     readFile(path, 'utf-8')
//         .then((data) => {
//             console.log(data);
//         })

//         .catch((err) => {
//             console.log('Error: ', err)
//         });
// }


//****usando fs/promises****//

// const fs = require('fs/promises');

// fs.readFile('/home/beres/Laboratoria/Proyecto1_Cipher/DEV002-cipher/FAQ.md')
//     .then(data => {
//         console.log(data.toString())
//     })
//     .catch(error => {
//         console.log(error)
//     })

// console.log('Ultima linea')