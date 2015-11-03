"use strict";

import React, {Component} from 'react';
import {Link} from 'react-router';

import NavBar from '../../components/nav-bar';
import PageHeader from '../../components/page-header';

import ContainerFluid from '../../components/container-fluid';
import Container from '../../components/container';
import Col from '../../components/col';
import Row from '../../components/row';

class NoMatchContainer extends Component {

  render() {
    return (
      <div>
        <NavBar appName="Things"/>
        <Container>
          <header className="jumbotron text-center">
            <h1>404 NOT FOUND</h1>
          </header>

        </Container>
      </div>
    );
  }
}

export default NoMatchContainer;
