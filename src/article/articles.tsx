import * as React from 'react';
import { List, Datagrid, TextField, DateField, ImageField, Create, ListProps, Show, RichTextField, ShowButton, Edit, SimpleForm, EditButton, TextInput, required, ImageInput, DeleteButton, TabbedShowLayout, Filter, SearchInput, WrapperField } from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

const ArticleFilter: React.FC = (props) => (
    <Filter {...props}>
        <SearchInput source="q" placeholder="Cari..." alwaysOn />
    </Filter>
);

const LocalizedShowButton = () => <ShowButton label="Lihat" />;
const LocalizedDeleteButton = () => <DeleteButton label="Hapus" />;

export const ArticleList: React.FC<ListProps> = (props) => (
    <List {...props} filters={<ArticleFilter/>}>
        <Datagrid>
            <ImageField 
                source="image"
                sx={{'& img': { maxWidth: 150, maxHeight: 150, objectFit: 'contain' }}}
                title="title"
                label="Gambar Artikel"
                sortable={false}
            />
            <TextField source="title" label="Judul" sortable={false} />
            <TextField source="description" label="Deskripsi" sortable={false} />
            <WrapperField label="Penulis">
                <ImageField 
                    source="author_profile" 
                    sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
                    title="author"
                    sortable={false} 
                />
                <TextField source="author" sortable={false} />
            </WrapperField>
            <DateField source="created_at" showTime label="Tanggal terbit" sortable={false} />
            <LocalizedShowButton />
            <EditButton />
            <LocalizedDeleteButton />
        </Datagrid>
    </List>
);

export const ArticleEdit: React.FC = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="title" label="Judul" />
            <TextInput source="description" label="Deskripsi" />
            <RichTextInput source="content" label="Konten" />
            <ImageField source="image" title="Image" />
            <ImageInput source="image" placeholder="Letakkan gambar disini, atau klik untuk memilih." label="Gambar terkait" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);

export const ArticleCreate: React.FC = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" label="Judul" validate={required()} />
            <TextInput source="description" label="Deskripsi" validate={required()}  />
            <RichTextInput source="content" label="Konten" />
            <ImageInput source="image" placeholder="Letakkan gambar disini, atau klik untuk memilih." label="Gambar terkait" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);

export const ArticleShow: React.FC = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Rincian">
                <TextField source="id" label="Id artikel" />
                <TextField source="slug" label="SEO slug" />
                <TextField source="title" label="Judul" />
                <TextField source="description" label="Deskripsi" />
                <DateField source="created_at" showTime label="Tanggal terbit" />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Konten">
                <RichTextField source="content" label="Konten artikel" />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Gambar">
                <ImageField 
                    source="image"
                    label="Gambar artikel"
                    title="title"
                />
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);