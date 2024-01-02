import {
  Admin,
  Resource,
  combineDataProviders,
} from "react-admin";
import { ArticleList, ArticleCreate, ArticleEdit, ArticleShow } from "./article/articles";
import { UserList, UserEdit, UserShow } from "./user/users";
import { ForumList, ForumCreate, ForumEdit, ForumShow } from "./forum/forums";
import { CommentCreate, CommentEdit, CommentShow } from "./comment/comments";
import { ChildrenList, ChildrenShow } from "./children/childrens";
import articleDataProvider from "./article/articleProvider";
import userDataProvider from "./user/userProvider";
import forumDataProvider from "./forum/forumProvider";
import commentDataProvider from "./comment/commentProvider";
import likeDataProvider from "./like/likeProvider";
import childrenDataProvider from "./children/childrenProvider";
import nutritionHistoryDataProvider from "./nutritionHistory/nutritionHistoryProvider";
import { authProvider } from "./auth/authProvider";

import ArticleIcon from '@mui/icons-material/Article';
import GroupsIcon from '@mui/icons-material/Groups';
import ForumIcon from '@mui/icons-material/Forum';
import ChildCareIcon from '@mui/icons-material/ChildCare';

const dataProvider = combineDataProviders((resource) => {
  switch (resource) {
    case "article":
      return articleDataProvider;
    case "user":
      return userDataProvider;
    case "forum":
      return forumDataProvider;
    case "comment":
      return commentDataProvider;
    case "like":
      return likeDataProvider;
    case "children":
      return childrenDataProvider;
    case "nutritionHistory":
      return nutritionHistoryDataProvider;
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
      show={ArticleShow}
      icon={ArticleIcon} />
    <Resource 
      name="user" 
      list={UserList}
      edit={UserEdit}
      show={UserShow}
      icon={GroupsIcon}/>
    <Resource 
      name="forum" 
      list={ForumList}
      create={ForumCreate}
      edit={ForumEdit}
      show={ForumShow}
      icon={ForumIcon}
    />
    <Resource 
      name="comment" 
      create={CommentCreate}
      edit={CommentEdit}
      show={CommentShow}
    />
    <Resource
      name="like"
    />
    <Resource
      name="children"
      list={ChildrenList}
      show={ChildrenShow}
      icon={ChildCareIcon}
    />
    <Resource
      name="nutritionHistory"
    />
  </Admin>
);
