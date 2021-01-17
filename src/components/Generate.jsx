import React from 'react';
import { Jumbotron, Button, Form } from 'react-bootstrap';

class Generate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCsvUploaded: false,
      isImgUploaded: false,
      isUploadButtonPressed: false,
      certImage: null,
      csvFile: null,
      certWidth: 0,
      certHeight: 0,
    };
  }

  render() {
    return (
      <>
        {this.state.isUploadButtonPressed && (
          <div
            style={{
              height: this.state.height,
              weight: this.state.width,
              backgroundImage: `url(${this.state.certImage})`,
            }}
          ></div>
        )}
        {!this.state.isUploadButtonPressed && (
          <Jumbotron>
            <h1 align="center">Upload the CSV and Certificate Image</h1>
            <Form>
              <Form.Group>
                <Form.Label>Upload the CSV File</Form.Label>
                <Form.Row>
                  <Form.File
                    id="csvForm"
                    accept=".csv"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        this.setState({ isCsvUploaded: true });
                      } else {
                        this.setState({ isCsvUploaded: false });
                      }
                    }}
                  />
                </Form.Row>
              </Form.Group>
              <Form.Group>
                <Form.Label>Upload the Certificate Image</Form.Label>
                <Form.Row>
                  <Form.File
                    id="imgForm"
                    accept="image/jpeg, image/png"
                    onChange={(e) => {
                      if (e.target.files[0]) {
                        var imgUrl = URL.createObjectURL(e.target.files[0]);
                        var img = new Image();
                        img.src = imgUrl;
                        img.onload = () => {
                          this.setState({
                            isImgUploaded: true,
                            certImage: imgUrl,
                            certWidth: img.width,
                            certHeight: img.height,
                          });
                        };
                      } else {
                        this.setState({ isImgUploaded: false });
                      }
                    }}
                  />
                </Form.Row>
              </Form.Group>
              <div align="center">
                <p>{`Uploaded ${
                  1 * this.state.isCsvUploaded + 1 * this.state.isImgUploaded
                }/2 files`}</p>
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  disabled={!(this.state.isCsvUploaded && this.state.isImgUploaded)}
                  onClick={(e) => {
                    this.setState({
                      isUploadButtonPressed: true,
                    });
                  }}
                >
                  Upload
                </Button>
              </div>
            </Form>
          </Jumbotron>
        )}
      </>
    );
  }
}

export default Generate;
