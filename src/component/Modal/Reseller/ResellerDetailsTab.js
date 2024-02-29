import { useState, useEffect } from "react";
import PathConnection from "../PathConnection";
import { getResellerConnectedPaths } from "../../../services";
import { Button, Segment } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { mapActions } from "../../../store/map/reducer";

const ResellerDetailsTab = ({ resellerId, modalClose }) => {
  const dispatch = useDispatch();
  const [connectionPaths, setConnectionPaths] = useState(null);

  console.log("paths", connectionPaths);
  useEffect(() => {
    getPaths(resellerId);
  }, []);

  const getPaths = async (id) => {
    try {
      const { data, status } = await getResellerConnectedPaths(id);
      if (status === 200) {
        setConnectionPaths(data);
      }
    } catch (error) {
      return { data: null, status: null, error };
    }
  };

  const handleHighlightPath = (paths) => {
    dispatch(mapActions.setHighlightPath(paths));
    modalClose();
  };
  return (
    <>
      {connectionPaths && connectionPaths.length > 0 ? (
        connectionPaths.map((path, index) => {
          return (
            <>
              <Button onClick={() => handleHighlightPath(path.path_direction)}>
                SHOW PATH ON MAP
              </Button>
              <PathConnection key={index} path={path} />
            </>
          );
        })
      ) : (
        <Segment textAlign="center" secondary attached basic>
          No path to show
        </Segment>
      )}
    </>
  );
};

export default ResellerDetailsTab;
