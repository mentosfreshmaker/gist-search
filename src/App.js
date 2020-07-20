import React from 'react';
import { Container } from 'react-bootstrap';
import Search from './Search';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <Container fluid>
      <div className="wrapper">
        <Search />
        <ToastContainer />
      </div>
    </Container>
  );
}

export default App;
