import React from 'react';
import { Timeline , Row , Card } from 'antd';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import './index.less';
const { Meta } = Card;


class Archive extends React.Component {
    state = {

    }
    render() {
        const {issues} = this.props;
        return (
            <Card bordered={false} hoverable={true} className="card" >
                {console.log(this.props.issues)}
                <Meta
                    title={
                        <div>
                            <span className="card-title">归档</span>
                        </div>
                    }
                    description={
                        <Timeline style={{marginTop:20}}>
                            {
                                issues&&issues.length?(
                                    issues.map((item,index)=>{
                                        return (<Timeline.Item key={index}>
                                            <Link to={`/blog/${item.number}`}>
                                            <span style={{marginRight:50}}>{item.title}</span>
                                            <span>{item.created_at}</span>
                                            </Link>
                                            </Timeline.Item>)
                                    })
                                ):null
                            }
                        </Timeline>
                    }
                />
            </Card>
        );
    }
}

const mapStateToProps = state =>{
    return {
        issues: state.issues
    }
}

export default connect(mapStateToProps)(Archive);