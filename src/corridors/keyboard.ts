import { ICameraInput } from "@babylonjs/core/Cameras/cameraInputsManager";
import { UniversalCamera } from "@babylonjs/core/Cameras/universalCamera";
import { Vector3 } from "@babylonjs/core/Maths/math.vector";
import { Scene } from "@babylonjs/core/scene";

export class Keyboard implements ICameraInput<UniversalCamera> {
    _scene: Scene
    camera: UniversalCamera
    _commands: string[]
    _element: HTMLElement
    _attached: boolean
    _noPreventDefault: boolean

    constructor(scene: Scene, camera: UniversalCamera) {
        this.camera = camera;
        this._scene = scene;

        this._commands = [];
        this._attached = false;
        this._noPreventDefault = false;

        this._element = scene.getEngine().getInputElement()!;

        camera.inputs.remove(camera.inputs.attached.keyboard);
        camera.inputs.add(this);
    }

    _kbdToCommand(code: string): string {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyA':
                return 'left';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyD':
                return 'right';
            case 'ArrowLeft':
                return 'left-rotate';
            case 'ArrowRight':
                return 'right-rotate';
            case 'ControlLeft':
            case 'ControlRight':
                return 'crouch';
            case 'ShiftLeft':
            case 'ShiftRight':
                return 'run';
        }
        return '';
    }

    _onLostFocus(event: any) {
        this._commands = [];
    }

    _onKeyDown(event: KeyboardEvent) {
        console.log(event.code);

        let cmd = this._kbdToCommand(event.code);
        if (cmd === '') {
            return;
        }

        let index = this._commands.indexOf(cmd);
        if (index === -1) {
            this._commands.push(cmd);
        }

        if (!this._noPreventDefault) {
            event.preventDefault();
        }
    }

    _onKeyUp(event: KeyboardEvent) {
        let cmd = this._kbdToCommand(event.code);
        if (cmd === '') {
            return;
        }

        let index = this._commands.indexOf(cmd);
        if (index >= 0) {
            this._commands.splice(index, 1);
        }

        if (!this._noPreventDefault) {
            event.preventDefault();
        }
    }

    getClassName(): string {
        return 'keyboard';
    }

    getSimpleName(): string {
        return 'keyboard';
    }

    attachControl(noPreventDefault: boolean) {
        this._attached = true;
        this._noPreventDefault = noPreventDefault;

        // TODO: confirm what this is doing.
        this._element.tabIndex = 1;

        this._element.addEventListener('keydown', this._onKeyDown, false);
        this._element.addEventListener('keyup', this._onKeyUp, false);
    }

    detachControl() {
        if (!this._attached) {
            return;
        }
        this._attached = false;
        this._commands = [];

        this._element.removeEventListener('keydown', this._onKeyDown);
        this._element.removeEventListener('keyup', this._onKeyUp);
        
        /*Tools.UnregisterTopRootEvents([
            {
                name: 'blur',
                handler: this._onLostFocus
            }
        ]);*/
    }

    checkInputs() {
        for (let index = 0; index < this._commands.length; index++) {
            const command = this._commands[index];

            console.log('command:', command);
            console.log(this.camera.angularSpeed);
            console.log(this.camera.direction);
            
            switch (command) {
                case 'up':
                    this.camera.direction.copyFromFloats(0, 0, this.camera.speed);
                    break;
                case 'down':
                    this.camera.direction.copyFromFloats(0, 0, -this.camera.speed);
                    break;
                case 'left':
                    this.camera.direction.copyFromFloats(-this.camera.speed, 0, 0);
                    break;
                case 'right':
                    this.camera.direction.copyFromFloats(this.camera.speed, 0, 0);
                    break;
                case 'left-rotate':
                    this.camera.rotation.y -= this.camera.angularSpeed;
                    this.camera.direction.copyFromFloats(0, 0, 0);
                    break;
                case 'right-rotate':
                    this.camera.rotation.y += this.camera.angularSpeed;
                    this.camera.direction.copyFromFloats(0, 0, 0);
                    break;
                case 'crouch':
                    console.log('TODO: crouch');
                    break;
                case 'run':
                    console.log('TODO: run');
                    break;
                case 'jump':
                    console.log('TODO: jump');
                    break;
            }

            if (this._scene.useRightHandedSystem) {
                this.camera.direction.z *= -1;
            }
            
            this.camera.getViewMatrix().invertToRef(
                this.camera._cameraTransformMatrix
            );

            Vector3.TransformNormalToRef(
                this.camera.direction,
                this.camera._cameraTransformMatrix,
                this.camera._transformedDirection
            );
            
            this.camera.cameraDirection.addInPlace(
                this.camera._transformedDirection
            );
        }
    }
}
