---
title: Our learnings from serving online models at Monzo
emoji: 🤖
event: London AI Meetup
summary: "Led the engineering work here. We built Monzo's online model-serving platform and learned a lot about balancing standardisation with flexibility, running Python models inside a mostly-Go stack, and why conversational models don't fit a simple request/response pattern."
weight: 3
---

Led the engineering work behind Monzo's online model-serving platform. Standardisation gets you a lot of leverage, but lock it down too hard and you kill the flexibility teams actually need. Getting that balance right was most of the work.

We run Python model runtimes inside a serving stack that's overwhelmingly Go, so keeping serving logic and model runtimes cleanly separated mattered a lot. Supporting more than one model per deployment added complexity fast. And the thing that stuck with me most: you can't serve a conversation through a vending machine. Request/response patterns just don't map onto conversational models.
