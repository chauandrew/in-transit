import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import "./App.css";
import * as Components from "./components";

function App() {
  return (
    <>
      <BrowserRouter>
        <Container>
          <Row>
            <Col className="text-center">
              <h1>Advance X</h1>
              <p>
                Check out these stories from ADVANCE-X volunteering around the
                nation!
              </p>
            </Col>
          </Row>
        </Container>

        <Switch>
          <Route exact path="/" component={Components.RecentPosts} />
          <Route
            exact
            path="/filter/:tags"
            component={Components.FilteredPosts}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
