
<!--#echo json="package.json" key="name" underline="=" -->
ubborg-bundleurl-util-pmb
=========================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Convert and resolve ubborg bundle URLs.
<!--/#echo -->



API
---

This module exports an object that holds these functions and properties:


### .shorten(url)

Return a less cluttered, more human-readable representation.
This works on a purely theoretical basis, with no actual system state lookups.
Thus, it will not try to read meaning into URLs, e.g. will not try to guess
a "simpler" more symbolic URL just because it would happen to point to the
same target given current system state.


### .href(baseUrl[, dest])

Returns the full target URL, deciphering the meaning of
potentially-relative `dest` URLs and potentially `.shorten()`ed `baseUrl`s.
If `dest` is omitted or false-y, returns the full ("un-`shorten()`-ed")
representation of `baseUrl`.


### .toModuleId(url)

Return a CommonJS-style module identifiers suitable for dynamic import.
This works on a purely theoretical basis, with no actual file system lookups.
Thus, if the `url` assumes ubborg-specific features like slashable import,
the resulting module identifiers may require a suitably extended dynamic
import facility.


### .cwdUrl

String with a URL that represents the current working directory.







Usage
-----

see [test/usage.mjs](test/usage.mjs).


<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
