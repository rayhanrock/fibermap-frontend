import {
  Grid,
  Loader,
  Header,
  Form,
  Button,
  GridColumn,
  Segment,
  Image,
  Checkbox,
} from "semantic-ui-react";
import isEmptyStirng from "../utility/isEmptyStirng";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { authLogin } from "../store/auth/actions";
import { Navigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import googolePlay from "../assets/images/google-play.png";
import appStore from "../assets/images/softifybd-play-badge.png";

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
    <Grid
      centered
      stackable
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Grid.Column
        mobile={12}
        tablet={10}
        computer={8}
        style={{ maxWidth: "450px" }}
      >
        <div>
          <Image
            centered
            src={logo}
            alt="logo"
            style={{ height: "150px", width: "200px" }}
          />
        </div>
        <Header
          style={{
            marginTop: "15px",
            paddingBottom: "13px",
            marginBottom: "25px",

            textAlign: "center",
          }}
          textAlign="left"
          as="h1"
          dividing
        >
          Maijdee Supernet
          <Header.Subheader>Optical Fiber Management Map</Header.Subheader>
        </Header>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label style={{ color: "grey" }}>Username</label>
            <input type="text" name="username" placeholder="example@mail.com" />
          </Form.Field>
          <Form.Field>
            <label style={{ color: "grey" }}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="At least 6 characters"
            />
          </Form.Field>
          <Form.Field>
            <Checkbox
              label={
                <label style={{ color: "grey", fontWeight: "bold" }}>
                  Remember me
                </label>
              }
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
