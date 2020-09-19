import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import SaveIcon from "@material-ui/icons/Save";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import React from "react";
import { useHistory } from "react-router-dom";

interface Props {
  classes: any;
  loading: boolean;
  isLoggedIn: boolean;
  titleFocused: boolean;
  title: string;
  saveTitleHandler: () => void;
  deleteHandler: () => void;
  setTitleFocused: (e: boolean) => void;
  setTitle: (str: string) => void;
}

export function CreatePageHeader(props: Props) {
  const history = useHistory();

  return (
    <Grid item xs={12} lg={10}>
      <Paper className={props.classes.paper}>
        <div className={props.classes.header}>
          <IconButton onClick={() => history.push("/list")}>
            <ArrowBackIcon />
          </IconButton>
          {props.titleFocused ? (
            <div className={props.classes.title}>
              <TextField
                fullWidth
                className={props.classes.textField}
                placeholder={"Title"}
                value={props.title}
                onChange={(e) => props.setTitle(e.target.value)}
              />
              <Button startIcon={<SaveIcon />} onClick={props.saveTitleHandler}>
                Save
              </Button>
            </div>
          ) : (
            <div className={props.classes.title}>
              <Typography variant={"h6"}>{props.title}</Typography>
              <IconButton
                onClick={() => {
                  props.setTitleFocused(true);
                }}
              >
                <EditIcon />
              </IconButton>
            </div>
          )}
          <div style={{ display: "flex" }}>
            {props.loading && <CircularProgress />}
            {props.isLoggedIn && (
              <Button startIcon={<DeleteIcon />} onClick={props.deleteHandler}>
                Delete
              </Button>
            )}
          </div>
        </div>
      </Paper>
    </Grid>
  );
}
