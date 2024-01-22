import * as React from "react";
import { RaRecord } from "react-admin";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";

import { useGetList } from "react-admin";

import CardWithIcon from "./CardWithIcon";

interface Discussion extends RaRecord {
  poster_profile: string;
  post_content: string;
}

const LatestDiscussions: React.FC = () => {
  const {
    data: discussions,
    isLoading,
    total
  } = useGetList<Discussion>("forum", {
    pagination: { page: 1, perPage: 10 }
  });

  const display = isLoading ? "none" : "block";

  return (
    <CardWithIcon
      to="/forum"
      icon={CommentIcon}
      title="Latest Discussions"
      subtitle={total ? total.toString() : "0"}
    >
      <List sx={{ display }}>
        {discussions?.map((record: Discussion) => (
          <ListItem
            key={record.id}
            button
            component={Link}
            to={`/forum/${record.id}/show`}
            alignItems="flex-start"
          >
            <ListItemAvatar>
              <Avatar src={`${record.poster_profile}`} />
            </ListItemAvatar>

            <ListItemText
              secondary={record.post_content}
              sx={{
                overflowY: "hidden",
                height: "4em",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                paddingRight: 0
              }}
            />
          </ListItem>
        ))}
      </List>
      <Box flexGrow={1}>&nbsp;</Box>
      <Button
        sx={{ borderRadius: 0 }}
        component={Link}
        to="/forum"
        size="small"
        color="primary"
      >
        <Box p={1} sx={{ color: "primary.main" }}>
          SEE ALL DISCUSSIONS
        </Box>
      </Button>
    </CardWithIcon>
  );
};

export default LatestDiscussions;
