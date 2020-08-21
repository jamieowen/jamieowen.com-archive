
export function createDomElement( container:HTMLElement ){

  if( container === document.body ){
    container.style.margin = '0px';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.position = 'absolute';
  }

  const ele = document.createElement('div');
  ele.style.display = 'block';
  ele.style.width = '100%';
  ele.style.height = '100%';
  ele.style.position = 'absolute';

  container.appendChild(ele);

  return ele;

}
