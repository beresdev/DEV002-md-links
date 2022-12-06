let fs = require('fs');

const readFile = (path) => {
    fs.readFile(path, 'utf-8', (err, data) => {
        if(err) {
            console.log('erros: ', err)
        } else {
            console.log(data)
        }
    })
}


module.exports = {readFile};