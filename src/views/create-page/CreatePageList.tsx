import {
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { IDataItem } from ".";

interface Props {
  classes: any;
  data: any[];
  itemTitleChangeHandler: (item: IDataItem, str: string) => void;
  deletePostData: (item: IDataItem) => void;
  focusedHandler: (item: IDataItem, e: boolean) => void;
  addHandler: (e: boolean) => void;
}

export function CreatePageList(props: Props) {
  const [prosCount, setProsCount] = React.useState(0);
  const [consCount, setConsCount] = React.useState(0);

  React.useEffect(() => {
    const pros = props.data.filter((item) => item.pros === true);
    setProsCount(pros.length);
    setConsCount(props.data.length - pros.length);
  }, [props.data]);

  const renderItems = (pros: boolean) => {
    return props.data.map((item: IDataItem, index) => {
      if (item.pros === pros) {
        return (
          <RenderItem
            item={item}
            itemTitleChangeHandler={props.itemTitleChangeHandler}
            focusedHandler={props.focusedHandler}
            deletePostData={props.deletePostData}
          />
        );
      }
      return null;
    });
  };

  return (
    <React.Fragment>
      <Grid item xs={6} lg={5}>
        <Paper className={props.classes.paper}>
          <List>
            <ListItem>
              <Typography variant={"h6"}>Pros - {prosCount}</Typography>
            </ListItem>
            {renderItems(true)}
            <ListItem>
              <Button
                startIcon={<AddIcon />}
                onClick={() => props.addHandler(true)}
              >
                Add to pros
              </Button>
            </ListItem>
          </List>
        </Paper>
      </Grid>
      <Grid item xs={6} lg={5}>
        <Paper className={props.classes.paper}>
          <List>
            <ListItem>
              <Typography variant={"h6"}>Cons - {consCount}</Typography>
            </ListItem>
            {renderItems(false)}
            <ListItem>
              <Button
                startIcon={<AddIcon />}
                onClick={() => props.addHandler(false)}
              >
                Add to pros
              </Button>
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

// RenderItem component
const useStyles = makeStyles({
  item: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid black",
  },
});

interface ItemProps {
  item: IDataItem;
  itemTitleChangeHandler: (item: IDataItem, str: string) => void;
  focusedHandler: (item: IDataItem, e: boolean) => void;
  deletePostData: (item: IDataItem) => void;
}

export function RenderItem(props: ItemProps) {
  const classes = useStyles();
  return (
    <ListItem key={props.item.id} className={classes.item}>
      {props.item.focused ? (
        <TextField
          defaultValue={props.item.title}
          onBlur={(e) =>
            props.itemTitleChangeHandler(props.item, e.target.value)
          }
          autoFocus
        />
      ) : (
        <React.Fragment>
          <Typography onClick={() => props.focusedHandler(props.item, true)}>
            {props.item.title}
          </Typography>
          <IconButton onClick={() => props.deletePostData(props.item)}>
            <HighlightOffIcon />
          </IconButton>
        </React.Fragment>
      )}
    </ListItem>
  );
}
