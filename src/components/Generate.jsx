import React from 'react';
import { Jumbotron, Button, Form } from 'react-bootstrap';
import { jsPDF } from 'jspdf';

class Generate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isImgUploaded: false,
      isUploadButtonPressed: false,
      certImage: null,
      certWidth: 0,
      certHeight: 0,
    };
    this.cert_canvas = React.createRef();
    this.fillCanvas = this.fillCanvas.bind(this);
    this.downloadPDFs = this.downloadPDFs.bind(this);
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

  downloadPDFs = () => {
    const canvas = this.cert_canvas.current;
    var imgData = canvas.toDataURL('image/jpeg', 1.0);
    var pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
    pdf.save(
      `certificate-${new Date()
        .toLocaleDateString('gu-IN')
        .split('/')
        .join('-')}.pdf`
    );
  };

  render() {
    return (
      <>
        <Jumbotron
          style={{
            display: this.state.isUploadButtonPressed ? 'block' : 'none',
          }}
          align="center"
        >
          <h2>Drag the labels to appropriate positions</h2>
          <canvas
            id="cert_canvas"
            ref={this.cert_canvas}
            style={{ width: '100%' }}
            width="0"
            height="0"
            className="my-5"
          />
          <Button
            variant="primary"
            size="lg"
            type="submit"
            onClick={() => {
              this.downloadPDFs();
            }}
          >
            Download Certificates
          </Button>
        </Jumbotron>
        {!this.state.isUploadButtonPressed && (
          <Jumbotron>
            <h1 align="center">Upload the Certificate Image</h1>
            <Form align="center" className="my-5">
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
                      console.log(this.state.certWidth, this.state.certHeight);
                    };
                  } else {
                    this.setState({ isImgUploaded: false });
                  }
                }}
              />
              <div className="my-3">
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
                  Upload Certificate Image
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
