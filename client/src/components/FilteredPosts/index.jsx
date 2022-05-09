import { React, useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router";
import Post from "../Post";
import api from "../../utils/api";

const FilteredPosts = () => {
  const { tags } = useParams();
  const [posts, setPosts] = useState([]);
  const [displayedPosts, setDisplayedPosts] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const pageSize = 9;

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
  useEffect(() => {
    let front = pageNum * pageSize;
    let back = front + pageSize;
    setDisplayedPosts(posts.slice(front, back));
  }, [pageNum, posts]);

  useEffect(() => {
    api.getPostsByTags(tags).then((res) => {
      console.log(res);
      let p = [];
      let i = 0;
      let keymap = res.keymap;
      for (const row of res.rows) {
        console.log(row);
        p.push(
          <Post
            key={i}
            author={row[keymap["author"]]}
            bodyText={row[keymap["body"]]}
            quote={row[keymap["quote"]]}
            date={row[keymap["createdDate"]]}
            imgUrls={row[keymap["imgUrls"]].split(",")}
            tags={row[keymap["tags"]].split(",")}
          />
        );
        i++;
      }
      setPosts(p);
    });
  }, []);

  return (
    <Container>
      <Row>
        <Col lg={12} className="text-center">
          <h2>{tags} Stories:</h2>
        </Col>
      </Row>
      <Row>{displayedPosts}</Row>

      <Row className="m-3">
        <Col lg={12} className="text-center">
          <Button className="m-1" href="/">
            Home
          </Button>
          {pageNum !== 0 ? (
            <Button className="m-1" onClick={prevPage} variant="outline-dark">
              Previous
            </Button>
          ) : (
            ""
          )}
          {(pageNum + 1) * pageSize < posts.length ? (
            <Button className="m-1" onClick={nextPage} variant="outline-dark">
              Next
            </Button>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FilteredPosts;
