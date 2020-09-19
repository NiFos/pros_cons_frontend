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
  marginAuto: {
    margin: "0 auto",
  },
  textAlign: {
    textAlign: "center",
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
    if (!meData.loading && !meData.error && meData.data && meData.data.Me) {
      history.push("/list");
    }
  });
  return (
    <Container>
      <Grid container spacing={3} xs={12} lg={8} className={classes.marginAuto}>
        <Grid item={true} xs={12} lg={8} className={classes.marginAuto}>
          <Typography variant={"h2"} align={"center"}>
            Pros & cons
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6} className={classes.marginAuto}>
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
          <Grid
            item={true}
            xs={12}
            lg={6}
            className={[classes.signInColumn, classes.marginAuto].join(" ")}
          >
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
                <Button
                  color="primary"
                  onClick={() => {
                    history.push("/create");
                  }}
                >
                  Create without registration
                </Button>
              </ListItem>
            </List>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
