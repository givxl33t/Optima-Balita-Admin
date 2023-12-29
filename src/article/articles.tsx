import * as React from 'react';
import { List, Datagrid, TextField, DateField, ImageField, Create, ListProps, Show, RichTextField, ShowButton, Edit, SimpleForm, EditButton, TextInput, required, ImageInput, DeleteButton, TabbedShowLayout } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

export const ArticleList: React.FC<ListProps> = (props) => (
    <List {...props}>
        <Datagrid bulkActionButtons={false}>
        <TextField source="id" />
        <ImageField source="image" title="Image" />
        <TextField source="title" />
        <TextField source="description" />
        <TextField source="author" />
        <DateField source="created_at" />
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
                <TextField source="slug" />
                <TextField source="title" />
                <TextField source="description" />
                <DateField source="created_at" />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="content">
                <RichTextField source="content" />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="pictures">
                <ImageField source="image" title="Image" />
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);

export const ArticleDelete: React.FC = () => (
    <div>ArticleDelete</div>
);