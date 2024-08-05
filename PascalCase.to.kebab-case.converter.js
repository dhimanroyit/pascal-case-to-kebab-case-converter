import fs from 'fs';
import path from 'path';

function pascalToKebab(name) {
    return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

const directory = './'

function pascalCaseToKebabCaseConvert(directory) {
    fs.readdir(directory, (err, items) => {
        if(err) throw err;
        items.forEach(item => {
            const pathName = path.join(directory,item);
    
            if(fs.statSync(pathName).isDirectory()) {
                const newName = pascalToKebab(item);
                const newPath = path.join(directory, newName)
                fs.rename(pathName,path.join(directory, newName), (err) => {
                    if(err) throw err;
                    pascalCaseToKebabCaseConvert(newPath)
                })
            } else {
                const ext = path.extname(item);
                const name = path.basename(item, ext);
                const newName = pascalToKebab(name) + ext;
                fs.rename(path.join(directory, item), path.join(directory, newName), err => {
                    if (err) throw err;
                });
            }
        })
    })
}

pascalCaseToKebabCaseConvert(directory)