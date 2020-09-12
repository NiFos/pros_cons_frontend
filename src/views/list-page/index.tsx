import { useQuery } from "@apollo/client";
import {
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Button,
  makeStyles,
  List,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { userQuery } from "../../graphql/queries/user.query";
import { logoutUser } from "../../lib/auth";

const useStyles = makeStyles({
  grid: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20px",
    justifyContent: "center",
  },
  paper: {
    padding: "10px",
  },
  user: {
    display: "flex",
    justifyContent: "space-between",
  },
  list: {
    marginTop: "20px",
  },
});

interface Props {}

export function ListPage(props: Props) {
  const meData = useQuery(userQuery.ME);
  const history = useHistory();
  const classes = useStyles();
  const renderData =
    !meData.loading && !meData.error && meData.data && meData.data.Me;
  const logoutHandler = async () => {
    logoutUser();
    meData.client.clearStore();
    history.push("/");
  };
  return (
    <Container>
      <Grid container xs={10} className={classes.grid}>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            {renderData ? (
              <div className={classes.user}>
                <Typography variant={"h6"}>{meData.data.Me.email}</Typography>
                <div>
                  <Button size={"medium"} startIcon={<AddIcon />}>
                    Add
                  </Button>
                  <Button onClick={logoutHandler}>Logout</Button>
                </div>
              </div>
            ) : (
              <CircularProgress />
            )}
          </Paper>
        </Grid>
        {renderData ? (
          <Grid item={true} xs={10} className={classes.list}>
            <Paper className={classes.paper}>
              <Typography variant={"h6"}>Your tables</Typography>
              {meData.data.Me.posts && meData.data.Me.posts.length > 0 && (
                <List className={classes.paper}>
                  {meData.data.Me.posts.map((item: any) => {
                    return <Link to={`table/${item.id}`}>{item.title}</Link>;
                  })}
                </List>
              )}
            </Paper>
          </Grid>
        ) : null}
      </Grid>
    </Container>
  );
}
