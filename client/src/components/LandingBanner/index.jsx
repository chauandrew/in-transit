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
              <h1>Stories And Strangers</h1>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <p>
                What reminds you you're still human? What makes you feel alive?
                What is your greatest struggle?
              </p>
            </Col>
            <Col lg={12}>
              <p>
                I began meeting and interviewing college students on different
                campuses around Boston as a passion-project in 2021. I found
                that everyone has a story to share, and that no matter how
                put-together people seem, we all experience struggle and
                brokenness in life. Here's a collection of the stories my
                friends and I have heard.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
export default LandingBanner;
