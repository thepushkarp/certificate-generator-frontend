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
      labelIdx: -1,
    };
    this.cert_canvas = React.createRef();
    this.clearCanvas = this.clearCanvas.bind(this);
    this.addTexts = this.addTexts.bind(this);
    this.initCanvas = this.initCanvas.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.makeCertificate = this.makeCertificate.bind(this);
    this.downloadPDF = this.downloadPDF.bind(this);
    this.fields = [
      { text: 'Name', x: 100, y: 100, font: 64, isDragged: false },
      { text: 'Position', x: 200, y: 200, font: 64, isDragged: false },
      { text: 'Organization', x: 300, y: 300, font: 64, isDragged: false },
      { text: 'Academic Year', x: 400, y: 400, font: 64, isDragged: false },
      { text: 'Date', x: 500, y: 500, font: 64, isDragged: false },
      { text: 'Certificate Number', x: 600, y: 600, font: 36, isDragged: false },
    ];
  }

  /*
  Clears all text from canvas leaving only certificate image
  */
  clearCanvas = () => {
    const canvas = this.cert_canvas.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(this.state.certImage, 0, 0);
  };

  /*
  Adds all the text from the text field to the respective location
  */
  addTexts = () => {
    const canvas = this.cert_canvas.current;
    const ctx = canvas.getContext('2d');
    this.clearCanvas();
    for (var field of this.fields) {
      ctx.font = `${field.font}px sans-serif`;
      ctx.fillText(field.text, field.x, field.y);
    }
  };

  /*
  Creates the initial canvas and returns its context
  */
  initCanvas = () => {
    const canvas = this.cert_canvas.current;
    canvas.width = this.state.certImage.width;
    canvas.height = this.state.certImage.height;
    const ctx = canvas.getContext('2d');
    return ctx;
  };

  /*
  On leaving mouse click, sets all text dragging property to false
  */
  onMouseUp(e) {
    for (var field of this.fields) {
      field.isDragged = false;
    }
    this.setState({
      labelIdx: -1,
    });
    e.preventDefault();
  }

  /*
  Moves the text which is draggable, with mouse movement
  */
  onMouseMove(e) {
    const canvas = this.cert_canvas.current;
    const i = this.state.labelIdx;
    if (i !== -1 && this.fields[i].isDragged) {
      const scaledCanvas = canvas.getBoundingClientRect();
      const canX =
        ((e.pageX - scaledCanvas.left - window.scrollX) / scaledCanvas.width) *
        canvas.width;
      const canY =
        ((e.pageY - scaledCanvas.top - window.scrollY) / scaledCanvas.height) *
        canvas.height;
      this.fields[i].x = canX;
      this.fields[i].y = canY;
      this.addTexts();
    }
    e.preventDefault();
  }

  /*
  Searches the box where the pointer is and sets its draggable property to true
  */
  onMouseDown(e) {
    const canvas = this.cert_canvas.current;
    const scaledCanvas = canvas.getBoundingClientRect();
    const canX =
      ((e.pageX - scaledCanvas.left - window.scrollX) / scaledCanvas.width) *
      canvas.width;
    const canY =
      ((e.pageY - scaledCanvas.top - window.scrollY) / scaledCanvas.height) *
      canvas.height;
    var i,
      x,
      y,
      flag = false;
    for (i in this.fields) {
      const field = this.fields[i];
      const fontSize = field.font;
      const textLength = field.text.length * fontSize;
      const textHeight = fontSize;
      x = field.x;
      y = field.y;
      if (canX < x + textLength && canX > x && canY > y - textHeight && canY < y) {
        flag = true;
        break;
      }
    }
    if (flag === true) {
      this.setState({
        labelIdx: i,
      });
      this.fields[i].x = canX;
      this.fields[i].y = canY;
      this.addTexts();
      this.fields[i].isDragged = true;
    }
    e.preventDefault();
  }

  /*
  Creates the certificate initially and add texts with default location
  */
  makeCertificate = () => {
    const ctx = this.initCanvas();
    ctx.lineWidth = 1;
    this.addTexts();
  };

  /*
  Downloads the PDF of the certificate
  */
  downloadPDF = () => {
    const canvas = this.cert_canvas.current;
    const quality = 0.5;
    const imgData = canvas.toDataURL('image/jpeg', quality);
    const pdf = new jsPDF({
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
            onMouseUp={this.onMouseUp}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
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
              this.downloadPDF();
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
                      });
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
                    this.makeCertificate();
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
