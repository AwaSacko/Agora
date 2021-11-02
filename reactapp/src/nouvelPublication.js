import React, { useState, useEffect } from "react";
import "./nouvelPublication.css";
import {
  Layout,
  Menu,
  Button,
  Image,
  Empty,
  Cascader,
  Input,
  Space,
  Row,
  Col,
  Form,
  Divider,
} from "antd";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// reactstrap pour le moment utilisé pour le modal avec les images en provenance de l'APIK
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import EnTete from "./EnTete";
import SideBarDroite from "./SideBarDroite";

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

function NouvelPublication(props) {
  var ladate = new Date();

  const [titre, setTitre] = useState("");
  const [contenu, setContenu] = useState("");
  const [motCle, setMotCle] = useState([]);
  const [date, setDate] = useState();
  const [theme, setTheme] = useState();
  const [redir, setRedir] = useState(false);

  // hook d'état pour gestion de l'image
  const apiKey = "23345038-9d4a0f31be7a8f5a5e2bfc293";
  const [mot_Cle, setMot_Cle] = useState("");
  const [foundPictures, setFoundPictures] = useState([]);
  const [modal, setModal] = useState(false);
  const [pictureSelected, setPictureSelected] = useState("");
  const [validatePicture, setValidatePicture] = useState(false);
  const [id, setId] = useState();
  var illustration;
  var border = { border: "" };
  var idP = "";

  useEffect(() => {
    var dateKnow = async () => {
      const ladateK =
        ladate.getFullYear() +
        "/" +
        (ladate.getMonth() + 1) +
        "/" +
        ladate.getDate();
      setDate(ladateK);
    };
    dateKnow();
  }, []);

  var postPublication = async () => {
    const data = await fetch("/post-publication", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `titrePublication=${titre}&contenuPublication=${contenu}&datePublication=${date}&themePublication=${theme}&motClePublication=${motCle}&token=${props.token}&image=${pictureSelected}`,
    });

    const body = await data.json();
    console.log("et dans body?", body);
    // if (body.result == true) {
    //   props.addPubliToken(body.publiToken);
    idP = body.id;
    // return <Redirect to="/publication" />

    if (body.result == true) {
      setRedir(true);
    }
    setId(idP);

    //sauvegarde image
    const sendImage = async () => {
      var image = new FormData();
      image.append("image", {
        uri: pictureSelected,
        type: "image/jpeg",
        name: "image.jpg",
      });

      let rawResponse = await fetch("/publications/upload", {
        method: "post",
        body: image,
      });
    };
  };

  if (id) {
    console.log("id", id);
    return <Redirect to={`/publication/${id}`} />;
  }

  /* return <Redirect to={`/publication/${id}`} />} */

  // var cherchePubli = async () => {
  //   setRedir(true)
  // if (redir == true) {
  //   console.log("ICI APPARAISSENT LES SAINTS PROPS!!!", id);
  // const actual = await fetch (`/selectedPublication?id=${id}`)
  // const Ractual = await actual.json()
  //     setId(idP)
  //   console.log("idd", idP)
  // return <Redirect to={`/publication/${id}`} />;

  const options = [
    {
      value: "emploi",
      label: "emploi",
    },
    {
      value: "Education",
      label: "Education",
    },
    {
      value: "Politique",
      label: "Politique",
    },
    {
      value: "Evenement",
      label: "Evenement",
    },
    {
      value: "Environnement",
      label: "Environnement",
    },
    {
      value: "Sport",
      label: "Sport",
    },
    {
      value: "Tourisme",
      label: "Tourisme",
    },
    {
      value: "Tas remarqué?",
      label: "Tas remarqué?",
    },
  ];

  function onChange(value) {
    console.log("ma value", value);
    var thematique = value;
    setTheme(thematique);
  }

  const onSearch = (value) => {
    var listeMotCle = motCle;
    listeMotCle.push(value);
    console.log("la liste", listeMotCle);
    setMotCle(listeMotCle);
  };

  // affichage des images en fonction du mot clé
  var handlePictureRequest = async () => {
    var keyword = mot_Cle.replace(/\s/g, "|");
    setModal(true);
    console.log("keyword", keyword);
    var rawResponse = await fetch(
      `https://pixabay.com/api/?key=${apiKey}&image_type=photo&lang=fr&orientation=horizontal&safesearch=true&q=${keyword}`
    );
    var response = await rawResponse.json();
    console.log("log du response : ", response);
    setFoundPictures(response.hits);
    console.log("log du hits : ", response.hits[0].webformatURL);
  };

  // Validation de l'image sélectionnée
  var handlePictureClick = (img) => {
    console.log("clicked picture: ", img);
    //console.log("access style: ", listPictures[0].props.style)

    for (var i = 0; i < listPictures.length; i++) {
      if (listPictures[i].props.src == img) {
        setPictureSelected(img);

        console.log("listpicture src : ", listPictures[i].props.src);
        border = { border: "1px solid red" };
        console.log(border);
      }
    }
  };

  var listPictures = foundPictures.map((picture, i) => {
    return (
      <img
        key={i}
        src={picture.webformatURL}
        onClick={() => {
          handlePictureClick(picture.webformatURL);
        }}
        style={{ border, width: "400px" }}
      />
    );
  });

  if (pictureSelected && validatePicture) {
    var illustration = (
      <Card style={{ width: "640px", height: "360px" }}>
        <CardImg
          width="100%"
          height="100%"
          src={pictureSelected}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle tag="h5"></CardTitle>
          <CardText></CardText>
        </CardBody>
      </Card>
    );
  }

  return (
    <div style={{ justifyContent: "center" }}>
      <EnTete />

      <Row>
        <Col span={4}>
          <SideBarDroite />
        </Col>

        <Col span={17} align="center">
          <div
            style={{
              border: "1px solid black",
              width: "640px",
              height: "360px",
              display: "center",
            }}
          >
            {illustration}
          </div>
          <div className="montimer">
            <span className="timer">{date}</span>
          </div>
          <div className="maflex">
            <Cascader
              className="cascade"
              options={options}
              onChange={onChange}
              placeholder="Choisir un thème"
            />
            <Divider type="vertical" />

            <Space direction="vertical">
              <Search
                placeholder="exemple: cantine/ école primaire"
                allowClear
                enterButton="Ajouter un mot-clé"
                size="large"
                onSearch={onSearch}
              />
            </Space>
            <Divider type="vertical" />
            {/* <Form>
              <Form.Item>
                <Input
                  placeholder="Tapez un mot-clé"
                  onChange={(e) => setMot_Cle(e.target.value)}
                />{" "}
                <Button type="primary" onClick={() => handlePictureRequest()}>
                  Valider
                </Button>
              </Form.Item>
            </Form> */}

            <Modal isOpen={modal} toggle={modal} className="">
              <ModalHeader toggle={modal}>
                {" "}
                Choisissez une image pour le sujet "{mot_Cle}"
                <Button
                  color="primary"
                  onClick={() => {
                    setModal(!modal);
                    setValidatePicture(true);
                  }}
                >
                  Valider la selection
                </Button>{" "}
                <Button
                  color="secondary"
                  onClick={() => {
                    setModal(!modal);
                    setValidatePicture(false);
                  }}
                >
                  Annuler
                </Button>
              </ModalHeader>
              <ModalBody style={{ width: "200px" }}>{listPictures}</ModalBody>
            </Modal>
          </div>
          <Input
            className="description"
            placeholder="Votre titre"
            onChange={(e) => setTitre(e.target.value)}
          />
          <Input
            className="description"
            placeholder="Votre texte"
            onChange={(e) => setContenu(e.target.value)}
            style={{ height: "100px" }}
          />
          <div className="monbouton">
            <Button className="bouton" onClick={() => postPublication()}>
              Publier
            </Button>
          </div>
        </Col>
        <Col span={3}>
          {" "}
          <div id="illustNewPub"> </div>
        </Col>
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return { token: state.token, publiToken: state.publiToken };
}

function mapDispatchToProps(dispatch) {
  return {
    addPubliToken: function (publiToken) {
      dispatch({ type: "addPubliToken", publiToken: publiToken });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NouvelPublication);
