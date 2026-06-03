const axios = require("axios");
require("dotenv").config();

axios
  .get(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
  )
  .then((res) => {
    console.log(JSON.stringify(res.data, null, 2));
  })
  .catch((err) => {
    console.log(err.response?.data || err.message);
  });