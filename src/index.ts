/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import * as BABYLON from 'babylonjs';
import * as ZapparBabylon from '@zappar/zappar-babylonjs';
import * as MAT from 'babylonjs-materials';

const target = new URL('../assets/example-tracking-image.zpt', import.meta.url).href;
const model = new URL('../assets/trainers.glb', import.meta.url).href;

import 'babylonjs-loaders';
import './index.css';
// The SDK is supported on many different browsers, but there are some that
// don't provide camera access. This function detects if the browser is supported
// For more information on support, check out the readme over at
// https://www.npmjs.com/package/@zappar/zappar-babylonjs
if (ZapparBabylon.browserIncompatible()) {
  // The browserIncompatibleUI() function shows a full-page dialog that informs the user
  // they're using an unsupported browser, and provides a button to 'copy' the current page
  // URL so they can 'paste' it into the address bar of a compatible alternative.
  ZapparBabylon.browserIncompatibleUI();

  // If the browser is not compatible, we can avoid setting up the rest of the page
  // so we throw an exception here.
  throw new Error('Unsupported browser');
}

// Setup BabylonJS in the usual way
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const engine = new BABYLON.Engine(canvas, true);

const scene = new BABYLON.Scene(engine);
// eslint-disable-next-line no-unused-vars
const light = new BABYLON.DirectionalLight('dir02', new BABYLON.Vector3(0, 0, -1), scene);
light.position = new BABYLON.Vector3(0, 1, -10);

const light1 = new BABYLON.HemisphericLight('hemi', new BABYLON.Vector3(1, -1, 0), scene);
const shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
shadowGenerator.usePoissonSampling = true;
// Setup a Zappar camera instead of one of Babylon's cameras
const camera = new ZapparBabylon.Camera('ZapparCamera', scene);

// Request the necessary permission from the user
ZapparBabylon.permissionRequestUI().then((granted) => {
  if (granted) camera.start();
  else ZapparBabylon.permissionDeniedUI();
});

const imageTracker = new ZapparBabylon.ImageTrackerLoader().load(target);
// eslint-disable-next-line max-len
const trackerTransformNode = new ZapparBabylon.ImageAnchorTransformNode('tracker', camera, imageTracker, scene);

trackerTransformNode.setEnabled(false);
imageTracker.onVisible.bind(() => {
  trackerTransformNode.setEnabled(true);
});
imageTracker.onNotVisible.bind(() => {
  trackerTransformNode.setEnabled(false);
});

const ground = BABYLON.MeshBuilder.CreatePlane('plane', { width: 3.1, height: 2 }, scene);

const shadowMaterial = new MAT.ShadowOnlyMaterial('mat', scene);
shadowMaterial.alpha = 0.5;
shadowMaterial.activeLight = light;
ground.material = shadowMaterial;

const cylinder = BABYLON.MeshBuilder.CreateCylinder('cylinder', { height: 1 }, scene);
cylinder.rotation.x = Math.PI / 2;
cylinder.position.z = -0.5;

ground.parent = trackerTransformNode;
light.parent = trackerTransformNode;
cylinder.parent = trackerTransformNode;

ground.receiveShadows = true;
shadowGenerator.getShadowMap()?.renderList?.push(ground);

cylinder.receiveShadows = true;
shadowGenerator.getShadowMap()?.renderList?.push(cylinder);

let mesh : BABYLON.AbstractMesh | undefined;
BABYLON.SceneLoader.ImportMesh(null, '', model, scene, (meshes) => {
  meshes.forEach((m) => shadowGenerator.getShadowMap()?.renderList?.push(m));
  // eslint-disable-next-line prefer-destructuring
  mesh = meshes[0];
  mesh.name = 'Trainer';
  mesh.rotationQuaternion = null;
  mesh.parent = trackerTransformNode;
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.z = -1.2;

  light.setDirectionToTarget(mesh.absolutePosition);
});

window.addEventListener('resize', () => {
  engine.resize();
});

let alpha = 0;
// Set up our render loop
engine.runRenderLoop(() => {
  alpha += 0.01;
  mesh?.rotate(new BABYLON.Vector3(0, 1, 0), Math.sin(alpha) * 0.03);
  camera.updateFrame();
  scene.render();
});
