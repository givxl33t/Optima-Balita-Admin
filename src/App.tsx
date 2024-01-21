import {
  Admin,
  Resource,
  combineDataProviders,
  Layout,
} from "react-admin";
import CustomAppBar from "./AppBar";
import LoginPage from "./LoginPage";
import { ArticleList, ArticleCreate, ArticleEdit, ArticleShow } from "./article/articles";
import { UserList, UserEdit, UserShow } from "./user/users";
import { ForumList, ForumCreate, ForumEdit, ForumShow } from "./forum/forums";
import { CommentCreate, CommentEdit, CommentShow } from "./comment/comments";
import { ChildrenList, ChildrenEdit, ChildrenShow } from "./children/childrens";
import { NutritionHistoryEdit } from "./nutritionHistory/nutritionHistories";
import { ConsultantList, ConsultantCreate, ConsultantEdit, ConsultantShow } from "./consultant/consultants";
import articleDataProvider from "./article/articleProvider";
import userDataProvider from "./user/userProvider";
import forumDataProvider from "./forum/forumProvider";
import commentDataProvider from "./comment/commentProvider";
import likeDataProvider from "./like/likeProvider";
import childrenDataProvider from "./children/childrenProvider";
import nutritionHistoryDataProvider from "./nutritionHistory/nutritionHistoryProvider";
import consultantDataProvider from "./consultant/consultantProvider";
import { authProvider } from "./auth/authProvider";

import ArticleIcon from '@mui/icons-material/Article';
import GroupsIcon from '@mui/icons-material/Groups';
import ForumIcon from '@mui/icons-material/Forum';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

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
    case "consultant":
      return consultantDataProvider;
    default:
      throw new Error(`Unknown resource: ${resource}`);
  }
});

const CustomLayout = (props: any) => <Layout {...props} appBar={CustomAppBar} />;

export const App = () => (
  <Admin loginPage={LoginPage} authProvider={authProvider} dataProvider={dataProvider} layout={CustomLayout}>
    {permissions => (
      <>
        {permissions === 'admin' && (
          <Resource 
            name="user" 
            list={UserList}
            edit={UserEdit}
            show={UserShow}
            icon={GroupsIcon}/>
        )}
        <Resource 
          name="article" 
          list={ArticleList}
          create={ArticleCreate}
          edit={ArticleEdit}
          show={ArticleShow}
          icon={ArticleIcon} />
        <Resource
          name="children"
          list={ChildrenList}
          edit={ChildrenEdit}
          show={ChildrenShow}
          icon={ChildCareIcon} />
        <Resource
          name="nutritionHistory"
          edit={NutritionHistoryEdit}
        />
        {permissions === 'admin' && (
          <>
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
              name="consultant"
              list={ConsultantList}
              create={ConsultantCreate}
              edit={ConsultantEdit}
              show={ConsultantShow}
              icon={PermContactCalendarIcon}
            />
          </>
        )}
      </>
    )}
  </Admin>
);
