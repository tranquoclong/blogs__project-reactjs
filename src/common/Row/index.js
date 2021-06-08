import cls from "classnames";

export default function Row({ children, className, gutters = true }) {
  const classes = cls("row", className, {
    // 'tcl-no-gutters': gutters === false,
    "no-gutters": !gutters,
  });

  return <div className={classes}>{children}</div>;
}
