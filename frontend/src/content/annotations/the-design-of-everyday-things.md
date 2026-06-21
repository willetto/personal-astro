---
title: "The Design of Everyday Things"
description: "Chapter-by-chapter notes from Don Norman's foundational text on human-centered design — exploring why some things are intuitive and others maddeningly confusing."
author: "Don Norman"
mediaType: "book"
coverImage:
  url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=1100&fit=crop&q=80"
  alt: "Stack of design books on a wooden desk"
pubDate: 2024-03-10
tags: ["design", "ux", "psychology", "product"]
---

## Chapter 1: The Psychopathology of Everyday Things

Norman opens with a deceptively simple question: why do some doors need signs telling you to push or pull? The answer is that the design failed to communicate its own operation — the door's **affordances** and **signifiers** didn't match the intended action.

Two concepts anchor the entire book: **affordances** (the relationship between an object and a person that determines how it can be used) and **signifiers** (perceivable signals that communicate how something should be used). A flat plate on a door affords pushing; a vertical bar affords pulling. When these don't match the actual mechanism, the human is blamed — but the fault lies with the design.

![A Norman door — flat plate on a pull door — the classic example of a signifier mismatch](https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=675&fit=crop&q=80)

The **Gulf of Execution** and **Gulf of Evaluation** emerge here as early concepts: the gap between what a person intends to do and what the system allows, and the gap between the system's state and the user's perception of it. Bridging both gulfs is the core challenge of design.

![Diagram concept — a person reaching across the gulf between intention and interface feedback](https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=675&fit=crop&q=80)

## Chapter 2: The Psychology of Everyday Actions

The **Seven Stages of Action** model is Norman's most cited framework, and for good reason — it maps the full loop of human intention and feedback:

1. Form the goal
2. Plan the action
3. Specify the action sequence
4. Execute the action
5. Perceive the state of the world
6. Interpret the perception
7. Compare the outcome to the goal

What's notable is that the model applies recursively — a single high-level goal (print a document) contains dozens of sub-goals, each with their own seven stages. This is why complex software can overwhelm: the cognitive load compounds at each stage.

Norman also introduces **learned helplessness** in this chapter — the phenomenon where repeated failure makes people blame themselves rather than the system. This is particularly damaging when the design is genuinely at fault but the user internalizes it as personal incompetence.

![The seven stages of action mapped as a cycle — goal at top, action on one side, perception on the other](https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=675&fit=crop&q=80)

## Chapter 3: Knowledge in the Head and in the World

One of the most liberating ideas in the book: not all knowledge needs to be in your head. Effective design distributes knowledge across the person *and* the environment. A well-labeled stove doesn't require memorizing burner positions — the layout makes it obvious.

Norman distinguishes between **knowledge in the head** (memory, mental models, learned behavior) and **knowledge in the world** (affordances, signifiers, labels, physical constraints). Relying entirely on in-the-head knowledge creates high-friction experiences. Putting knowledge in the world reduces cognitive load dramatically.

This maps cleanly to modern UX work: good interface design shouldn't require reading a manual. The UI itself should teach through use.

![A well-organized workshop where tools are silhouetted on a pegboard — the layout itself communicates what belongs where](https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=675&fit=crop&q=80)

The chapter also covers **natural mappings** — spatial relationships between controls and their effects that feel intuitive. Stovetop burner controls that mirror the layout of the burners are naturally mapped. Controls arranged in a straight line for a 2×2 grid of burners are not. The principle: whenever possible, the structure of controls should reflect the structure of what they control.

## Chapter 4: Knowing What to Do — Constraints, Discoverability, Feedback

Constraints are the chapter's star: limiting actions to the possible set is one of the most powerful tools a designer has. Norman categorizes them as **physical**, **cultural**, **semantic**, and **logical**.

A USB plug is a physical constraint (it only fits one way — or was, before USB-C flipped this). Cultural constraints are conventions we learn over time (scrollbars go on the right, menus at the top). Semantic constraints derive from meaning (you can't put the roof panel before the walls). Logical constraints follow from situation (if three of four batteries are placed, the fourth slot determines the orientation of the remaining one).

![A USB-A plug showing obvious physical orientation constraints — it only goes one way](https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=1200&h=675&fit=crop&q=80)

**Feedback** closes the loop. Feedback tells you that the system received your action and what happened as a result. A button that doesn't change appearance when clicked, a form that submits with no confirmation, a door handle that doesn't give resistance — all failures of feedback. Norman's rule: feedback must be immediate, informative, and not overwhelming.

The chapter ends on **discoverability**: the ability to figure out what a thing does and how to do it, purely through the design itself. Discoverability is not about making things obvious through labels; it's about making the structure of the system legible through thoughtful design.
