import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { Layout, Card, Row, Col, Tabs, List, Space, BackTop, Statistic} from "antd";
import { connect } from "react-redux";
import { UserOutlined, MessageOutlined, LikeOutlined, DownCircleFilled, SolutionOutlined, EditFilled } from "@ant-design/icons";
import SideBarDroite from "./SideBarDroite";
import Carousel from "react-bootstrap/Carousel";
import Header from "./Header";
import PiedDePage from "./piedDePage";


const { Content, Footer } = Layout;
const { TabPane } = Tabs;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);


function Accueil(props) {
  const [latest, setLatest] = useState([]);
  const [allPublications, setAllPublications] = useState([]);
  const [populaires, setPopulaires] = useState([]);
  const [votes, setVotes] = useState([]);
  

  //Récupération les publications à l'initialisation
  useEffect(() => {
    const findPublications = async () => {
      // Recup articles les plus récents
      const publications = await fetch("publications/lastPublications");
      const body = await publications.json();
      // console.log("3 articles", body.latest);
      setLatest(body.latest);
      //console.log(body);
    };
    findPublications();

    //recup articles les plus populaires
    const popPublications = async () => {
      const plusPopulaires = await fetch("publications/populaires");
      const res_populaires = await plusPopulaires.json();
      //console.log("populaires: ", res_populaires.topPublications);
      setPopulaires(res_populaires.topPublications);
    };
    popPublications();

    // recup de toutes les publications
    const allPublications = async () => {
      const listPublications = await fetch("publications/allPublications");
      const response = await listPublications.json();
      //console.log("all: ", response.allPublications);
      setAllPublications(response.allPublications);

    };
    allPublications();
  }, []);


  var publiCards = latest.map((publication, i) => {
    var toRead = publication;
    return (
      <Carousel.Item key={"publicard "+i}>
        <img style={{
        display: "flex",
        flexDirection: "column",
        justifyContent:"center",
        width: "50px",
        height: "400px",
      }}
          className="d-block w-100"
          src={publication.image}
          alt="First slide"
        />
        <Carousel.Caption
        >
          <h3  style={{
            display: "flex",
            flexDirection: "column",
            justifyContent:"start",
            backgroundColor:"#edc5c4",
            alignItems : "center",
            
          }}>{publication.titre}</h3>
         
          <Link className="btn btn-danger" role="button" to={`/publication/${toRead._id}`}>
              VOIR
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    );
  });

  var topPublications = populaires.map((publication, i) => {
    var toRead = publication;
    return (
      <Carousel.Item>
      <img style={{
        display: "flex",
        flexDirection: "column",
        justifyContent:"center",
        width: "50px",
        height: "400px",
      }}
        className="d-block w-100"
        src={publication.image}
        alt="First slide"
      />
      <Carousel.Caption
      >
        <h3  style={{
          display: "flex",
          flexDirection: "column",
          justifyContent:"start",
          backgroundColor:"#edc5c4",
          alignItems : "center",
          
        }}>{publication.titre}</h3>
      
        <Link class="btn btn-danger" role="button" to={`/publication/${toRead._id}`}>
            VOIR
        </Link>
      </Carousel.Caption>
    </Carousel.Item>
    );
  });

  ///Récupération nombre de vote
  useEffect(() => {
    const findVotes = async () => {
      // Recup articles les plus récents
      const votes = await fetch("/allVotes");
      const body = await votes.json();
      
      // console.log("3 articles", body.latest);
      setVotes(body.allVotes);
      //console.log(body)
    };
    findVotes();
  }, []);

 

  return (

    /* header */
    <Layout className='layout' style={{ margin: 10, backgroundColor:'white'}}>
      
      <Header/>

      <Layout className="site-layout-background">
        <SideBarDroite />
        <Content
          style={{ padding: "0 24px", minHeight: 500, marginTop: "30px" }}
        >
          <Row justify="center">
            <Tabs type="card" style={{ width: 900, height: 600, padding: 15 }}>
              <TabPane tab="A la une " key="tabpane1">
                <Carousel>{publiCards}</Carousel>
              </TabPane>

              <TabPane tab="Les plus populaires" key="tabpane2">
                <Carousel>{topPublications}</Carousel>
              </TabPane>
            </Tabs>
          </Row>
          <Row>
            <Col
              justify="start"
              span={12}
              style={{
                backgroundColor: "transparent",
                textAlign: "center",
                marginTop: "70px",
              }}
            >
              <h3> Votre publication interesse-t-elle du monde ?</h3>
              <p>
              La proposition d'Agora c'est  :<br/>
- d’être acteurs du débat, plutôt que consommateurs passifs. <br/>
- de contribuer de manière positive en proposant des sujets de débat ou proposer des solutions. <br/>
- d’exprimer son opinion à travers un seul vote et un seul commentaire réfléchis.<br/>
- une interface simple d’utilisation et, pour ceux qui n’ont pas le temps de rédiger, un moyen très rapide de faire passer son message.<br/>

Cette solution permet à l’issue de chaque question de :<br/>
- mettre en évidence l’avis de la majorité avec des chiffres à l’appui,<br/>
- connaître et comprendre les avis des autres

              </p>
              <div id="ical">
                <DownCircleFilled
                  style={{
                    fontSize: "60px",
                    color: "#214C74",

                    marginTop: "50px",
                  }}
                />
              </div>
            </Col>
            <Col id="illustration2" span={12}>
              
            </Col>
          </Row>
          <Row justify="center">
            <Col span="2"></Col>
            <Col span="20">
              <h1
                style={{
                  backgroundColor: "#214C74",
                  marginTop: "50px",
                  marginBottom: "50px",
                  color: "white",
                  width: "100%",
                  textAlign: "center",
                  height: 50,
                  justifyContent: "center",
                  borderRadius: "30px",
                }}
              >
                Toutes les Publications
              </h1>
            </Col>
            <Col span="2"></Col>
          </Row>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={allPublications}
            footer={
              <div>
               
              </div>
            }
            renderItem={(publication) => (
              <List.Item
                key={publication.titre}
                actions={[
                 
                  <IconText
                    icon={LikeOutlined}
                    text="156"
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text="2"
                    key="list-vertical-message"
                  />,
                ]}
                extra={<img width="272" height="150" alt="logo" src={publication.image} />}
              >
                <List.Item.Meta
                 
                  title={
                    <Link to={`/publication/${publication._id}`}>
                      {publication.titre}
                    </Link>
                  }
                  description={publication.texte}
                />
                {/* "{item.content}" */}
              </List.Item>
            )}
          />
          <Row
            style={{
              backgroundColor: "#C9F6F5",
              borderRadius: "20px",
              marginTop: "60px",
              marginBottom: "60px",
            }}
          >


          </Row>
          <div
            className="site-statistic-demo-card"
            style={{ marginBottom: "30px" }}
          >
            <h3
              style={{
                color: "white",
                textAlign: "center",
                marginBottom: "30px",
                marginLeft: "400px",
              }}
            >
              {" "}
              ILs ont donné leur avis...
            </h3>
            <Row gutter={16}>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Nombre de publication"
                    value={allPublications.length}
                    valueStyle={{ color: "#3f8600" }}
                    suffix={<EditFilled />}
                    
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Statistic
                    title="Nombre de votes"
                    value={votes.length}
                    valueStyle={{ color: "#3f8600" }}
                    suffix={<UserOutlined />}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
      <PiedDePage />
      <>
        <BackTop />
      </>
    </Layout>
  );}


function mapStateToProps(state) {
  return { token: state.token };
}

function mapDispatchToProps(dispatch) {
  return {
    goToPublication: function (toRead) {
      dispatch({ type: "readPublication", selectPublication: toRead });
    },
    addPubliToken: function (publiToken) {
      dispatch({ type: "addPubliToken", publiToken: publiToken });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Accueil);
