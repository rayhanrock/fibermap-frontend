import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import PathConstants from "../routes/pathConstants";
import { Link } from "react-router-dom";

export default class MenuExampleSecondaryPointing extends Component {
  state = { activeItem: "home" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <>
        <Menu pointing secondary>
          <Menu.Item
            name="dashboard"
            active={activeItem === "dashboard"}
            onClick={this.handleItemClick}
            to={PathConstants.DASHBOARD}
            as={Link}
          />
          <Menu.Item
            name="network-point"
            active={activeItem === "network-point"}
            onClick={this.handleItemClick}
            to={PathConstants.NETWORK_POINT}
            as={Link}
          />
          <Menu.Item
            name="planing"
            active={activeItem === "planing"}
            onClick={this.handleItemClick}
            to={PathConstants.PLANING}
            as={Link}
          />
          <Menu.Menu position="right">
            <Menu.Item
              name="logout"
              active={activeItem === "logout"}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
      </>
    );
  }
}
