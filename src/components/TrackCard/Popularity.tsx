import Bullet from "../Chart/Bullet";

export type PopularityProps = {
  value: number;
  height: number;
  className?: string;
};
const Popularity = ({ value, height, className }: PopularityProps) => {
  const classes = {
    measure: "stroke-[7px] stroke-sky-400",
    axis: "stroke-zinc-400",
  };
  return (
    <div className={className}>
      <Bullet
        width={25}
        height={height || 96}
        min={0}
        max={100}
        measure={value}
        margins={{
          top: 5,
          left: 5,
          right: 5,
        }}
        classes={classes}
      />
    </div>
  );
};

export default Popularity;
