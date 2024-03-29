import { DeleteButton, useRecordContext } from 'react-admin';

export const DeleteNutritionHistoryButton = () => {
  const nutritionHistory = useRecordContext();

  return (
    <DeleteButton
      resource="nutritionHistory"
      label='Hapus'
      redirect={`/children/${nutritionHistory.child_id}/show/1`}
    />
  )
}