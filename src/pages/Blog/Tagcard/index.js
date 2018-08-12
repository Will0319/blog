import React from 'react';
import { Icon } from 'antd';
// import { Link } from 'react-router-dom';
import './index.less';

export default class TagCard extends React.Component {
    render() {

 
        return (
            <div className="rightsider-card">
                <div className="blog-tagcard-title"><Icon type="tag-o" /> 标签</div>
                <div className="blog-tagcard-content">
                    {/* {tagLinkList} */}
                </div>
            </div>
        );
    }
}