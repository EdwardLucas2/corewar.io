import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'

import SiteHeader from './../../components/app/siteHeader'
import DebugInterface from './../../components/app/debugInterface'
import V2Interface from './../../components/app/v2Interface'

const RootGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 48px 1fr;
`

const App = () => (
  <RootGrid>
    <SiteHeader isAuthenticated={false}/>
    <main>
      <Route exact path="/" component={DebugInterface} />
      <Route exact path="/parser" component={DebugInterface} />
      <Route exact path='/v2' component={V2Interface} />
    </main>
  </RootGrid>
)

export default App
