const path  = require('path');
const fs    = require('fs');
const TYPES = require('./types');

/**
 * Delete directory and content
 * @param cPath
 */
const deleteFolderRecursive = (cPath) => {
    if (fs.existsSync(cPath)) {
        fs.readdirSync(cPath).forEach((file, index) => {
            const curPath = path.join(cPath, file);
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(cPath);
    }
};

/**
 * Process files order by type
 * @param acc
 * @param file
 * @param from
 * @returns {*}
 */
const processFile = (acc, file, from) => {
    const extension = file.split('.').slice(-1)[0];
    const type = getFileType(extension);

    acc[type] = acc[type].concat({
        name: file,
        path: path.join(from, file)
    });

    return acc;
};

/**
 *
 * @param extension
 * @returns {string}
 */
const getFileType = (extension) => {
    let type = false;

    Object.keys(TYPES).forEach((key, index) => {
        if (!type && TYPES[key].types.includes(extension)) {
            type = TYPES[key].name;
        }
    });

    return (!type) ? TYPES.OTHERS.name : type;
};


/**
 * Organize files by type
 * @param from
 * @param files
 */
const organizeFileByType = (from, files) => {
    const state = Object.keys(TYPES).reduce((acc, key) => {
        const type = TYPES[key].name;
        acc[type] = [];

        return acc;
    }, {});

    return files.reduce((acc, file) => {
        if (!fs.lstatSync(file).isDirectory()) {
            acc = processFile(acc, file, from);
        }

        return acc;
    }, state);
};

/**
 * Copy files to their directory
 * @param files
 * @param to
 */
const copyFiles = (files, to) => {
    files.forEach((file) => {
        const destination = path.join(to, file.name);
        fs.copyFileSync(file.path, destination, 0);
        fs.unlinkSync(file.path);

        console.log('Move: ' + file.path + ' -> '+ destination)
    });
};

/**
 * Show file type
 * @param type
 */
const showFileType = (type, isEmpty) => {
    const borders = (new Array(type.length + 10)).fill('=').join('');

    console.log("\n" + borders);
    console.log('#    ' + type.toLocaleUpperCase() + '    #');
    console.log(borders + "\n");

    if (isEmpty) {
        console.log("Is empty...\n");
    }
};

/**
 * Init application
 * @param from
 */
const init = (from) => {
    const fromPath = path.join(process.env.PWD, from, './');

    fs.readdir(fromPath, (err, files) => {
        const organizedFiles = organizeFileByType(fromPath, files);

        Object.keys(organizedFiles).forEach((type) => {
            if (organizedFiles[type].length) {
                const destination = path.join(fromPath, type);

                // deleteFolderRecursive(destination);
                if (!fs.existsSync(destination)) {
                    fs.mkdirSync(destination);
                }

                showFileType(type);
                copyFiles(organizedFiles[type], destination);
            } else {
                showFileType(type, true);
            }

        })
    });
};

module.exports.init = init;