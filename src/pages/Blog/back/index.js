import React from 'react';
import { Row, Col, Icon } from 'antd';
import './index.less';
import axios from 'axios';
// 文章分类
import Categorycard from './Categorycard';
// 文章标签
import Tagcard from './Tagcard';
// 文章列表
import Bloglist from './Bloglist';

const ArchiveCard = () => (
    <div className="blog-rightsider-archive">
        {/* <Link to="/blog/archive">所有文章</Link> */}
        <span>所有文章</span>
    </div>
);

export default class Blog extends React.Component {

    state={
        issues:''
    }

    componentWillMount(){
        this.getBlogApiData();
    }

    // 获取博客内容
    getBlogApiData() {
        axios.get('https://api.github.com/repos/Will0319/blog/issues', {
            params: {
                creator: 'Will0319',
                // labels: 'blog',
            },
        }).then((response)=>{
            if(response.status===200){
                console.log(response.data)
                this.setState({ issues:response.data})
            }else{

            }
        });
    }

    render() {
        const { issues } = this.state;
        return (
            <Row className='main'>
                <Row className='main-container'>
                    <Col xs={24} sm={24} md={18}>
                        {/* 文章列表 */}
                        <Bloglist issues={issues}/>
                    </Col>
                    <Col xs={0} sm={0} md={6}>
                        {/* 所有文章组件 */}
                        <ArchiveCard />
                        {/* 文章分类 */}
                        <Categorycard issues={issues}/>
                        {/* 文章标签 */}
                        <Tagcard issues={Tagcard} />
                    </Col>
                </Row>
            </Row>
        );
    }
}