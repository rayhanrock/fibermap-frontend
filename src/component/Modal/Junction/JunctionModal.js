import JunctionConnectionTab from "./JunctionConnectionTab";
import JunctionCreateSplitterTab from "./JunctionCreateSplitterTab";
import JunctionDetailsTab from "./JunctionDetailsTab";
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

const JunctionModal = ({ junctionId, onClose }) => {
  const panes = [
    {
      menuItem: "Details",
      pane: (
        <TabPane attached={false}>
          <JunctionDetailsTab junctionId={junctionId} />
        </TabPane>
      ),
    },
    {
      menuItem: "Connection",
      pane: (
        <TabPane attached={false} as={Segment} basic style={{ padding: 0 }}>
          <JunctionConnectionTab junctionId={junctionId} />
        </TabPane>
      ),
    },
    {
      menuItem: "Create Splitter",
      pane: (
        <TabPane attached={false} as={Segment} basic style={{ padding: 0 }}>
          <JunctionCreateSplitterTab junctionId={junctionId} />
        </TabPane>
      ),
    },
  ];

  return (
    <Modal open onClose={onClose} size="large">
      <ModalHeader>Junction Details</ModalHeader>
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

export default JunctionModal;
