import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { createScene } from "./scene";
import {
  browserHasImmersiveArCompatibility,
  displayIntroductionMessage,
  displayUnsupportedBrowserMessage,
} from "./utils/domUtils";

import "./styles.css";

function initializeXRApp() {
  const { devicePixelRatio, innerHeight, innerWidth } = window;
  
  // Create a new WebGL renderer and set the size + pixel ratio.
  const renderer = new WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);
  
  // Enable XR functionality on the renderer.
  renderer.xr.enabled = true;

  // Add it to the DOM.
  document.body.appendChild( renderer.domElement );

  // Create the AR button element, configure our XR session, and append it to the DOM.
  document.body.appendChild(ARButton.createButton(
    renderer,
    { requiredFeatures: ["hit-test"] },
  ));

  // Pass the renderer to the createScene-funtion.
  createScene(renderer);

  // Display a welcome message to the user.
  displayIntroductionMessage();
};

async function start() {
  // Check if browser supports WebXR with "immersive-ar".
  const immersiveArSupported = await browserHasImmersiveArCompatibility();
  
  // Initialize app if supported.
  immersiveArSupported ?
    initializeXRApp() : 
    displayUnsupportedBrowserMessage();
};

start();
