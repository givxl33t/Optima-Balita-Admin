import React, { CSSProperties } from 'react';
import { useMediaQuery, Theme } from '@mui/material';

import ChildCount from './ChildCount';
import NbStuntedChild from './NbStuntedChild';
import NbWastedChild from './NbWastedChild';
import NbObeseChild from './NbObeseChild';
import LatestDiscussions from './LatestDiscussion';
import LatestArticles from './LatestArticle';
import LatestCalc from './LatestCalc';
import CalcChart from './CalcChart';
import { useGetList } from 'react-admin';

const styles = {
  flex: { display: 'flex' },
  flexColumn: { display: 'flex', flexDirection: 'column' },
  leftCol: { flex: 1, marginRight: '0.5em' },
  rightCol: { flex: 1, marginLeft: '0.5em' },
  singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const Dashboard: React.FC = () => {
  const isXsmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );

  const isSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('lg')
  );

  const { data: nutritionHistories } = useGetList('nutritionHistory');
  const tenLatestNutritionHistories = nutritionHistories?.slice(0, 10);

  const { data: children } = useGetList('children');
  const childrenCount = children?.length || 0;

  const stuntedChildrenCount = children?.filter((child: any) => {
    const latest_height_category = child?.latest_height_category;
    return latest_height_category === "Stunted" || latest_height_category === "Severely Stunted";
  })?.length;

  const wastedChildrenCount = children?.filter((child: any) => {
    const latest_weight_category = child?.latest_weight_category;
    const latest_mass_category = child?.latest_mass_category;
    return latest_weight_category === "Wasted" 
      || latest_weight_category === "Severely Wasted"
      || latest_mass_category === "Wasted"
      || latest_mass_category === "Severely Wasted";
  })?.length;

  const obeseChildrenCount = children?.filter((child: any) => {
    const latest_mass_category = child?.latest_mass_category;
    const latest_weight_category = child?.latest_weight_category;
    return latest_weight_category === "Obese" || latest_mass_category === "Obese";
  })?.length;


  return isXsmall ? (
    <div>
      <div style={styles.flexColumn as CSSProperties}>
        <VerticalSpacer />
        <NbStuntedChild value={stuntedChildrenCount} />
        <VerticalSpacer />
        <NbWastedChild value={wastedChildrenCount} />
        <VerticalSpacer />
        <NbObeseChild value={obeseChildrenCount} />
        <VerticalSpacer />
        <CalcChart calculations={nutritionHistories as any[]} />
        <VerticalSpacer />
        <LatestCalc calculations={tenLatestNutritionHistories as any[]} />
      </div>
    </div>
  ) : isSmall ? (
    <div style={styles.flexColumn as CSSProperties}>
      <VerticalSpacer />
      <div style={styles.flex}>
        <ChildCount value={childrenCount} />
        <Spacer />
        <NbStuntedChild value={stuntedChildrenCount} />
      </div>
      <VerticalSpacer />
      <div style={styles.flex}>
        <NbWastedChild value={wastedChildrenCount} />
        <Spacer />
        <NbObeseChild value={obeseChildrenCount} />
      </div>
      <div style={styles.singleCol}>
        <CalcChart calculations={nutritionHistories as any[]} />
      </div>
      <div style={styles.singleCol}>
          <LatestCalc calculations={tenLatestNutritionHistories as any[]} />
      </div>
    </div>
  ) : (
    <>
      <VerticalSpacer />
      <div style={styles.flex}>
        <div style={styles.leftCol}>
          <div style={{ marginBottom: '1em' }}>
            <div style={styles.flex}>
              <ChildCount value={childrenCount} />
              <Spacer />
              <NbStuntedChild value={stuntedChildrenCount} />
            </div>
          </div>
          <div style={styles.singleCol}>
            <div style={styles.flex}>
              <NbWastedChild value={wastedChildrenCount} />
              <Spacer />
              <NbObeseChild value={obeseChildrenCount} />
            </div>
          </div>
          <div style={styles.singleCol}>
            <CalcChart calculations={nutritionHistories as any[]} />
          </div>
          <div style={styles.singleCol}>
            <LatestCalc calculations={tenLatestNutritionHistories as any[]} />
          </div>
        </div>
        <div style={styles.rightCol}>
          <div style={styles.flex}>
            <LatestDiscussions />
            <Spacer />
            <LatestArticles />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;