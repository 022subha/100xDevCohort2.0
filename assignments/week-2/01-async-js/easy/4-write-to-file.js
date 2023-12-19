/* 
    Write to a file
    Using the fs library again, try to write to the contents of a file.
    You can use the fs library to as a black box, the goal is to understand async tasks. 
*/

const fs = require("fs");

function writeFile() {
  fs.writeFile(
    "demo.txt",
    "Hi! I am Subhajit Samanta. I am currently following Harkirat's Cohort 2.0",
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Content Successfully written to the file.");
      }
    }
  );
}

writeFile();
