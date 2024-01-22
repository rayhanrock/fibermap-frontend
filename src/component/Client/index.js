import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { mapActions } from "../../store/map/reducer";
import { List, Button, Input, Icon, Grid } from "semantic-ui-react";
import AddClient from "./AddClient";

const Client = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const hideAddClient = () => {
    setVisible(false);
  };
  return (
    <Grid>
      <AddClient show={visible} hide={hideAddClient} />
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
                <List.Header>Client A</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Client B</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Client C</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Client A</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Client B</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Client C</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Client B</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Client C</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Client A</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Client B</List.Header>
              </List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="github" size="large" verticalAlign="middle" />
              <List.Content>
                <List.Header>Client C</List.Header>
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
            Create new Client
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Client;
