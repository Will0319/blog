import React from 'react';
import { Row, Card, Icon, Avatar, Col, Tag} from 'antd';
import './index.less';
import {Link} from 'react-router-dom';
// 动画组件
import QueueAnim from 'rc-queue-anim';
import { connect } from 'react-redux';
const { Meta } = Card;

class Home extends React.Component {

    render() {
        const {issues} = this.props;
        return (
            <Row style={{width:'100%',height:'100%'}}>
                <QueueAnim
                    animConfig={[
                        { opacity: [1, 0], translateY: [0, 150] },
                        { opacity: [1, 0], translateY: [0, -150] }
                    ]}>
                        {
                            issues && issues.length?(
                                issues.map((item,index)=>{
                                    return(
                                        <Card
                                            key={index}
                                            style={{ width: "100%", marginBottom:20}}
                                        >
                                            <Meta
                                                title={<h3><Link to={`/blog/${item.number}`}>{item.title}</Link></h3>}
                                                description={
                                                    <Row>
                                                        <Row style={{display:'flex'}}>
                                                            <Col style={{marginRight:5}}>
                                                                <Icon type="calendar" style={{ marginRight: 5 }} />
                                                                {item.created_at}
                                                            </Col>
                                                            <Col>
                                                                <Icon type="tags-o" style={{ fontSize: 20,marginRight:5}}/>
                                                                {
                                                                    item.labels &&item.labels.length?(
                                                                        item.labels.map((vitem,vindex)=>{
                                                                            return(
                                                                                <Tag style={{fontSize:16}} key={vindex} color={`#${vitem.color}`}>{vitem.name}</Tag>
                                                                            );
                                                                        })
                                                                    ):null
                                                                }
                                                            </Col>
                                                        </Row>
                                                        <Row style={{marginTop:20}}>
                                                            <Col>
                                                                <p className='index-blog-content'>{item.body}</p>
                                                            </Col>
                                                        </Row>
                                                    </Row>
                                                }
                                            />
                                        </Card>
                                    )
                                })
                            ):null
                        }
                </QueueAnim>
            </Row>
        );
    }
}

const mapStateToProps = state => {
    return {
        issues: state.issues
    }
}

export default connect(mapStateToProps)(Home);