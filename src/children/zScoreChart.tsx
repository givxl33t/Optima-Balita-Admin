import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import BoysLengthZScores from './data/boysLengthZScoreDataset';
import GirlsLengthZScores from './data/girlsLengthZScoreDataset';
import BoysWeightZScores from './data/boysWeightZScoreDataset';
import GirlsWeightZScores from './data/girlsWeightZScoreDataset';

export const ZScoreLengthChart = ({ data }: { data: any }) => {
  let zScoreData;

  const convertAgeToMonth = (ageText: string) => {
    const matchWithYears = ageText.match(/(\d+)\s*tahun\s*(\d*)\s*bulan/);
    const matchWithoutYears = ageText.match(/(\d+)\s*bulan/);

    if (matchWithYears) {
      const years = parseInt(matchWithYears[1], 10);
      const months = parseInt(matchWithYears[2], 10);
      return years * 12 + months;
    } else if (matchWithoutYears) {
      const months = parseInt(matchWithoutYears[1], 10);
      return months;
    }
  };

  const transformedData = data.nutrition_histories
    .map((history: any) => ({
      ...history,
      month: convertAgeToMonth(history.age_text),
    }))
    .sort((a: any, b: any) => a.month - b.month);

  if (data.gender === "Laki-laki") {
    zScoreData = BoysLengthZScores.map((zScore: any) => ({
      ...zScore,
      height: transformedData.find((history: any) => history.month === zScore.Month)?.height,
    }));
  } else {
    zScoreData = GirlsLengthZScores.map((zScore: any) => ({
      ...zScore,
      height: transformedData.find((history: any) => history.month === zScore.Month)?.height,
    }));
  }

  return (
    <LineChart width={800} height={600} data={zScoreData}>
      <CartesianGrid stroke="#eee" />
      <XAxis dataKey="Month" />
      <YAxis label="cm" domain={[0, 125]} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="SD3" stroke="#8884d8" name="Z-Score 3" dot={false} />
      <Line type="monotone" dataKey="SD2" stroke="#82ca9d" name="Z-Score 2" dot={false} />
      <Line type="monotone" dataKey="SD0" stroke="#ffc658" name="Z-Score 0" dot={false} />
      <Line type="monotone" dataKey="SD2neg" stroke="#ff0000" name="Z-Score -2" dot={false} />
      <Line type="monotone" dataKey="SD3neg" stroke="#0000ff" name="Z-Score -3" dot={false} />
      <Line type="monotone" dataKey="height" stroke="#01110a" name="Length" />
    </LineChart>
  );
};

export const ZScoreWeightChart = ({ data }: { data: any }) => {
  let zScoreData;

  const convertAgeToMonth = (ageText: string) => {
    const matchWithYears = ageText.match(/(\d+)\s*tahun\s*(\d*)\s*bulan/);
    const matchWithoutYears = ageText.match(/(\d+)\s*bulan/);

    if (matchWithYears) {
      const years = parseInt(matchWithYears[1], 10);
      const months = parseInt(matchWithYears[2], 10);
      return years * 12 + months;
    } else if (matchWithoutYears) {
      const months = parseInt(matchWithoutYears[1], 10);
      return months;
    }
  };

  const transformedData = data.nutrition_histories
    .map((history: any) => ({
      ...history,
      month: convertAgeToMonth(history.age_text),
    }))
    .sort((a: any, b: any) => a.month - b.month);

  if (data.gender === "Laki-laki") {
    zScoreData = BoysWeightZScores.map((zScore: any) => ({
      ...zScore,
      weight: transformedData.find((history: any) => history.month === zScore.Month)?.weight,
    }));
  } else {
    zScoreData = GirlsWeightZScores.map((zScore: any) => ({
      ...zScore,
      weight: transformedData.find((history: any) => history.month === zScore.Month)?.weight,
    }));
  }

  return (
    <LineChart width={800} height={600} data={zScoreData}>
      <CartesianGrid stroke="#eee" />
      <XAxis dataKey="Month" />
      <YAxis label="kg" domain={[0, 30]} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="SD3" stroke="#8884d8" name="Z-Score 3" dot={false} />
      <Line type="monotone" dataKey="SD2" stroke="#82ca9d" name="Z-Score 2" dot={false} />
      <Line type="monotone" dataKey="SD0" stroke="#ffc658" name="Z-Score 0" dot={false} />
      <Line type="monotone" dataKey="SD2neg" stroke="#ff0000" name="Z-Score -2" dot={false} />
      <Line type="monotone" dataKey="SD3neg" stroke="#0000ff" name="Z-Score -3" dot={false} />
      <Line type="monotone" dataKey="weight" stroke="#01110a" name="Weight" />
    </LineChart>
  );
};