#!/usr/bin/env node

const {mdLinks} = require('./mdlinks.js')

let epath = './md_files/';
let options = null;

mdLinks(epath, options)
.catch((error) => {
    console.log("Sin resultados por error en ruta u opciones")
})

module.exports = {mdLinks};

