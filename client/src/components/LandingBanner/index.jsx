import { React } from "react";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";

const LandingBanner = () => {
  return (
    <div className="hero-image pt-5 pb-3 mb-5">
      <div className="hero-text pt-5 pb-5">
        <Container className="pt-5">
          <Row>
            <Col lg={12}>
              <h1>in:transit</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <p>
                My friends and I began meeting and interviewing college students
                in Boston as a passion-project in 2021. I found that everyone
                has a story to share, and no matter how put-together people
                seem, we all experience struggle and brokenness in life. Here's
                a collection of the stories we've heard.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default LandingBanner;
