import {Container, Row, Col} from 'react-bootstrap';

import './App.css';
import * as Components from './components'

function App() {
  return (
    <>
      <Container>
        <Row>
          <Col className="text-center">
            <h1>Advance X</h1>
            <p>
              Check out these stories from ADVANCE-X volunteering around the nation!
            </p>
          </Col>
        </Row>

        <Row className="text-center"> 
          <Components.RecentPosts />
        </Row>
      </Container>
    </>
  );
}

export default App;