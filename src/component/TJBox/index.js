import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "../../store/map/reducer";
import { List, Button, Input, Icon, Grid } from "semantic-ui-react";
import { useMapContext } from "../../contexts/map-context";
import AddTJBox from "./AddTJBox";

const TJBox = () => {
  const dispatch = useDispatch();
  const tjboxs = useSelector((state) => state.map.tjboxs);
  const { map } = useMapContext();

  const [visible, setVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTJBoxs = tjboxs?.filter((tjbox) =>
    tjbox.identifier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid>
      <AddTJBox show={visible} setShow={setVisible} />
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
            {filteredTJBoxs?.map((tjbox) => (
              <List.Item
                key={tjbox.identifier + tjbox.id}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(
                    mapActions.setModelLatlang({
                      lat: tjbox.latitude,
                      lng: tjbox.longitude,
                    })
                  );
                  map.flyTo([tjbox.latitude, tjbox.longitude]);
                }}
              >
                <List.Icon
                  name="deviantart"
                  size="large"
                  verticalAlign="middle"
                />
                <List.Content>
                  <List.Header>{tjbox.identifier}</List.Header>
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

export default TJBox;
