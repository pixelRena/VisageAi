import { render, screen } from '@testing-library/react';
import App from './App';
import faceRecognition from "./components/FaceRecognition/faceRecognition";

describe('Image Component', () => {
  test('Response from clarifai api includes bounding_box', async () => {
    const { container } = render(<faceRecognition/>);
    const img = container.querySelector('img');
    const res = await fetch(img.src);
    const data = await res.json();
    expect(data.outputs[0].data.regions[0].region_info.bounding_box).toBeDefined();
  });
})

