import { CartesianGrid, Line, LineChart, Tooltip, XAxis, ResponsiveContainer, Label, YAxis } from 'recharts';
import BoysLengthZScores from './data/boysLengthZScoreDataset';
import GirlsLengthZScores from './data/girlsLengthZScoreDataset';
import BoysWeightZScores from './data/boysWeightZScoreDataset';
import GirlsWeightZScores from './data/girlsWeightZScoreDataset';

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

export const ZScoreLengthChart = ({ data }: { data: any }) => {
  let zScoreData;

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
    <ResponsiveContainer width="95%" height={600}>
      <LineChart data={zScoreData} margin={{ bottom: 20 }}>
        <CartesianGrid stroke="#eee" />
        <XAxis dataKey="Month" >
          <Label value="Month" offset={-10} position="insideBottom" />
        </XAxis>
        <YAxis label={{ value: 'Height (cm)', angle: -90, position: 'insideLeft', offset: 20 }} domain={[0, 125]} />
        <Tooltip />
        <Line type="monotone" dataKey="SD3" stroke={data.gender === "Laki-laki" ? "#8884d8" : "#d888e4"} name="Z-Score 3" dot={false} />
        <Line type="monotone" dataKey="SD2" stroke="#82ca9d" name="Z-Score 2" dot={false} />
        <Line type="monotone" dataKey="SD0" stroke="#ffc658" name="Z-Score 0" dot={false} />
        <Line type="monotone" dataKey="SD2neg" stroke={data.gender === "Laki-laki" ? "#ff0000" : "#ff8080"} name="Z-Score -2" dot={false} />
        <Line type="monotone" dataKey="SD3neg" stroke={data.gender === "Laki-laki" ? "#0000ff" : "#cc0077"} name="Z-Score -3" dot={false} />
        <Line type="monotone" dataKey="height" stroke="#01110a" name="Height" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export const ZScoreWeightChart = ({ data }: { data: any }) => {
  let zScoreData;

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
    <ResponsiveContainer width="95%" height={600} >
      <LineChart data={zScoreData} margin={{ bottom: 20 }} >
        <CartesianGrid stroke="#eee" />
        <XAxis dataKey="Month" >
          <Label value="Month" offset={-10} position="insideBottom" />
        </XAxis>
        <YAxis label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft', offset: 20 }} domain={[0, 30]} />
        <Tooltip />
        <Line type="monotone" dataKey="SD3" stroke={data.gender === "Laki-laki" ? "#8884d8" : "#d888e4"} name="Z-Score 3" dot={false} />
        <Line type="monotone" dataKey="SD2" stroke="#82ca9d" name="Z-Score 2" dot={false} />
        <Line type="monotone" dataKey="SD0" stroke="#ffc658" name="Z-Score 0" dot={false} />
        <Line type="monotone" dataKey="SD2neg" stroke={data.gender === "Laki-laki" ? "#ff0000" : "#ff8080"} name="Z-Score -2" dot={false} />
        <Line type="monotone" dataKey="SD3neg" stroke={data.gender === "Laki-laki" ? "#0000ff" : "#cc0077"} name="Z-Score -3" dot={false} />
        <Line type="monotone" dataKey="weight" stroke="#01110a" name="Weight" />
      </LineChart>
    </ResponsiveContainer>
  );
};