import Bullet from "../Chart/Bullet";

const Popularity = ({ value, className }) => {
  const classes = {
    measure: "stroke-[7px] stroke-sky-400",
  };
  return (
    <div className={className}>
      <Bullet
        width={25}
        height={96}
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
