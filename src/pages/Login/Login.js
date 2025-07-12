import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Header,
  Loader,
} from "semantic-ui-react";
import { authLogin } from "../../store/auth/actions";
import isEmptyStirng from "../../utility/isEmptyStirng";

import styles from "./Login.module.css"; // Import CSS Module

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
    // <Grid
    //   centered
    //   stackable
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     height: "100vh",
    //     backgroundColor: "#F0F0F0",
    //   }}
    // >
    //   <Grid.Column
    //     mobile={12}
    //     tablet={10}
    //     computer={8}
    //     style={{ maxWidth: "450px" }}
    //   >
    //     <Header
    //       style={{
    //         marginTop: "15px",
    //         paddingBottom: "13px",
    //         marginBottom: "25px",

    //         textAlign: "center",
    //       }}
    //       textAlign="left"
    //       as="h1"
    //       dividing
    //     >
    //       Login to your account
    //     </Header>
    //     <Form onSubmit={handleSubmit}>
    //       <Form.Field>
    //         <label style={{ color: "grey" }}>Username</label>
    //         <input type="text" name="username" placeholder="example@mail.com" />
    //       </Form.Field>
    //       <Form.Field>
    //         <label style={{ color: "grey" }}>Password</label>
    //         <input
    //           type="password"
    //           name="password"
    //           placeholder="At least 6 characters"
    //         />
    //       </Form.Field>
    //       <Form.Field>
    //         <Checkbox
    //           label={
    //             <label style={{ color: "grey", fontWeight: "bold" }}>
    //               Remember me
    //             </label>
    //           }
    //         />
    //       </Form.Field>
    //       <Button secondary className="fluid" type="submit">
    //         {loading ? <Loader active inline size="tiny" /> : "Login"}
    //       </Button>
    //     </Form>
    //   </Grid.Column>
    // </Grid>
    <div className={styles["login-container"]}>
      <div className={styles.background}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <form onSubmit={handleSubmit} className={styles["login-form"]}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          placeholder="User ID"
          id="username"
          name="username"
          className={styles.input}
          value="admin"
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="At least 6 characters"
          id="password"
          name="password"
          className={styles.input}
          value="admin"
        />

        <button
          type="submit"
          className={styles.button}
          style={{ marginTop: 35 }}
        >
          {loading ? <Loader active inline size="tiny" /> : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
