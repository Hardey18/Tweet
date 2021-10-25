import React, { useEffect, useState, useContext } from 'react'
import { Card, Col, Row, Button, Typography, Form, Input } from 'antd';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import moment from 'moment';

import { AuthContext } from '../../../context/authContext';
import API from '../../../axios'
import data from '../../../tweetData/data.json'

const { TextArea } = Input;
const { Text } = Typography;
function index() {
    const [tweets, setTweets] = useState([])
    const [likes, setLikes] = useState([])
    const [dislikes, setDislikes] = useState([])
    const { setAuthState } = useContext(AuthContext);

    const [state, setState] = useState({
        content: ""
    })

    const updateState = (key: string, value: string) => {
        setState({
            ...state,
            [key]: value,
        })
    }

    useEffect(() => {
        API.get('/posts')
            .then((res) => {
                // console.log(res)
                setTweets(res.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [tweets, setTweets])
        // console.log("Tweets", tweets.data);

        const createTweet = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.preventDefault();
                API.post(`posts`, state)
                .then((res) => {
                    const output = res?.config?.headers?.Authorization.split(" ")[1]
                    setAuthState(output)
                    // console.log("Response", res)
                    // history.push('/home')
                })
                .catch((error) => {
                    if(error) {
                        // setErrorMessage(error.response.data.message)
                        console.log("Error", error)
                    }
                })
            }

            let reversedTweets = [...tweets].reverse();
            // console.log("Reversed", reversedTweets[0].content)
            // console.log("Tweets", tweets)

            // useEffect(() => {
            //     API.get(`/likes/${_id}?likeType=like`)
            //     .then((res) => {
            //         setLikes(res.data.data.length)
            //     })
            //     .catch((err) => {
            //         console.log("Likes Error", err)
            //     })
            // }, [likes])
            // useEffect(() => {
            //     API.get(`/likes/${_id}?likeType=dislike`)
            //     .then((res) => {
            //         setDislikes(res.data.data.length)
            //     })
            //     .catch((err) => {
            //         console.log("Dislike Error", err)
            //     })
            // }, [dislikes])

            // const increaseLikes = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            //     e.preventDefault();
            //         API.post(`likes/${_id}`, { likeType: "like" })
            //         .then((res) => {
            //             // const output = res?.config?.headers?.Authorization.split(" ")[1]
            //             // setAuthState(output)
            //             console.log("Response", res)
            //             // history.push('/home')
            //         })
            //         .catch((error) => {
            //             if(error) {
            //                 console.log("Error", error)
            //             }
            //         })
            //     }
            // const decreaseLikes = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            //     e.preventDefault();
            //         API.post(`likes/${_id}`, { likeType: "dislike" })
            //         .then((res) => {
            //             // const output = res?.config?.headers?.Authorization.split(" ")[1]
            //             // setAuthState(output)
            //             console.log("Response", res)
            //             // history.push('/home')
            //         })
            //         .catch((error) => {
            //             if(error) {
            //                 console.log("Error", error)
            //             }
            //         })
            //     }
    const logout = () => {
        localStorage.clear()
        window.location.href = "/"
    }
    return (<>
        <Button className="logout-button" type="primary" onClick={logout}>Log Out</Button>
        <Card title="User Tweets">
        <Card title="Share a Tweet" style={{ marginBottom: 22 }}>
                    {/* <TextArea rows={4} /> */}
                <Form
                    name="basic"
                    // labelCol={{ span: 16 }}
                    // wrapperCol={{ span: 16 }}
                    autoComplete="off"
                >
                    <Form.Item
                        name="reply"
                        rules={[{ message: 'Tweet your reply!' }]}
                    >
                        <TextArea value={state.content} onChange={(e) => updateState('content', e.currentTarget.value)} rows={4} />
                        {/* <Input /> */}
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 16 }}>
                        <Button onClick={createTweet} type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
                {reversedTweets.map((result, index) => (
                    <Link key={index} to={`/tweet-details/${result._id}`}>
                        <Card className="card-container" style={{ marginBottom: 22 }} hoverable>
                            <Card type="inner" title={result.user.name}>
                        {/* {console.log("Index", result._id)} */}
                                {result.content.substring(0, 70)}...
                            </Card>
                            <Card>
                                <Row className="bottom-row">
                                    <div className="like-dislike">
                                        <Col className="likes">
                                            <LikeOutlined /> {likes}
                                        </Col>
                                        <Col className="dislikes">
                                            <DislikeOutlined /> {dislikes}
                                        </Col>
                                    </div>
                                    <div>
                                        <Col>
                                            <Text>{moment(result.createdAt).startOf('ss').fromNow()}</Text>
                                        </Col>
                                    </div>
                                </Row>
                            </Card>
                        </Card>
                    </Link>
                ))}
        </Card>
    </>)
}

export default index
