import {
  Admin,
  Resource,
  combineDataProviders,
} from "react-admin";
import { ArticleList, ArticleCreate, ArticleEdit, ArticleShow } from "./article/articles";
import articleDataProvider  from "./article/articledataProvider";
import { authProvider } from "./auth/authProvider";

const dataProvider = combineDataProviders((resource) => {
  switch (resource) {
    case "article":
      return articleDataProvider;
    default:
      throw new Error(`Unknown resource: ${resource}`);
  }
});

export const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider}>
    <Resource 
      name="article" 
      list={ArticleList}
      create={ArticleCreate}
      edit={ArticleEdit}
      show={ArticleShow} />
  </Admin>
);
