import GponDetailsTab from "./GponDetailsTab";
import GponConnectionTab from "./GponConnectionTab";
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

const GponModal = ({ gponId, onClose }) => {
  const panes = [
    {
      menuItem: "Details",
      pane: (
        <TabPane attached={false}>
          <GponDetailsTab gponId={gponId} />
        </TabPane>
      ),
    },
    {
      menuItem: "Connection",
      pane: (
        <TabPane attached={false} as={Segment} basic style={{ padding: 0 }}>
          <GponConnectionTab gponId={gponId} />
        </TabPane>
      ),
    },
  ];
  return (
    <Modal open onClose={onClose} size="large">
      <ModalHeader>Gpon Details</ModalHeader>
      <ModalContent scrolling>
        <ModalDescription>
          <Tab
            renderActiveOnly={false}
            menu={{ secondary: true, pointing: true }}
            panes={panes}
          />
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

export default GponModal;
