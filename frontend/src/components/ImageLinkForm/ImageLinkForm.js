// This is the form on the homepage after logging in or registering
// Where the user can enter a URL into the input field
import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import FormLabel from "react-bootstrap/FormLabel";

const ImageLinkForm = ({ onInputChange, onImageSubmit }) => {
  return (
    <div>
      <text className="fs-3">Analyze Faces In Real-Time</text>
      <Row className="text-start">
        <p className="fs-6 fw-medium fst-italic form-text">How does it work?</p>
      </Row>
      <Row className="text-start">
        <ol type="1">
          <li>Find an image online</li>
          <li>Copy the url of the image</li>
          <li>Paste it into the input below</li>
          <li>Then press Detect!</li>
        </ol>
        <p className="text-primary">
          Your image has been successfully analyzed to the left! Simple as pie.
        </p>
      </Row>
      <Row className="center">
        <InputGroup className="w-100 center">
          <Form.Label htmlFor="image-url" hidden>
            URL
          </Form.Label>
          <Form.Control
            id="image-url"
            onChange={onInputChange}
            placeholder="Image URL"
          />
          <Button
            variant="primary"
            size="md"
            type="submit"
            onClick={onImageSubmit}
          >
            Detect
          </Button>
        </InputGroup>
      </Row>
      <Row className="text-start pt-3">
        <p className="fs-6 fw-medium fst-italic form-text">
          What if it doesn't work?
        </p>
        <p>
          Make sure the url you pasted ends with a image file type such as:{" "}
          <span className="text-primary fw-bold">.jpg, .png, etc</span>
        </p>
        <p className="fs-6 fw-medium fst-italic form-text">
          Still not working?
        </p>
        <p>
          Please submit a
          <a
            href="https://github.com/pixelRena/Clarifai-Model-Detection/issues"
            className="text-primary text-underline fw-bold"
          >
            issue
          </a>
          request and the url you tried to use so that I can further
          troubleshoot. Thanks! 😊
        </p>
        <a
          href="https://status.clarifai.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Go to Clarifai's website to verify server status"
          className="text-center"
        >
          Clarifai Server Status
        </a>
      </Row>
    </div>
  );
};

export default ImageLinkForm;
