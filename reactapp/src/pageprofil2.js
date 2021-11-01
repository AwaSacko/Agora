import {
    Button,
    Layout,
    Menu,
    Breadcrumb,
    Image,
    Card,
    Avatar,
    Divider,
    Row,
    Col,
    Tabs,
    List,
    Space,
    Tag,
    BackTop,
    Badge,
    Modal,
    Carousel,
    Statistic,
    Skeleton,
    message,
  } from "antd";
  import { Link, Redirect } from "react-router-dom";
  import "antd/dist/antd.css";
  import { connect } from 'react-redux'
  import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
  import InfiniteScroll from "react-infinite-scroll-component";
  
  import EnTete from "./EnTete";
  import SideBarDroite from "./SideBarDroite";
  import React, { useState, useEffect } from "react";
  
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  const { TabPane } = Tabs;
  
  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];
  
  function PageProfil2(props) {
    const [loading, setLoading] = useState(false);
    const [dataL, setDataL] = useState([]);
  const [latest, setLatest] = useState([])
  const [themeArticle, setThemeArticle] = useState([])
  
  
  
    useEffect(() => {
      const ProfilComment= async () => {
        var rawResponse = await fetch(`/commentarticle?token=${props.token}`);
        const response = await rawResponse.json();
        const publication = response.publication
        console.log(publication)
        setLatest(publication)
     
  
    
      
       
       }
      ProfilComment();
      // cherche()
      
    }, []);
  
    const loadMoreData = () => {
      if (loading) {
        return;
      }
      setLoading(true);
      fetch(
        "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
      )
        .then((res) => res.json())
        .then((body) => {
          setDataL([...dataL, ...body.results]);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    };
  
    useEffect(() => {
      loadMoreData();
    }, []);
    var toRead = latest;
    return (
      <Layout className="site-layout-background">
        <EnTete />
  
        <Row></Row>
  
        <Layout className="site-layout-background">
          <SideBarDroite />
          <Content
            style={{ padding: "0 24px", minHeight: 280, marginTop: "30px" }}
          >
            <Col span="16">
              <h1
                style={{
                  backgroundColor: "#214C74",
                  color: "white",
                  width: "100%",
                  textAlign: "center",
                  height: 50,
                  justifyContent: "center",
                  marginBottom: 50,
                  marginLeft: 200,
                }}
              >
                Mon profil
              </h1>
              <div>
                {" "}
                <Link to="/profilcomp">
                  <Button
                    type="danger"
                    style={{ marginLeft: "500px", marginBottom: "30px" }}
                  >
                    {" "}
                    Compléter Mon profil
                  </Button>
                </Link>
              </div>
            </Col>{" "}
            <div
              className="card-container"
              style={{ marginBottom: "30px", height: 600 }}
            >
              <Tabs
                type="card"
                style={{
                  height: 500,
                  border: "1px solid rgba(140, 140, 140, 0.35)",
                }}
              >
                <TabPane tab="Mes publications sauvegardées" key="1">
                  <div
                    id="scrollableDiv"
                    style={{
                      height: 500,
                      overflow: "auto",
                      padding: "0 16px",
                      border: "1px solid rgba(140, 140, 140, 0.35)",
                    }}
                  >
                    <InfiniteScroll
                      dataLength={dataL.length}
                      next={loadMoreData}
                      hasMore={dataL.length < 50}
                      loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                      endMessage={
                        <Divider plain>It is all, nothing more 🤐</Divider>
                      }
                      scrollableTarget="scrollableDiv"
                    >
                      <List
                        dataSource={dataL}
                        renderItem={(item) => (
                          <List.Item key={item.id}>
                              <Link to={`/publication/${toRead._id}`}>
                            <List.Item.Meta
                              avatar={<Avatar src={item.picture.large} />}
                              title={
                                <a> {item.name.last}</a>
                              }
                              description={item.email}
                            />
                            <div>Content</div>
                            </Link>
                          </List.Item>
                        )}
                      />
                    </InfiniteScroll>
                  </div>
                </TabPane>
                <TabPane tab="Mes publications commentés" key="2">
                  <div
                    id="scrollableDiv"
                    style={{
                      height: 400,
                      overflow: "auto",
                      padding: "0 16px",
                      border: "1px solid rgba(140, 140, 140, 0.35)",
                    }}
                  >
                    <InfiniteScroll
                      dataLength={dataL.length}
                      next={loadMoreData}
                      hasMore={dataL.length < 50}
                      loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                      endMessage={
                        <Divider plain>It is all, nothing more 🤐</Divider>
                      }
                      scrollableTarget="scrollableDiv"
                    >
                      <List
                      
                        dataSource={latest}
                        renderItem={(item) => (
                            
                          <List.Item key={item.id}>
                               
                            <List.Item.Meta
                   
                              title={
                                <Link to={`/publication/${item._id}`}>{item.titre}</Link> 
                              }
                              description={item.texte}
                              
                            />
                   
                            <div>Content</div>
                           
                          </List.Item>
                        )}
                      />
                    </InfiniteScroll>
                  </div>
                </TabPane>
                <TabPane tab="Mes publications publiées" key="3">
                  <div
                    id="scrollableDiv"
                    style={{
                      height: 400,
                      overflow: "auto",
                      padding: "0 16px",
                      border: "1px solid rgba(140, 140, 140, 0.35)",
                    }}
                  >
                    <InfiniteScroll
                      dataLength={dataL.length}
                      next={loadMoreData}
                      hasMore={dataL.length < 50}
                      loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                      endMessage={
                        <Divider plain>It is all, nothing more 🤐</Divider>
                      }
                      scrollableTarget="scrollableDiv"
                    >
                      <List
                        dataSource={dataL}
                        renderItem={(item) => (
                          <List.Item key={item.id}>
                            <List.Item.Meta
                              avatar={<Avatar src={item.picture.large} />}
                              title={
                                <a href="https://ant.design">{item.name.last}</a>
                              }
                              description={item.email}
                            />
                            <div>Content</div>
                          </List.Item>
                        )}
                      />
                    </InfiniteScroll>
                  </div>
                </TabPane>
              </Tabs>
            </div>
            <div className="site-statistic-demo-card">
              <Row gutter={16}>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="Active"
                      value={11.28}
                      precision={2}
                      valueStyle={{ color: "#3f8600" }}
                      prefix={<ArrowUpOutlined />}
                      suffix="%"
                    />
                  </Card>
                </Col>
                <Col span={12}>
                  <Card>
                    <Statistic
                      title="Idle"
                      value={9.3}
                      precision={2}
                      valueStyle={{ color: "#cf1322" }}
                      prefix={<ArrowDownOutlined />}
                      suffix="%"
                    />
                  </Card>
                </Col>
              </Row>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
  function mapStateToProps(state){
    return {token:state.token}
  }
  
  export default connect(
    mapStateToProps,
    null
    
   
  )(PageProfil2) ;
  
  