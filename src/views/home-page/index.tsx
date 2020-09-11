import React from "react";
import {
  Container,
  makeStyles,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles({
  grid: {
    margin: "0 auto",
    width: "60%",
  },
  signInColumn: {
    paddingTop: "50%",
    borderLeft: "1px solid black",
  },
});
interface Props {}

export function HomePage(props: Props) {
  const classes = useStyles();
  const reasons = ["First reason", "Second reason", "Final reason"];
  return (
    <Container>
      <Grid container spacing={3} xs={8} className={classes.grid}>
        <Grid item xs={12}>
          <Typography variant={"h2"} align={"center"}>
            Pros & cons
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <ListItemText>Why you should use it?</ListItemText>
            </ListItem>
            {reasons.map((item) => (
              <ListItem>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText>{item}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={6} className={classes.signInColumn}>
          <List>
            <ListItem>
              <Button variant={"contained"} color={"primary"}>
                Sign-in with Google
              </Button>
            </ListItem>
            <ListItem>
              <Button color="primary">Create without registration</Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}
