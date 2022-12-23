const {pathValidation, isDir, ismdFile, readDirectory, linksAnalisis} = require('./main.js')
const path = require('node:path');

let epath = './md_files/';
let options = "stats-validate";



mdLinks(epath, options)
    .catch((error) => {
        console.log("Sin resultados por error en ruta u opciones")
    })

function mdLinks(epath, options) {
    console.log("Entrando a mdLinks")
    let entryPath = pathValidation(epath);

    return new Promise((res, rej) => {
        if (options == null || options == undefined) {
            console.log("options = null")
            return res(
                directoryFilesValidation(entryPath, null)
            )
        }
        else if(options == "validate") {
            console.log("options = validate")
            return res (
                directoryFilesValidation(entryPath,"validate")
            )
        }
        else if(options == "stats") {
            console.log("options = stats")
            return res(
                directoryFilesValidation(entryPath,"stats")
            )
        } 
        else if(options === "stats-validate") {
            console.log("stats-validate")
            return res (
                directoryFilesValidation(entryPath,"stats-validate")
            )
        }
        else {
            return rej(console.log("opcion inválida"))
        }
    })
}

function directoryFilesValidation(epath, options) {
    let promises = [];
    if (isDir(epath) === true)  {
        let files = readDirectory(epath)
        files.forEach(element => {
            let newPath = path.join(epath,element);
            directoryFilesValidation(newPath, options)
        })
    } else if(ismdFile(epath) === true) {
        promises.push(linksAnalisis(epath, options))
    } else {
        console.log("ruta inválida")
    }
    return Promise.all(promises)
}

module.exports = {mdLinks}