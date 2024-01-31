import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "../../store/map/reducer";
import { useMapContext } from "../../contexts/map-context";

import { List, Button, Input, Grid, Icon } from "semantic-ui-react";
import AddPop from "./AddPop";
const Pop = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const pops = useSelector((state) => state.map.pops);
  const { map } = useMapContext();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPops = pops?.filter((pop) =>
    pop.identifier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid>
      <AddPop show={visible} setShow={setVisible} />
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
            {filteredPops?.map((pop) => (
              <List.Item
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(
                    mapActions.setModelLatlang({
                      lat: pop.latitude,
                      lng: pop.longitude,
                    })
                  );
                  map.flyTo([pop.latitude, pop.longitude], 13);
                }}
              >
                <List.Icon
                  name="building"
                  size="large"
                  verticalAlign="middle"
                />
                <List.Content>
                  <List.Header>{pop.identifier}</List.Header>
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
            Create new Pop
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Pop;
