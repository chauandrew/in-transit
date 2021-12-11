import {React, useState, useEffect} from 'react';
import {Container, Row} from 'react-bootstrap'
import Post from '../Post'
import api from '../../utils/api'

const RecentPosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        api.getAllPosts()
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
                {posts}
            </Row>
        </Container>
    )
}

export default RecentPosts;