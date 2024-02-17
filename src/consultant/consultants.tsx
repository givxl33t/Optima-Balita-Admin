import * as React from 'react';
import { List, Datagrid, TextField, DateField, ListProps, Show, ShowButton, EditButton, DeleteButton, TabbedShowLayout, Filter, SearchInput, Create, SimpleForm, required, TextInput, Edit, ImageField, ReferenceInput, SelectInput, WrapperField } from 'react-admin';

const ConsultantFilter: React.FC = (props) => (
  <Filter {...props}>
    <SearchInput source="q" placeholder="Cari..." alwaysOn />
  </Filter>
);

const LocalizedShowButton = () => <ShowButton label="Lihat" />;
const LocalizedDeleteButton = () => <DeleteButton label="Hapus" />;

export const ConsultantList: React.FC<ListProps> = (props) => (
    <List {...props} filters={<ConsultantFilter />} >
      <Datagrid>
      <WrapperField label="Profil konsultan">
        <ImageField 
            source="consultant_profile" 
            sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
            title="consultant_username"
            sortable={false} 
        />
        <TextField source="consultant_username" sortable={false} />
      </WrapperField>
        <TextField source ="consultant_description" label="Deskripsi" sortable={false} />
        <TextField source ="consultant_phone" label="Nomor Telpon" sortable={false} />
        <DateField source ="created_at" label="Tanggal dibuat" showTime sortable={false} />
        <LocalizedShowButton />
        <EditButton />
        <LocalizedDeleteButton />
      </Datagrid>
    </List>
);

export const ConsultantShow: React.FC = (props) => (
    <Show {...props}>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="Rincian">
          <TextField source="id" label="Id konsultan" />
          <TextField source="consultant_description" label="Deskripsi" />
          <TextField source="consultant_username" label="Nama konsultan" />
          <TextField source="consultant_phone" label="Nomor telpon" />
          <DateField source="created_at" label="Tanggal dibuat" showTime />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Profil">
          <TextField source="consultant_id" label="Id akun" />
          <ImageField 
              source="consultant_profile" 
              sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
              title="consultant_username"
              label="Profil akun"
              sortable={false} 
          />
          <TextField source="consultant_username" label="Nama akun" />
          <TextField source="consultant_role" label="Hak akses akun" />
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
);

export const ConsultantCreate: React.FC = (props) => {
  const optionRenderer = (choice: any) => `${choice.username} | ${choice.role === 'ADMIN' ? 'Admin' : choice.role === 'DOCTOR' ? 'Nakes' : 'Pengguna'}`;
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput source="user_id" reference="user">
          <SelectInput optionText={optionRenderer} label="Akun" />
        </ReferenceInput>
        <TextInput source="consultant_description" label="Deskripsi konsultan" validate={required()} />
        <TextInput source="consultant_phone" label="Nomor telpon" validate={required()} />
      </SimpleForm>
    </Create>
  );
};

export const ConsultantEdit: React.FC = (props) => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="consultant_description" label="Deskripsi konsultan" />
        <TextInput source="consultant_phone" label="Nomor telpon" />
      </SimpleForm>
    </Edit>
);