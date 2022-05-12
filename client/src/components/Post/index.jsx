import { React, useState } from "react";

import { Col, Badge, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

import "./style.css";

const Post = ({ author, bodyText, quote, date, imgUrls, tags, md, lg }) => {
  const [modalShow, setModalShow] = useState(false);
  let tagBadges = [];
  let i = 0;
  if (md === undefined) md = 6; // default md columns to 6
  if (lg === undefined) lg = 4; // default lg columns to 4
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
      <Col className="post-container" sm={12} md={md} lg={lg}>
        <a
          href="#"
          onClick={(ev) => {
            ev.preventDefault();
            setModalShow(true);
          }}
          style={{ color: "inherit" }}
        >
          <img src={imgUrls[0]} className="post-img" alt={author + "-photo"} />

          <h6 className="post-quote">
            <b>{quote.toUpperCase()}</b>
          </h6>
          {/* <p>{date}</p> */}
        </a>
      </Col>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <span onClick={() => setModalShow(false)} className="closeButton close">
          ✕
        </span>
        <img src={imgUrls} className="img-fluid" />
        <Modal.Body>
          <p>{bodyText}</p>
          <h6>
            <i>{author}</i>
            <span className="float-right">{tagBadges}</span>
          </h6>
        </Modal.Body>
      </Modal>
    </>
  );
};
Post.propTypes = {
  author: PropTypes.string.isRequired,
  bodyText: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  imageUrls: PropTypes.array,
  tags: PropTypes.array,
  md: PropTypes.number,
  lg: PropTypes.number,
};

export default Post;
