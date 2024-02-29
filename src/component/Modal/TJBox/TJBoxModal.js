import { useState } from "react";
import TJBoxConnectionTab from "./TJBoxConnectionTab";
import TJBoxCreateSplitterTab from "./TJBoxCreateSplitterTab";
import TJBoxDetailsTab from "./TJBoxDetailsTab";
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

const TJBoxModal = ({ tjboxId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const panes = [
    {
      menuItem: "Connection",

      render: () => (
        <TabPane attached={false} as={Segment} basic loading={loading}>
          <TJBoxConnectionTab tjboxId={tjboxId} setLoading={setLoading} />
        </TabPane>
      ),
    },
    {
      menuItem: "Create Splitter",

      render: () => (
        <TabPane attached={false} as={Segment} basic>
          <TJBoxCreateSplitterTab tjboxId={tjboxId} />
        </TabPane>
      ),
    },
    {
      menuItem: "Details",

      render: () => (
        <TabPane attached={false} as={Segment} basic>
          <TJBoxDetailsTab tjboxId={tjboxId} modalClose={onClose} />
        </TabPane>
      ),
    },
  ];

  return (
    <Modal open onClose={onClose} size="large">
      <ModalHeader>Tj Box Details</ModalHeader>
      <ModalContent>
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

export default TJBoxModal;
