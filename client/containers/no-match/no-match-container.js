"use strict";

import React, {Component} from 'react';
import {Link} from 'react-router';

import NavBar from '../../components/outlets/NavBar';
import PageHeader from '../../components/outlets/PageHeader';

import ContainerFluid from '../../components/layout/container-fluid';
import Container from '../../components/layout/container';
import Col from '../../components/layout/col';
import Row from '../../components/layout/row';

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
