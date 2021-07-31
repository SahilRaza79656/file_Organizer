const { Console } = require("console");
let fs = require("fs");
let path = require("path");

function treeFn(src) {
    // console.log("tree command executed with path : " + src);
    if (src == undefined) {
        console.log("Kindly Enter the Path");
        return;
    } else {
        let doesExist = fs.existsSync(src);
        if (doesExist==true) {
            treeView(src, "");
        } else {
            console.log("Kindly Enter the correct Path");
            return;
        }
}
}
function treeView(src, indent){
    let isFile = fs.lstatSync(src).isFile();
    if(isFile == true){
        let fileName = path.basename(src);
        console.log(indent+"|---"+fileName);
    }else{
        let dirName = path.basename(src);
        console.log(indent+"|___"+dirName);
        let childArr = fs.readdirSync(src);
        for(let i=0; i<childArr.length; i++){
            let childPath = path.join(src, childArr[i]);
            treeView(childPath, indent+"\t");
        } 
    }
}
module.exports = {
    treefxn: treeFn
}