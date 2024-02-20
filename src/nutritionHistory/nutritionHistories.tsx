import * as React from 'react';
import { TextInput, Edit, SimpleForm, useNotify, useRefresh, useRedirect, useDataProvider } from 'react-admin';

export const NutritionHistoryEdit: React.FC = (props) => {
    const notify = useNotify();
    const redirect = useRedirect();
    const refresh = useRefresh();
    const dataProvider = useDataProvider();

    const onSuccess = (response: any) => {
        console.log("response", response);
        notify('Element updated');
        dataProvider.update('nutritionHistory', {
            id: response.id,
            data: { weight: response.weight, height: response.height, age_in_month: response.age_in_month },
            previousData: {},
        })
        .then(() => {
            if (response && response.child_id) {
                redirect(`/children/${response.child_id}/show/1`);
                refresh();
            } else {
                redirect('/children');
            }
        })
        .catch((e) => {
            notify(e.message, { type: 'error' });
            redirect(`/children/${response.child_id}/show/1`);
            refresh();
        });
    };

    return (
        <Edit mutationOptions={{ onSuccess }} {...props}>
            <SimpleForm>
                <TextInput source="age_in_month" label="Umur saat ditimbang (bulan)" />
                <TextInput source="weight" label="Berat (kg)" />
                <TextInput source="height" label="Tinggi (cm)" />
            </SimpleForm>
        </Edit>
    )
}