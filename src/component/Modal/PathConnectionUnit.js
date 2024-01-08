import { Segment } from "semantic-ui-react";

const style = {
  textAlign: "center",
  padding: "0",
  paddingTop: "1px",
  paddingBottom: "1px",
  minWidth: "6rem",
};
const PathConnectionUnit = () => (
  <div style={{ display: "flex", marginTop: "5px", marginBottom: "5rem" }}>
    <div style={{ flex: 1 }}>
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
    {["red", "green", "yellow", "olive", "orange"].map((i) => {
      return (
        <div style={{ flex: 1 }}>
          <Segment basic style={style}>
            Orange
          </Segment>
          <Segment basic color={i} style={style}>
            Orange
          </Segment>
          <Segment basic color={i} style={style}>
            Yellow
          </Segment>
          <Segment basic color={i} style={style}>
            Olive
          </Segment>
          <Segment basic color={i} style={style}>
            Orange
          </Segment>
          <Segment basic color={i} style={style}></Segment>
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
        3200
      </Segment>
      <Segment basic color="grey" style={style}>
        &nbsp;
      </Segment>
      <Segment basic color="grey" style={style}>
        &nbsp;
      </Segment>
      <Segment basic color="grey" style={style}>
        &nbsp;
      </Segment>
    </div>
  </div>
);

export default PathConnectionUnit;
