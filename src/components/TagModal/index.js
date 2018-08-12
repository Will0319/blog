import React from 'react';
import './index.less';
import { Row, Modal, List, Avatar} from 'antd';
import { connect } from 'react-redux';
import { tagToggle } from '../../redux/action';
import {Link,withRouter} from 'react-router-dom';
// @withRouter
class TagModal extends React.Component {
    state={
        visible:true,
        tagBlogList:[]
    }
    
    componentWillMount(){
        // 过滤不含有该标签的文章
        const { issues, nowtagname } = this.props;
        const ary = [];
        // console.log(issues);
        if (issues && issues.length){
            issues.map((item)=>{
                if (item.labels&&item.labels.length){
                    item.labels.map((vitem)=>{
                        if (vitem.name == nowtagname){
                            ary.push(item);
                        }
                    })
                }
            })
        }
        // console.log(ary);
        this.setState({ tagBlogList:ary})
    }

    handleCancel = () => {
        this.setState({visible:false})
    }

    afterClose =() =>{
        const { dispatch } = this.props;
        dispatch(tagToggle(false));
    }

    toBlogInfo = (number) =>{
        this.setState({visible:false});
        this.props.history.push({
            pathname:`/blog/${number}`
        })
    }

    render() {
        const { nowtagname } = this.props;
        const { visible, tagBlogList} = this.state;
        return (
            <Modal
                visible={visible}
                title={nowtagname}
                // onOk={this.handleOk}
                onCancel={this.handleCancel}
                afterClose={this.afterClose}
                footer={null}
                width={400}
            >   
                <List
                    itemLayout="horizontal"
                    dataSource={tagBlogList}
                    // style={{width:'100%'}}
                    pagination={true}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                // style={{width:'100%'}}
                                title={
                                    <div>
                                        <a style={{marginRight:10}} onClick={()=>this.toBlogInfo(item.number)}>{item.title}</a>
                                        <span style={{float:'right'}}>发表于:{item.created_at}</span>
                                    </div>
                                }
                                // description={
                                //     <p className='index-blog-content'>{item.body}</p>
                                // }
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        tagvisible: state.tagvisible,
        issues: state.issues,
        nowtagname: state.nowtagname,
    }
}

export default withRouter(connect(mapStateToProps)(TagModal));