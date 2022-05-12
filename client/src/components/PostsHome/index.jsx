import { React } from "react";
import PostWrapper from "../PostWrapper";
import api from "../../utils/api";

const PostsHome = () => {
  return <PostWrapper getPosts={api.getAllPosts} pageSize={7} />;
};

export default PostsHome;
