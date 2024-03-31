import { Grid, Loader, Header, Form, Button } from "semantic-ui-react";
import isEmptyStirng from "../utility/isEmptyStirng";
import { toast } from "react-toastify";
import { signUp } from "../services/auth";
import handleError from "../utility/handleError";
import { useState } from "react";

const CreateUser = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;
    const c_password = event.target.c_password.value;

    if (isEmptyStirng(username)) {
      toast.error("Username is required !");
      return;
    } else if (isEmptyStirng(password)) {
      toast.error("Password is required !");
      return;
    } else if (isEmptyStirng(c_password)) {
      toast.error("Enter Confirm Password !");
      return;
    }

    const payload = {
      username: username,
      password: password,
      confirm_password: c_password,
    };
    setLoading(true);
    const response = await signUp(payload);
    if (response.status === 201) {
      toast.success("User Created Successfully");
    }
    if (response.error) {
      handleError(response.error);
    }
    setLoading(false);
  };

  return (
    <Grid centered>
      <Grid.Column mobile={12} tablet={10} computer={8}>
        <Header
          style={{
            marginTop: "15px",
            paddingBottom: "13px",
            marginBottom: "25px",

            textAlign: "center",
          }}
          textAlign="center"
          as="h2"
          dividing
        >
          Hi there !
          <Header.Subheader>Want to create a new account?</Header.Subheader>
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
          <Form.Field>
            <label>Confirm password</label>
            <input
              type="password"
              name="c_password"
              placeholder="Enter password again"
            />
          </Form.Field>
          <Button secondary className="fluid" type="submit">
            {loading ? <Loader active inline size="tiny" /> : "Create User"}
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default CreateUser;
