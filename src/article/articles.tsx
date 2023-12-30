import * as React from 'react';
import { List, Datagrid, TextField, DateField, ImageField, Create, ListProps, Show, RichTextField, ShowButton, Edit, SimpleForm, EditButton, TextInput, required, ImageInput, DeleteButton, TabbedShowLayout, Filter, SearchInput } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

const ArticleFilter: React.FC = (props) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
);

export const ArticleList: React.FC<ListProps> = (props) => (
    <List {...props} filters={<ArticleFilter/>}>
        <Datagrid>
            <ImageField 
                source="image"
                sx={{'& img': { maxWidth: 150, maxHeight: 150, objectFit: 'contain' }}}
                title="title"
                sortable={false}
            />
            <TextField source="title" sortable={false} />
            <TextField source="description" sortable={false} />
            <TextField source="author" sortable={false} />
            <DateField source="created_at" label="Published at" sortable={false} />
            <ShowButton />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);

export const ArticleEdit: React.FC = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled label="Id" source="id" />
            <TextInput source="title" />
            <TextInput source="description" />
            <RichTextInput source="content" />
            <ImageField source="image" title="Image" />
            <ImageInput source="image" label="Related pictures" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);

export const ArticleCreate: React.FC = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" validate={required()} />
            <TextInput source="description" validate={required()}  />
            <RichTextInput source="content" />
            <ImageInput source="image" label="Related pictures" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);

export const ArticleShow: React.FC = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="summary">
                <TextField source="id" />
                <TextField source="slug" />
                <TextField source="title" />
                <TextField source="description" />
                <DateField source="created_at" label="Published at" />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="content">
                <RichTextField source="content" />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="pictures">
                <ImageField 
                    source="image"
                    title="title"
                />
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);