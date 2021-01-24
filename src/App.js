import React, { useState } from 'react';
import Icon from './components/icon';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Card, CardBody, Container, Button, Col, Row } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

const itemArray = new Array(9).fill("empty");

const App = () => {

  const [isCross, setIsCross] = useState(false);
  const [winMessages, setWinMessages] = useState("");

  const reloadGame = () => {
    setIsCross(false);
    setWinMessages("");
    itemArray.fill('empty', 0, 9);
  };

  const checkIsWiner = () => {
    if (itemArray[0] === itemArray[1] && itemArray[0] === itemArray[2] && itemArray[0] !== 'empty') {
      setWinMessages(`${itemArray[0]} wins`);
    }
  };

  const changeItem = itemNumber => {
    if (winMessages) {
      return toast(winMessages, { type: 'success' });
    }

    if (itemArray[itemNumber] === 'empty') {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
    } else {
      return toast('already filled', { type: "error" });
    }

    checkIsWiner();
  };

  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={6} className="offset-md-3">
          {winMessages ? (
            <div className="mb-2 mt-2">
              <h1 className="text-primary text-uppercase text-center">
                {winMessages}
              </h1>
              <Button color="success" block onClick={reloadGame}> Reload Game </Button>
            </div>
          ) : (
              <div>
                <h1 className="text-center text-warning">
                  {isCross ? "Cross" : "Circle"} turns
                </h1>
              </div>
            )}
          <div className="grid">
            {
              itemArray.map((item, i) => (
                <Card onClick={() => changeItem(i)}>
                  <CardBody className="box">
                    <Icon name={item} />
                  </CardBody>
                </Card>
              ))
            }
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
