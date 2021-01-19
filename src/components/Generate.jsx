import React from 'react';
import { Jumbotron, Button, Form } from 'react-bootstrap';

class Generate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isImgUploaded: false,
      isUploadButtonPressed: false,
      certImage: null,
    };
    this.cert_canvas = React.createRef();
    this.fillCanvas = this.fillCanvas.bind(this);
    this.fields = [
      'Name',
      'Position',
      'Organization',
      'Academic Year',
      'Date',
      'Certificate Number',
    ];
  }

  fillCanvas = () => {
    const canvas = this.cert_canvas.current;
    console.log(canvas);
    canvas.height = this.state.certHeight;
    canvas.width = this.state.certWidth;
    const ctx = canvas.getContext('2d');
    const img = this.state.certImage;
    ctx.drawImage(img, 0, 0);
    ctx.lineWidth = 1;
    ctx.font = '64px sans-serif';
    for (var i in this.fields) {
      ctx.fillText(this.fields[i], 100 + 100 * i, 100 + 100 * i);
    }
  };

  render() {
    return (
      <>
        <Jumbotron
          style={{
            display: true ? 'block' : 'none',
          }}
        >
          <canvas id="cert_canvas" ref={this.cert_canvas} width="0" height="0" />
        </Jumbotron>
        {!this.state.isUploadButtonPressed && (
          <Jumbotron>
            <h1 align="center">Upload the Certificate Image</h1>
            <Form>
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
                            certImage: img,
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
                <p>
                  The Certificate Image is{' '}
                  {this.state.isImgUploaded ? (
                    <span style={{ color: 'green' }}>added</span>
                  ) : (
                    <span style={{ color: 'red' }}>not added</span>
                  )}
                </p>
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  disabled={!this.state.isImgUploaded}
                  onClick={() => {
                    this.setState({
                      isUploadButtonPressed: true,
                    });
                    this.fillCanvas();
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
