import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'

import { insertItem, removeItem } from '../../helpers/arrayHelpers'
import { toast } from '../notifications/sagas'
import { corewar } from 'corewar'

import {
  PARSE,
  PARSE_REQUESTED,
  ADD_WARRIOR_REQUESTED,
  REMOVE_WARRIOR_REQUESTED,
  SHOW_MESSAGES,
  HIDE_MESSAGES,
  SET_WARRIORS,
  LOAD_WARRIOR_REQUESTED,
  LOAD_WARRIOR
} from './actions'

import { getParserState } from './reducer'
import { pauseSaga, getCoreOptionsFromState, initialiseCore } from '../simulator/sagas'

const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// sagas
export function* parseSaga({ source }) {

  const parseResult = yield call([corewar, corewar.parse], source)

  const compiled = yield call([corewar, corewar.serialise], parseResult.tokens)

  const guid = guid()

  const currentWarrior = { ...parseResult, compiled, source, guid }

  if(currentWarrior.messages.find(x => x.type === 0)){
    yield put({ type: SHOW_MESSAGES })
  } else {
    yield put({ type: HIDE_MESSAGES})
  }

  yield put({ type: PARSE, currentWarrior })

}

export function* addWarriorSaga() {

  yield call(pauseSaga)

  const data = yield call(getCoreOptionsFromState)

  const { warriors, currentWarrior } = yield select(getParserState)

  const warriorList = yield call(insertItem, warriors.length, warriors, currentWarrior)

  yield put({ type: SET_WARRIORS, warriorList })

  yield call(toast, 'Warrior Added')

  yield call(initialiseCore, data.options, warriorList)

}

export function* loadWarriorSaga({ guid }) {

  const { warriors } = yield select(getParserState)

  const warrior = warriors.find(x => x.guid === guid)

  yield put({ type: LOAD_WARRIOR, warrior })

}

export function* removeWarriorSaga({ index }) {

  yield call(pauseSaga)

  const data = yield call(getCoreOptionsFromState)

  const { warriors } = yield select(getParserState)

  const warriorList = yield call(removeItem, index, warriors)

  yield put({ type: SET_WARRIORS, warriorList })

  yield call(toast, 'Warrior Removed')

  yield call(initialiseCore, data.options, warriorList)

}


// watchers
export const parserWatchers = [
  takeLatest(PARSE_REQUESTED, parseSaga),
  takeEvery(ADD_WARRIOR_REQUESTED, addWarriorSaga),
  takeEvery(REMOVE_WARRIOR_REQUESTED, removeWarriorSaga),
  takeEvery(LOAD_WARRIOR_REQUESTED, loadWarriorSaga)
]
