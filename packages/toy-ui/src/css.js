import styled, {
  css
} from 'styled-components';

const base = css` 
  position: relative;
  display: block;
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

const abs = css`
  position: absolute;
  left: ${props=>props.x || '0px' };
  top: ${props=>props.y || '0px' };
`

const fonts = css`
  font-family: Arial,sans-serif;
  font-size: 8px;
  text-transform: uppercase;
  color: white;
  text-align: ${props=>props.textAlign || 'left'};
  user-select: none;
`;

const size = css`
  width: ${ props=>props.width || '100%'};
  height: ${ props=>props.height || '100%'};
`;

const background = css`
  background-color: ${ props=>props.backgroundColor }
`;

const grid = css`
  display: grid;
  grid-gap: 0px;
  grid-template-columns: ${ props=>props.cols || '0.5fr 0.5fr' };  
`;

const flex = css`
  display: flex;
  justify-content: ${props=>props.halign || 'flex-start' };
  align-items: ${props=>props.valign || 'center' };  
`;

const interactive = css`
  pointer-events: all;
  cursor: pointer;
  transition: opacity 100ms ease-out;
  &:hover{
    opacity: 0.7;
  }
`;

export {
  base,
  abs,
  fonts,
  size,
  background,
  grid,
  flex,
  interactive
}