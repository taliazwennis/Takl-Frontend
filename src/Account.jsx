import { Container, Col, Row } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import Register from "./Register";
import Tabs from "./Tabs";

function Account() {
  return (
    <div>
      <div className="title-section">
        <h1 className="title-name"> TAKL </h1>
      </div>
      <Tabs />
      {/* <Header /> */}

      {/* <Footer /> */}
    </div>
  );
}

export default Account;
