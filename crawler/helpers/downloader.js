const download = require('image-downloader');
const path = require('path');

module.exports = downloader = async (_url, _name) => {
  try {
    let response;
    const filePath = (storeinfopath = path.join(
      __dirname,
      `../../output/${_name}`
    ));

    const options = {
      url: _url,
      dest: filePath,
    };

    await download
      .image(options)
      .then(({ filename }) => {
        response = 'succeeded';
        console.log(`File : ${_name} -  successfully downloaded.`);
      })
      .catch((err) => (response = err.message));

    return response;
  } catch (e) {
    console.log(e);
  }
};
