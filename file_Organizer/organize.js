let fs = require("fs");
let path = require("path");
let types = {
    media: ["mp4", "mkv", "jpg"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}


function organizeFn(src) {
    // console.log("organize command executed with path: " + src);
    if (src == undefined) {
        console.log("Kindly Enter the Path");
        return;
    } else {
        let doesExist = fs.existsSync(src);
        if (doesExist) {
            let organizedDirPath = path.join(src, "OrganizedFolder")
            if (fs.existsSync(organizedDirPath) == false) {
                fs.mkdirSync(organizedDirPath);
            }
            let dirArr = fs.readdirSync(src);
            // console.log(dirArr);
            for (let i = 0; i < dirArr.length; i++) {
                let childPath = path.join(src, dirArr[i]);
                let statsOfPath = fs.lstatSync(childPath);
                if (statsOfPath.isFile() == true) {
                    // console.log(dirArr[i]);
                    let category = getCategory(childPath);
                    // console.log(category);
                    // console.log(childPath, "belongs to --> ", category);
                    transferFile(childPath, organizedDirPath, category);
                }
            }
        } else {
            console.log("Kindly Enter the correct Path");
            return;
        }
    }

    function getCategory(name) {
        let ext = path.extname(name);
        ext = ext.slice(1);
        // console.log(ext);
        for (let key in types) {
            let cTypeArr = types[key];
            for (let i = 0; i < cTypeArr.length; i++) {
                if (ext === cTypeArr[i]){
                    return key;
                }
            }
        }
        return "others";
    }

    function transferFile(childPath, dest, category){
     let categoryPath = path.join(dest, category);
     if(fs.existsSync(categoryPath)==false){
         fs.mkdirSync(categoryPath);
     }
     let fileName = path.basename(childPath);
     let destFilePath = path.join(categoryPath, fileName);
     fs.copyFileSync(childPath, destFilePath);
     console.log(fileName, "copied to --> ", category);
    }

}
module.exports = {
    organizefxn: organizeFn
}