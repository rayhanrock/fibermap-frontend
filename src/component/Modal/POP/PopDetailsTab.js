import { useState, useEffect } from "react";
import PathConnection from "../PathConnection";
import { getPopConnectedPaths } from "../../../services";

const PopDetailsTab = ({ popId }) => {
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
  return (
    <>
      {connectionPaths?.map((path, index) => {
        return <PathConnection key={index} path={path} />;
      })}
    </>
  );
};

export default PopDetailsTab;
