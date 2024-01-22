import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { mapActions } from "../../store/map/reducer";
import { List, Button, Input, Icon, Grid } from "semantic-ui-react";
import AddJunction from "./AddJunction";

const Junction = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const hideAddJunction = () => {
    setVisible(false);
  };
  return (
    <Grid>
      <AddJunction show={visible} hide={hideAddJunction} />
      <Grid.Row style={{ marginTop: "20px" }}>
        <Grid.Column>
          <Input
            fluid
            icon={<Icon name="search" inverted circular link />}
            placeholder="Search..."
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <List divided relaxed style={{ overflow: "auto", maxHeight: "45vh" }}>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Junction A</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Junction B</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Junction C</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Junction A</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Junction B</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Junction C</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Junction B</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Junction C</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Junction A</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Junction B</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Junction C</List.Header>
              </List.Content>
            </List.Item>
          </List>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Button
            fluid
            secondary
            onClick={() => {
              dispatch(mapActions.setDrawLine(null));
              setVisible(true);
            }}
          >
            Create new Junction
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Junction;
