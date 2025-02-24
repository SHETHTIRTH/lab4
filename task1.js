  const fs = require('fs');
  const path = require('path');

  // Define file categories with their respective extensions
  const fileCategories = {
    Images: ['.jpg', '.jpeg', '.png', '.gif'],
    Documents: ['.pdf', '.doc', '.docx', '.txt'],
    Videos: ['.mp4', '.mkv', '.mov'],
  };

  // Function to organize files in a given directory
  function organizeDirectory(directoryPath) {
    try {
      // Check if the directory exists
      if (!fs.existsSync(directoryPath)) {
        console.error('Error: Directory does not exist.');
        return;
      }

      // Read all files from the directory
      const files = fs.readdirSync(directoryPath);
      files.forEach((file) => {
        const filePath = path.join(directoryPath, file);

        // Check if it's a file before moving
        if (fs.statSync(filePath).isFile()) {
          moveFileCategory(directoryPath, file);
        }
      });

      console.log('Files organized successfully!');
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  // Function to move a file to its respective category folder
  function moveFileCategory(directoryPath, file) {
    const fileExt = path.extname(file).toLowerCase();

    for (const category in fileCategories) {
      if (fileCategories[category].includes(fileExt)) {
        const categoryPath = path.join(directoryPath, category);

        // Create category folder if it does not exist
        if (!fs.existsSync(categoryPath)) {
          fs.mkdirSync(categoryPath);
        }

        // Move file to the respective category folder
        const oldPath = path.join(directoryPath, file);
        const newPath = path.join(categoryPath, file);
        fs.renameSync(oldPath, newPath);
        
        console.log(`Moved: ${file} -> ${category}`);
        return;
      }
    }

    console.log(`Uncategorized: ${file}`);
  }

  // Get directory path from command line argument
  const directoryPath = process.argv[2];

  if (directoryPath) {
    organizeDirectory(directoryPath);
  } else {
    console.log('Usage: node script.js <directory-path>');
  }
