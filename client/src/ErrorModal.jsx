import { Button, Modal, ModalDialog, Typography } from "@mui/joy";
import * as React from "react";
import PropTypes from "prop-types";

const ErrorModal = ({ arg }) => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState({
    error: "",
  });

  React.useEffect(() => {
    setError(arg);
    if (error && error.error) {
      setOpen(true);
    }
  }, [arg]);

  const closeAndClear = () => {
    setOpen(false);
    error.error = "";
  };

  return (
    <>
      {open && (
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog
            aria-labelledby="basic-modal-dialog-title"
            aria-describedby="basic-modal-dialog-description"
            sx={{
              maxWidth: 500,
              borderRadius: "md",
              p: 3,
              boxShadow: "lg",
            }}
          >
            <Typography
              id="basic-modal-dialog-title"
              component="h2"
              level="inherit"
              fontSize="1.25em"
              mb="0.25em"
            >
              Something went wrong! 😢
            </Typography>
            <Typography
              id="basic-modal-dialog-description"
              mt={0.5}
              mb={2}
              textColor="text.tertiary"
            >
              Error: {error.error}
            </Typography>
            <Button onClick={() => closeAndClear()}>Close</Button>
          </ModalDialog>
        </Modal>
      )}
    </>
  );
};

ErrorModal.propTypes = {
  arg: PropTypes.shape({
    error: PropTypes.string,
  }),
};

ErrorModal.defaultProps = {
  arg: {
    error: "",
  },
};

export default ErrorModal;
