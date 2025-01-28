# How to lose weight?

FOSDEM 2025 talk on losing weight in JavaScript using Struct-of-Arrays data
structures combined with column type choices made based on context knowledge of
the system you're working on. Together these enable approaching ideal,
[Shannon entropy](https://en.wikipedia.org/wiki/Entropy_(information_theory))
defined lower limits on memory usage for a given program.

The transformations and tricks outlined here are not a panacea: The resulting
JavaScript can be regarded as frankly alien, disgusting, confusing, unsafe,
and/or not worth the trouble. And such opinions are entirely valid as well:
Losing weight is a tradeoff that costs you code weight, complexity, and context
knowledge requirements. For those cases where you absolutely must get the memory
consumption of a data structure under control, that tradeoff may still make
sense.
