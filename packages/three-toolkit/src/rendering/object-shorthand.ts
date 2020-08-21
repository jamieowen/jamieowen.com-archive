import { memoize } from '@thi.ng/memoize';
import { 
  MeshBasicMaterial, 
  MeshLambertMaterial, 
  MeshPhongMaterial,
  MeshBasicMaterialParameters
} from 'three';


let _currentMaterial:Function;
let _currentGeometry:Function;

enum Materials {
  MeshBasicMaterial = 1,
  MeshLambertMaterial = 2,
  MeshPhongMaterial = 3,
  MeshStandardMaterial = 4
}

const materials = new Map<number,Function>();
materials.set(Materials.MeshBasicMaterial,MeshBasicMaterial);
materials.set(Materials.MeshLambertMaterial,MeshLambertMaterial);
materials.set(Materials.MeshPhongMaterial,MeshPhongMaterial);


function currentMaterial(mat?:Materials){
  if( mat ){
    _currentMaterial = materials.get(mat);
  }
}

export function lambertMaterial(){
  currentMaterial(Materials.MeshLambertMaterial);
}

export function basicMaterial(){
  currentMaterial(Materials.MeshLambertMaterial);
}

export function phongMaterial(){
  currentMaterial(Materials.MeshLambertMaterial);
}

type MaterialParameters = MeshBasicMaterialParameters;

export function box(params:MaterialParameters={}){

}