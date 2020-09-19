import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import React from "react";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import { IS_LOGGED_IN } from "../../components/private-route";
import { postQuery } from "../../graphql/queries/post.query";
import { postMutation } from "../../graphql/mutations/post.mutation";

const useStyles = makeStyles({
  grid: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20px",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  paper: {
    padding: "10px",
    margin: "5px",
  },
  textField: {
    margin: "0 20px",
  },
  title: { display: "flex", justifyContent: "center" },
  dialog: {
    padding: "10px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid black",
  },
});

interface IDataItem {
  focused: boolean;
  title: string;
  pros: boolean;
  new?: boolean;
}

interface Props extends RouteComponentProps {}

function CreatePageComponent(props: Props) {
  const postId = (props.match.params as any).id;
  const history = useHistory();
  const classes = useStyles();
  const isLoggedInData = useQuery(IS_LOGGED_IN);
  const [getPostData, postData] = useLazyQuery(postQuery.GET_POST);
  const [addData, addDataStatus] = useMutation(postMutation.ADD_POST_DATA);
  const [removeData, removeDataStatus] = useMutation(
    postMutation.REMOVE_POST_DATA
  );
  const [updateData, updateDataStatus] = useMutation(
    postMutation.UPDATE_POST_DATA
  );
  const [updateTitle, updateTitleStatus] = useMutation(
    postMutation.UPDATE_POST_TITLE
  );
  const [deletePost, deletePostStatus] = useMutation(postMutation.DELETE_POST, {
    variables: { id: postId },
  });
  const online = isLoggedInData.data.isLoggedIn && postData.data && postId;
  const [titleFocused, setTitleFocused] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [data, setData] = React.useState<IDataItem[]>([]);
  const [prosCount, setProsCount] = React.useState(0);
  const [consCount, setConsCount] = React.useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  React.useEffect(() => {
    if (postId !== null && isLoggedInData.data.isLoggedIn) {
      getPostData({
        variables: {
          id: postId,
        },
      });
    }
  }, [postId]);

  React.useEffect(() => {
    if (postData.data) {
      setTitle(postData.data.Post.title);
      setData(
        postData.data.Post.data.map((item: IDataItem) => ({
          focused: false,
          title: item.title,
          pros: item.pros,
        }))
      );
    } else {
      setTitle(`Your's table name`);
      setData([
        {
          focused: false,
          title: "Pros 1",
          pros: true,
        },
        {
          focused: false,
          title: "Cons 1",
          pros: false,
        },
      ]);
    }
  }, [postData]);

  React.useEffect(() => {
    const pros = data.filter((item) => item.pros === true);
    setProsCount(pros.length);
    setConsCount(data.length - pros.length);
  }, [data]);

  const saveTitleHandler = () => {
    setTitleFocused(false);
    if (online) {
      if (postData.data.Post.title !== title)
        updateTitle({ variables: { title, id: postId } });
    }
  };

  const focusedHandler = (item: IDataItem, focused: boolean) => {
    const index = data.findIndex(
      (dataItem: any) =>
        dataItem.title === item.title && dataItem.pros === item.pros
    );
    let newData: any = [...data];
    newData[index].focused = focused;

    setData([...data]);
  };

  const itemTitleChangeHandler = (item: IDataItem, title: string) => {
    focusedHandler(item, false);
    let newData: any = [...data];
    const index = newData.findIndex(
      (dataItem: any) =>
        dataItem.title === item.title && dataItem.pros === item.pros
    );
    const oldTitle = newData[index].title;
    newData[index].title = title;
    setData([...data]);
    if (online) {
      if (item.new) {
        delete item.new;
        addData({
          variables: {
            id: postId,
            pros: item.pros,
            title: item.title,
          },
        });
      } else {
        updateData({
          variables: {
            postId,
            dataTitle: oldTitle,
            pros: item.pros,
            newDataTitle: title,
          },
        });
      }
    }
  };

  const addHandler = (pros: boolean) => {
    const newData = [...data];
    newData.push({
      title: `item ${newData.length}`,
      pros,
      focused: true,
      new: true,
    });

    setData(newData);
  };

  const deleteHandler = async () => {
    if (openDeleteDialog) {
      setOpenDeleteDialog(false);
      await deletePost();
      history.push("/list");
    } else {
      setOpenDeleteDialog(true);
    }
  };

  const deletePostData = async (item: IDataItem) => {
    const newData = [...data];
    const index = newData.findIndex(
      (el) => el.title === item.title && el.pros === item.pros
    );
    newData.splice(index, 1);
    if (online) {
      removeData({
        variables: {
          postId,
          dataTitle: item.title,
          pros: item.pros,
        },
      });
    }
    setData(newData);
  };

  const renderItems = (pros: boolean) => {
    const renderData: any[] = data;
    return renderData.map((item: IDataItem, index) => {
      if (item.pros === pros) {
        return (
          <ListItem key={item.title + index} className={classes.item}>
            {item.focused ? (
              <TextField
                defaultValue={item.title}
                onBlur={(e) => itemTitleChangeHandler(item, e.target.value)}
                autoFocus
              />
            ) : (
              <>
                <Typography onClick={() => focusedHandler(item, true)}>
                  {item.title}
                </Typography>
                <IconButton onClick={() => deletePostData(item)}>
                  <HighlightOffIcon />
                </IconButton>
              </>
            )}
          </ListItem>
        );
      }
    });
  };

  return (
    <Container>
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        className={classes.dialog}
      >
        <DialogContent>
          <DialogTitle>Delete table</DialogTitle>
          <DialogContentText>Are you sure?</DialogContentText>
          <Button
            variant={"contained"}
            color={"secondary"}
            onClick={deleteHandler}
          >
            Delete
          </Button>
        </DialogContent>
      </Dialog>
      {postData.loading ? (
        <CircularProgress />
      ) : (
        <Grid container xs={12} lg={10} className={classes.grid}>
          <Grid item xs={12} lg={10}>
            <Paper className={classes.paper}>
              <div className={classes.header}>
                <IconButton onClick={() => history.push("/list")}>
                  <ArrowBackIcon />
                </IconButton>
                {titleFocused ? (
                  <div className={classes.title}>
                    <TextField
                      fullWidth
                      className={classes.textField}
                      placeholder={"Title"}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <Button startIcon={<SaveIcon />} onClick={saveTitleHandler}>
                      Save
                    </Button>
                  </div>
                ) : (
                  <div className={classes.title}>
                    <Typography variant={"h6"}>{title}</Typography>
                    <IconButton
                      onClick={() => {
                        setTitleFocused(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </div>
                )}
                <div style={{ display: "flex" }}>
                  {(deletePostStatus.loading ||
                    updateDataStatus.loading ||
                    addDataStatus.loading ||
                    removeDataStatus.loading ||
                    updateTitleStatus.loading) && <CircularProgress />}
                  {isLoggedInData.data.isLoggedIn && (
                    <Button startIcon={<DeleteIcon />} onClick={deleteHandler}>
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6} lg={5}>
            <Paper className={classes.paper}>
              <List>
                <ListItem>
                  <Typography variant={"h6"}>Pros - {prosCount}</Typography>
                </ListItem>
                {renderItems(true)}
                <ListItem>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => addHandler(true)}
                  >
                    Add to pros
                  </Button>
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={6} lg={5}>
            <Paper className={classes.paper}>
              <List>
                <ListItem>
                  <Typography variant={"h6"}>Cons - {consCount}</Typography>
                </ListItem>
                {renderItems(false)}
                <ListItem>
                  <Button
                    startIcon={<AddIcon />}
                    onClick={() => addHandler(false)}
                  >
                    Add to pros
                  </Button>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export const CreatePage = withRouter(CreatePageComponent);
