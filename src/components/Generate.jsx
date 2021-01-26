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
      { text: 'Name', x: 100, y: 100, isDragged: false },
      { text: 'Position', x: 200, y: 200, isDragged: false },
      { text: 'Organization', x: 300, y: 300, isDragged: false },
      { text: 'Academic Year', x: 400, y: 400, isDragged: false },
      { text: 'Date', x: 500, y: 500, isDragged: false },
      { text: 'Certificate Number', x: 600, y: 600, isDragged: false },
    ];
  }

  clearCanvas = () => {
    const canvas = this.cert_canvas.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, this.state.certWidth, this.state.certHeight);
    const img = this.state.certImage;
    ctx.drawImage(img, 0, 0);
  };

  addTexts = () => {
    const canvas = this.cert_canvas.current;
    const ctx = canvas.getContext('2d');
    this.clearCanvas();
    for (var field of this.fields) {
      ctx.fillText(field.text, field.x, field.y);
    }
  };

  initCanvas = () => {
    const canvas = this.cert_canvas.current;
    canvas.width = this.state.certWidth;
    canvas.height = this.state.certHeight;
    const ctx = canvas.getContext('2d');
    return ctx;
  };

  onMouseUp(e) {
    for (var field of this.fields) {
      field.isDragged = false;
    }
    this.setState({
      labelIdx: -1,
    });
    e.preventDefault();
  }

  onMouseMove(e) {
    const canvas = this.cert_canvas.current;
    var i = this.state.labelIdx;
    if (i !== -1 && this.fields[i].isDragged) {
      var scaledCanvas = canvas.getBoundingClientRect();
      var canX =
        ((e.pageX - scaledCanvas.left - window.scrollX) / scaledCanvas.width) *
        canvas.width;
      var canY =
        ((e.pageY - scaledCanvas.top - window.scrollY) / scaledCanvas.height) *
        canvas.height;
      this.fields[i].x = canX;
      this.fields[i].y = canY;
      this.addTexts();
    }
    e.preventDefault();
  }

  onMouseDown(e) {
    const canvas = this.cert_canvas.current;
    var scaledCanvas = canvas.getBoundingClientRect();
    var canX =
      ((e.pageX - scaledCanvas.left - window.scrollX) / scaledCanvas.width) *
      canvas.width;
    var canY =
      ((e.pageY - scaledCanvas.top - window.scrollY) / scaledCanvas.height) *
      canvas.height;
    // console.log(e.pageX - canvas.offsetLeft);
    // console.log(e.pageY - canvas.offsetTop);
    // console.log(canvas.width, canvas.height);
    // console.log(scaledCanvas);
    console.log(canX, canY);
    var i, x, y;
    for (i in this.fields) {
      var field = this.fields[i];

      var textLength = field.text.length * 64;
      var textHeight = 64;
      x = field.x;
      y = field.y;
      // console.log('x, y, textLength:', x, y, textLength);
      console.log('i, canX, val\n', i, canX, x + textLength);
      console.log('i, canX, val\n', i, canX, x);
      console.log('i, canY, val\n', i, canY, y - textHeight);
      console.log('i, canY, val\n', i, canY, y);
      if (canX < x + textLength && canX > x && canY > y - textHeight && canY < y) {
        this.setState({
          labelIdx: i,
        });
        console.log('chosen', i);
        break;
      }
    }
    console.log(this.state.labelIdx);
    if (this.state.labelIdx !== null) {
      this.fields[i].x = canX;
      this.fields[i].y = canY;
      this.addTexts();
      this.fields[i].isDragged = true;
    }
    e.preventDefault();
  }

  makeCertificate = () => {
    const ctx = this.initCanvas();
    ctx.lineWidth = 1;
    ctx.font = '64px sans-serif';
    this.addTexts();
  };

  downloadPDF = () => {
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
                        certWidth: img.width,
                        certHeight: img.height,
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
