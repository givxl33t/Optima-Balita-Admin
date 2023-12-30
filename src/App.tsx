import {
  Admin,
  Resource,
  combineDataProviders,
} from "react-admin";
import { ArticleList, ArticleCreate, ArticleEdit, ArticleShow } from "./article/articles";
import { UserList, UserEdit, UserShow } from "./user/users";
import articleDataProvider from "./article/articledataProvider";
import userDataProvider from "./user/userdataProvider";
import { authProvider } from "./auth/authProvider";

const dataProvider = combineDataProviders((resource) => {
  switch (resource) {
    case "article":
      return articleDataProvider;
    case "user":
      return userDataProvider;
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
    <Resource 
      name="user" 
      list={UserList}
      edit={UserEdit}
      show={UserShow} />
  </Admin>
);
