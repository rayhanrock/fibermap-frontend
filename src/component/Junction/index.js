import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "../../store/map/reducer";
import { List, Button, Input, Icon, Grid } from "semantic-ui-react";
import AddJunction from "./AddJunction";
import { useMapContext } from "../../contexts/map-context";

const Junction = () => {
  const dispatch = useDispatch();
  const junctions = useSelector((state) => state.map.junctions);
  const { map } = useMapContext();

  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredJunctions = junctions?.filter((junction) =>
    junction.identifier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid>
      <AddJunction show={visible} setShow={setVisible} />
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
            {filteredJunctions?.map((junction) => (
              <List.Item
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(
                    mapActions.setModelLatlang({
                      lat: junction.latitude,
                      lng: junction.longitude,
                    })
                  );
                  map.flyTo([junction.latitude, junction.longitude], 13);
                }}
              >
                <List.Icon
                  name="deviantart"
                  size="large"
                  verticalAlign="middle"
                />
                <List.Content>
                  <List.Header>{junction.identifier}</List.Header>
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
            Create new Junction
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Junction;
