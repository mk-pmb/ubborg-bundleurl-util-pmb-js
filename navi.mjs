// -*- coding: utf-8, tab-width: 2 -*-

import uu from '.';

function makeNavigator(url) {
  if (!url) { return makeNavigator(uu.cwdUrl); }
  function nav(dest) { return makeNavigator(nav.href(dest)); }
  Object.assign(nav, {
    toString() { return url; },
    toModuleId() { return uu.toModuleId(url); },
    shorten() { return uu.shorten(url); },
    href(dest) { return uu.href(url, dest); },
  });
  return nav;
}


export default makeNavigator;
