const axios = require('axios');
const BASE_URL = "http://localhost:4000/api/v1"
axios.get(BASE_URL)
.then((response) => console.log(response.data))
.catch((error) => console.log(error));