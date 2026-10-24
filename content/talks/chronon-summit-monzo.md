---
title: "It's About Time: How Monzo Evolved Feature Engineering"
emoji: ⏱️
event: Chronon Summit (Airbnb)
summary: "Led Monzo's work building Chronon into our feature platform: one framework for batch, near real-time, and just-in-time features, with consistency checks built in between training and serving."
weight: 2
---

Led this at Monzo. We built [Chronon](https://github.com/airbnb/chronon) into our feature platform to give teams one framework for batch, near real-time, and just-in-time features, with built-in checks between online and offline data. It replaced four generations of increasingly stretched feature tooling, from one-off bespoke solutions through a platform-owned batch tool and a rewrite that added logging and training sets.

It went well. We embedded Chronon straight into our core banking platforms, got a stable p99 of 45ms on complex nested joins over large windows, and hit 99%+ consistency between training data and what we actually serve in production. The compile checker alone saved us from a lot of schema mismatches before they shipped, and it's now the default way teams at Monzo build real-time features.

A few things caught us off guard. Real-world events are messier than they look on a whiteboard. Schemas evolve, and joining them safely is harder than it sounds. Teams went straight for 5+ event joins on day one. The SQL-like Python syntax is powerful but has a real learning curve, and we had a handful of legacy features that were disproportionately painful to port across.
