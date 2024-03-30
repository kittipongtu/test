import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Divider, Typography } from "@mui/material";

const ConfirmationDialog = ({
  open,
  options,
  onCancel,
  onConfirm,
  onClose,
}) => {
  const {
    title,
    description,
    content,
    confirmationText,
    cancellationText,
    dialogProps,
    dialogActionsProps,
    confirmationButtonProps,
    cancellationButtonProps,
    titleProps,
    contentProps,
    allowClose,
    confirmationKeyword,
    confirmationKeywordTextFieldProps,
    hideCancelButton,
    buttonOrder,
  } = options;

  const [confirmationKeywordValue, setConfirmationKeywordValue] =
    React.useState("");

  const confirmationButtonDisabled =
    confirmationKeyword && confirmationKeywordValue !== confirmationKeyword;

  const confirmationContent = (
    <>
      {confirmationKeyword && (
        <TextField
          onChange={(e) => setConfirmationKeywordValue(e.target.value)}
          value={confirmationKeywordValue}
          fullWidth
          {...confirmationKeywordTextFieldProps}
        />
      )}
    </>
  );

  const dialogActions = buttonOrder.map((buttonType) => {
    if (buttonType === "cancel") {
      return (
        !hideCancelButton && (
          <Button key="cancel" {...cancellationButtonProps} onClick={onCancel}>
            <Typography
              fontSize={"small"}
              color={"red"}
              fontFamily={"Kanit,sans-serif"}
            >
              {cancellationText}
            </Typography>
          </Button>
        )
      );
    }

    if (buttonType === "confirm") {
      return (
        <Button
          key="confirm"
          color="primary"
          disabled={confirmationButtonDisabled}
          {...confirmationButtonProps}
          onClick={onConfirm}
        >
          <Typography
            fontSize={"small"}
            color={"green"}
            fontFamily={"Kanit,sans-serif"}
          >
            {confirmationText}
          </Typography>
        </Button>
      );
    }

    throw new Error(
      `Supported button types are only "confirm" and "cancel", got: ${buttonType}`
    );
  });

  return (
    <Dialog
      fullWidth
      {...dialogProps}
      open={open}
      onClose={allowClose ? onClose : null}
      maxWidth={"xs"} // --- md
    >
      {title && (
        <DialogTitle {...titleProps}>
          <Typography
            fontSize={"large"}
            fontWeight={"bold"}
            fontFamily={"Kanit,sans-serif"}
          >
            {title}
          </Typography>
        </DialogTitle>
      )}
      <Divider></Divider>
      {content ? (
        <DialogContent {...contentProps}>
          {content}
          {confirmationContent}
        </DialogContent>
      ) : description ? (
        <DialogContent {...contentProps}>
          <DialogContentText height={"7vh"}>
            <Typography fontSize={"smaller"} fontFamily={"Kanit,sans-serif"}>
              {description}
            </Typography>
          </DialogContentText>
          {confirmationContent}
        </DialogContent>
      ) : (
        confirmationKeyword && (
          <DialogContent {...contentProps}>{confirmationContent}</DialogContent>
        )
      )}
      <Divider></Divider>
      <DialogActions {...dialogActionsProps}>{dialogActions}</DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
