import React from 'react'

import PlayPauseControl from './playPauseControl'
import ResetControl from './resetControl'
import StepControl from './stepControl'
import SpeedControl from './speedControl'
import FinishRoundControl from './finishRoundControl'
import RunProgressIndicator from './runProgressIndicator'
import SettingsControl from './settingsControl'

import './simulatorControls.css'

const SimulatorControls = ({
  isRunning,
  isInitialised,
  parseResults,
  runProgress,
  init,
  step,
  run,
  pause,
  setProcessRate,
  processRate,
  processRates,
  finish,
  coreOptions,
  currentCoreOption,
  setCoreOptions
  }) => (
  <section id="simulatorControlContainer">
    <div id="runProgressContainer">
      <RunProgressIndicator runProgress={runProgress}/>
    </div>
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
        handleFinish={finish}
      />
      <ResetControl
        parseResults={parseResults}
        isInitialised={isInitialised}
        handleReset={init} />
      <SettingsControl
        coreOptions={coreOptions}
        currentCoreOption={currentCoreOption}
        handleClick={setCoreOptions}
      />
    </div>
  </section>
)


export default SimulatorControls