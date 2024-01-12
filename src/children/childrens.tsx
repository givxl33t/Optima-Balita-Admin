import * as React from 'react';
import { List, Datagrid, TextField, DateField, Show, ShowButton, TabbedShowLayout, Filter, SearchInput, ReferenceManyField, ImageField, WrapperField, useShowController, EditButton, Edit, SimpleForm, SelectInput, TextInput, DeleteButton } from 'react-admin';
import { ZScoreLengthChart, ZScoreWeightChart } from './zScoreChart';
import { DeleteNutritionHistoryButton } from '../nutritionHistory/nutritionHistoryButtons';

const genderChoices = [
  { gender: 'Laki-laki', name: 'Laki-laki' },
  { gender: 'Perempuan', name: 'Perempuan' },
];

const ChildrenFilter: React.FC = (props) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
    </Filter>
);

export const ChildrenList: React.FC = (props) => (
  <List {...props} filters={<ChildrenFilter />}>
    <Datagrid>
      <TextField source="child_name" sortable={false} />
      <TextField source="gender" sortable={false} />
      <TextField source="latest_age" label="Age" sortable={false} />
      <TextField source="latest_height" label="Height (cm)" sortable={false} />
      <TextField source="latest_weight" label="Weight (kg)" sortable={false} />
      <TextField source="latest_bmi" label="BMI" sortable={false} />
      <TextField source="latest_weight_category" label="Category" sortable={false} />
      <WrapperField label="Weigher">
        <ImageField 
            source="creator_profile" 
            sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
            title="creator_username"
            sortable={false} 
        />
        <TextField source="creator_username" sortable={false} />
      </WrapperField>
      <DateField source="created_at" showTime label="Last weighing" sortable={false} />
      <ShowButton />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
)

export const ChildrenEdit: React.FC = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="child_name" />
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
        <TabbedShowLayout.Tab label="summary">
          <TextField source="id" />
          <TextField source="child_name" />
          <TextField source="gender" />
          <TextField source="latest_age" />
          <TextField source="latest_height" label="Latest height (cm)" />
          <TextField source="latest_weight" label="Latest weight (kg)" />
          <TextField source="latest_bmi" label="Latest BMI" />
          <TextField source="latest_weight_category" label="Latest category" />
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="nutrition history">
          <ReferenceManyField
            label="Weighing History"
            reference="nutritionHistory"
            target="id"
          >
            <Datagrid bulkActionButtons={false}>
              <TextField source="age_text" label="Age" />
              <TextField source="height" label="Height (cm)" />
              <TextField source="weight" label= "Weight (kg)" />
              <TextField source="bmi" label="BMI" />
              <TextField source="weight_category" label="BMI Category" />
              <DateField source="created_at" showTime />
              <EditButton />
              <DeleteNutritionHistoryButton />
            </Datagrid>
          </ReferenceManyField>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: 1 }}>
              <p><center>0-5 Years Length/Height Curve</center></p>
              <ZScoreLengthChart data={data} />
            </div>
            <div style={{ flex: 1 }}>
              <p><center>0-5 Years Weight Curve</center></p>
              <ZScoreWeightChart data={data} />
            </div>
          </div>
        </TabbedShowLayout.Tab>
        <TabbedShowLayout.Tab label="weigher">
          <TextField source="creator_id" label="Weigher id" />
          <ImageField 
            source="creator_profile" 
            sx={{'& img': { maxWidth: 50, maxHeight: 50, objectFit: 'cover', borderRadius: '50%' }}} 
            title="username"
            sortable={false}
            label="Weigher profile"
          />
          <TextField source="creator_username" label="Weigher username" />
        </TabbedShowLayout.Tab>
      </TabbedShowLayout>
    </Show>
  )
}