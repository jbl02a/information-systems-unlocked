# Sources

What every piece of content came from. Read before changing any content.

## Files received (in `../information-systems materials/`, never in git)

| File | Received | Slides | Used for |
|---|---|---|---|
| `Chpt 3 Ethics and Privacy Part 1 9_14.pptx` | 2026-10-04 | 14 | `ethics` lesson, questions, cards |
| `Chpt 3 Ethics and Privacy Part 2 9_16.pptx` | 2026-10-04 | 35 | `ethics` |
| `Chpt 4 Information Security Part 1 9_28.pptx` | 2026-10-04 | 35 | `security` |
| `Chpt 4 Information Security Part 2 9_30.pptx` | 2026-10-04 | 47 | `security` |

Deck ids in the data: `ch3a`, `ch3b`, `ch4a`, `ch4b`. A `ref` such as
`ch4a s17` means the 9/28 deck, slide 17.

**None of the four has speaker notes, a study guide, review slides, a "know this"
slide, or the Test 2 date.**

Also relayed by the parent, not in any file we have: the syllabus text quoted in
`CLAUDE.md` (the six topics and the five "may" formats), Test 1 = 80 with an A
overall from quizzes, and "Test 2 is next week" (said 2026-10-04).

## How the decks were read

- Text and formatting come from the **raw `.pptx` XML**, not by eye: every run's
  color (`srgbClr` or theme `schemeClr`), bold and underline, in slide order from
  `presentation.xml`.
- **Image-only slides were viewed** (they are pictures, not text): the NBA privacy
  policy walk-through (ch3b s21–33), the app-tracking methods list (ch3b s14),
  the organizational-impact list (ch4a s9), the breached-company logos (ch4a s10),
  a **scanned textbook table of human mistakes** (ch4b s3), and 17 phishing
  examples (ch4b s30–46).

## The emphasis colors

Title runs set to the theme text color (`tx1`) are not emphasis. Bold is not
counted (most definitions are bold). Colored runs:

| Deck | Colors | What was colored |
|---|---|---|
| ch3a | blue (accent5) ×1 | "Meta Glasses" |
| ch3b | blue ×3, dark red (C00000) ×1 | the cookie definition; "These laws also include fines…"; "Cookie Policies" heading; red: advertising cookies "the most controversial from a privacy standpoint" |
| ch4a | blue (accent1, 0070C0) ×20, orange (accent2) ×5, red (FF0000) ×2, green (accent6) ×2 | blue: bad actors use or sell data; "easiest target… it just takes 1 person"; data-breach definition credit; Marriott passports; breach headlines; human-error type names; downtime costs. Orange: $4.88M, 1 in 4, $9.5M, $9.8M, "Top way that organizations get compromised". Red: "impossible" (perfect security); "Stop and think about what information you give out over the phone!". Green: Human Error, Social Engineering |
| ch4b | blue (accent1) ×7, green (00B050 / accent6) ×5 | blue: unintentional MIS/IT threats; espionage heading; software attacks; "Never click on links…". Green: "Software patches/updates are critical!!!"; "3rd party vendor security is important…"; Ransomware |

**Filtering to red would keep 3 runs and lose the rest.**

## Things in the decks worth knowing

- **The data-breach definition is credited on the slide to Microsoft's Copilot**
  (ch4a s4). The app quotes it and says so.
- **"10 Common Types of Deliberate Threats" (ch4b s5) covers 6.** Espionage,
  sabotage, theft, identity theft, intellectual property, software attacks. The
  other four (information extortion, alien software, cyberterrorism and
  cyberwarfare, SCADA attacks) are in the app as `src: 'book'`.
- **The decks stop before security controls.** The scanned textbook table on
  ch4b s3 refers to "Table 4.2" and an "Authentication section later in this
  chapter", which confirms the 10th edition's Chapter 4 continues into controls.
  Risk management, authentication and authorization, firewalls, encryption, VPNs
  and business continuity are in the app as `src: 'book'`, flagged as possibly
  coming in a later deck.
- **Human error has 8 types in the textbook table, 7 on the slides.** The 8th,
  careless monitoring of environmental hazards, comes from that scanned table,
  which is on a class slide, so it is `src: 'slides'`.
- **Social engineering sits under unintentional threats** in the decks (ch4a
  s31). The app follows the slides.

## Textbook-only topics: what we know vs what we assumed

Hardware, software, acquiring information systems and AI have **no class
material**. Their lessons and questions are `src: 'book'`:

- **Known from general knowledge of earlier editions** of this textbook (not
  verified against the 10th): hardware and software are back-of-book "Technology
  Guides"; acquiring IS and AI were Chapters 13 and 14. The concepts (computer
  hierarchy, CPU and memory, systems vs application software, licensing and open
  source, SDLC stages and conversion methods, acquisition options, machine
  learning types, AI capabilities, generative AI) are standard intro-IS content.
- **Not known:** the 10th edition's exact definitions, examples and numbering,
  and what the instructor taught or will emphasize. Every such item says so.

What would upgrade them: the class decks for those topics; exported textbook
pages; the publisher's chapter slides; or Test 1 and quiz questions (which would
also show the real format mix).
