import React from 'react';
import './index.less';
import { Row, Card, Tooltip, Icon , Tag } from 'antd';
import { connect } from 'react-redux';
import {Link,withRouter} from 'react-router-dom';
import { TimesFun } from '../../utils';

const { Meta } = Card;

class RightNav extends React.Component {
    state={
        taglist:[],
        sysTime: TimesFun('2018-08-08 22:00:00')
    }
    componentWillMount() {
        const {issues} = this.props;
        this.noRepeat(issues);
        setInterval(() => {
            let sysTime = TimesFun('2018-08-08 22:00:00')
            this.setState({
                sysTime
            })
        }, 1000)
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
    toGitIndex=()=>{
        window.open('https://github.com/Will0319');
    }
    render() {
        const { taglist, sysTime} = this.state;
        const { issues } = this.props;
        return (
            <Row>
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
                                <p className="abstract">千万别成为大多数人</p>
                                <p className="abstract">
                                    <span>文章 - {issues.length}</span>
                                </p>
                                <p className="abstract">博客已上线：{sysTime}</p>
                                <p className="abstract">其他项目：</p>
                                <p className="abstract">1.<a target="_blank" href="http://search.yx319.cn">前端导航 search.yx319.cn</a></p>
                                <p className="abstract">2.<a target="_blank" href="https://github.com/Will0319/react-yx-app">React脚手架</a></p>
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
                            <Icon type="github" style={{fontSize:30}} onClick={()=>this.toGitIndex()}/>
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
                <Card title={<span onClick={()=>this.toTop()}>最新文章</span>} hoverable={true} className="card">
                    <ul>
                        {issues && issues.length ?
                            issues.map((item, index) => {
                                if (index<10){
                                    return(
                                        <li key={index} className="tag">
                                            <Link to={`/blog/${item.number}`}>{item.title}</Link>
                                        </li>
                                    )
                                }
                            }):null
                        }
                    </ul>
                </Card>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        issues: state.issues,
    }
}

export default withRouter(connect(mapStateToProps)(RightNav));