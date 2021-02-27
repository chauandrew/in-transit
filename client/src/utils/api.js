import axios from 'axios';

var prefix="https://advance-x.herokuapp.com"
// prefix = "http://localhost:4000" // uncomment for local testing

export default {
    getRecentPosts: async () => {
        let url = prefix + "/api/v1/post"
        let posts = (await axios.get(url)).data
        posts.rows = posts.rows.slice(-3)
        posts.rows.reverse()
        return posts
    },

    /**
     * 
     * @param {String} tags comma delimited string
     * @returns 
     */
    getPostsByTags: async (tags) => {
        let url = prefix + "/api/v1/post?q=" + tags
        let posts = (await axios.get(url)).data
        posts.rows.reverse()
        return posts
    }
}