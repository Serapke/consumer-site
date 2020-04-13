import * as React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
      textAlign: "center",
      color: "#909090",
      lineHeight: "30px",
    },
  })
);

interface OwnProps {
  primaryText: string;
  secondaryText?: string;
}

const EmptyState = ({ primaryText, secondaryText }: OwnProps) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div>{primaryText}</div>
      <div>{secondaryText}</div>
    </div>
  );
};

export default EmptyState;
