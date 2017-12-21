import React from 'react'
import FontAwesome from 'react-fontawesome'

import PlayPauseControl from './playPauseControl'
import ResetControl from './resetControl'
import StepControl from './stepControl'
import SpeedControl from './speedControl'
import FinishRoundControl from './finishRoundControl'

import './simulatorControls.css'

const SimulatorControls = ({
  isRunning,
  isInitialised,
  parseResults,
  init,
  step,
  run,
  pause,
  setProcessRate,
  processRate,
  processRates,
  finishRound }) => (
  <section id="simulatorControlContainer">
    <div id="simulatorControls" className={isInitialised ? `active` : `inactive`}>
      <SpeedControl
        handleClick={setProcessRate}
        processRate={processRate}
        processRates={processRates}
        />
      <PlayPauseControl
        isInitialised={isInitialised}
        isRunning={isRunning}
        handlePlay={run}
        handlePause={pause} />
      <StepControl
        isRunning={isRunning}
        isInitialised={isInitialised}
        handleClick={step} />
      <FinishRoundControl
        isInitialised={isInitialised}
        handleFinish={finishRound}
      />
      <ResetControl
        parseResults={parseResults}
        isInitialised={isInitialised}
        handleReset={init} />
    </div>
  </section>
)


export default SimulatorControls