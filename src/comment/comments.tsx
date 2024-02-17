import * as React from 'react';
import { TextField, DateField, Show, TabbedShowLayout, Create, SimpleForm, required, TextInput, Edit, ReferenceInput, AutocompleteInput, useNotify, useRefresh, useRedirect, getRecordFromLocation, useDataProvider } from 'react-admin';
import { useLocation } from 'react-router';

export const CommentCreate: React.FC = () => {
    const location = useLocation();
    const record = getRecordFromLocation(location);

    return (
        <Create redirect={`/forum/${record.discussion_id}/show/1`}>
            <SimpleForm>
                <ReferenceInput source="discussion_id" reference="forum">
                    <AutocompleteInput
                        optionText={(choice) => `${choice.id}`}
                        validate={required()}
                        label="Id diskusi"
                        readOnly
                    />
                </ReferenceInput>
                <TextInput source="comment_content" label="Konten komentar" validate={required()} />
            </SimpleForm>
        </Create>
    )
};

export const CommentEdit: React.FC = () => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();
    const dataProvider = useDataProvider();

    const onSuccess = (response: any) => {
        notify('Element updated');
        dataProvider.update('comment', {
            id: response.id,
            data: { comment_content: response.comment_content },
            previousData: {},
        })
        .then(() => {
            if (response && response.discussion_id) {
                redirect(`/forum/${response.discussion_id}/show/1`);
            } else {
                redirect('/forum');
            }
        })
        .catch((e) => {
            notify(e.message, { type: 'error' });
            redirect(`/forum/${response.discussion_id}/show/1`);
            refresh();
        });
    };

    return (
        <Edit mutationOptions={{ onSuccess }} >
            <SimpleForm>
                <TextInput source="comment_content" label="Konten komentar" />
            </SimpleForm>
        </Edit>
    )
};

export const CommentShow: React.FC = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Rincian">
                <TextField source="id" label="Id komentar" />
                <TextField source="comment_content" label="Konten komentar" />
                <TextField source="commenter_username" label="Nama pembuat" />
                <DateField source="created_at" label="Tanggal dibuat" showTime />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="Diskusi">
                <TextField source="discussion_id" label="Id diskusi" />
                <TextField source="discussion_title" label="Judul diskusi" />
                <TextField source="discussion_post_content" label="Konten diskusi" />
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);