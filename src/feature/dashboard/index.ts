import { usersData, userLength, users } from './../users/selector/index';
import { getArticle } from './../article/store/article-actions.store';
import { getUsers, getUsersData } from './../users/store/user-actions.store';
import { connect } from 'react-redux'
import { compose } from 'redux'

import { articles } from '../article/selector'
import { Dashboard } from './dashboard'

const mapStateToProps = (state: any) => ({
  users: users(state),
  usersLength: userLength(state),
  usersData: usersData(state),
  articles: articles(state),
})

const actions = {
  getUsers,
  getArticle,
  getUsersData
}

export default compose(
  connect(mapStateToProps, actions)
)(Dashboard)
