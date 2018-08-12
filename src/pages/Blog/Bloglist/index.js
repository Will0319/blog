import React from 'react';
import { Icon, Tag, Row, Col} from 'antd';
// import { Link } from 'react-router-dom';
import './index.less';


export default class Bloglist extends React.Component {

    // 时间转换方法
    TimeUpdate=(time)=>{
        if (!time) return '';
        let date = new Date(time);
        let Mouth = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
        let Dates = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + '-' + Mouth + '-' + Dates;
    }

    render() {

        const { issues } = this.props;
        return (
            <div className="leftsider-card">
                <div className='leftsider-card-bloglist'>
                    {issues && issues.length ? (
                        issues.map((item,index)=>{
                            return(
                                <div key={index} className='leftsider-card-bloglist-item'>
                                    <div className='leftsider-card-bloglist-item-title'>
                                        {item.title}
                                    </div>
                                    <Row style={{display: 'flex'}}>
                                        <Col style={{marginRight:5}}>
                                            <Icon type="calendar" style={{ marginRight: 5 }} />
                                            {this.TimeUpdate(item.created_at)}
                                        </Col>
                                        <Col>
                                            {item.labels && item.labels.length?(
                                                item.labels.map((vitem,vindex)=>{
                                                    return (
                                                        <Tag key={vindex} color={`#${vitem.color}`}>{vitem.name}</Tag>
                                                    );
                                                })
                                            ):null}
                                        </Col>
                                    </Row>
                                </div>
                            );
                        })
                    ) : null}
                </div>
            </div>
        );
    }
}