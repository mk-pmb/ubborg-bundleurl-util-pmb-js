// -*- coding: utf-8, tab-width: 2 -*-

import urlLib from 'url';
import pathLib from 'path';

const cwdUrl = 'file+cwd:///';
const rx = {
  proto: /^([\w\+\-]+):(\/*)/,
};

const hostlessProtos = [
  'cjs',
  'file',
  'file+cwd',
];

function urlify(href, base) { return String(new urlLib.URL(href, base)); }

function splitProto(url) {
  const m = rx.proto.exec(url || '');
  if (!m) { return false; }
  return { proto: m[1], slashes: m[2], remainder: url.slice(m[0].length) };
}

function canonicalizeProtocol(orig) {
  const { proto: p, remainder: r } = splitProto(orig);
  if (!p) { return './' + orig; }
  if (hostlessProtos.includes(p)) { return p + ':///' + r; }
  return orig;
}

const normPath = pathLib.normalize;

function resolvePreserveTrailingSlash(orig) {
  const abso = pathLib.resolve(orig);
  if (orig.endsWith('/') && (!abso.endsWith('/'))) { return abso + '/'; }
  return abso;
}


const uu = {

  cwdUrl,
  splitProto,

  shorten(url) {
    const { proto: p, remainder: r } = splitProto(url);
    if (!p) { return normPath(url); }
    switch (p) {
      case 'file+cwd':
        return normPath(r);
      case 'cjs':
        return p + ':' + normPath(r);
    }
    return urlify(url);
  },

  href(baseUrl, dest) {
    const baseNorm = urlify(canonicalizeProtocol(baseUrl), cwdUrl);
    if (!dest) { return baseNorm; }
    return urlify(canonicalizeProtocol(dest), baseNorm);
  },

  toModuleId(url, opt) {
    const { proto: p, remainder: r } = splitProto(url);
    switch (p) {
      case 'file':
        if (!r) { return '/'; }
        return normPath('/' + r);
      case 'file+cwd':
        return resolvePreserveTrailingSlash(r);
      case 'cjs':
        return r;
    }
    const { ifUnsupported } = (opt || false);
    if (ifUnsupported !== undefined) { return ifUnsupported; }
    throw new Error('Unsupported protocol schema: ' + url);
  },

};

export default uu;
