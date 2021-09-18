import {React, useState, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import {useParams} from 'react-router'
import Post from '../Post'
import api from '../../utils/api'

const FilteredPosts = () => {
    const [posts, setPosts] = useState([])
    const {tags} = useParams()

    console.log(tags)

    useEffect(() => {
        api.getPostsByTags(tags)
            .then((res) => {
                console.log(res)
                let p = []
                let i = 0
                let keymap = res.keymap
                for (const row of res.rows) {
                    console.log(row)
                    p.push(
                        <Post key={i} author={row[keymap['author']]}
                            bodyText={row[keymap['body']]} 
                            date={row[keymap['createdDate']]}
                            imgUrls={row[keymap['imgUrls']].split(',')}
                            tags={row[keymap['tags']].split(',')} />
                    )
                    i++
                }
                setPosts(p)
            })
    }, [])

    return (
        <Container>
            <Row>
                <Col lg={12} className="text-center">
                    <h2>{tags} Stories:</h2>
                </Col>
            </Row>
            <Row>
                {posts}
            </Row>
        </Container>
    )
}

export default FilteredPosts;