import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Row, Col} from 'antd';
import './App.less';
import Header from './components/Header';
import Footer from './components/Footer';
import Music from './components/Music';
import RightNav from './components/RightNav';
import { CONFIG } from './config';
import axios from 'axios';
import { connect } from 'react-redux';
import { issuesList } from './redux/action';
import { TimeUpdate} from './utils';

class App extends Component {
  state = {
    issues: []
  }
  componentWillMount() {
    this.getBlogApiData();
    // 百度统计调用
    this.addBaiduAnaly();
  }

  // 百度统计
  addBaiduAnaly() {
    var _hmt = _hmt || [];
    (function () {
      var hm = document.createElement('script');
      hm.src = '//hm.baidu.com/hm.js?' + CONFIG['baiduAnaly'];
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(hm, s);
    })();
  }
  // 获取博客内容
  getBlogApiData() {
    axios.get(`https://api.github.com/repos/${CONFIG['owner']}/blog/issues`, {
      params: {
        creator: 'Will0319'
      },
    }).then((response) => {
      if (response.status === 200) {
        // 进行时间格式统一处理
        const data = response.data;
        const list = this.updateTime(data);
        const { dispatch } = this.props;
        dispatch(issuesList(list));
      } else {

      }
    });
  }

  // 时间处理函数，留下年月日
  updateTime(data) {
    if (data.length === 0) return;
    data.map((item) => {
      item.created_at = TimeUpdate(item.created_at)
    })
    return data;
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className='web' >
          <div id='to-header'></div>
          {/* 返回顶部 */}
          {/* <div>
            <BackTop>
                <div className="ant-back-top-inner">UP</div>
            </BackTop> 
          </div> */}
          {/* 头部组件 */}
          <Header />
          {/* 音乐组件 */}
          <Music />
            <Row className='bg'>
              {/* 内容区域 */}
              <Row style={{marginTop:20}}>
                <Col xs={1} xm={1} md={1} lg={1} xl={3} xxl={4}></Col>
                <Col xs={22} sm={22} md={22} lg={20} xl={18} xxl={16}>
                    <Row>
                      <Col xs={24} sm={24} md={24} lg={17} xl={17} xxl={17}>
                        {this.props.children}
                      </Col>
                      <Col xs={24} sm={24} md={24} lg={{span:6,offset:1}} xl={{span:6,offset:1}} xxl={{span:6,offset:1}}>
                        <RightNav/>
                      </Col>
                    </Row>
                </Col>
              </Row>
            </Row>
            {/* 底部组件 */}
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect()(App);
