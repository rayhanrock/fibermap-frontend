import React from "react";
import { Menu } from "semantic-ui-react";
import PathConstants from "../routes/pathConstants";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth/reducer";
const Header = () => {
  const [activeItem, setActiveItem] = React.useState("dashboard");

  const handleItemClick = (e, { name }) => setActiveItem(name);
  const dispatch = useDispatch();

  return (
    <>
      <Menu pointing secondary>
        <Menu.Item
          name="dashboard"
          active={activeItem === "dashboard"}
          onClick={handleItemClick}
          to={PathConstants.DASHBOARD}
          as={Link}
        />
        <Menu.Item
          name="network-point"
          active={activeItem === "network-point"}
          onClick={handleItemClick}
          to={PathConstants.NETWORK_POINT}
          as={Link}
        />
        {/* <Menu.Item
          name="planing"
          active={activeItem === "planing"}
          onClick={handleItemClick}
          to={PathConstants.PLANING}
          as={Link}
        /> */}
        <Menu.Item
          name="Create User"
          active={activeItem === "create User"}
          onClick={handleItemClick}
          to={PathConstants.CREATE_USER}
          as={Link}
        />
        {/* <Menu.Item
          name="Backup"
          active={activeItem === "Backup"}
          onClick={handleItemClick}
          to={PathConstants.BACKUP}
          as={Link}
        /> */}
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            active={activeItem === "logout"}
            onClick={() => dispatch(authActions.authLogout())}
          />
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default Header;
