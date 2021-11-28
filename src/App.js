import React from 'react'
import {Container, Row, Col, Navbar, Nav} from 'react-bootstrap'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
//
import { Link, Router } from 'components/Router'

import "video-react/dist/video-react.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import './app.css'

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic', 'fichiers'])

function App() {
  return (
    <Root>

      <div className="flex-wrapper">
        <div>
          <Menu />

          <Container className="content">
            <React.Suspense fallback={<em>Loading...</em>}>
              <Router>
                <Routes path="*" />
              </Router>
            </React.Suspense>
          </Container>
        </div>

        <Footer />
      </div>

    </Root>
  )
}

function Menu(props) {
  return (
    <Navbar className="header" expand="sm" collapseOnSelect>
      <Navbar.Brand><Link to="/">Save Our Lake</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link to="/messages">Messages</Link>
          <Link to="/album">Album</Link>
          <Link to="/files">Files</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

function Footer(props) {
  return (
    <nav className="footer">

      <Container>
        <h2>Contact</h2>
  
        <Row>
          <Col lg={2}>Email :</Col>
          <Col><a href="mailto:SaveLake@xplornet.com">SaveLake@xplornet.com</a></Col>
        </Row>
        
        <Row>
          <Col lg={2}>Facebook :</Col>
          <Col><a href="https://www.facebook.com/groups/715026865650323/">https://www.facebook.com/groups/715026865650323/</a></Col>
        </Row>
      </Container>

    </nav>
  )
}

export default App
