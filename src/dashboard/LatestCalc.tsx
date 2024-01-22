import { Card, CardHeader, List } from "@mui/material";
import { Calculation } from "./Calculation";

interface NutritionCalc {
  id: string;
  child_id: string;
  child_name: string;
  age_text: string;
  height: number;
  weight: number;
  gender: string;
  bmi: number;
  height_category: string;
  mass_category: string;
  weight_category: string;
  creator_id: string;
  created_at: Date;
}

interface Props {
  calculations: NutritionCalc[];
}

const LatestCalc = (props: Props) => {
  const { calculations = [] } = props;

  return (
    <Card sx={{ flex: 1 }}>
      <CardHeader title="Latest Calculation" />
      <List dense={true}>
        {calculations.map((record) => (
          <Calculation key={record.id} calculation={record} />
        ))}
      </List>
    </Card>
  );
};

export default LatestCalc;
