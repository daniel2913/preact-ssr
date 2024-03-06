import { render, hydrate as hydrativeRender,cloneElement } from 'preact';

let initialized;
export default function hydrator(jsx, parent) {
  if (typeof window === 'undefined') return;
  let isodata = document.querySelector('script[type=isodata]');
  // @ts-ignore-next
  parent = parent || (isodata && isodata.parentNode) || document.body;
  if (isodata) {
    let props = {}
    try {
      props = JSON.parse(isodata.innerHTML)
    }
    finally {
      if (!initialized && isodata) {
        hydrativeRender(cloneElement(jsx,props), parent);
      } else {
        render(cloneElement(jsx,props), parent);
      }
      initialized = true;

    }
  }
}
