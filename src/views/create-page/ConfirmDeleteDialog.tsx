import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

interface Props {
  deleteHandler: () => void;
  openDeleteDialog: boolean;
  setOpenDeleteDialog: (e: boolean) => void;
}

export function ConfirmDeleteDialog(props: Props) {
  return (
    <Dialog
      open={props.openDeleteDialog}
      onClose={() => props.setOpenDeleteDialog(false)}
      style={{ padding: "10px" }}
    >
      <DialogContent>
        <DialogTitle>Delete table</DialogTitle>
        <DialogContentText>Are you sure?</DialogContentText>
        <Button
          variant={"contained"}
          color={"secondary"}
          onClick={props.deleteHandler}
        >
          Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}
