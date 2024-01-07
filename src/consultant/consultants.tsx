import * as React from 'react';
import { List, Datagrid, TextField, DateField, ListProps, Show, ShowButton, EditButton, DeleteButton, TabbedShowLayout, Filter, SearchInput, Create, SimpleForm, required, TextInput, Edit, ImageField, ReferenceInput, SelectInput, WrapperField } from 'react-admin';

const ConsultantFilter: React.FC = (props) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
);

export const ConsultantList: React.FC<ListProps> = (props) => (
    <List {...props} filters={<ConsultantFilter />} >
      <Datagrid>
      <WrapperField label="Consultant">
        <ImageField 
            source="consultant_profile" 
            sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
            title="consultant_username"
            sortable={false} 
        />
        <TextField source="consultant_username" sortable={false} />
      </WrapperField>
        <TextField source ="consultant_description" sortable={false} />
        <TextField source ="consultant_phone" sortable={false} />
        <DateField source ="created_at" showTime sortable={false} />
        <ShowButton />
        <EditButton />
        <DeleteButton />
      </Datagrid>
    </List>
);

export const ConsultantShow: React.FC = (props) => (
    <Show {...props}>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="summary">
          <TextField source="id" />
          <TextField source="consultant_description" />
          <TextField source="consultant_username" />
          <TextField source="consultant_phone" />
          <DateField source="created_at" showTime />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="assignee">
          <TextField source="consultant_id" label="Asignee Id" />
          <ImageField 
              source="consultant_profile" 
              sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
              title="consultant_username"
              label="Asignee profile"
              sortable={false} 
          />
          <TextField source="consultant_username" label="Asignee username" />
          <TextField source="consultant_role" label="Asignee role" />
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
);

export const ConsultantCreate: React.FC = (props) => (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput label="User" source="user_id" reference="user">
          <SelectInput optionText="username" />
        </ReferenceInput>
        <TextInput source="consultant_description" validate={required()} />
        <TextInput source="consultant_phone" validate={required()} />
      </SimpleForm>
    </Create>
);

export const ConsultantEdit: React.FC = (props) => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="consultant_description" />
        <TextInput source="consultant_phone" />
      </SimpleForm>
    </Edit>
);