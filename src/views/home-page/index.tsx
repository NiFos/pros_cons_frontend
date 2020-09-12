import React from "react";
import {
  Container,
  makeStyles,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { useQuery } from "@apollo/client";
import { authQuery } from "../../graphql/queries/auth.query";
import { userQuery } from "../../graphql/queries/user.query";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  grid: {
    margin: "0 auto",
    width: "60%",
  },
  signInColumn: {
    paddingTop: "50%",
    borderLeft: "1px solid black",
  },
});
interface Props {}

export function HomePage(props: Props) {
  const classes = useStyles();
  const history = useHistory();
  const reasons = ["First reason", "Second reason", "Final reason"];
  const meData = useQuery(userQuery.ME);
  const googleOauthLinkData = useQuery(authQuery.GET_GOOGLE_OAUTH_LINK, {
    variables: { type: "google" },
  });

  const handleLink = () => {
    if (
      googleOauthLinkData &&
      googleOauthLinkData.data &&
      googleOauthLinkData.data.Auth
    ) {
      window.location.replace(googleOauthLinkData.data.Auth);
    }
  };

  React.useEffect(() => {
    if (!meData.loading && !meData.error && meData.data) {
      history.push("/list");
    }
  });
  return (
    <Container>
      <Grid container spacing={3} xs={8} className={classes.grid}>
        <Grid item={true} xs={12}>
          <Typography variant={"h2"} align={"center"}>
            Pros & cons
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <ListItemText>Why you should use it?</ListItemText>
            </ListItem>
            {reasons.map((item) => (
              <ListItem key={item}>
                <ListItemIcon>
                  <CheckIcon />
                </ListItemIcon>
                <ListItemText>{item}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Grid>
        {meData.loading ? (
          <CircularProgress />
        ) : (
          <Grid item={true} xs={6} className={classes.signInColumn}>
            <List>
              <ListItem>
                <Button
                  variant={"contained"}
                  color={"primary"}
                  onClick={handleLink}
                >
                  Sign-in with Google
                </Button>
              </ListItem>
              <ListItem>
                <Button color="primary">Create without registration</Button>
              </ListItem>
            </List>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
