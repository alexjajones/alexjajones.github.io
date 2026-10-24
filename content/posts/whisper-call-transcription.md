---
title: 'Cost-effective telco call transcription by scaling Whisper'
emoji: 🎙️
summary: "Built an in-house call transcription pipeline on faster-whisper, running at a fraction of the cost of GCP and AWS Speech-to-Text."
date: '2026-10-24T12:00:00+01:00'
draft: false
---

[Read the original on Medium →](https://medium.com/@vmo2techteam/cost-effective-telco-call-transcription-by-scaling-whisper-at-virgin-media-o2-510d113c0d1b)

Our call centres generate 10-20 million minutes of audio a month, and sampling a handful of calls doesn't tell you much at that volume. So we built a transcription pipeline on faster-whisper instead, running on GPU workers via Beam and Dataflow, orchestrated with Airflow.

We split agent and customer audio by stereo channel so transcripts don't cross over, and ran voice activity detection first to strip out hold music and dead air. That also helped with Whisper hallucinating on the longer calls.

Came out around 20x cheaper than GCP Speech-to-Text and 23x cheaper than AWS, at the volumes we were running.
