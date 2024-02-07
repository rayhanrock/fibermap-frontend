import PopConnectionTab from "./PopConnectionTab";
import PopDetailsTab from "./PopDetailsTab";
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

const PopModal = ({ popId, popType, onClose }) => {
  const panes = [
    {
      menuItem: "Details",
      pane: (
        <TabPane attached={false} as={Segment} basic>
          <PopDetailsTab popId={popId} />
        </TabPane>
      ),
    },
    {
      menuItem: "Connection",
      pane: (
        <TabPane attached={false} as={Segment} basic style={{ padding: 0 }}>
          <PopConnectionTab popId={popId} />
        </TabPane>
      ),
    },
  ];

  return (
    <Modal open onClose={onClose} size="large">
      <ModalHeader>{popType} Details</ModalHeader>
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

export default PopModal;
