import React from 'react';
import './index.less';
import { Row, Card, Tooltip, Icon , Tag } from 'antd';
import { connect } from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
// 引入标签弹窗
import TagModal from '../TagModal';

const { Meta } = Card;

class RightNav extends React.Component {
    state={
        taglist:[]
    }
    componentWillMount() {
        const {issues} = this.props;
        this.noRepeat(issues);
    }
    componentWillReceiveProps(nextProps){
        if (this.props.issues !== nextProps.issues){
            this.noRepeat(nextProps.issues);
        }
    }
    // 标签去重
    noRepeat=(data)=>{
        if( data.length===0) return [];
        const ary = [];
        data.map((item)=>{
            if (item.labels && item.labels.length){
                item.labels.map((vitem)=>{
                    ary.push(vitem);
                })
            }
        })
        let hash = {};
        const taglist = ary.reduce((preVal, curVal) => {
            hash[curVal.id] ? '' : hash[curVal.id] = true && preVal.push(curVal);
            return preVal
        }, []);
        this.setState({
            taglist
        })
    }

    render() {
        const { taglist } = this.state;
        const { issues, tagvisible } = this.props;
        return (
            <Row>
                {tagvisible ? <TagModal /> : null}
                <Card bordered={false} hoverable={true} className="card" cover={<img src={require('../../img/headbg.jpeg')} />}>
                    <div className="authorImg">
                        <img src={require('../../img/headimg.jpg')} alt="" />
                    </div>
                    <Meta
                        title={
                            <div>
                                <span className="card-title">Will</span>
                            </div>
                        }
                        description={
                            <div>
                                <p className="abstract">一个前端菜鸟</p>
                                <p className="abstract">
                                    <span>文章 - {issues.length}</span>
                                </p>
                            </div>
                        }
                    />
                </Card>
                <Card title="FOLLOW ME" hoverable={true} className="card">
                    <div className="icon-git-wrp">
                    <div className="call">
                        <Tooltip title="个人简历">
                            <Icon type="solution" style={{ fontSize: 30 }}/>
                        </Tooltip>
                        <Tooltip title="github">
                            <Icon type="github" style={{fontSize:30}}/>
                        </Tooltip>
                        <Tooltip
                        title={
                            <img
                            className="wx"
                            src={require('../../img/Wechat.png')}
                            alt="微信"
                            width={100}
                            height={100}
                            />
                        }>
                            <Icon type="wechat" style={{fontSize:30}}/>
                        </Tooltip>
                    </div>
                    </div>
                </Card>
                <Card title="标签" hoverable={true} className="card">
                        {
                            taglist && taglist.length?(
                                taglist.map((item,index)=>{
                                    return (
                                        <Link to={`/tagblog/${item.name}`} key={index}>
                                            <Tag key={index} color={`#${item.color}`} className="tag" >
                                                {item.name}
                                            </Tag>
                                       </Link>
                                    )
                                })
                            ):'暂无标签'
                        }
                </Card>
                <Card title={<span onClick={()=>this.toTop()}>文章列表</span>} hoverable={true} className="card">
                    <ul>
                        {issues &&
                            issues.map((item, index) => (
                                <li key={index} className="tag">
                                    <Link to={`/blog/${item.number}`}>{item.title}</Link>
                                </li>
                            ))}
                    </ul>
                </Card>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        issues: state.issues,
        tagvisible: state.tagvisible,
    }
}

export default withRouter(connect(mapStateToProps)(RightNav));