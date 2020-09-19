import { useMutation, useQuery } from "@apollo/client";
import {
  Container,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Button,
  makeStyles,
  List,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { postMutation } from "../../graphql/mutations/post.mutation";
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
  tableItem: {
    display: "block",
  },
  dialog: {
    padding: "10px",
  },
});

interface Props {}

export function ListPage(props: Props) {
  const meData = useQuery(userQuery.ME);
  const [createPost] = useMutation(postMutation.CREATE_POST);
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");

  const renderData =
    !meData.loading && !meData.error && meData.data && meData.data.Me;

  const logoutHandler = async () => {
    logoutUser();
    meData.client.clearStore();
    history.push("/");
  };

  const createHandler = async () => {
    setOpen(false);
    const createdPost = await createPost({
      variables: {
        title,
      },
    });
    history.push(`/post/${createdPost.data.CreatePost}`);
  };

  return (
    <Container>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className={classes.dialog}
      >
        <DialogContent>
          <DialogTitle>Enter name for new table</DialogTitle>
          <TextField
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button onClick={createHandler}>Create</Button>
        </DialogContent>
      </Dialog>
      <Grid container xs={12} lg={10} className={classes.grid}>
        <Grid item xs={12} lg={10}>
          <Paper className={classes.paper}>
            {renderData ? (
              <div className={classes.user}>
                <Typography variant={"h6"}>{meData.data.Me.email}</Typography>
                <div>
                  <Button
                    size={"medium"}
                    startIcon={<AddIcon />}
                    onClick={() => setOpen(true)}
                  >
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
          <Grid item={true} xs={12} lg={10} className={classes.list}>
            <Paper className={classes.paper}>
              <Typography variant={"h6"}>Your tables</Typography>
              {meData.data.Me.posts && meData.data.Me.posts.length > 0 && (
                <List className={classes.paper}>
                  {meData.data.Me.posts.map((item: any) => {
                    return (
                      <Link
                        to={`post/${item.id}`}
                        className={classes.tableItem}
                      >
                        <Typography variant={"button"}>{item.title}</Typography>
                      </Link>
                    );
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
