---
title: Heart rate from any band
summary: >-
  Mind & Body used to mean Apple Watch. It now takes heart rate from anything
  that writes to the Health app, and it is no longer hidden from people
  without a Watch.
# Draft until the release that carries this ships. Set the real date and flip.
pubDate: 2026-10-01
kind: release
tool: loop
draft: true
---

Mind & Body used to mean "Apple Watch". Heart rate arrived down exactly one
pipe, streamed live from the Watch during a session, so meditating with the
Watch off the wrist saved a session with an empty chart.

Loop now reads the session's time window back out of the Health app instead.
Any band that writes heart rate there can fill the chart: a Fitbit, an Oura
ring, a Whoop, or an Apple Watch that was worn but whose connection dropped
partway through. Nothing is device specific. The app asks Health for the window
and takes what it finds.

## A summary, not a live readout

Third-party bands write to Health in batches after the fact, so there is no
number on screen during the session; the figures appear on the record
afterwards. Because that sync can lag by hours, Loop looks twice: once when the
session ends, for anything already written, and again the next time you open
the app, looking back two days for the slow ones.

## The Watch still wins

If you do wear an Apple Watch, its live reading is the one that counts. A
summary from Health never overwrites it, and a summary that arrives first is
replaced when the Watch's own record lands, because that one is denser and
carries active energy, which nothing else can measure.

Health access is requested at the end of a session, never when you press play,
the same way Mindful Minutes has always worked. The later look-back never asks
for anything.

## No longer hidden

The Mind & Body toggle used to be hidden from anyone who had never connected a
Watch, which kept the feature out of reach of the people it now helps most. It
appears wherever heart rate can be recorded at all, and its subtitle says
which route this device will take: a live workout with a Watch, or a heart
rate summary from Health without one.
