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
                    />
                </ReferenceInput>
                <TextInput source="comment_content" validate={required()} />
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
                <TextInput source="comment_content" validate={required()} />
            </SimpleForm>
        </Edit>
    )
};

export const CommentShow: React.FC = (props) => (
    <Show {...props}>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="summary">
                <TextField source="id" />
                <TextField source="comment_content" />
                <TextField source="commenter_username" />
                <DateField source="created_at" />
            </TabbedShowLayout.Tab>
            <TabbedShowLayout.Tab label="discussion">
                <TextField source="discussion_id" />
                <TextField source="discussion_title" />
                <TextField source="discussion_post_content" />
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);