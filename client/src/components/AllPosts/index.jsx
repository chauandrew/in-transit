import { React } from "react";
import PostWrapper from "../PostWrapper";
import api from "../../utils/api";

const AllPosts = () => {
  return <PostWrapper showHomeBtn={true} getPosts={api.getAllPosts} pageSize={21} />;
};

export default AllPosts;
