import { useState, useEffect } from "react";
import PathConnection from "../PathConnection";
import { getClientConnectedPaths } from "../../../services";

const ClientDetailsTab = ({ clientId }) => {
  const [connectionPaths, setConnectionPaths] = useState(null);
  console.log("cccc", connectionPaths);
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
  return (
    <>
      {connectionPaths?.map((path, index) => {
        return <PathConnection key={index} path={path} />;
      })}
    </>
  );
};

export default ClientDetailsTab;
