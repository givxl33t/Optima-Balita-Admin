import { isArticlesLoaded, articles } from '../selector'
import { getArticle, postArticle, deleteArticle, editArticle } from '../store/article-actions.store';
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { Props, Articles } from './articles'

const mapStateToProps = (state: any) => ({
  articlesLoaded: isArticlesLoaded(state),
  articles: articles(state),
})

const actions = {
  getArticle,
  deleteArticle,
  submitData: postArticle,
  editArticle
}

export default compose<Props, {}>(
  connect(mapStateToProps, actions) 
)(Articles)
