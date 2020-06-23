
<!--#echo json="package.json" key="name" underline="=" -->
ubborg-bundleurl-util-pmb
=========================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Convert and resolve ubborg bundle URLs.
<!--/#echo -->



API
---

This module exports an object that holds these functions:

### .shorten(url)

Return a less cluttered, more human-readable representation.

### .href(baseUrl, href)

Returns the full target URL, deciphering the meaning of
potentially-relative URLs.

### .toModuleId(url)

Return a CommonJS-style module identifiers suitable for dynamic import.
This works on a purely theoretical basis, with no actual file system lookups.
Thus, if the `url` assumes ubborg-specific features like slashable import,
the resulting module identifiers may require a suitably extended dynamic
import facility.





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
