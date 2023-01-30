import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Select,
  Option,
  Stack,
  Typography,
  ListItemDecorator,
} from "@mui/joy";
import * as React from "react";
import Add from "@mui/icons-material/Add";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import PropTypes from "prop-types";
import ErrorModal from "./ErrorModal";

const CreateProfileModalButton = ({ onProfileCreated }) => {
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState({
    error: "",
  });

  /**
   * Creates a new profile when the form is submitted
   */
  const createNewProfile = async event => {
    event.preventDefault();
    const data = new FormData(event.target);

    try {
      const user = await fetch("/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.get("name"),
          accessibility: data.get("accessibility"),
          price: data.get("price"),
        }),
      });
      if (user) {
        if (user.error) {
          setError({ error: user.error });
        } else {
          onProfileCreated();
        }
      } else {
        setError({ error: "Creating user failed 😨" });
      }
    } catch (e) {
      setError({ error: "Problems connecting to the server." });
    } finally {
      setOpen(false);
    }
  };

  return (
    <>
      <ErrorModal error={error} />
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<Add />}
        onClick={() => setOpen(true)}
      >
        😀 Create Profile
      </Button>
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
            Create new profile
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            mt={0.5}
            mb={2}
            textColor="text.tertiary"
          >
            Fill in your name and preferences
          </Typography>
          <form
            onSubmit={(event) => {
              createNewProfile(event);
            }}
          >
            <Stack spacing={2}>
              <FormControl required>
                <FormLabel>Name</FormLabel>
                <Input
                  autoFocus
                  required
                  placeholder="Leonardo Da Vinci"
                  id="name"
                  name="name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Select
                  startDecorator={<AttachMoneyIcon />}
                  placeholder="Select price…"
                  id="price"
                  name="price"
                >
                  <Option value="Free">
                    <ListItemDecorator>
                      <MoneyOffIcon />
                    </ListItemDecorator>
                    Free
                  </Option>
                  <Option value="Low">
                    <ListItemDecorator>
                      <AttachMoneyIcon />
                    </ListItemDecorator>
                    Low
                  </Option>
                  <Option value="High">
                    <ListItemDecorator>
                      <AttachMoneyIcon />
                    </ListItemDecorator>
                    High
                  </Option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>Accessibility</FormLabel>
                <Select
                  startDecorator={<AccessibilityIcon />}
                  placeholder="Select accessibility…"
                  id="accessibility"
                  name="accessibility"
                >
                  <Option value="Low">Low</Option>
                  <Option value="Medium">Medium</Option>
                  <Option value="High">High</Option>
                </Select>
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
};

CreateProfileModalButton.propTypes = {
  onProfileCreated: PropTypes.func.isRequired,
};

export default CreateProfileModalButton;
