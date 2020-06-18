import { Geometries, Materials } from './constants';
import { DrawContextBase } from './DrawContextBase';

export class DrawContext extends DrawContextBase{

  box(){    
    this.geometry( Geometries.BOX );
    this.drawMesh();
  }

  sphere(){    
    this.geometry( Geometries.SPHERE );
    this.drawMesh();
  }  

  torus(){    
    this.geometry( Geometries.BOX );
    this.drawMesh();
  }    

  basicMaterial(){
    this.state.setMaterial( Materials.BASIC );
  }  

  lambertMaterial(){
    this.state.setMaterial( Materials.LAMBERT );
  }   

}