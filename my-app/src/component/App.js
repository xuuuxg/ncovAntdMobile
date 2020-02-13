import React from 'react';
import '../App.css';
import { NavBar, List } from 'antd-mobile';
import { Statistic, Row, Col, Card, Timeline, Icon, Input, Modal  } from 'antd';
import { createForm } from 'rc-form';
import QueueAnim from 'rc-queue-anim';
import moment from 'moment';
import request from  '../utils/RequestUtils';

const Item = List.Item;

class App extends React.Component {
  state = {
    docked: false,
    timelineData: {},
    statsData: {},
    cityStatsData: {},
    showInput: false,
    visible: false,
  }

  componentDidMount () {
    
    let resJson = request({url: 'http://localhost:8080/ncov/stats',method: 'post'});
    resJson.then(v => {
      this.setState({
        statsData: v
      })
    })

    let timelineJson = request({url: 'http://localhost:8080/ncov/timeline',method: 'post'});
    timelineJson.then(v => {
      this.setState({
        timelineData: v,
      })
    })
  }


  searchOnClick = () => {
    const city = this.props.form.getFieldsValue().focus;
    this.setState({
      visible: true,
    })
      let cityStatsJson = request({url: 'http://localhost:8080/ncov/cityStats',method: 'post', data: { city }});
      cityStatsJson.then(v => {
        this.setState({
          cityStatsData: v
        })
      })
  };

  handleOk = () => {
    this.setState({
      visible: false,
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    
    const { getFieldProps } = this.props.form;
    const { statsData, timelineData, cityStatsData, visible } = this.state;
    return (<div style={{ height: '100%' }}>
        <NavBar
          mode="dark"
          rightContent={[
            <QueueAnim className="demo-content">
              {true ? [
                <div className="demo-thead" key="a">
                  <Input
                    style={{ width: '200px'}}
                    type='text'
                    placeholder="省份名称"
                    {...getFieldProps('focus')}
                  />
                </div>,
              ] : null}
              
            </QueueAnim>,
            
            <Icon key="0" type="search" style={{ marginRight: '16px' }} onClick={this.searchOnClick.bind(this)}/>,
          ]}
        >全国疫情统计</NavBar>
        <Card className="my-list">
          <div style={{ fontSize: '20px', fontWeight: '900'}}>实时播报</div> <br/>
        {
            statsData.data
            ?
            <Card  style={{ backgroundColor: '#f5f6f7'}}>
              <Row gutter={16} >
                <Col span={6}>
                  <Statistic title="确诊" value={statsData.data.confirmedCount} valueStyle={{ fontSize: '15px', color: 'red'}}/>
                </Col>
                <Col span={6}>
                  <Statistic title="疑似" value={statsData.data.suspectedCount} valueStyle={{ fontSize: '15px', color: 'orange'}}/>
                </Col>
                <Col span={6}>
                  <Statistic title="治愈" value={statsData.data.curedCount} valueStyle={{ fontSize: '15px', color: 'green'}}/>
                </Col>
                <Col span={6}>
                  <Statistic title="死亡" value={statsData.data.deadCount} valueStyle={{ fontSize: '15px'}}                                                                              />
                </Col>
              </Row>
            </Card>
            :
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="已确诊" value={0} prefix={<Icon type="like" />} />
              </Col>
              <Col span={12}>
                <Statistic title="疑似" value={0}/>
              </Col>
            </Row>
        }
        </Card>
        <Card>
            <Timeline>
              {
                 timelineData.data
                 ?
                 timelineData.data.list.map(obj => {
                   return (
                   <Timeline.Item dot={<Icon type="clock-circle-o" />} >{ obj.title }<br />{ moment(obj.createTime).format('MM月DD日 HH:mm') } </Timeline.Item>
                   )
                 })
                :
                <Timeline.Item>no data</Timeline.Item>
               }
            </Timeline>
        </Card>

        <Modal
          title="详细数据"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <List >
            {
              cityStatsData.data
              ?
              cityStatsData.data.cities.map(obj => {
                return (
                  <Card>
                    <div style={{ fontSize: '15px', fontWeight: '900' }}>城市：{obj.cityName}</div>
                    确诊： {obj.confirmedCount} &nbsp;&nbsp; |  疑似： {obj.suspectedCount} &nbsp;&nbsp; |  死亡：{obj.deadCount}
                  </Card>
                )
              })
              :
              <Item>no data</Item>
            }
          </List>                 
        </Modal>
    </div>);
  }
}



const Home = createForm()(App);
export default Home;
