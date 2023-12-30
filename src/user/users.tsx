import * as React from 'react';
import { List, Datagrid, TextField, DateField, ImageField, ListProps, ShowButton, EditButton, DeleteButton, Show, SimpleShowLayout, Edit, SimpleForm, TextInput, SelectInput, Filter, SearchInput } from 'react-admin';

const roleChoices = [
  { role_id: 'a1582ba5-d764-4a15-b181-657e8753869b', name: 'ADMIN' },
  { role_id: '9c4e9a57-12da-4dae-b2e0-edec77c4f86e', name: 'DOCTOR' },
  { role_id: '8cb07c50-0735-4df8-8e51-8f15c3fb3a5d', name: 'GUEST' },
];

const UserFilter: React.FC = (props) => (
  <Filter {...props}>
      <SearchInput source="q" alwaysOn />
  </Filter>
);


export const UserList: React.FC<ListProps> = (props) => (
    <List {...props} filters={<UserFilter />} >
        <Datagrid>
          <ImageField 
            source="profile" 
            sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
            title="username"
            sortable={false} 
          />
          <TextField source="username" sortable={false} />
          <TextField source="email" sortable={false} />
          <TextField source="role" sortable={false} />
          <DateField source="created_at" sortable={false} />
          <ShowButton />
          <EditButton />
          <DeleteButton />
        </Datagrid>
    </List>
);

export const UserEdit: React.FC = (props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="username" />
      <TextInput source="email" />
      <TextInput source="role" disabled={true} />
      <SelectInput 
        source="role_id"
        choices={roleChoices}
        label="Edit Role"
        optionText="name"
        optionValue="role_id" />
    </SimpleForm>
  </Edit>
);



export const UserShow: React.FC = (props) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <ImageField 
        source="profile" 
        sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
        title="username"
      />
      <TextField source="username" />
      <TextField source="email" />
      <TextField source="role" />
      <DateField source="created_at" />
    </SimpleShowLayout>
  </Show>
);