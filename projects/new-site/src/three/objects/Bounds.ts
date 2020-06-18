import { Object3D, Box3, Matrix4, Mesh, BoxBufferGeometry, MeshBasicMaterial } from "three";


class Bounds extends Object3D{

  public sceneBounds:Box3;
  public windowBounds:Box3;
  public pageBounds:Box3;

  private pageTargetElement:HTMLElement;  

  private sceneBoundsMesh:Mesh;
  private windowBoundsMesh:Mesh;
  private pageBoundsMesh:Mesh;

  constructor(){

    super();

    this.pageTargetElement = document.getElementById('page-target-temp');
    
    // Bounds Box3 Objects.
    this.sceneBounds = new Box3();
    this.sceneBounds.min.set(-20,0,-10);
    this.sceneBounds.max.set(20,100,10);

    this.windowBounds = new Box3(); // set on resize
    this.pageBounds = new Box3(); // set on resize
    
    // Bounds Meshes     
    const offsetMatrix = new Matrix4().makeTranslation(0,-0.5,0);
    const geometry = new BoxBufferGeometry(1,1,1).applyMatrix4(offsetMatrix);
    
    // Scene Bounds Mesh
    this.sceneBoundsMesh = new Mesh(
      geometry,
      new MeshBasicMaterial({
        color: 'red',
        wireframe: true
      })
    );
    this.add( this.sceneBoundsMesh );
    this.sceneBounds.getSize( this.sceneBoundsMesh.scale );

    // Window Bounds Mesh
    this.windowBoundsMesh = new Mesh(
      geometry,
      new MeshBasicMaterial({
        color: 'blue',
        wireframe: true
      })
    );
    this.add( this.windowBoundsMesh );
    this.windowBounds.getSize( this.windowBoundsMesh.scale );    
      
    // Page Bounds Mesh
    this.pageBoundsMesh = new Mesh(
      geometry,
      new MeshBasicMaterial({
        color: 'red',
        wireframe: true
      })
    );
    this.add( this.pageBoundsMesh );
    this.pageBounds.getSize( this.pageBoundsMesh.scale );

    window.addEventListener('resize',this.onResize);
    this.pageTargetElement.addEventListener('scroll',this.onScroll);

    this.onResize();

  }

  public onScroll = ()=>{

    const offset = this.pageTargetElement.scrollTop;
    this.windowBoundsMesh.position.y = -offset;

  }

  public onResize = ()=>{

    const ww = window.innerWidth;
    const wh = window.innerHeight;
    
    this.windowBounds.min.set(-ww/2,0,-10);
    this.windowBounds.max.set(ww,wh,10);

    this.windowBounds.getSize(this.windowBoundsMesh.scale);

    const ph = this.pageTargetElement.scrollHeight;
    this.pageBounds.copy(this.windowBounds);
    this.pageBounds.max.set(ww,ph,10);
    this.pageBounds.getSize(this.pageBoundsMesh.scale);

  }

}

export {
  Bounds
}