import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import { Link } from "react-router-dom";
import {
  ListBase,
  SimpleList,
  RaRecord,
  WithListContext,
} from 'react-admin';

import CardWithIcon from './CardWithIcon';

interface Article extends RaRecord {
  image: string;
  title: string;
}

const LatestArticles: React.FC = () => {
  return (
    <ListBase
      resource="article"
      perPage={10}
      disableSyncWithLocation
      >
        <CardWithIcon
          to="/article"
          icon={ArticleIcon}
          title="Latest Articles"
          subtitle={<WithListContext render={({ total }) => <>{total}</>} />}
        >
          <SimpleList<Article>
            primaryText="%{title}"
            secondaryText={record => (
              <Typography
                component="span"
                variant="body2"
                color="textSecondary"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {record.description}
              </Typography>
            )}
            linkType="show"
          />
          <Box flexGrow={1}>&nbsp;</Box>
          <Button
            sx={{ borderRadius: 0 }}
            component={Link}
            to="/article"
            size='small'
            color="primary"
          >
            <Box p={1} sx={{ color: 'primary.main' }}>
              SEE ALL ARTICLES
            </Box>
          </Button>
        </CardWithIcon>
    </ListBase>
  );
};

export default LatestArticles;
  