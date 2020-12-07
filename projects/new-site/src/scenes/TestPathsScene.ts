import { Scene, Vector3, LineCurve3, CurvePath, Path, TubeBufferGeometry, MeshLambertMaterial, DoubleSide, Mesh, HemisphereLight, DirectionalLight, Color, LineBasicMaterial, Line, BufferGeometry } from "three";
import { GUI, GUIController } from "dat.gui";


const createLineMesh = (path:CurvePath<Vector3>|CurvePath<Vector2>):Line=>{

  const pathGeometry = new BufferGeometry();
  pathGeometry.setFromPoints(path.getPoints());

  return new Line(
    pathGeometry,
    new LineBasicMaterial({
      color: 'blue'
    })
  )
  
}



class TestPathsScene extends Scene{

  public gui:GUI;

  constructor(){

    super();

    this.name = 'test-paths';
    this.background = new Color('#bfbfbf');

    const hemLight:HemisphereLight = new HemisphereLight(0xffffff,0x333333);
    this.add(hemLight);
    const dirLight:DirectionalLight = new DirectionalLight(0xff00ff,2);
    dirLight.position.set(10,10,10);
    this.add(dirLight);

    // 2D Zig Zag - Line only.

    const path:Path = new Path();
    path.moveTo(0,0);
    path.lineTo(10,10);
    path.lineTo(20,0);
    path.lineTo(30,10);
    path.lineTo(40,0);

    const pathMesh:Line = createLineMesh(path);
    this.add( pathMesh );
      
    // Curve Test

    const curvePath:CurvePath<Vector3> = new CurvePath();    
    const line1:LineCurve3 = new LineCurve3(
      new Vector3(0,-10,0),new Vector3(10,10,0)
    );    
    const line2:LineCurve3 = new LineCurve3(
      new Vector3(10,10,0),new Vector3(20,-10,0)
    );
    const line3:LineCurve3 = new LineCurve3(
      new Vector3(20,-10,0),new Vector3(30,10,0)
    );                
    curvePath.add(line1);
    curvePath.add(line2);
    curvePath.add(line3);

    const createTubeGeometry = (path:CurvePath<Vector3>,params)=>{
      return new TubeBufferGeometry(path, 
        params.tubularSegments,
        params.radius,
        params.radialSegments,
        params.closed
      );      
    }

    const tubeParams = {
      tubularSegments:5,
      radius:2,
      radialSegments:4,
      closed:false
    };

    const tubeGeometry = createTubeGeometry(curvePath,tubeParams);
    const tubeMesh:Mesh = new Mesh(
      tubeGeometry,
      new MeshLambertMaterial({
        color:'crimson',
        wireframe: false,
        side: DoubleSide
      })
    )
    this.add( tubeMesh );

    this.gui = new GUI({
      // parent:this.debug.gui
    });

    this.gui.add( tubeParams,'tubularSegments',1,100,1 );
    this.gui.add( tubeParams,'radius',1,10 );
    this.gui.add( tubeParams,'radialSegments',1,10,1 );
    this.gui.add( tubeParams,'closed' );
  
    this.gui.__controllers.forEach((c:GUIController)=>{
      c.onChange(()=>{
        tubeMesh.geometry = createTubeGeometry(curvePath,tubeParams);
      })
    });

  }

}

export {
  TestPathsScene
}