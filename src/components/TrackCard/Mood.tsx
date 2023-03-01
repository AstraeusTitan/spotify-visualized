import clsx from "clsx";
import Bullet from "../Chart/Bullet";
export type MoodData = {
  measure: number;
  compare: number;
};
type MoodProps = {
  bulletWidth: number;
  height: number;
  accousticness: MoodData;
  danceability: MoodData;
  energy: MoodData;
  instrumentalness: MoodData;
  liveness: MoodData;
  loudness: MoodData;
  speachiness: MoodData;
  valence: MoodData;
  className?: string;
};

const Mood = ({
  bulletWidth,
  height,
  accousticness,
  danceability,
  energy,
  instrumentalness,
  liveness,
  loudness,
  speachiness,
  valence,
  className,
}: MoodProps) => {
  const chartWidth = bulletWidth;
  const chartHeight = height;
  const MoodBullet = ({ min = 0, max = 1, label, values }) => {
    const classes = {
      measure: "stroke-[7px] stroke-sky-400",
      axis: "stroke-zinc-400",
      compare: "stroke-zinc-600 stroke-[2px]",
    };
    return (
      <Bullet
        width={chartWidth}
        height={chartHeight}
        min={min}
        max={max}
        measure={values.measure}
        compare={values.compare}
        label={label}
        margins={{
          top: 5,
          left: 5,
          right: 5,
        }}
        classes={classes}
      />
    );
  };
  const baseClasses = ["flex", "flex-row", "justify-evenly", "max-w-sm"];
  return (
    <div className={clsx(baseClasses, className)}>
      <MoodBullet values={accousticness} label="A" />
      <MoodBullet values={danceability} label="D" />
      <MoodBullet values={energy} label="E" />
      <MoodBullet values={instrumentalness} label="I" />
      <MoodBullet values={liveness} label="LI" />
      <MoodBullet values={loudness} min={-65} max={0} label="LO" />
      <MoodBullet values={speachiness} label="S" />
      <MoodBullet values={valence} label="V" />
    </div>
  );
};
export default Mood;
