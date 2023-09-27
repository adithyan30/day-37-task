const express = require("express");
const fs = require("fs");
const path = require("path");

const outputFolder = './output';

// console.log (
//     "to check whether the folder is already there or not!!! ",
//     fs.existsSync(outputFolder)
// );

if (!fs.existsSync(outputFolder)){
    fs.mkdirSync(outputFolder);
}

const adhi = express();

const PORT = 3000;

adhi.get ("/createFile", (req , res) => {
    const currentTime = new Date();
    
    const  year = currentTime.getFullYear().toString();
    const  month = (currentTime.getMonth() + 1).toString();
    const  date = currentTime.getDate().toString();
    const  hours = currentTime.getHours().toString();
    const  mins = currentTime.getMinutes().toString();
    const  secs = currentTime.getSeconds().toString();

    const dateTimeForFileName = `${year}-${month}-${date}-${hours}-${mins}-${secs}.txt`;

    const filePath = path.join(outputFolder, dateTimeForFileName);

    console.log("filePath:", filePath);
    
    fs.writeFile(filePath, currentTime.toISOString(), (err) => {
        if (err) {
            res.status(500).send(`error creating file: ${err}` );
            return;
        }

        res.send(`file created sucessfully at: ${filePath}`);
    });
});

adhi.get("/getFiles", (req, res) => {
    fs.readdir(outputFolder, (err, files) => {
      if (err) {
        res.status(500).send(`Error reading files: ${err}`);
        return;
      }
      console.log("List of files:", files);
      const textFiles = files.filter((file) => path.extname(file) === ".txt");
  
      res.json(textFiles);
    });
  });

adhi.listen(PORT, () => {
    console.log("server is running on port:",PORT);
  });
  