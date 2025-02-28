import * as ThreeJS from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

declare global {
  interface Window {
    THREE: typeof ThreeJS & {
      OrbitControls: typeof OrbitControls;
    };
  }
}

export {};