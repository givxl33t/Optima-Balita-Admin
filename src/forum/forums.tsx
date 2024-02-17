import * as React from 'react';
import { usePermissions } from 'react-admin';
import { List, Datagrid, TextField, DateField, ListProps, Show, ShowButton, EditButton, DeleteButton, TabbedShowLayout, Filter, SearchInput, Create, SimpleForm, required, TextInput, Edit, ReferenceManyField, Pagination, ImageField, WrapperField } from 'react-admin';
import { CreateCommentButton, DeleteCommentButton } from '../comment/commentButtons';

const ForumFilter: React.FC = (props) => (
    <Filter {...props}>
        <SearchInput source="q" placeholder="Cari..." alwaysOn />
    </Filter>
);

const LocalizedShowButton = () => <ShowButton label="Lihat" />;
const LocalizedDeleteButton = () => <DeleteButton label="Hapus" />;

export const ForumList: React.FC<ListProps> = (props) => {
    const { permissions } = usePermissions();
    return (
        <List {...props} filters={<ForumFilter />}>
            <Datagrid>
                <TextField source="title" label="Judul diskusi" sortable={false} />
                <TextField source="post_content" label="Konten diskusi" sortable={false} />
                <TextField source="comment_count" label="Jumlah komentar" sortable={false} />
                <TextField source="like_count" label="Jumlah suka" sortable={false} />
                <WrapperField label="Pembuat">
                    <ImageField 
                        source="poster_profile" 
                        sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
                        title="username"
                        sortable={false} 
                    />
                    <TextField source="poster_username" sortable={false} />
                </WrapperField>
                <DateField source="created_at" label="Tanggal dibuat" showTime sortable={false} />
                <LocalizedShowButton />
                {permissions === 'admin' && <EditButton />}
                {permissions === 'admin' && <LocalizedDeleteButton />}
            </Datagrid>
        </List>
    );
};

export const ForumEdit: React.FC = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="title" label="Judul diskusi" />
            <TextInput source="post_content" label="Konten diskusi" />
        </SimpleForm>
    </Edit>
);

export const ForumCreate: React.FC = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" label="Judul diskusi" validate={required()} />
            <TextInput source="post_content" label="Konten diskusi" validate={required()}  />
        </SimpleForm>
    </Create>

);

export const ForumShow: React.FC = (props) => {
    const { permissions } = usePermissions();
    return (
        <Show {...props}>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Rincian">
                <TextField source="id" label="Id diskusi" />
                <TextField source="title" label="Judul" />
                <TextField source="post_content" label="Konten" />
                <TextField source="comment_count" label="Jumlah komentar" />
                <TextField source="like_count" label="Jumlah suka" />
                <DateField source="created_at" label="Tanggal dibuat" showTime />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Komentar">
                <ReferenceManyField
                    label="Komentar diskusi"
                    reference="comment"
                    target="discussion_id"
                    pagination={<Pagination />}
                >
                    <Datagrid>
                        <TextField source="comment_content" label="Konten komentar" />
                        <WrapperField label="Pemberi komentar">
                            <ImageField 
                                source="commenter_profile" 
                                sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
                                title="commenter_username"
                                sortable={false} 
                            />
                            <TextField source="commenter_username" sortable={false} />
                        </WrapperField>
                        <DateField source="created_at" label="Tanggal dibuat" showTime />
                        <LocalizedShowButton />
                        {permissions === 'admin' && <EditButton />}
                        {permissions === 'admin' && <DeleteCommentButton />}
                    </Datagrid>
                </ReferenceManyField>
                <CreateCommentButton />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Suka">
                <ReferenceManyField
                    label="Penyuka diskusi"
                    reference="like"
                    target="discussion_id"
                >
                    <Datagrid bulkActionButtons={false}>
                    <ImageField 
                        source="profile"
                        label="Foto profil"
                        sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
                        title="username"
                        sortable={false} 
                    />
                    <TextField source="username" label="Nama penyuka" sortable={false} />
                    </Datagrid>
                </ReferenceManyField>
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Pembuat">
                <TextField source="poster_id" label="Id pembuat" />
                <ImageField 
                        source="poster_profile"
                        label="Foto profil" 
                        sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
                        title="username"
                        sortable={false} 
                    />
                <TextField source="poster_username" label="Nama pembuat" />
                <TextField source="poster_role" label="Hak akses pembuat" />
                
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
    )
};