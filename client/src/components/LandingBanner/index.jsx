import { React } from "react";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";

const LandingBanner = () => {
  return (
    <div className="hero-image">
      <div className="hero-text pt-5 pb-5">
        <Container className="pt-5">
          <Row>
            <Col className="text-md-right text-sm-left" md={3}>
              <h1>in:transit</h1>
            </Col>
            <Col md={9}>
              <p>
                <i>
                  My friends and I began meeting and interviewing college
                  students in Boston as a passion-project in 2021. I found that
                  everyone has a story to share, and no matter how put-together
                  people seem, we all experience struggle and brokenness in
                  life. Here's a collection of the stories we've heard.
                </i>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default LandingBanner;
