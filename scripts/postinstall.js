const fs = require('fs');

const getFilePath = (packageName, file) => {
  const path0 = `../${packageName}/${file}`;

  if (fs.existsSync(path0)) {
    return path0;
  }

  const path1 = `./node_modules/${packageName}/${file}`;

  if (fs.existsSync(path1)) {
    return path1;
  }

  const path2 = `../../node_modules/${packageName}/${file}`;

  if (fs.existsSync(path2)) {
    return path2;
  }

  return null;
};

const getFileContent = (filePath) => {
  if (fs.existsSync(filePath)) {
    const file = fs.readFileSync(
      filePath,
      'utf8',
    );

    if (file) {
      return file;
    }
  }

  return null;
};

const saveFileContent = (filePath, data) => {
  fs.writeFileSync(
    filePath,
    data,
  );
};

const zem = () => {
  const packageName = 'zod-express-middleware';
  const filePath = 'lib/index.js';

  const fullFilePath = getFilePath(
    packageName,
    filePath,
  );

  if (fullFilePath !== null) {
    const fileContent = getFileContent(fullFilePath);

    if (fileContent !== null) {
      const updatedFileContent = fileContent.replace(
        '.send(errors.map(function (error) { return ({ type: error.type, errors: error.errors }); }));',
        '.send({message: \'Invalid request\', key: \'REQUEST_VALIDATION_ERROR\', data: errors.map(function (error) { return ({ type: error.type, errors: error.errors }); })});',
      );
  
      saveFileContent(
        fullFilePath,
        updatedFileContent,
      );
  
      console.log(`Updated ${packageName}`);
    } else {
      console.error(`Unable to get ${packageName}/${filePath} content`);

      process.exit(0);
    }
  } else {
    console.error(`Unable to get ${packageName}/${filePath}`);

    process.exit(0);
  }
};

const main = () => {
  zem();
};

main();