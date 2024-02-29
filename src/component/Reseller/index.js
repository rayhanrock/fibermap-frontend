import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapActions } from "../../store/map/reducer";
import { List, Button, Input, Icon, Grid } from "semantic-ui-react";
import { useMapContext } from "../../contexts/map-context";
import AddReseller from "./AddReseller";

const Reseller = () => {
  const dispatch = useDispatch();
  const resellers = useSelector((state) => state.map.resellers);
  const { map } = useMapContext();
  const [visible, setVisible] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredResellers = resellers?.filter((reseller) =>
    reseller.identifier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Grid>
      <AddReseller show={visible} setShow={setVisible} />
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
            {filteredResellers?.map((reseller) => (
              <List.Item
                key={reseller.identifier + reseller.id}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(
                    mapActions.setModelLatlang({
                      lat: reseller.latitude,
                      lng: reseller.longitude,
                    })
                  );
                  map.flyTo([reseller.latitude, reseller.longitude]);
                }}
              >
                <List.Icon name="home" size="large" verticalAlign="middle" />
                <List.Content>
                  <List.Header>{reseller.identifier}</List.Header>
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
            Create new Reseller
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Reseller;
