import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'
import scoreReducers from './score/score'

const rootReducer = combineReducers({
  scoreReducers
})

const store = createStore(rootReducer, applyMiddleware(thunk))
export default store
