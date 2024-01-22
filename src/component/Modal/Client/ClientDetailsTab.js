import { useState, useEffect, useContext } from "react";
import PathConnection from "../PathConnection";
import { getClientConnectedPaths } from "../../../services";
import { Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { mapActions } from "../../../store/map/reducer";

const ClientDetailsTab = ({ clientId }) => {
  const dispatch = useDispatch();
  const [connectionPaths, setConnectionPaths] = useState(null);

  console.log("paths", connectionPaths);
  useEffect(() => {
    getPaths(clientId);
  }, []);

  const getPaths = async (id) => {
    try {
      const { data, status } = await getClientConnectedPaths(id);
      if (status === 200) {
        setConnectionPaths(data);
      }
    } catch (error) {
      return { data: null, status: null, error };
    }
  };

  const handleHighlightPath = (paths) => {
    dispatch(mapActions.setHighlightPath(paths));
  };
  return (
    <>
      {connectionPaths?.map((path, index) => {
        return (
          <>
            <Button onClick={() => handleHighlightPath(path.path_direction)}>
              SHOW PATH ON MAP
            </Button>
            <PathConnection key={index} path={path} />
          </>
        );
      })}
    </>
  );
};

export default ClientDetailsTab;
