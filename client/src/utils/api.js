import axios from "axios";

var prefix = "https://in-transit.herokuapp.com";
// prefix = "http://localhost:4000" // uncomment for local testing

const api = {
  getAllPosts: async () => {
    let url = prefix + "/api/v1/post";
    let posts = (await axios.get(url)).data;
    posts.rows.reverse(); // sort from newest -> oldest
    return posts;
  },

  getRecentPosts: async () => {
    let url = prefix + "/api/v1/post";
    let posts = (await axios.get(url)).data;
    let numPosts = 6;
    posts.rows = posts.rows.slice(-numPosts);
    posts.rows.reverse(); // sort from newest -> oldest
    return posts;
  },

  /**
   *
   * @param {String} tags comma delimited string
   * @returns
   */
  getPostsByTags: async (tags) => {
    let url = prefix + "/api/v1/post?q=" + tags;
    let posts = (await axios.get(url)).data;
    posts.rows.reverse(); // sort from newest -> oldest
    return posts;
  },
};

export default api;
