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
              <h1>Humans Of Boston</h1>
              <p>
                A photojournalism project of college students across Boston.
                Inspired by <a target="blank" href="https://www.humansofnewyork.com/">Humans of New York</a>.
                Managed by <a target="blank" href="https://www.instagram.com/gracepoint.boston/">Gracepoint Boston</a>.
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
