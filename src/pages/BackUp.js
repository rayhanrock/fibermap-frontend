import React, { useState } from "react";
import {
  Button,
  ButtonContent,
  Grid,
  GridColumn,
  GridRow,
  Header,
  Icon,
  Progress,
  Segment,
} from "semantic-ui-react";

const BackUp = () => {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleBackup = () => {
    setLoading(true);
    const link = document.createElement("a");
    link.href = "http://127.0.0.1:8000/api/dbdump";
    link.setAttribute("download", "ubuntu.iso");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setLoading(false);

    // fetch("http://127.0.0.1:8000/api/dbdump") // Replace with your actual Django endpoint
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.blob();
    //   })
    //   .then((blob) => {
    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", "data_dump.json.bz2");
    //     document.body.appendChild(link);
    //     link.click();
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error("Error downloading backup:", error);
    //     setLoading(false);
    //   });
  };

  const handleRestore = (event) => {
    const file = event.target.files[0];
    // Logic for restoring data from the selected file

    // Dummy progress update
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const handleCancel = () => {
    // Logic for canceling the upload process
    setUploadProgress(0);
  };
  return (
    <Grid divided="vertically" style={{ padding: "1rem" }}>
      <GridRow>
        <GridColumn>
          <Segment placeholder>
            <Header icon>
              <Icon name="cloud download" />
              Backup Data
              <Header.Subheader>
                Click the button below to download a backup of your data.
              </Header.Subheader>
            </Header>
            <Button onClick={handleBackup} disabled={loading} primary>
              {loading ? "Downloading..." : "Download Backup"}
            </Button>
          </Segment>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn textAlign="center">
          <Segment placeholder>
            <Header icon>
              <Icon name="cloud upload" />
              Restore Backup
              <Header.Subheader>
                Select a backup file from your device to restore data.
              </Header.Subheader>
            </Header>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <div>
                <div>
                  <input
                    type="file"
                    id="fileUploader"
                    style={{ display: "none" }}
                    onChange={handleRestore}
                  />
                  <label htmlFor="fileUploader">
                    <Button as="span" primary>
                      Choose File
                    </Button>
                  </label>
                </div>
              </div>
              <div>
                <Button primary>Restore</Button>
              </div>
            </div>

            <Progress percent={uploadProgress} indicating>
              backup file : example.xz
            </Progress>
          </Segment>
        </GridColumn>
      </GridRow>
    </Grid>
  );
};

export default BackUp;
