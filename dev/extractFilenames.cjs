const fs = require("fs");
const path = require("path");

// Read folder path from command line argument
const folderPath = process.argv[2];
const outputFile = process.argv[3] || "output.txt"; // optional output file name

if (!folderPath) {
  console.error("Please provide a folder path as a command line argument.");
  process.exit(1); // exit with error code 1
}

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error(`Error reading folder: ${err}`);
    process.exit(1); // exit with error code 1
  }

  let fileContent = "export const tiles = [\n";

  files.forEach((file) => {
    fileContent += '"' + path.basename(file) + '",\n';
  });

  fileContent += "];";

  // Write file names to output file
  fs.writeFile(outputFile, fileContent, (err) => {
    if (err) {
      console.error(`Error writing output file: ${err}`);
      process.exit(1); // exit with error code 1
    }
    console.log(`File names written to ${outputFile}`);
  });
});
