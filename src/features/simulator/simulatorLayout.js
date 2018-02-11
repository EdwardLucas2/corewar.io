import React from 'react'
import styled from 'styled-components'

import Core from './core'
import ErrorBoundary from '../common/errorBoundary'
import Warriors from './warriors'
import ControlsContainer from './controlsContainer'

import { space } from  '../common/theme'
import { media } from  '../common/mediaQuery'

const SimulatorGrid = styled.section`

  ${props => props.mobile && `grid-row-start: 3;`}
  ${props => props.mobile && `height: calc(100vh - ${space.s} - ${space.header} - ${space.controls});`}

  ${props => props.tablet && `grid-row-start: 2;`}
  ${props => props.tablet && `height: calc(100vh - ${space.controls});`}

  position: relative;

  ${media.tablet`min-height: 400px;`}
  ${media.phone`min-height: 400px;`}

  display: grid;
  grid-template-rows: 75px 1fr ${space.controls};
`

SimulatorGrid.displayName = `SimulatorGrid`

const SimulatorLayout = ({ coreSize, getCoreInstructions, isRunning, isInitialised,
  init, parseResults, maxTasks, removeWarrior, republish, tablet, mobile }) => (
  <SimulatorGrid mobile={mobile} tablet={tablet}>
    <Warriors parseResults={parseResults} maxTasks={maxTasks} removeWarrior={removeWarrior} />
    <ErrorBoundary>
      <Core
        init={init}
        republish={republish}
        coreSize={coreSize}
        getCoreInstructions={getCoreInstructions}
        isRunning={isRunning}
        isInitialised={isInitialised}
        />
    </ErrorBoundary>
    <ControlsContainer />
  </SimulatorGrid>
)

export default SimulatorLayout
