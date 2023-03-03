import { AudioFeatures } from "@/utilities/Spotify/Api";
import clsx from "clsx";
import Bullet from "../Chart/Bullet";
export type MoodData = {
  measure: number;
  compare: number;
};
type MoodProps = {
  features?: AudioFeatures;
  averages?: AudioFeatures;
  className?: string;
};

const Mood = ({ features, averages, className }: MoodProps) => {
  const chartWidth = 25;
  const chartHeight = 128;
  const MoodBullet = ({
    min = 0,
    max = 1,
    label,
    measure,
    compare,
  }: {
    min?: number;
    max?: number;
    label: string;
    measure: number;
    compare?: number;
  }) => {
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
        measure={measure}
        compare={compare}
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
      <MoodBullet
        measure={features?.acousticness || 0}
        compare={averages?.acousticness}
        label="A"
      />
      <MoodBullet
        measure={features?.danceability || 0}
        compare={averages?.danceability}
        label="D"
      />
      <MoodBullet
        measure={features?.energy || 0}
        compare={averages?.energy}
        label="E"
      />
      <MoodBullet
        measure={features?.instrumentalness || 0}
        compare={averages?.instrumentalness}
        label="I"
      />
      <MoodBullet
        measure={features?.liveness || 0}
        compare={averages?.liveness}
        label="LI"
      />
      <MoodBullet
        measure={features?.loudness || -65}
        compare={averages?.loudness}
        min={-65}
        max={0}
        label="LO"
      />
      <MoodBullet
        measure={features?.speechiness || 0}
        compare={averages?.speechiness}
        label="S"
      />
      <MoodBullet
        measure={features?.valence || 0}
        compare={averages?.valence}
        label="V"
      />
    </div>
  );
};
export default Mood;
