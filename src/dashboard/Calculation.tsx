import {
  ListItem,
  ListItemSecondaryAction,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Box
} from "@mui/material";
import { useReference } from "react-admin";
import { Link } from "react-router-dom";

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
  calculation: NutritionCalc;
}

export const Calculation = (props: Props) => {
  const { calculation } = props;
  const { referenceRecord: user, isLoading: isUserLoading } = useReference({
    reference: "user",
    id: calculation.creator_id
  });
  const { referenceRecord: child, isLoading: isChildLoading } = useReference({
    reference: "children",
    id: calculation.child_id
  });

  return (
    <ListItem
      button
      component={Link}
      to={`/nutritionHistory/${calculation.id}`}
    >
      <ListItemAvatar>
        {isUserLoading ? (
          <Avatar />
        ) : (
          <Avatar src={`${user?.profile}`} />
        )}
      </ListItemAvatar>
      {isChildLoading ? (
        <ListItemText
          primary={new Date(calculation.created_at).toLocaleString("id-ID")}
          secondary="Loading..."
        />
      ) : (
        <ListItemText
          primary={new Date(calculation.created_at).toLocaleString("id-ID")}
          secondary={`Child name : ${child?.child_name}`}
        />
      )}
      <ListItemSecondaryAction>
        <Box
          component="span"
          sx={{
            marginRight: "1em",
            color: "text.primary"
          }}
        >
          <Box
            component="span"
            sx={{
              fontWeight: "bold",
              fontSize: "1.2em"
            }}
          >
            {calculation.bmi.toFixed(2)}
          </Box>
          <Box component="span" sx={{ fontSize: "0.8em" }}>
            BMI
            <div>
              {calculation.weight_category}
            </div>
          </Box>
        </Box>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
