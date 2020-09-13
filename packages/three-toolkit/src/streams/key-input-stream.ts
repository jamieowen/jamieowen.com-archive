import { Stream } from "@thi.ng/rstream";

type KeyEvent = {
  key: string;
};

type KeyChar = string;
type KeyInputParams = {
  target: HTMLElement;
  keys: string[];
  ignoreCase: boolean;
};

export const keyInputStream = (target: HTMLElement) => {
  const stream = new Stream<KeyEvent>();

  const onKeyUp = (ev: KeyboardEvent) => {
    console.log(">>", ev.which, String.fromCharCode(ev.which));
  };
  window.addEventListener("keyup", onKeyUp);
  // const _target: HTMLElement =
  // _target.addEventListener("keyup");
  // _target.addEventListener('ke')
  // return stream;

  return stream;
};
