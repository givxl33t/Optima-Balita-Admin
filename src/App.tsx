import {
  Admin,
  Resource,
  combineDataProviders,
} from "react-admin";
import { ArticleList, ArticleCreate, ArticleEdit, ArticleShow } from "./article/articles";
import { UserList, UserEdit, UserShow } from "./user/users";
import { ForumList, ForumCreate, ForumEdit, ForumShow } from "./forum/forums";
import { CommentCreate, CommentEdit, CommentShow } from "./comment/comments";
import articleDataProvider from "./article/articledataProvider";
import userDataProvider from "./user/userdataProvider";
import forumDataProvider from "./forum/forumdataProvider";
import commentDataProvider from "./comment/commentdataProvider";
import likeDataProvider from "./like/likedataProvider";
import { authProvider } from "./auth/authProvider";

import ArticleIcon from '@mui/icons-material/Article';
import GroupsIcon from '@mui/icons-material/Groups';
import ForumIcon from '@mui/icons-material/Forum';

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
  </Admin>
);
