import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import Chip from "@mui/joy/Chip";
import Typography from "@mui/joy/Typography";
import { Fireworks } from "@fireworks-js/react";
import { useEffect, useRef } from "react";
import ErrorModal from "./ErrorModal";

const UserProfile = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState({
    error: "",
  });

  const fireworks = useRef(null);

  /**
   * Fetches a new user from the server and updates the state
   */
  const loadNewUser = async () => {
    try {
      const response = await fetch("/user/last");
      const json = await response.json();

      if (json.error) {
        setError({ error: json.error });
        return;
      }
      if (!json.user) {
        setError({ error: "No user found" });
        return;
      }

      setData(json.user);
    } catch (e) {
      setError({ error: "Problems connecting to the server." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fireworks.current.stop();
    // noinspection JSIgnoredPromiseFromCall
    loadNewUser();
  }, []);

  React.useEffect(() => {
    if (data && data.length !== 0) {
      setIsLoading(false);
    }
  }, [data]);

  /**
   * Launches fireworks when the profile is clicked, just for fun
   */
  const onProfileClick = () => {
    fireworks.current.launch(25);
  };

  return (
    <>
      <ErrorModal error={error} />
      <Fireworks
        ref={fireworks}
        options={{
          rocketsPoint: {
            min: 0,
            max: 100,
          },
        }}
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "fixed",
          zIndex: -1,
        }}
      />
      {!isLoading && Object.keys(data).length !== 0 && (
        <Card
          variant="outlined"
          row
          sx={{
            width: 320,
            gap: 2,
            "&:hover": {
              boxShadow: "md",
              borderColor: "neutral.outlinedHoverBorder",
            },
          }}
          onClick={() => onProfileClick()}
        >
          <AspectRatio ratio="1" sx={{ width: 90 }}>
            <img
              src="https://source.unsplash.com/random?profile&w=84"
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <div>
            <Typography level="h2" fontSize="lg" id="card-description" mb={0.5}>
              {data.name}
            </Typography>
            <Chip
              variant="outlined"
              color="primary"
              size="sm"
              sx={{ pointerEvents: "none", m: 0.5 }}
            >
              Price: {!data.price ? "Any" : data.price}
            </Chip>
            <Chip
              variant="outlined"
              color="primary"
              size="sm"
              sx={{ pointerEvents: "none", m: 0.5 }}
            >
              Accessibility: {!data.accessibility ? "Any" : data.accessibility}
            </Chip>
          </div>
        </Card>
      )}
    </>
  );
};
export default UserProfile;
