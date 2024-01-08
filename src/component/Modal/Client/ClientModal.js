import ClientConnectionTab from "./ClientConnectionTab";
import ClientDetailsTab from "./ClientDetailsTab";
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

const ClientModal = ({ clientId, onClose }) => {
  const panes = [
    {
      menuItem: "Details",
      pane: (
        <TabPane attached={false} as={Segment} basic>
          <ClientDetailsTab clientId={clientId} />
        </TabPane>
      ),
    },
    {
      menuItem: "Connection",
      pane: (
        <TabPane attached={false} as={Segment} basic style={{ padding: 0 }}>
          <ClientConnectionTab clientId={clientId} />
        </TabPane>
      ),
    },
  ];

  return (
    <Modal open onClose={onClose}>
      <ModalHeader>Client Details</ModalHeader>
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

export default ClientModal;
