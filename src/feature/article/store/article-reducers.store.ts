import { 
  GET_ARTICLE, 
  POST_ARTICLE, 
  DELETE_ARTICLE, 
  EDIT_ARTICLE, 
  GET_ARTICLE_SUCCESS, 
  POST_ARTICLE_SUCCESS, 
  EDIT_ARTICLE_SUCCESS, 
  DELETE_ARTICLE_SUCCESS, 
  ARTICLE_FAIL 
} from './article-constants.store';
import { IArticles } from '../typing/state';

interface IAction {
  type: any,
  payload: IArticles
}

const newState: IArticles = {
  items: [],
  isLoading: false, 
  isLoaded: false, 
  error: null
}

const articlesReducer = (state = newState, action: IAction) => {
  const newArticles = {...state}

  switch (action.type) {
    case GET_ARTICLE || POST_ARTICLE || DELETE_ARTICLE || EDIT_ARTICLE:
      return {
        ...state,
        isLoading: true
      }

    case GET_ARTICLE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        items: action.payload
      }

    case POST_ARTICLE_SUCCESS:
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
      action.payload.data.author = currentUser.username
      newArticles.items = [action.payload.data, ...state.items]
      return newArticles

    case EDIT_ARTICLE_SUCCESS:
      const itemId = action.payload.id
      const recordIndex = state.items.findIndex(item => item.id === itemId)

      newArticles.items[recordIndex] = {...action.payload}
      return newArticles

    case DELETE_ARTICLE_SUCCESS:
      const deleteId = action.payload
      newArticles.items = state.items.filter(item => item.id !== deleteId)
      return newArticles

    case ARTICLE_FAIL:
      return {
        ...state,
        isLoaded: true,
        error: action.payload
      }
    default:
      return state || {}
  }
}

export default articlesReducer
