import { React } from "react";
import PostWrapper from "../PostWrapper";
import { useParams } from "react-router";
import api from "../../utils/api";

const FilteredPosts = () => {
  const { tags } = useParams();
  let dummyFunction = () => api.getPostsByTags(tags);
  return <PostWrapper showHomeBtn={true} getPosts={dummyFunction} pageSize={7} />;
};

export default FilteredPosts;