// One prefix for every localStorage key this app writes. The sibling apps
// (accounting, supply chain, macro, history) can all live in the same browser,
// and a shared key would let one app read, or wipe, another's progress.
export const PREFIX = 'information-systems-unlocked'
export const KEYS = {
  progress: `${PREFIX}-progress`,
  session: `${PREFIX}-exam-session`,
  theme: `${PREFIX}-theme`,
}
