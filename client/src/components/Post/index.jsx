import { React, useState } from "react";

import { Col, Badge, Modal} from "react-bootstrap";
import PropTypes from "prop-types";

import "./style.css";

const Post = ({ author, bodyText, date, imgUrls, tags }) => {
  const [modalShow, setModalShow] = useState(false);
  let tagBadges = [];
  let i = 0;
  for (const tag of tags) {
    tagBadges.push(
      <Badge className="post-tag" variant="info" key={i}>
        <a style={{ color: "white" }} href={"/filter/" + tag}>
          {tag}
        </a>
      </Badge>
    );
    i++;
  }
  return (
    <>
      <Col className="post-container" sm={12} md={6} lg={4}>
        <a
          href="#"
          onClick={(ev) => {
            ev.preventDefault();
            setModalShow(true);
          }}
        >
          <img src={imgUrls[0]} className="post-img" alt={author + "-photo"} />
        </a>
        <h3 className="centered">{author.toUpperCase()}</h3>
        {/* <p>{date}</p> */}
        <p className="bottom-right">{tagBadges}</p>
      </Col>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <img src={imgUrls} className="img-fluid" /> 
        <Modal.Body>
          <p>{bodyText}</p>
          <h6><i>{author}</i></h6>
        </Modal.Body>
      </Modal>
    </>
  );
};
Post.propTypes = {
  author: PropTypes.string.isRequired,
  bodyText: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  imageUrls: PropTypes.array,
  tags: PropTypes.array,
};

export default Post;
