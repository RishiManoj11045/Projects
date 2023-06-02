import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from 'antd';

function Home() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [postMatch, setPostMatch] = useState([]);
    const location = useLocation();
    useEffect(() => {
        const trial = async (e) => {

            //console.log(e);

            await axios.get('http://localhost:5000/home').then((res) => {

                //console.log(res);
                setUsers(res.data);

            }).catch((err) => {

                console.log(err);

            });

        };

        trial();
    }, [])

    useEffect(() => {
        const loadPosts = async (e) => {

            //console.log(e);

            await axios.get('http://localhost:5000/home').then((res) => {

                //console.log(res);
                setPosts(res.data);

            }).catch((err) => {

                console.log(err);

            });

        };

        loadPosts();
    }, [])

    const searchPosts = (text) => {
        if (!text) {
            setPostMatch([]);
        } else {
            let matches = posts.filter((post) => {
                const regex = new RegExp('${text}', 'gi');
                return post.user.match(regex) || post.tags.match(regex);
            });
            setPostMatch(matches);
        }
    };
    return (
        <div>
            <h1>Hello {location.state.id}</h1>
            <input type="text" placeholder='Search' onChange={(e) => {
                searchPosts(e.target.value);
            }} />
            {postMatch && postMatch.map((post, index) => {
                <div>
                    <Card style={{ marginLeft: "35%", marginTop: "5px" }}>
                        {post.name}
                    </Card>
                </div>
            })}
            {users.map((user) => {
                <ul>
                    <li>{user.id}</li>
                    <li>{user.name}</li>
                    <li>{user.email}</li>
                </ul>
            })}
        </div>
    )
}

export default Home;
