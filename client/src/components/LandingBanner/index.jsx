import { React } from "react";
import "./style.css";
import { Container, Row, Col } from "react-bootstrap";

const LandingBanner = () => {
  let downArrow = (
    <svg className="arrow" x="0px" y="0px" viewBox="0 0 500 500">
      <path d="M111,187.4c-7.6,6.6-7.6,17.3,0,23.9l116.2,101.2c7.6,6.6,19.8,6.6,27.4,0l116.2-101.2 c3.8-3.3,5.7-7.6,5.7-11.9c0-4.3-1.9-8.6-5.7-11.9c-7.6-6.6-19.8-6.6-27.4,0l-102.5,89.3l-102.5-89.3 C130.8,180.9,118.6,180.9,111,187.4z"></path>
    </svg>
  );
  let url = window.location.href.split("#")[0] + "#post-container"; // so multiple clicks don't stack #...#...#..

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
      <a href={url}>{downArrow}</a>
    </div>
  );
};
export default LandingBanner;
