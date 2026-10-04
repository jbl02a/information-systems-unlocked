// Quick-cram flashcards, built from every lesson's key terms so the two can
// never disagree. A card carries its term's `src` and `emph`.
//
// IDS: `CARD-<topic>-<slug of the term>`. They key his misses ("didn't know"),
// so a key term's wording is effectively its id. To reword a term without
// orphaning his history, give the key term a `cardId` with the old slug;
// scripts/verify-bank.mjs asserts every card id is unique.
import { LESSONS } from './lessons.js'

export const slug = s => String(s).toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export const CARDS = LESSONS.flatMap(l => l.keyTerms.map(k => ({
  id: `CARD-${l.topic}-${k.cardId ?? slug(k.term)}`,
  topic: l.topic,
  front: k.term,
  back: k.def,
  src: k.src,
  ref: k.ref,
  emph: k.emph,
})))

export function cardById(id) {
  return CARDS.find(c => c.id === id) ?? null
}
