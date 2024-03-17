const ImageKit = require("imagekit");
const imageKit = new ImageKit({
  publicKey: "your_public_key",
  privateKey: "your_private_key",
  urlEndpoint: "https://ik.imagekit.io/k0hnty7yv"
});

async function uploadToImageKit(fileBuffer, fileName, folderPath) {
  return new Promise((resolve, reject) => {
    imageKit.upload({
      file: fileBuffer,
      fileName: fileName,
      folder: folderPath
    }, (error, result) => {
      if (error) reject(error);
      else resolve(result.url);
    });
  });
}

module.exports = { uploadToImageKit };
