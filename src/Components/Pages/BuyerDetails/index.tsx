import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Row, Input, Collapse, Form, Button, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import moment from 'moment';

import { AuthContext } from '../../../context/authContext';
import styles from './index.module.css';
import API from '../../../axios'
import data from '../../../tweetData/data.json'
const { Text } = Typography;
const { TextArea } = Input;
const { Panel } = Collapse;

function index() {
    const { setAuthState } = useContext(AuthContext);
    const [post, setPost] = useState("")
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState(0)
    const [dislikes, setDislikes] = useState(0)
    const [state, setState] = useState({
        comment: ""
    })

    const updateState = (key: string, value: string) => {
        setState({
            ...state,
            [key]: value,
        })
    }
    const { _id } = useParams();



    const increaseLikes = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
            API.post(`likes/${_id}`, { likeType: "like" })
            .then((res) => {
                console.log("Response", res)
            })
            .catch((error) => {
                if(error) {
                    console.log("Error", error)
                }
            })
        }
    const decreaseLikes = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
            API.post(`likes/${_id}`, { likeType: "dislike" })
            .then((res) => {
                console.log("Response", res)
            })
            .catch((error) => {
                if(error) {
                    console.log("Error", error)
                }
            })
        }
    const createComment = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
            API.post(`comments/${_id}`, state)
            .then((res) => {
                const output = res?.config?.headers?.Authorization.split(" ")[1]
                setAuthState(output)
            })
            .catch((error) => {
                if(error) {
                    console.log("Error", error)
                }
            })
        }

        useEffect(() => {
            API.get(`/likes/${_id}?likeType=like`)
            .then((res) => {
                setLikes(res.data.data.length)
            })
            .catch((err) => {
                console.log("Likes Error", err)
            })
        }, [likes])
        useEffect(() => {
            API.get(`/likes/${_id}?likeType=dislike`)
            .then((res) => {
                setDislikes(res.data.data.length)
            })
            .catch((err) => {
                console.log("Dislike Error", err)
            })
        }, [dislikes])

    function callback(key: any) {
        console.log(key);
      }
    useEffect(() => {
        API.get(`/posts/${_id}`)
        .then((res) => {
            setPost(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])
    useEffect(() => {
        API.get(`/comments/${_id}`)
        .then((res) => {
            setComments(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [comments]);
  
    return (
        <Card title="Tweet Details">
                <Card type="inner" title={post?.user?.name}>
                    {post?.content}
                </Card>
                <Card>
                    <Row className="bottom-row">
                        <div className="like-dislike">
                            <Col className="likes">
                                <LikeOutlined onClick={increaseLikes} /> {likes}
                            </Col>
                            <Col className="dislikes">
                                <DislikeOutlined onClick={decreaseLikes} /> {dislikes}
                            </Col>
                        </div>
                        <div>
                            <Col>
                                <Text>{moment(post.createdAt).startOf('ss').fromNow()}</Text>
                            </Col>
                        </div>
                    </Row>
                </Card>
                <Collapse style={{ marginBottom: 22 }} defaultActiveKey={['1']} onChange={callback}>
                    <Panel header={comments.length > 0 ? `Comments - ${comments.length}` : "No Comments yet"} key="1">
                        {comments.map((result, index) => (
                        <Card key={index}>
                            <Text className="comment-name-time">{result.user.name} - {moment(result.createdAt).startOf('ss').fromNow()}</Text>
                            <div>{result.comment}</div>
                        </Card>
                        ))}
                    </Panel>
                </Collapse>
                <Card title="Make a comment">
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
                        <TextArea value={state.comment} onChange={(e) => updateState('comment', e.currentTarget.value)} rows={4} />
                        {/* <Input /> */}
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 16 }}>
                        <Button onClick={createComment} type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
                </Card>
    )
}

export default index
