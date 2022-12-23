const {pathValidation, directoryFilesValidation} = require('./main.js')
const path = require('node:path');

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

module.exports = {mdLinks}