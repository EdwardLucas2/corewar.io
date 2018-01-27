import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import SiteHeader from '../../components/app/siteHeader'

import Container from '../../components/styledComponents/mobile/container'
import NavBar from '../../components/styledComponents/mobile/navBar'
import Main from '../../components/styledComponents/mobile/main'
import TabLink from '../../components/styledComponents/tabLink'

import InputInterface from '../../components/app/inputInterface'
import OutputInterface from '../../components/app/outputInterface'
import CoreContainer from '../simulator/coreContainer'
import MobileControls from '../parser/mobileControls'
import SimulatorControls from '../simulator/simulatorControls'

const MobileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 48px 1fr;
`

const MobileLayout = () => (
  <MobileGrid>
    <SiteHeader isAuthenticated={false}/>
    <Container>
      <NavBar>
        <TabLink to='/src'>src</TabLink>
        <TabLink to='/output'>output</TabLink>
        <TabLink to='/core'>core</TabLink>
      </NavBar>
      <Main>
        <Route exact path='/' component={InputInterface} />
        <Route exact path='/src' component={InputInterface} />
        <Route exact path='/output' component={OutputInterface} />
        <Route exact path='/core' component={CoreContainer} />
      </Main>
      <Route exact path='/src' component={MobileControls} />
      <Route exact path='/output' component={MobileControls} />
      <Route exact path='/core' component={SimulatorControls} />
    </Container>
  </MobileGrid>
)

export default MobileLayout
