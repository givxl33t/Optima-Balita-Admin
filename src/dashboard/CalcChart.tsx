import { Card, CardHeader, CardContent } from '@mui/material';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

import { subDays, addDays } from 'date-fns';

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

const lastDay = new Date();
const lastMonthDays = Array.from({ length: 30 }, (_, i) => subDays(lastDay, i));
const aMonthAgo = subDays(new Date(), 30);

const dateFormatter = (date: number): string =>
    new Date(date).toLocaleDateString();

const CalcChart = (props: { calculations?: NutritionCalc[] }) => {
  const { calculations } = props;

  const data = lastMonthDays.map((day) => {
    const dayCalc = calculations?.filter((calc) => {
      const calcDate = new Date(calc.created_at);
      return (
        calcDate.getFullYear() === day.getFullYear() &&
        calcDate.getMonth() === day.getMonth() &&
        calcDate.getDate() === day.getDate()
      );
    });
    return {
      date: day.getTime(),
      amount: dayCalc?.length || 0,
    };
  });

  return (
    <Card>
      <CardHeader title="30 Day Calculation Activity" />
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor=" #4d8f8f"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor=" #4d8f8f"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              name='Date'
              type='number'
              scale='time'
              domain={[
                addDays(aMonthAgo, 1).getTime(),
                new Date().getTime()
              ]}
              tickFormatter={dateFormatter}
            />
            <YAxis dataKey="amount" name="amount" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip
              labelFormatter={(label: any) => 
                dateFormatter(label)
              }
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke=" #4d8f8f"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default CalcChart;