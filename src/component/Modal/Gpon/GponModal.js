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
      menuItem: "Connection",
      pane: (
        <TabPane attached={false} as={Segment} basic style={{ padding: 0 }}>
          <GponConnectionTab gponId={gponId} />
        </TabPane>
      ),
    },
    {
      menuItem: "Details",
      pane: (
        <TabPane attached={false} basic style={{ padding: 0 }}>
          <GponDetailsTab gponId={gponId} modalClose={onClose} />
        </TabPane>
      ),
    },
  ];
  return (
    <Modal open onClose={onClose} size="large">
      <ModalHeader>TJ Box Details</ModalHeader>
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
