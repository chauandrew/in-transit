import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import "./App.css";
import * as Components from "./components";

function App() {
  return (
    <>
      <BrowserRouter>
        <Components.LandingBanner />
        <Switch>
          <Route exact path="/" component={Components.PostsHome} />
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
