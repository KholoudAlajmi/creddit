import axios from "axios";


const instance = axios.create({
    basURL: " https://api-creddit.eapi.joincoded.com/",
  });
  
  export default instance;