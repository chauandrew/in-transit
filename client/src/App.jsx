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
              <h1>Stories And Strangers</h1>
              <p>
                Hi, my name's Andrew, and this is a passion project of mine. Everyone's got a story, and this is my excuse to meet new people and hear about their experiences and perspectives. 
              </p>
            </Col>
          </Row>
        </Container>

        <Switch>
          <Route exact path="/" component={Components.RecentPosts} />
          <Route exact path="/all" component={Components.AllPosts} />
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
