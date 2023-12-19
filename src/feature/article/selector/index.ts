export const articles = (state: any) => {
  const articles = state.articles.items

  if (articles)
    return articles.map(article => article)
  else 
    return articles
}

export const articleAdded = (state: any) => state.articles.item
export const isArticlesLoaded = (state: IArticles) => state.articles.isLoaded
export const articleError = (state: IArticles) => state.articles.error