/*
    Using `1-counter.md` or `2-counter.md` from the easy section, can you create a
    clock that shows you the current machine time?

    Can you make it so that it updates every second, and shows time in the following formats - 

     - HH:MM::SS (Eg. 13:45:23)

     - HH:MM::SS AM/PM (Eg 01:45:23 PM)
*/

const fs = require("fs");

function showTime() {
  setInterval(function () {
    const time = new Date(Date.now()).toLocaleTimeString("en-US", {
      hour12: true,
    });
    fs.writeFile("clock.txt", time, function (err) {
      if (err) {
        console.log(err);
      }
    });
  }, 1000);
}

showTime();
