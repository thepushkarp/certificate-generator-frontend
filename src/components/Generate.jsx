import React from 'react';
import { Jumbotron, Button, Form, Col } from 'react-bootstrap';

class Generate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedCSV: false,
      uploadedIMG: false,
    };
  }

  render() {
    return (
      <Jumbotron>
        <h1 align="center">Upload the CSV and Certificate Image</h1>
        <Form>
          <Form.Group>
            <Form.Label>Upload the CSV File</Form.Label>
            <Form.Row align="center">
              <Col>
                <Form.File
                  id="csvForm"
                  accept=".csv"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      this.setState({ uploadedCSV: true });
                    } else {
                      this.setState({ uploadedCSV: false });
                    }
                  }}
                />
              </Col>
              <Col>
                <Form.Check
                  type="switch"
                  disabled
                  checked={this.state.uploadedCSV}
                />
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Label>Upload the Certificate Image</Form.Label>
            <Form.Row align="center">
              <Col>
                <Form.File
                  id="imgForm"
                  accept="image/jpeg, image/png"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      this.setState({ uploadedIMG: true });
                    } else {
                      this.setState({ uploadedIMG: false });
                    }
                  }}
                />
              </Col>
              <Col>
                <Form.Check
                  type="switch"
                  disabled
                  checked={this.state.uploadedIMG}
                />
              </Col>
            </Form.Row>
          </Form.Group>
          <div align="center">
            <p>{`Uploaded ${
              1 * this.state.uploadedCSV + 1 * this.state.uploadedIMG
            }/2 files`}</p>
            <Button
              variant="primary"
              size="lg"
              type="submit"
              disabled={!(this.state.uploadedCSV && this.state.uploadedIMG)}
            >
              Upload
            </Button>
          </div>
        </Form>
      </Jumbotron>
    );
  }
}

export default Generate;
