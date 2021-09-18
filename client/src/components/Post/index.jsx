import React from 'react';

import {Col, Badge} from 'react-bootstrap'
import PropTypes from 'prop-types'

import './style.css' 

const Post = ({author, bodyText, date, imgUrls, tags}) => {
    let tagBadges = []
    for (const tag of tags) {
        tagBadges.push(
            <Badge className="post-tag" variant="info">
                <a style={{"color": "white"}}href={"/filter/" + tag}>{tag}</a>
            </Badge>
        )
    }
    return (
        <Col sm={12} md={6} lg={4}>
            <img src={imgUrls[0]} className="post-img" alt={author+"-photo"}/>
            <p>{bodyText}</p>
            <h6>{author}</h6>
            {/* <p>{date}</p> */}
            <p>{tagBadges}</p>
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