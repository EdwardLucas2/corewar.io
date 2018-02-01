import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import SourceCodeTextArea from '../../components/styledComponents/sourceCodeTextArea'
import CompiledOutput from '../../components/styledComponents/compiledOutput'
import TabletControls from '../parser/tabletControls'
import MessagePanel from '../../components/parser/messagePanel'

import { space } from '../../styles/theme'

import {
  parse
} from '../../actions/parserActions'

const ParserGrid = styled.section`
  display: flex;
  height: calc(100vh - ${space.header});
`

const ParserContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr ${space.header};
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
    <TabletControls />
    <MessagePanel />
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