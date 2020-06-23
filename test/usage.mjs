// -*- coding: utf-8, tab-width: 2 -*-

import 'p-fatal';
import 'usnam-pmb';
import test from 'p-tape';

import buu from '..';


test('reversible shortening', (t) => {
  function c(shortUrl, fullUrl) {
    t.strictEqual(buu.href(shortUrl), fullUrl);
    t.strictEqual(buu.shorten(fullUrl), shortUrl);
  }

  c('ab',        'file+cwd:///ab');
  c('ab/cd',     'file+cwd:///ab/cd');
  c('ab/cd/',    'file+cwd:///ab/cd/');

  c('cjs:@std/esm',          'cjs:///@std/esm');
  c('cjs:@std/esm/foo.bar',  'cjs:///@std/esm/foo.bar');
  c('cjs:esm',               'cjs:///esm');
  c('cjs:esm/foo.bar',       'cjs:///esm/foo.bar');

  t.end();
});


test('lossy shortening', (t) => {
  function s(orig, shorter) { t.strictEqual(buu.shorten(orig), shorter); }

  s('ab/cd/..',       'ab');
  s('ab/cd/../',      'ab/');
  s('ab/cd/../..',    '.');
  s('ab/cd/../../',   './');

  t.end();
});


test('relative href', (t) => {
  function h(base, dest, want) {
    t.strictEqual(buu.href(base, dest), h.prefix + want);
  }

  h.prefix = 'file+cwd:///';
  h('', 'ab', 'ab');
  h('', 'ab/', 'ab/');
  h('', 'ab/cd', 'ab/cd');
  h('ab/cd', '..', '');
  h('ab/cd', '../..', '');
  h('ab/cd/', '..', 'ab/');
  h('ab/cd/', '../', 'ab/');
  h('ab/cd/', '../..', '');
  h('ab/cd/', '../../', '');
  h('ab/cd/ef', '../..', '');
  h('ab/cd/ef', '../../', '');

  h.prefix = 'cjs:///';
  h('cjs:@org/pkg', 'sameorg-sibling-pkg', '@org/sameorg-sibling-pkg');
  h('cjs:@org/pkg/', 'foo', '@org/pkg/foo');
  h('cjs:@org/pkg/', 'foo/', '@org/pkg/foo/');
  h('cjs:@org/pkg/foo/', '../bar/', '@org/pkg/bar/');
  h('cjs:@org/pkg/foo/', '../bar/qux', '@org/pkg/bar/qux');

  t.end();
});















/* scroll */
