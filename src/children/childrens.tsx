import * as React from 'react';
import { List, Datagrid, TextField, DateField, Show, ShowButton, TabbedShowLayout, Filter, DateInput, SearchInput, ReferenceManyField, ImageField, WrapperField, useShowController, EditButton, Edit, SimpleForm, SelectInput, TextInput, DeleteButton } from 'react-admin';
import { ZScoreLengthChart, ZScoreWeightChart } from './zScoreChart';
import { DeleteNutritionHistoryButton } from '../nutritionHistory/nutritionHistoryButtons';

const genderChoices = [
  { gender: 'Laki-laki', name: 'Laki-laki' },
  { gender: 'Perempuan', name: 'Perempuan' },
];

const villageChoices = [
  { village: 'Alasdowo', name: 'Alasdowo' },
  { village: 'Bakalan', name: 'Bakalan' },
  { village: 'Banyutowo', name: 'Banyutowo' },
  { village: 'Dukuhseti', name: 'Dukuhseti' },
  { village: 'Dumpil', name: 'Dumpil' },
  { village: 'Grogolan', name: 'Grogolan' },
  { village: 'Kembang', name: 'Kembang' },
  { village: 'Kenanti', name: 'Kenanti' },
  { village: 'Ngagel', name: 'Ngagel' },
  { village: 'Puncel', name: 'Puncel' },
  { village: 'Tegalombo', name: 'Tegalombo' },
  { village: 'Wedusan', name: 'Wedusan' },
]

const ChildrenFilter: React.FC = (props) => (
  <Filter {...props}>
    <SearchInput source="q" placeholder="Cari..." alwaysOn />
  </Filter>
);

const LocalizedShowButton = () => <ShowButton label="Lihat" />;
const LocalizedDeleteButton = () => <DeleteButton label="Hapus" />;

export const ChildrenList: React.FC = (props) => (
  <List {...props} filters={<ChildrenFilter />}>
    <Datagrid>
      <TextField source="child_name" label="Nama anak" sortable={false} />
      <TextField source="child_nik" label="NIK" sortable={false} />
      <TextField source="child_village" label="Kelurahan" sortable={false} />
      <DateField source="date_of_birth" label="Tanggal lahir" sortable={false} />
      <TextField source="gender" label="Jenis kelamin" sortable={false} />
      <TextField source="latest_height" label="Tinggi (cm)" sortable={false} />
      <TextField source="latest_weight" label="Berat (kg)" sortable={false} />
      <TextField source="latest_bmi" label="IMT" sortable={false} />
      <TextField source="latest_height_category" label="Kategori tinggi" sortable={false} />
      <TextField source="latest_mass_category" label="Kategori berat" sortable={false} />
      <TextField source="latest_weight_category" label="Kategori IMT" sortable={false} />
      <WrapperField label="Pengasuh">
        <ImageField 
            source="creator_profile" 
            sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
            title="creator_username"
            sortable={false} 
        />
        <TextField source="creator_username" sortable={false} />
      </WrapperField>
      <DateField source="created_at" showTime label="Terakhir ditimbang" sortable={false} />
      <LocalizedShowButton />
      <EditButton />
      <LocalizedDeleteButton />
    </Datagrid>
  </List>
)

export const ChildrenEdit: React.FC = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="child_name" />
      <TextInput source="child_nik" />
      <SelectInput
        source="child_village"
        choices={villageChoices}
        optionText="name"
        optionValue='village' />
      <DateInput source="date_of_birth" />
      <SelectInput
        source="gender"
        choices={genderChoices}
        optionText="name"
        optionValue='gender' />
    </SimpleForm>
  </Edit>
)

export const ChildrenShow: React.FC = (props) => {
  const { record } = useShowController(props);
  const data = record ? record : {};

  return (
    <Show {...props}>
      <TabbedShowLayout>
        <TabbedShowLayout.Tab label="Rincian">
          <TextField source="id" label="Id balita" />
          <TextField source="child_name" label="Nama" />
          <TextField source="child_nik" label="NIK" />
          <TextField source="child_village" label="Kelurahan" />
          <DateField source="date_of_birth" label="Tanggal lahir" />
          <TextField source="gender" label="Jenis kelamin" />
          <TextField source="latest_height" label="Tinggi terakhir (cm)" />
          <TextField source="latest_weight" label="Berat terakhir (kg)" />
          <TextField source="latest_bmi" label="IMT terakhir" />
          <TextField source="latest_height_category" label="Kategori tinggi terakhir" />
          <TextField source="latest_mass_category" label="Kategori berat terakhir"/>
          <TextField source="latest_weight_category" label="Kategori IMT terakhir" />
          <DateField source="created_at" showTime label="Terakhir ditimbang"/>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Status gizi">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1 }}>
              <p><center>Kurva Pertumbuhan Tinggi/Panjang 0-5 Tahun</center></p>
              <ZScoreLengthChart data={data} />
            </div>
            <div style={{ flex: 1 }}>
              <p><center>Kurva Pertumbuhan Berat 0-5 Tahun</center></p>
              <ZScoreWeightChart data={data} />
            </div>
          </div>
          <ReferenceManyField
            label="Riwayat penimbangan"
            reference="nutritionHistory"
            target="id"
          >
            <Datagrid bulkActionButtons={false}>
              <TextField source="age_text" label="Umur saat ditimbang" />
              <TextField source="height" label="Tinggi (cm)" />
              <TextField source="weight" label= "Berat (kg)" />
              <TextField source="bmi" label="IMT" />
              <TextField source="height_category" label="Kategori tinggi" />
              <TextField source="mass_category" label="Kategori berat" />
              <TextField source="weight_category" label="Kategori IMT" />
              <DateField source="created_at" showTime label="Tanggal timbang" />
              <EditButton />
              <DeleteNutritionHistoryButton />
            </Datagrid>
          </ReferenceManyField>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="Pengasuh">
          <TextField source="creator_id" label="Id pengasuh" />
          <ImageField 
            source="creator_profile" 
            sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
            title="username"
            sortable={false}
            label="Foto profil pengasuh"
          />
          <TextField source="creator_username" label="Nama pengasuh" />
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  )
}