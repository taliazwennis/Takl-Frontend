import { Container, Col, Row } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import Register from "./Register";
import Tabs from "./Tabs";

function Account() {
  return (
    <div>
      <div className="title-section">
        <img className="title-name" src={"title-image.png"} alt="title" />
      </div>
      <Tabs />
      {/* <Header /> */}

      {/* <Footer /> */}
    </div>
  );
}

export default Account;
