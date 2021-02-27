import React from 'react';
import Col from 'react-bootstrap/Col'
import PropTypes from 'prop-types'

import './style.css' 

const Post = ({author, bodyText, date, imgUrls, tags}) => {
    return (
        <Col sm={12} md={6} xl={4}>
            <img src={imgUrls[0]} className="post-img" />
            <p>{bodyText}</p>
            <h6>{author}</h6>
            <p>{date}</p>
            {/* <p>{tags}</p> */}
        </Col>
    )
}
Post.propTypes = {
    author: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    imageUrls: PropTypes.array,
    tags: PropTypes.array
}

export default Post;