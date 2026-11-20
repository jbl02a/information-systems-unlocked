// Test 3, one module per topic (each checked by scripts/t3/check.mjs). The bank
// files append these, so every page and check sees one LESSONS, QUESTIONS and
// MATCHING_SETS list; the unit of any item comes from its topic.
//
// Order here is the order the decks were taught, which is the order of the
// notes: data (10/26–28) is listed before networks (10/19–21) because the topic
// order in topics.js decides display; this list only collects.
import * as data from './data.js'
import * as networks from './networks.js'
import * as dataviz from './dataviz.js'
import * as pm from './pm.js'
import * as ecommerce from './ecommerce.js'
import * as social from './social.js'
import * as articles from './articles.js'

const MODULES = [data, networks, dataviz, pm, ecommerce, social, articles]

export const T3_LESSONS = MODULES.map(m => m.LESSON)
export const T3_QUESTIONS = MODULES.flatMap(m => m.QUESTIONS)
export const T3_MATCHING_SETS = MODULES.flatMap(m => m.MATCHING_SETS)
