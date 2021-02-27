import axios from 'axios';

var prefix=""
prefix = "http://localhost:4000" // uncomment for local testing

export default {
    getRecentPosts: async () => {
        let url = prefix + "/api/v1/post"
        return (await axios.get(url)).data
    }
}