import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Divider, Stack } from "@mui/joy";
import CategoryIcon from "@mui/icons-material/Category";
import OpenInNew from "@mui/icons-material/OpenInNew";

export default function ActivitySuggestion() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  function loadNewActivity() {
    fetch("/activity")
      .then((response) => response.json())
      .then((json) => {
        setIsLoading(false);
        setData(json);
      })
      .catch((error) => console.log(error));
  }

  React.useEffect(() => {
    loadNewActivity();
  }, []);

  React.useEffect(() => {
    if (data.length !== 0) {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <>
      {!isLoading && (
        <Card variant="outlined" sx={{ width: 640 }}>
          <Stack
            direction="column"
            alignItems="flex-start"
            sx={{ p: 1 }}
            spacing={1}
          >
            <Typography level="h2" fontSize="md">
              {data.activity}
            </Typography>
            <Typography level="body2">
              <CategoryIcon sx={{ mr: 1 }} />
              {data.type}
            </Typography>
          </Stack>
          <IconButton
            aria-label="refresh"
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
            onClick={() => {
              setIsLoading(true);
              loadNewActivity();
            }}
          >
            <RefreshIcon />
          </IconButton>
          {/*Attempt to get a decent illustration by using the first 5 words of the activity title*/}
          <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
            <img
              src={`https://source.unsplash.com/random?${data.activity
                .split(" ", 5)
                .join(",")}`}
              loading="lazy"
              alt=""
            />
          </AspectRatio>
          <Stack sx={{ p: 2 }} direction="row">
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" />}
              spacing={2}
            >
              <div>
                <Typography level="body3">Price:</Typography>
                <Typography fontSize="lg" fontWeight="lg">
                  {data.price}
                </Typography>
              </div>
              <div>
                <Typography level="body3">Accessibility:</Typography>
                <Typography fontSize="lg" fontWeight="lg">
                  {data.accessibility}
                </Typography>
              </div>
              <div>
                <Typography level="body3">Participants:</Typography>
                <Typography fontSize="lg" fontWeight="lg">
                  {data.participants}
                </Typography>
              </div>
            </Stack>
            {data.link && (
              <Button
                variant="solid"
                size="sm"
                color="primary"
                aria-label="Explore Bahamas Islands"
                sx={{ ml: "auto", fontWeight: 600 }}
                component="a"
                href={data.link}
                startDecorator={<OpenInNew />}
              >
                Explore
              </Button>
            )}
          </Stack>
        </Card>
      )}
    </>
  );
}
