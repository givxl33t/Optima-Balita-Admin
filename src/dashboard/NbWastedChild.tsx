import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import CardWithIcon from './CardWithIcon';

interface Props {
  value?: number;
}

const NbStuntedChild= (props: Props) => {
  const { value } = props;
  return (
    <CardWithIcon
      icon={GppMaybeIcon}
      title="Balita Terindikasi Wasting"
      subtitle={value ? value.toString() : "0"}
      to="/children"
    />
  );
}

export default NbStuntedChild;