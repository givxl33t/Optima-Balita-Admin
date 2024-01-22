import * as React from 'react';
import { usePermissions } from 'react-admin';
import { List, Datagrid, TextField, DateField, ListProps, Show, ShowButton, EditButton, DeleteButton, TabbedShowLayout, Filter, SearchInput, Create, SimpleForm, required, TextInput, Edit, ReferenceManyField, Pagination, ImageField, WrapperField } from 'react-admin';
import { CreateCommentButton, DeleteCommentButton } from '../comment/commentButtons';

const ForumFilter: React.FC = (props) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
);

export const ForumList: React.FC<ListProps> = (props) => {
    const { permissions } = usePermissions();
    return (
        <List {...props} filters={<ForumFilter />}>
            <Datagrid>
                <TextField source="title" sortable={false} />
                <TextField source="post_content" label="Content" sortable={false} />
                <TextField source="comment_count" sortable={false} />
                <TextField source="like_count" sortable={false} />
                <WrapperField label="Poster">
                    <ImageField 
                        source="poster_profile" 
                        sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
                        title="username"
                        sortable={false} 
                    />
                    <TextField source="poster_username" sortable={false} />
                </WrapperField>
                <DateField source="created_at" showTime sortable={false} />
                <ShowButton />
                {permissions === 'admin' && <EditButton />}
                {permissions === 'admin' && <DeleteButton />}
            </Datagrid>
        </List>
    );
};

export const ForumEdit: React.FC = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <TextInput source="title" />
            <TextInput source="post_content" />
        </SimpleForm>
    </Edit>
);

export const ForumCreate: React.FC = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" validate={required()} />
            <TextInput source="post_content" validate={required()}  />
        </SimpleForm>
    </Create>

);

export const ForumShow: React.FC = (props) => {
    const { permissions } = usePermissions();
    return (
        <Show {...props}>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="summary">
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="post_content" />
                <TextField source="comment_count" />
                <TextField source="like_count" />
                <DateField source="created_at" showTime />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="comments">
                <ReferenceManyField
                    label="Comments"
                    reference="comment"
                    target="discussion_id"
                    pagination={<Pagination />}
                >
                    <Datagrid>
                        <TextField source="comment_content" />
                        <WrapperField label="Commenter">
                            <ImageField 
                                source="commenter_profile" 
                                sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
                                title="commenter_username"
                                sortable={false} 
                            />
                            <TextField source="commenter_username" sortable={false} />
                        </WrapperField>
                        <DateField source="created_at" showTime />
                        <ShowButton />
                        {permissions === 'admin' && <EditButton />}
                        {permissions === 'admin' && <DeleteCommentButton />}
                    </Datagrid>
                </ReferenceManyField>
                <CreateCommentButton />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="likes">
                <ReferenceManyField
                    label="Likes"
                    reference="like"
                    target="discussion_id"
                >
                    <Datagrid bulkActionButtons={false}>
                    <ImageField 
                        source="profile" 
                        sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
                        title="username"
                        sortable={false} 
                    />
                    <TextField source="username" sortable={false} />
                    </Datagrid>
                </ReferenceManyField>
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="poster">
                <TextField source="poster_id" />
                <ImageField 
                        source="poster_profile" 
                        sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
                        title="username"
                        sortable={false} 
                    />
                <TextField source="poster_username" />
                <TextField source="poster_role" />
                
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
    )
};