import { Segment } from "semantic-ui-react";
import PathConnectionUnit from "../PathConnectionUnit";

const ClientDetailsTab = () => (
  <>
    {[1, 2, 3].map((i) => {
      return <PathConnectionUnit key={i} />;
    })}
  </>
);

export default ClientDetailsTab;
