import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';

import React, { Component } from 'react';
import AlertMessageContainer from './components/AlertMessageContainer';
import DependenciesContext from './services/DependenciesContext';

class App extends Component {
  constructor(props) {
    super(props);

    this.alertMessageContainerRef = React.createRef();

    this.dependencies = {
      alertMessageContainerRef: this.alertMessageContainerRef
    }
  }
  render() {
    return (
      <div className="d-flex flex-column min-vh-100">
        <DependenciesContext.Provider value={this.dependencies}>
          <BrowserRouter>
            <Header />
            <AlertMessageContainer ref={this.alertMessageContainerRef}/>
            <Container className="mt-3">
              <Routes>
                <Route path="" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Container>
            <Footer />
          </BrowserRouter>
        </DependenciesContext.Provider>
      </div>
    );
  }
}

export default App;
