import { SystemStateComponent } from "ecsy";
import { Box2, Vector2 } from "three";

class ApplicationState extends SystemStateComponent{

  public domElement:HTMLElement;
  public domBounds:Box2 = new Box2();
  public scrollElement:HTMLElement;
  public scrollBounds:Box2 = new Box2();
  public scrollOffset:Vector2 = new Vector2();

  constructor(
    domElement:HTMLElement,
    scrollElement:HTMLElement = null
  ){
    super();

    this.domElement = domElement;
    this.scrollElement = scrollElement;

  }

}

export {
  ApplicationState
}