import { PointsHistoryBanner_section } from "./sections/PointsHistoryBanner_section";
import { PointsHistoryData_section } from "./sections/PointsHistoryData_section";
import style from "./styles/pointsHistory.module.scss";

export const PointsHistoryComponent = () => {
  return (
    <main className={style.pointsHistory}>
      <PointsHistoryBanner_section />
      <PointsHistoryData_section />
    </main>
  );
};
