const downloader = require('./helpers/downloader');

module.exports = getListings = async (data) => {
  try {
    const failuresArray = [];
    for (let i = 0; i < data.length; i++) {
      if (
        data[i].hasOwnProperty('image') &&
        data[i].hasOwnProperty('3d_model')
      ) {
        console.log('Remaining:', data.length - i);
        const imageUrl = `https://ipfs.io/${data[i].image.replace('://', '/')}`;
        const imageName = data[i].image.split('/').pop();

        const modelUrl = data[i]['3d_model'];
        const modelName = modelUrl.split('/').pop();

        try {
          const res1 = await downloader(imageUrl, imageName);
          const res2 = await downloader(modelUrl, modelName);

          if (res1 != 'succeeded' || res2 != 'succeeded') {
            failuresArray.push({
              ...data[i],
              failed: res1 != 'succeeded' ? 'image' : 'model',
              message: res1 != 'succeeded' ? res1 : res2,
            });
          }
        } catch (e) {
          console.log(e.message);
        }
      }
    }
    console.log('Successfully finished!');
    console.log('Failures:', failuresArray.length);
    if (failuresArray.length) {
      for (let i of failuresArray) {
        console.log(JSON.stringify(i));
      }
    }
  } catch (e) {
    console.log(e);
  }
};
