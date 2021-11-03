import React, { useState, useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import {
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
  Statistic,
} from "antd";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import {
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
  DownloadOutlined,
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  UserOutlined,
  MessageOutlined,
  LikeOutlined,
  StarOutlined,
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  LinkOutlined,
  DownCircleFilled,
  SolutionOutlined,
  ArrowUpOutlined,
  EditFilled,
} from "@ant-design/icons";
import SideBarDroite from "./SideBarDroite";
import EnTete from "./EnTete";
import Plot from 'react-plotly.js';
import SearchBar from "./Components/SearchBar";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import AGORA from "../src/image/AGORA.png"


const { Content, Footer } = Layout;

const { TabPane } = Tabs;

// const gridStyle = {
//   width: "25%",
//   textAlign: "center",
// };

//questions aléatoires
const listData = [];
for (let i = 0; i < 3; i++) {
  listData.push({
    href: "https://ant.design",
    title: `THEME ${i + 1}`,
    avatar: "https://joeschmoe.io/api/v1/random",
    description: "sous-theme ou tag perso",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    key: {i},
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

// import {Redirect} from 'react-router-dom';
// import {connect} from 'react-redux';

function Accueil(props) {
  const [latest, setLatest] = useState([]);
  const [allPublications, setAllPublications] = useState([]);
  const [populaires, setPopulaires] = useState([]);
  const [votes, setVotes] = useState([]);
  


  const [publicationTitre, setPublicationTitre] = useState();

  //Récupération les publications à l'initialisation
  useEffect(() => {
    const findPublications = async () => {
      // Recup articles les plus récents
      const publications = await fetch("publications/lastPublications");
      const body = await publications.json();
      // console.log("3 articles", body.latest);
      setLatest(body.latest);
      console.log(body);
    };
    findPublications();

    //recup articles les plus populaires
    const popPublications = async () => {
      const plusPopulaires = await fetch("publications/populaires");
      const res_populaires = await plusPopulaires.json();
      console.log("populaires: ", res_populaires.topPublications);
      setPopulaires(res_populaires.topPublications);
    };
    popPublications();

    // recup de toutes les publications
    const allPublications = async () => {
      const listPublications = await fetch("publications/allPublications");
      const response = await listPublications.json();
      console.log("all: ", response.allPublications);
      setAllPublications(response.allPublications);
    
      
    };
    allPublications();
  }, []);

    // Pour la barre de recherche
  useEffect(() => {
    const findPublications = async () => {
        const toutePublication = await fetch("/searchPublication");
        const res_publication = await toutePublication.json();
        console.log("ma res_publication", res_publication.allPublications)
        setPublicationTitre(res_publication.allPublications)
    }; findPublications()
}, []);
var publicationT=publicationTitre
console.log("dans publicationTitre", publicationTitre)







  var publiCards = latest.map((publication, i) => {
    var toRead = publication;
    return (
      <Carousel.Item key={i}>
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
         
          <Link to={`/publication/${toRead._id}`}>
            <Button type="button" class="btn-danger">
              VOIR
            </Button>
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
      
        <Link to={`/publication/${toRead._id}`}>
          <Button type="button" class="btn-danger">
            VOIR
          </Button>
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
      console.log(body)
    };
    findVotes();
  }, []);

 
 
  if(publicationTitre !== undefined){
  return (



    /* header */
    <Layout className='layout' style={{ margin: 10, backgroundColor:'white'}}>
      
      <div id="head" style={{display:"flex"}}>
      
        <div >
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <Image
            preview={false}
            size={40}
            className="logo"
            width={150}
            src={AGORA}
          />
<<<<<<< HEAD
        <p style={{ marginLeft: "50px" }}>
            {" "}
            Donnez votre avis d'une manière différente{" "}
          </p>
        </div>
        <div className="searchbar" style={{display:"flex", justifyContent:"center"}}>
        <SearchBar  placeholder="chercher une publication" data={publicationT}/>
      </div>
        <div>
          {" "}
          
          
          <Button
            type="primary"
            size={100}
=======
           <div className="searchbar" style={{display:"flex", justifyContent:"center"}}>
        <SearchBar  placeholder="chercher une publication" data={publicationT}/>
      </div>
          <div>
            {" "}
            <Button
          size={20}
            type="text"
>>>>>>> derniere
            style={{
             
              backgroundColor: "#214C74",
              borderColor: "#214C74",
            }}
          >
            LOG IN
          </Button>
          
          <Button
            type="link"
            style={{
              backgroundColor: "transparent",
              color: "#214C74",

              borderColor: "transparent",
            }}
            >
            LOG OUT
          </Button>
            </div>
            </div>
          <div>
           <p style={{ marginLeft: "50px", fontWeight:"bold" }}>
            {" "}
            Donnez votre avis d'une manière différente{" "}
          </p>
          </div>
        </div>
       
        <div>
          
         
          
          <Button
            type="primary"
            size={100}
            style={{
              backgroundColor: "rgba(240, 52, 52, 1)",
              borderColor: "rgba(240, 52, 52, 1)",
              marginLeft: "50px",
              boxShadow: "1px 15px 10px grey",
            }}
          >
            Poster votre publication
          </Button>
        </div>

        
        
      </div>

      <Layout className="site-layout-background">
        <SideBarDroite />
        <Content
          style={{ padding: "0 24px", minHeight: 500, marginTop: "30px" }}
        >
          <Row justify="center">
            <Tabs type="card" style={{ width: 900, height: 600, padding: 15 }}>
              <TabPane tab="A la une " key="1">
                <Carousel>{publiCards}</Carousel>
              </TabPane>

              <TabPane tab="Les plus populaires" key="2">
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
                Découvrez les avis des autres utilisateurs... Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever
                since the 1500s, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived
                not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged.
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
            <Col
              span={12}
              style={{
                color: "black",
                backgroundColor: "transparent",
                textAlign: "center",
                padding: "20px",
              }}
            >
              {" "}
              <h3
                style={{
                  color: "black",
                }}
              >
                {" "}
                Votre publication interesse-t-elle du monde ?
              </h3>
              <p>
                Découvrez les avis des autres utilisateurs... Lorem Ipsum is
                simply dummy text of the printing and typesetting industry.
              </p>
            </Col>

            <Col
              span={12}
              style={{
                backgroundColor: "transparent",
                textAlign: "center",
                align: "middle",
              }}
            >
              <Button
                type="primary"
                size={100}
                style={{
                  backgroundColor: "#0E9C98",
                  borderColor: "#0E9C98",
                  borderRadius: "30px",
                  marginLeft: "50px",
                  marginTop: "60px",
                }}
              >
                Crée ton profil <SolutionOutlined />
              </Button>
            </Col>
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
      <Footer className="footer" style={{ textAlign: "left" }}>
        {" "}
        <Row>
          <Col span={8}>
            NOTRE GROUPE
            <ul className="un">
              <li>A propos</li>
              <li>Notre vision</li>
              <li>Contact</li>
            </ul>
          </Col>
          <Col span={8}>
            {" "}
            ASSISTANCE
            <ul className="un">
              <li>Aide</li>
              <li>Guide</li>
              <li>Mentions legales</li>
              <li>CGU</li>
              <li>Cookies</li>
            </ul>
          </Col>
          <Col span={8}>
            {" "}
            RESEAUX SOCIAUX
            <ul className="un">
              <li>Facebook</li>
              <li>Instagram</li>
              <li>Twitter</li>
            </ul>
          </Col>
        </Row>
      </Footer>
      <>
        <BackTop />
      </>
    </Layout>
  );
} else {return <div>wait</div>}}

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
