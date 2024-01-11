import { Segment } from "semantic-ui-react";

const style = {
  textAlign: "center",
  padding: "0",
  paddingTop: "1px",
  paddingBottom: "1px",
  whiteSpace: "nowrap",
};
const PathConnection = ({ path }) => (
  <div style={{ display: "flex", marginTop: "5px", marginBottom: "5rem" }}>
    <div
      style={{
        flex: 1,
      }}
    >
      <Segment basic style={style}>
        Model
      </Segment>
      <Segment basic color="grey" style={style}>
        Cable ID
      </Segment>
      <Segment basic color="grey" style={style}>
        Name
      </Segment>
      <Segment basic color="grey" style={style}>
        Color
      </Segment>
      <Segment basic color="grey" style={style}>
        Core
      </Segment>
      <Segment basic color="grey" style={style}>
        Distance
      </Segment>
    </div>
    {path.path_direction.map((item, index) => {
      return (
        <div style={{ flex: 1 }} key={index}>
          <Segment basic style={style}>
            {item.model_type + " >"}
          </Segment>
          <Segment basic color={item.color} style={style}>
            {item.cable_identifier}
          </Segment>
          <Segment basic color={item.color} style={style}>
            {item.model_identifier}
          </Segment>
          <Segment basic color={item.color} style={style}>
            {item.color}
          </Segment>
          <Segment basic color={item.color} style={style}>
            {item.total_cable_core}
          </Segment>
          <Segment basic color={item.color} style={style}>
            {item.cable_length}
          </Segment>
        </div>
      );
    })}
    <div style={{ flex: 1 }}>
      <Segment basic style={style}>
        &nbsp;
      </Segment>
      <Segment basic color="grey" style={style}>
        Total length
      </Segment>
      <Segment basic color="grey" style={style}>
        {path.total_length}
      </Segment>
      <Segment basic color="grey" style={style}>
        &nbsp;
      </Segment>
      <Segment basic style={style}>
        &nbsp;
      </Segment>
      <Segment basic style={style}>
        &nbsp;
      </Segment>
    </div>
  </div>
);

export default PathConnection;
