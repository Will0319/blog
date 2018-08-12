import React from 'react';
import { Icon } from 'antd';
import './index.less';
// import { Link } from 'react-router-dom';

export default class CategoryCard extends React.Component {
    render() {

        const {issues} = this.props;


        // const categoryLinkList = categoryList.sort((a, b) => b.sum - a.sum).map(
            // item => <Link key={item.id} to={`/blog/category/${item.url}`}><li key={item.id}>{item.name}<span>{item.sum}</span></li></Link>);

        return (
            <div className="rightsider-card">
                <div className="rightsider-card-title"><Icon type="bars" /> 分类</div>
                <div className="rightsider-card-content">
                    <ul>
                        {console.log(issues)}
                        {/* {
                            issues && issues.length ?(
                                issues.map((item)=>{
                                    return(
                                        <li></li>
                                    );
                                })
                            ):null
                        } */}
                        {/* <li>{issues.labels[0].name}</li> */}
                        {/* {categoryLinkList} */}
                    </ul>
                </div>
            </div>
        );
    }
}