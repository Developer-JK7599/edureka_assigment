const fileSystem = require('fs');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

// const readline = require('readline').createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

//Ask for filename for the first time
// readline.question(`Enter file name? `, takeFileName => {
//     validatFileName(takeFileName);
//     //readline.close();
// });

var arrayFileName = [];

//Use below function to validate & stop duplicating filename
function validatFileName(fileName) {

    fileSystem.readFile("./fileList.txt", function (err, data) {
        let arrayFile = data.toString().replaceAll(".txt", "").split(',');
        arrayFileName = arrayFile;

        for (let i = 0; i < arrayFile.length; i++) {
            if (arrayFile[i] == fileName) {
                //Ask for filename for again due to same name validation.
                console.log("File already exists, please enter another file name");
                // readline.question(`Enter file name again? `, takeFileNameAgain => {
                //     validatFileName(takeFileNameAgain);
                // });
                break;
            } else {
                if (arrayFile.length === (i + 1)) {
                    writeFileFun(fileName)
                }
            }
        }

    })
}

//Use below function to write file
function writeFileFun(fileName) {
    fileSystem.writeFile(fileName.concat(".txt"), "You are awesome", function (err) {
        appendFileFun(fileName.concat(".txt"));
        console.log("File creation done");
        //Also update array when file is created
        arrayFileName.push(fileName);
        console.log(arrayFileName);
        //readline.close();
    })
}

//appendfile so keep update record for the file creation
function appendFileFun(fileName){
    fileSystem.appendFile("./fileList.txt",","+fileName,function(){
        //readline.close();
    })
}

const {fileName} = argv;
validatFileName(fileName);

