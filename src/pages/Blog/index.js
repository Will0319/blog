import React from 'react';
import { Row, Col, Icon, Card, message , Tag } from 'antd';
import { HashRouter } from 'react-router-dom';
import './index.less';
import axios from 'axios';
import { connect } from 'react-redux';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import Utils from '../../utils';
const { Meta } = Card;
class Blog extends React.Component {

    state={
        issuesInfo:[]
    }

    componentWillMount(){
        // const { issues } = this.props;
        marked.setOptions({
            highlight: code => hljs.highlightAuto(code).value,
        });
        this.getBlogApiInfo(this.props.match.params.number);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.number !== nextProps.match.params.number) {
            // console.log(nextProps.match.params.number)
            this.getBlogApiInfo(nextProps.match.params.number);
        }
    }
    // 通过路由传来的参数去获取文档
    getBlogApiInfo(path) {
        const self = this;
        axios.get('https://api.github.com/repos/Will0319/blog/issues/' + path, {
        }).then((response) => {
                if (response.status === 200) {
                    // 进行时间格式统一处理
                    const data = response.data;
                    // console.log(data)
                    this.setState({ issuesInfo:data})
                }
            }).catch(function (error) {
                    message.warning('文章不存在');
            });;
    }

    render() {
        const { issuesInfo } = this.state;
        return (
            <Row style={{color:'#fff',marginBottom:20}}>
                <Card
                    style={{ width: '100%' }}
                >
                    <Meta
                        title={
                            issuesInfo && issuesInfo.body ? (
                                <div>
                                    <h2>{issuesInfo.title}</h2>
                                    <div style={{ fontSize: 14 }}>
                                        <span style={{marginRight:16}}>发表于 : {Utils.TimeUpdate(issuesInfo.created_at)}</span>
                                        标签 : {
                                            issuesInfo && issuesInfo.labels && issuesInfo.labels.length?(
                                                issuesInfo.labels.map((item,index)=>{
                                                    return (
                                                        <Tag style={{ fontSize: 14 }} key={index} color={`#${item.color}`}>{item.name}</Tag>
                                                    )
                                                })
                                            ):'暂无标签'
                                        }
                                    </div>
                                </div>
                            ):null
                        }
                        description={
                            issuesInfo && issuesInfo.body ? (
                                <div className='article-detail' dangerouslySetInnerHTML={{ __html: marked(issuesInfo.body) }} />
                            ) : '文章载入中...'
                        }
                    />
                </Card>
            </Row>
        );
    }
}


const mapStateToProps = state => {
    return {
        issues: state.issues
    }
}

export default connect(mapStateToProps)(Blog);