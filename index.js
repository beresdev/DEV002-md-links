const { readFile, extName, readDir, joinPaths, formatPaths } = require('./md-links')

readFile('/home/beres/Laboratoria/Proyecto1_Cipher/DEV002-cipher/FAQ.md');

extName('/home/beres/Laboratoria/Proyecto1_Cipher/DEV002-cipher/FAQ.md');

readDir('/home/beres/Laboratoria/Proyecto1_Cipher/DEV002-cipher');

formatPaths({root: '/home/Laboratoria/', dir: '/test', base: 'project.spect.js'});

joinPaths('/home/Laboratoria/','/test');