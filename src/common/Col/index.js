import cls from "classnames";

export default function Col({ xs, sm, md, lg, className, children }) {
  const classes = cls(className, {
    ["col-" + xs]: xs >= 1 && xs <= 12,
    ["col-sm-" + sm]: sm >= 1 && sm <= 12,
    ["col-md-" + md]: md >= 1 && md <= 12,
    ["col-lg-" + lg]: lg >= 1 && lg <= 12,
  });

  return <div className={classes}>{children}</div>;
}
