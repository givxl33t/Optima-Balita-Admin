import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import authenticationReducer from '../authentication/store/reducers.store'
import articlesReducer from '../article/store/article-reducers.store'
import userReducer from '../users/store/user-reducer.store'

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  authentication: authenticationReducer,
  articles: articlesReducer,
  users: userReducer
})

export default createRootReducer
