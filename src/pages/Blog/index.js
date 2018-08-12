import React from 'react';
import { Row, Col, Icon, Card, message} from 'antd';
import './index.less';
import axios from 'axios';
import { connect } from 'react-redux';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
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
        axios.get('https://api.github.com/repos/Will0319/blog/issues/' + path, {
            // params: {
            //     creator: 'Will0319',
            //     number: this.props.match.params.number,
            // },
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
            <Row style={{color:'#fff'}}>
                <Card
                    style={{ width: '100%' }}
                >
                    <Meta
                        title={
                            issuesInfo && issuesInfo.body ? (
                                <div>
                                    <h2>{issuesInfo.title}</h2>
                                    <p style={{ fontSize: 14 }}>发表于：{issuesInfo.created_at}</p>
                                </div>
                            ):null
                        }
                        description={
                            issuesInfo && issuesInfo.body ? (
                                <div className='article-detail' dangerouslySetInnerHTML={{ __html: marked(issuesInfo.body) }} />
                            ) : '文章载入中'
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