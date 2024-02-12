import { useState, useEffect } from "react";
import PathConnection from "../PathConnection";
import { getPopConnectedPaths } from "../../../services";
import { Button } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { mapActions } from "../../../store/map/reducer";

const PopDetailsTab = ({ popId, modalClose }) => {
  const dispatch = useDispatch();
  const [connectionPaths, setConnectionPaths] = useState(null);
  useEffect(() => {
    getPaths(popId);
  }, []);

  const getPaths = async (id) => {
    try {
      const { data, status } = await getPopConnectedPaths(id);
      if (status === 200) {
        setConnectionPaths(data);
      }
    } catch (error) {
      return { data: null, status: null, error };
    }
  };
  const handleHighlightPath = (paths) => {
    dispatch(mapActions.setHighlightPath(paths));
    console.log("handleHighlightPath", paths);
    modalClose();
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

export default PopDetailsTab;
