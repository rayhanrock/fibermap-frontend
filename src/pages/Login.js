import { Grid, Loader, Header, Form, Button } from "semantic-ui-react";
import isEmptyStirng from "../utility/isEmptyStirng";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../store/auth/actions";
import { Navigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const token = useSelector((state) => state.auth.token);

  if (token !== null) {
    return <Navigate to="/" />;
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    if (isEmptyStirng(username)) {
      toast.error("Username is required !");
    } else if (isEmptyStirng(password)) {
      toast.error("Password is required !");
    } else {
      dispatch(authLogin(username, password));
    }
  };

  return (
    <Grid centered>
      <Grid.Column mobile={12} tablet={10} computer={8}>
        <Header
          style={{ marginTop: "15px", marginBottom: "30px" }}
          textAlign="center"
          as="h2"
          dividing
        >
          SUPERNET
          <Header.Subheader>Hello, who’s this?</Header.Subheader>
        </Header>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>Username</label>
            <input type="text" name="username" placeholder="example@mail.com" />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="At least 6 characters"
            />
          </Form.Field>
          <Button secondary className="fluid" type="submit">
            {loading ? <Loader active inline size="tiny" /> : "Login"}
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
