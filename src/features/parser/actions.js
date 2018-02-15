import { action } from '../../actions/creator'

export const PARSE = 'parser/PARSE'
export const ADD_WARRIOR = 'parser/ADD_WARRIOR'
export const REMOVE_WARRIOR = 'parser/REMOVE_WARRIOR'
export const SHOW_MESSAGES = 'parser/SHOW_MESSAGES'
export const HIDE_MESSAGES = 'parser/HIDE_MESSAGES'
export const TOGGLE_FILE_MANAGER = 'parser/TOGGLE_FILE_MANAGER'
export const SET_FILES = 'parser/SET_FILES'

export const PARSE_REQUESTED = 'parser/PARSE_REQUESTED'
export const ADD_WARRIOR_REQUESTED = 'parser/ADD_WARRIOR_REQUESTED'
export const REMOVE_WARRIOR_REQUESTED = 'parser/REMOVE_WARRIOR_REQUESTED'

export const parse = redcode => action(PARSE_REQUESTED, { redcode })
export const addWarrior = () => action(ADD_WARRIOR_REQUESTED)
export const removeWarrior = index => action(REMOVE_WARRIOR_REQUESTED, { index })
export const showMessages = () => action(SHOW_MESSAGES)
export const hideMessages = () => action(HIDE_MESSAGES)
export const toggleFileManager = () => action(TOGGLE_FILE_MANAGER)
export const loadWarrior = () => { console.log('load warrior') }