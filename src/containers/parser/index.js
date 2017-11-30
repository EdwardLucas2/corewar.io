import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './parser.css';
import {
  parse,
  setStandard,
  save
} from '../../modules/parser';

const messageTypeToString = (messageType) => {
  switch (messageType) {
      case 0: //MessageType.Error
          return 'ERROR: ';
      case 1: // MessageType.Warning
          return 'WARNING: ';
      case 2: // MessageType.Info
          return '';
      default:
          return '';
  }
}

const Parser = props => (
  <div>
    <h1>Redcode Parser</h1>
    <div>
      {props.isParsing && <h2>Parsing...</h2>}
      <p>
        <select defaultValue={props.standardId} onChange={e => props.setStandard(e.target.value)}>
          <option value="0">ICWS'86</option>
          <option value="1">ICWS'88</option>
          <option value="2">ICWS'94-draft</option>
        </select>
      </p>
      <p>
        {props.currentParseResult && <button onClick={() => props.save()}>Save Warrior</button>}
      </p>

      <div className="columns">
        <div className="column">
          <textarea onChange={e => props.parse(e.target.value)} value={props.redcode}></textarea>
        </div>
        <div className="column">
          <pre>
            {props.currentParseResult && props.currentParseResult.warrior}
          </pre>
        </div>
        <div className="column">
          <div className="warriorList">
            <ul>
              {
                props.parseResults && props.parseResults.map((parseResult, i) => {
                    return <li key={parseResult + i} >{`Warrior ${i}: ${parseResult.metaData.name}`}</li>
                })
              }
            </ul>
          </div>
        </div>
      </div>
      <div className="errors">
        <ul>
          {
             props.currentParseResult.messages && props.currentParseResult.messages.map((item) => {
                return <li key={item} >{`[${item.position.line} , ${item.position.char}] ${messageTypeToString(item.type)} ${item.text}`}</li>
            })
          }
        </ul>
      </div>
    </div>
  </div>
)

const mapStateToProps = state => ({
  currentParseResult: state.parser.currentParseResult,
  parseResults: state.parser.parseResults,
  isParsing: state.parser.isParsing,
  standardId: state.parser.standardId,
  redcode: state.parser.redcode
})

const mapDispatchToProps = dispatch => bindActionCreators({
  parse,
  setStandard,
  save
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Parser)

export { Parser as PureParser }