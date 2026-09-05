---
title: How the wheel feels
summary: >-
  The duration wheel is the most touched control in Loop. Notes on making it
  feel like a mechanical detent wheel: what clicks, how hard, and how it lands.
pubDate: 2026-09-05
kind: essay
tool: loop
---

The first thing you touch in Loop is the wheel. Before a sound, before a
session, you set a length, and you do that by flicking a column of numbers
until the one you want sits in the middle. It is a small control. It is also
the one people use every single time, so it is where the app's character lives
or does not.

We wanted it to feel like a good mechanical detent wheel: something with real
physics that you might fidget with for the pleasure of it. Getting there turned
out to be mostly a matter of what not to do.

## Let the system own the physics

An earlier version guessed when your flick had stopped and then snapped to the
nearest value on a timer. It never landed quite right, because a guess about
inertia is always a little late. The wheel is now built on the phone's own
scroll stack, the same deceleration and snapping the Photos grid uses, aligned
to the exact centre of each row. There is no timer. When the wheel lands, it
lands because the scroll did.

## Weld the picture to your thumb

The number in the middle is large and fully opaque. Its neighbours shrink and
fade. That used to be animated: the app noticed the selection had changed and
eased the sizes over a fraction of a second, which meant the picture always
trailed your finger by that fraction. Now every pixel of scroll maps directly
to a size and an opacity. Nothing eases, nothing lags. The face is a function of
where your thumb is, and the numbers roll like an odometer, measured fresh each
frame from the row nearest the centre so they land exactly on a whole number
and never drift during a long spin.

## Click, and vary the click

Each value that crosses the centre fires a small haptic. On hardware that
supports it we use Core Haptics rather than the standard impact generator,
because Core Haptics lets us set two things per click: how hard, and how crisp.

A slow, deliberate turn, one value at a time, gets a firm and slightly rounded
click: intensity 0.62, sharpness 0.52, on a scale of one. A fast spin gets a
lighter, crisper one, 0.26 and 0.92, so a flurry of values reads as a flurry
rather than a jackhammer. Between the two extremes the click follows your speed
continuously, reaching the fast end at about 2,200 points per second.

## Land differently from passing through

When the wheel comes to rest after a throw there is one more haptic, a touch
stronger and much rounder than a click: 0.78 and 0.34. It says "landed" rather
than "another value". The two ends of the range get a firmer bump of their own
so you feel the edges instead of watching for them, and the infinity value at
the top, the one for sessions with no end, gets the softest and roundest
signature of all.

## Prepare before the first touch

Creating a haptic engine on the first click is the classic latency mistake: the
click arrives late and everything after it feels cheap. The engine and its
fallbacks are warmed up when the wheel appears, so the first click is as good
as the hundredth.

## Respect the person who turned it off

The system's haptics switch already governs the standard generators, but Core
Haptics ignores it. So the wheel treats Reduce Motion as its opt-out: turn that
on and the wheel goes quiet under your thumb, and the roll becomes a plain
fade.

## Two more small things

A horizontal swipe across the wheel changes presets. While that swipe is
happening the wheel keeps scrolling, because stopping it mid-gesture hitches,
but it stops writing values and stops clicking, so an accidental vertical drift
cannot change your duration.

And the wheel grows with your text size, up to a point. The face scales with
Dynamic Type; the invisible rows underneath, the snapping and the haptics stay
exactly where they were.

None of this shows in a screenshot. It is the part of a tool you only notice
when it is missing, and it is where we spent the most time. If you have Loop,
turn the wheel slowly, then fast, then let it go. That is the whole note.
