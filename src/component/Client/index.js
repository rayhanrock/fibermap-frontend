import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "../../store/map/reducer";
import { List, Button, Input, Icon, Grid } from "semantic-ui-react";
import AddClient from "./AddClient";
import { useMapContext } from "../../contexts/map-context";

const Client = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.map.clients);
  const { map } = useMapContext();
  const [visible, setVisible] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients?.filter((client) =>
    client.identifier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid>
      <AddClient show={visible} setShow={setVisible} />
      <Grid.Row style={{ marginTop: "20px" }}>
        <Grid.Column>
          <Input
            fluid
            placeholder="Search..."
            value={searchTerm}
            icon={
              <Icon
                name="close"
                size="small"
                link
                onClick={() => setSearchTerm("")}
              />
            }
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <List divided relaxed style={{ overflow: "auto", maxHeight: "45vh" }}>
            {filteredClients?.map((client) => (
              <List.Item
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(
                    mapActions.setModelLatlang({
                      lat: client.latitude,
                      lng: client.longitude,
                    })
                  );
                  map.flyTo([client.latitude, client.longitude], 13);
                }}
              >
                <List.Icon name="home" size="large" verticalAlign="middle" />
                <List.Content>
                  <List.Header>{client.identifier}</List.Header>
                </List.Content>
              </List.Item>
            ))}
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
