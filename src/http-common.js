import axios from "axios";

export default axios.create({
    baseURL: "https://api.thecatapi.com",
    headers: {
        "Content-type": "application/json"
    }
});