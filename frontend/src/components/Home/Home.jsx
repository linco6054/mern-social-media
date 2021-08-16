import { Container, Grow, Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPosts } from "../../redux/actions/posts";
import Form from "../Form/Form";
import AllPosts from "../Posts/AllPosts";
import useStyle from "./styles";
function Home() {
  const classes = useStyle();
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();
  console.log(currentId);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid
          className={classes.mainContainer}
          spacing={3}
          container
          justify="space-between"
          alignItems="stretch"
        >
          <Grid item xs={12} sm={7}>
            <AllPosts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
