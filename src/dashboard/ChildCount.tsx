import ChildCareIcon from '@mui/icons-material/ChildCare';
import CardWithIcon from './CardWithIcon';

interface Props {
  value?: number;
}

const ChildCount = (props: Props) => {
  const { value } = props;
  return (
    <CardWithIcon
      icon={ChildCareIcon}
      title="Child Count"
      subtitle={value ? value.toString() : "0"}
      to="/children"
    />
  );
}

export default ChildCount;