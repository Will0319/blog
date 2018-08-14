import React from 'react';
import { Row, Card, Icon, Avatar, Col, Tag, Pagination, List } from 'antd';
import './index.less';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Utils from '../../utils';
const { Meta } = Card;

export default class TagBlog extends React.Component {
    
    state = {
        list:[],
        name:'',
        loading:false
    }

    componentWillMount() {
        Utils.ScrollToAnchor();
        this.setState({name:this.props.match.params.name})
        this.getBlogApiData(this.props.match.params.name)
    }

    componentWillReceiveProps(newProps) {
        Utils.ScrollToAnchor();
        if (this.props.match.params.name != newProps.match.params.name){
            this.setState({ name: newProps.match.params.name,list:[]})
            this.getBlogApiData(newProps.match.params.name)
        }
    }
    // 获取该标签的博客列表
    getBlogApiData(data) {
        this.setState({ loading:true})
        axios.get('https://api.github.com/repos/Will0319/blog/issues', {
            params: {
                creator: 'Will0319',
                labels: data,
            },
        }).then((response) => {
            if (response.status === 200) {
                // 进行时间格式统一处理
                const data = response.data;
                const list = this.updateTime(data);
                this.setState({ list , loading:false})
            } else {

            }
        });
    }

    // 时间处理函数，留下年月日
    updateTime(data) {
        if (data.length === 0) return;
        data.map((item, index) => {
            item.created_at = Utils.TimeUpdate(item.created_at)
        })
        return data;
    }

    render() {
        const { list, name, loading } = this.state;
        return (
            <Card
                style={{ width: '100%' }}
                loading={loading}
            >
                <Meta
                    title={<h3>{`标签 : ${name}`}</h3>}
                    description={
                        <List
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 10,
                            }}
                            itemLayout="horizontal"
                            dataSource={list}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        style={{width:'100%'}}
                                        title={<Link to={`/blog/${item.number}`} style={{fontSize:18}}>{item.title}</Link>}
                                        description={
                                            <Row>
                                                <Row style={{ display: 'flex' }}>
                                                    <Col style={{ marginRight: 5 }}>
                                                        <Icon type="calendar" style={{ marginRight: 5 }} />
                                                        {item.created_at}
                                                    </Col>
                                                    <Col>
                                                        <Icon type="tags-o" style={{ fontSize: 20, marginRight: 5 }} />
                                                        {
                                                            item.labels && item.labels.length ? (
                                                                item.labels.map((vitem, vindex) => {
                                                                    return (
                                                                        <Tag key={vindex} color={`#${vitem.color}`}>{vitem.name}</Tag>
                                                                    );
                                                                })
                                                            ) : null
                                                        }
                                                    </Col>
                                                </Row>
                                                <Row style={{ marginTop: 20 }}>
                                                    <Col>
                                                        <p className='index-blog-content'>{item.body}</p>
                                                    </Col>
                                                </Row>
                                            </Row>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    }
                />
            </Card>
        );
    }
}