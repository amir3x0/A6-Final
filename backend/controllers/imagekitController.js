const ImageKit = require("imagekit");
const axios = require("axios"); // Ensure axios is installed and imported

const imageKit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.URL_ENDPOINT, 
  });
  

const getAuthParameters = async (req, res) => {
    try {
      const authParams = imageKit.getAuthenticationParameters();
      console.log(`Generated new ImageKit auth parameters`);
  
      res.status(200).json(authParams);
    } catch (error) {
      console.error("Error fetching authentication parameters:", error);
      res.status(500).json({
        message: "Failed to fetch authentication parameters",
        error: error.toString(), // Ensure error is properly serialized
      });
    }
  };
  

const postImage = async (req, res) => {
  try {
    const uploadUrl = `https://ik.imagekit.io/k0hnty7yv/`;
    console.log("Uploading image to ImageKit:", req.body);
    const response = await axios.post(uploadUrl, req.body, {
      headers: {
        ...req.headers, // Forward the headers from the original request
      },
    });
    console.log("Upload Successful:", response.data);
    res.json({ message: "Upload successful!", data: response.data });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Upload failed!", error: error });
  }
};

module.exports = {
  getAuthParameters,
  postImage,
};
