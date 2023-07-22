const fs = require('fs');
const path = require('path');

const subjects = ["biology", "chemistry", "mathematics", "physics"];

function removeFileExtension(filename) {
    return filename.split('.').slice(0, -1).join('.');
}

let foldersObj = {};

subjects.forEach((subject) => {
    const targetDirectory = path.join(__dirname, 'src', 'videos', subject);

    const items = fs.readdirSync(targetDirectory, { withFileTypes: true })
    const folders = [];
    items.forEach((item) => {
        if (item.isDirectory()) {
        const folderPath = path.join(targetDirectory, item.name);
        const files = fs.readdirSync(folderPath).filter((file) => file.endsWith('.mp4') || file.endsWith('.txt')).map(removeFileExtension);
        folders.push({
            name: item.name,
            files,
        });
        }
    });
    foldersObj[subject] = folders;
    const data = JSON.stringify(foldersObj, null, 2);

    const outputFilePath = path.join(__dirname, 'src', 'folderList', 'folders.json');

    fs.writeFile(outputFilePath, data, (writeErr) => {
        if (writeErr) {
        console.error('Error writing JSON file:', writeErr);
        return;
        }

        console.log('Folders data generated and saved to folders.json.');
    });
});





  
