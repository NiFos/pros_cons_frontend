import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { RouteComponentProps, useHistory, withRouter } from "react-router-dom";
import { IS_LOGGED_IN } from "../../components/private-route";
import { postQuery } from "../../graphql/queries/post.query";
import { postMutation } from "../../graphql/mutations/post.mutation";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import { CreatePageHeader } from "./CreatePageHeader";
import { CreatePageList } from "./CreatePageList";

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
});

const defaultDataValues = [
  {
    focused: false,
    title: "Pros 1",
    pros: true,
    id: "0",
  },
  {
    focused: false,
    title: "Cons 1",
    pros: false,
    id: "1",
  },
];

export interface IDataItem {
  id: string;
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
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  React.useEffect(() => {
    if (postId !== null && isLoggedInData.data.isLoggedIn) {
      getPostData({
        variables: {
          id: postId,
        },
      });
    }
  }, [getPostData, isLoggedInData.data.isLoggedIn, postId]);

  React.useEffect(() => {
    if (postData.data) {
      setTitle(postData.data.Post.title);
      setData(
        postData.data.Post.data.map((item: IDataItem) => ({
          id: item.id,
          focused: false,
          title: item.title,
          pros: item.pros,
        }))
      );
    } else {
      setTitle(`Your's table name`);
      setData(defaultDataValues);
    }
  }, [postData]);

  const saveTitleHandler = () => {
    setTitleFocused(false);
    if (online) {
      if (postData.data.Post.title !== title)
        updateTitle({ variables: { title, id: postId } });
    }
  };

  const focusedHandler = (item: IDataItem, focused: boolean) => {
    const index = data.findIndex((dataItem: any) => dataItem.id === item.id);
    let newData: any = [...data];
    newData[index].focused = focused;

    setData([...data]);
  };

  const itemTitleChangeHandler = async (item: IDataItem, title: string) => {
    focusedHandler(item, false);
    let newData: any = [...data];
    const index = newData.findIndex((dataItem: any) => dataItem.id === item.id);
    newData[index].title = title;
    if (online) {
      if (item.new) {
        delete item.new;
        const response = await addData({
          variables: {
            postId,
            pros: item.pros,
            title: item.title,
          },
        });
        newData[index].id = response.data.AddPostData;
      } else {
        updateData({
          variables: {
            postId,
            dataId: item.id,
            newDataTitle: title,
          },
        });
      }
    }
    setData([...data]);
  };

  const addHandler = (pros: boolean) => {
    const newData = [...data];
    newData.push({
      title: `item ${newData.length}`,
      pros,
      focused: true,
      new: true,
      id: `${newData.length + 1}`,
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
    const index = newData.findIndex((el) => el.id === item.id);
    newData.splice(index, 1);
    if (online) {
      removeData({
        variables: {
          postId,
          dataId: item.id,
        },
      });
    }
    setData(newData);
  };

  return (
    <Container>
      <ConfirmDeleteDialog
        deleteHandler={deleteHandler}
        openDeleteDialog={openDeleteDialog}
        setOpenDeleteDialog={setOpenDeleteDialog}
      />
      {postData.loading ? (
        <CircularProgress />
      ) : (
        <Grid container xs={12} lg={10} className={classes.grid}>
          {/* Header */}
          <CreatePageHeader
            loading={
              deletePostStatus.loading ||
              updateDataStatus.loading ||
              addDataStatus.loading ||
              removeDataStatus.loading ||
              updateTitleStatus.loading
            }
            classes={classes}
            saveTitleHandler={saveTitleHandler}
            isLoggedIn={isLoggedInData.data.isLoggedIn}
            deleteHandler={deleteHandler}
            setTitle={setTitle}
            setTitleFocused={setTitleFocused}
            title={title}
            titleFocused={titleFocused}
          />
          {/* List */}
          <CreatePageList
            classes={classes}
            data={data}
            deletePostData={deletePostData}
            focusedHandler={focusedHandler}
            itemTitleChangeHandler={itemTitleChangeHandler}
            addHandler={addHandler}
          />
        </Grid>
      )}
    </Container>
  );
}

export const CreatePage = withRouter(CreatePageComponent);
