import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "../../store/map/reducer";
import { List, Button, Input, Icon, Grid } from "semantic-ui-react";
import AddGpon from "./AddGpon";
import { useMapContext } from "../../contexts/map-context";

const Gpon = () => {
  const dispatch = useDispatch();
  const gpons = useSelector((state) => state.map.gpons);
  const { map } = useMapContext();

  const [visible, setVisible] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredGpons = gpons?.filter((gpon) =>
    gpon.identifier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid>
      <AddGpon show={visible} setShow={setVisible} />
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
            {filteredGpons?.map((gpon) => (
              <List.Item
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(
                    mapActions.setModelLatlang({
                      lat: gpon.latitude,
                      lng: gpon.longitude,
                    })
                  );
                  map.flyTo([gpon.latitude, gpon.longitude], 13);
                }}
              >
                <List.Icon name="plug" size="large" verticalAlign="middle" />
                <List.Content>
                  <List.Header>{gpon.identifier}</List.Header>
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
            Create new TJ Box
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Gpon;
