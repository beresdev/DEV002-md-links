// const { readFile, extName, readDir, joinPaths, formatPaths } = require('./md-links')


// readFile('/home/beres/Laboratoria/Proyecto1_Cipher/DEV002-cipher/FAQ.md');

// extName('/home/beres/Laboratoria/Proyecto1_Cipher/DEV002-cipher/FAQ.md');

// readDir('/home/beres/Laboratoria/Proyecto1_Cipher/DEV002-cipher');

// formatPaths({root: '/home/Laboratoria/', dir: '/test', base: 'project.spect.js'});

// joinPaths('/home/Laboratoria/','/test');

const {pathValidation, getLinks } = require('./main.js')

let path = pathValidation('./md_files/file_1.md');

// readFile('/home/beres/Laboratoria/Proyecto3_Mdlinks/DEV002-md-links/file 1.md')
//     .then(console.log('Links obtenidos'))
//     .catch(error => console.error(error));

getLinks(path)
    .then(data => console.log(data))
    .catch(error => console.log(error));