import "@babylonjs/loaders/glTF";
import "@babylonjs/core/Collisions/collisionCoordinator";

import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { Engine } from "@babylonjs/core/Engines/engine";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight";
import { SceneLoader } from "@babylonjs/core/Loading/sceneLoader";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "@babylonjs/core/scene";
import { Mesh } from "@babylonjs/core/Meshes/mesh";
import { Keyboard } from "./keyboard";

const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

const engine = new Engine(canvas, true);

const scene = new Scene(engine);

const light = new HemisphericLight('light', new Vector3(0, 1, -1), scene);

const camera = new UniversalCamera('camera', new Vector3(-1, 1, 0), scene);
camera.minZ = .0001;
camera.speed = .25;

scene.gravity = new Vector3(0, -0.9, 0);
scene.collisionsEnabled = true;

camera.checkCollisions = true;
camera.applyGravity = true;

camera.ellipsoid = new Vector3(0.5, 1, 0.5);
camera.ellipsoidOffset = new Vector3(0, 1, 0);
camera.rotation = new Vector3(0, -Math.PI/2, 0);

const kbd = new Keyboard(scene, camera);

camera.attachControl(canvas, true);

SceneLoader.ImportMeshAsync("", "/meshes/", "corridors.glb").then((result: any) => {
    // animationGroups geometries lights meshes particleSystems skeletons transformNodes

    result.meshes.forEach((mesh: Mesh) => {
        mesh.checkCollisions = true;
    });
});

engine.runRenderLoop(() => {
    scene.render();
});

window.addEventListener('resize', () => {
    engine.resize();
});
