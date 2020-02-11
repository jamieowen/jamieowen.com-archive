
class EngineEvent{

  static SCENE_ADDED:string = 'sceneAdded';
  static SCENE_REMOVED:string = 'sceneRemoved';

  static CAMERA_ADDED:string = 'cameraAdded';
  static CAMERA_REMOVED:string = 'cameraRemoved';

  static ACTIVE_SCENE_CHANGED:string = 'activeSceneChanged';
  static ACTIVE_CAMERA_CHANGED:string = 'activeCameraChanged';

  static DOM_RESIZE:string = 'domResize';
  static DOM_SCROLL:string = 'domScroll';

  static DEBUG_MODE_CHANGED:string = 'debugModeChanged';

}


export {
  EngineEvent
}