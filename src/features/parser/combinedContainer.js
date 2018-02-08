import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import SourceCodeTextArea from './sourceCodeTextArea'
import CompiledOutput from './compiledOutput'
import MessagePanel from './messagePanel'

import { space } from '../common/theme'

import {
  parse
} from './actions'

const ParserGrid = styled.section`
  display: flex;
  height: calc(100vh - ${space.header});
`

const ParserContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
`

const ParserInterface = ({ redcode, parse, currentParseResult, addWarrior }) => (
  <ParserContainer>
    <ParserGrid>
      <SourceCodeTextArea
        value={redcode}
        handleChange={e => parse(e.target.value)} />
      <CompiledOutput tablet>
        {currentParseResult.warrior}
      </CompiledOutput>
    </ParserGrid>
    <MessagePanel messages={currentParseResult.messages} />
  </ParserContainer>
)

const mapStateToProps = state => ({
  redcode: state.parser.redcode,
  currentParseResult: state.parser.currentParseResult
})

export default connect(
  mapStateToProps,
  {
    parse
  }
)(ParserInterface)

export { ParserInterface as PureParserInterface }