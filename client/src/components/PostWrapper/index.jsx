import { React, useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Post from "../Post";
import PropTypes from "prop-types";

const PostWrapper = ({ showHomeBtn, getPosts, pageSize }) => {
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [prevPageBtn, setPrevPageBtn] = useState("");
  const [nextPageBtn, setNextPageBtn] = useState("");

  // arbitrary column sizes for md/lg screens. best results if pageSize % array.length == 0
  const lgColSizes = [8, 4, 5, 7, 4, 4, 4];
  const mdColSizes = [7, 5, 6, 6, 12, 4, 8];

  let homeBtn = "";
  if (showHomeBtn) {
    homeBtn = (
      <Button className="m-1" href="/">
        Home
      </Button>
    );
  }

  const nextPage = () => {
    if ((pageNum + 1) * pageSize < posts.length) {
      setPageNum(pageNum + 1);
    }
  };
  const prevPage = () => {
    if (pageNum > 0) {
      setPageNum(pageNum - 1);
    }
  };

  // update displayed posts when page number updates
  useEffect(() => {
    let front = pageNum * pageSize;
    let back = front + pageSize;
    setDisplayedPosts(posts.slice(front, back));
  }, [pageNum, posts]);

  // update previous/next buttons when page number updates
  useEffect(() => {
    if (pageNum !== 0) {
      setPrevPageBtn(
        <Button href="/#post-container" duration={500} className="m-1" onClick={prevPage} variant="outline-dark">
          Previous
        </Button>
      );
    } else {
      setPrevPageBtn("");
    }
    if ((pageNum + 1) * pageSize < posts.length) {
      setNextPageBtn(
        <Button href="/#post-container" duration={500} className="m-1" onClick={nextPage} variant="outline-dark">
          Next
        </Button>
      );
    } else {
      setNextPageBtn("");
    }
  }, [pageNum, posts]);

  // on page load, run given getPosts function
  useEffect(() => {
    getPosts().then((res) => {
      let p = [];
      let i = 0;
      let keymap = res.keymap;
      for (const row of res.rows) {
        let lgColSize = lgColSizes[i % lgColSizes.length];
        let mdColSize = mdColSizes[i % mdColSizes.length];
        p.push(
          <Post
            key={i}
            author={row[keymap["author"]]}
            bodyText={row[keymap["body"]]}
            quote={row[keymap["quote"]]}
            date={row[keymap["createdDate"]]}
            imgUrls={row[keymap["imgUrls"]].split(",")}
            tags={row[keymap["tags"]].split(",")}
            md={mdColSize}
            lg={lgColSize}
          />
        );
        i++;
      }
      setPosts(p);
    });
  }, []);

  return (
    <Container id="post-container" className="pt-5">
      <Row>{displayedPosts}</Row>
      <Row className="m-3">
        <Col lg={12} className="text-center">
          {homeBtn}
          {prevPageBtn}
          {nextPageBtn}
        </Col>
      </Row>
    </Container>
  );
};
PostWrapper.propTypes = {
  showHomeBtn: PropTypes.bool,
  getPosts: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
};

export default PostWrapper;
