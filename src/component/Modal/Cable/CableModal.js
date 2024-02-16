import {
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Button,
  Icon,
  Modal,
  TabPane,
  Tab,
  Segment,
} from "semantic-ui-react";
import CableEditTab from "./CableEditTab";
import CableDetailsTab from "./CableDetailsTab";
import { useEffect, useState } from "react";
import { getCableDetails } from "../../../services";
import handleError from "../../../utility/handleError";
const CableModal = ({ cableId, onClose }) => {
  const panes = [
    {
      menuItem: "Details",
      render: () => (
        <TabPane as={Segment}>
          <CableDetailsTab cableId={cableId} />
        </TabPane>
      ),
    },
    {
      menuItem: "Edit",
      render: () => (
        <TabPane attached={false} as={Segment} basic style={{ padding: 0 }}>
          <CableEditTab cableId={cableId} modalClose={onClose} />
        </TabPane>
      ),
    },
  ];
  return (
    <Modal open onClose={onClose} size="large">
      <ModalHeader>Cable </ModalHeader>
      <ModalContent scrolling>
        <ModalDescription>
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        </ModalDescription>
      </ModalContent>
      <ModalActions>
        <Button onClick={onClose} secondary>
          Close <Icon name="chevron right" />
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default CableModal;
