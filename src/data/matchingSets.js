// Matching sets for /matching.
//
// THE PAIRINGS ARE OURS. The syllabus says exams "may" include matching; it
// does not say what would be matched. These sets take the pair-shaped material
// in the slides (term → definition, attack → example, figure → what it measures)
// and the textbook topics, and turn it into practice. `src` is where the FACTS
// come from; the arrangement into sets is ours in every case, and /matching
// says so above the drills.
//
// Graded all-or-nothing, both columns shuffled (CLAUDE.md rule 1). Recorded as
// `MS-<id>` with type 'match'. IDs are permanent.

export const MATCHING_SETS = [
  // ── Ethics & Privacy ─────────────────────────────────────────────────────
  {
    id: 'E1', topic: 'ethics', src: 'slides', ref: 'ch3a s8',
    title: 'The four categories of ethical issues',
    pairs: [
      { left: 'Privacy issues', right: 'Collecting, storing and disseminating information about individuals' },
      { left: 'Accuracy issues', right: 'The authenticity, fidelity and correctness of information' },
      { left: 'Property issues', right: 'The ownership and value of information' },
      { left: 'Accessibility issues', right: 'Who should have access to information, and whether they pay for it' },
    ],
    why: 'P-A-P-A. Accuracy is about whether it is right; property is about who owns it; accessibility is about who gets to see it.',
  },
  {
    id: 'E2', topic: 'ethics', src: 'slides', ref: 'ch3b s5–9',
    title: 'The four types of cookies',
    pairs: [
      { left: 'Essential cookies', right: 'Keep you logged in and hold your cart; the site breaks without them' },
      { left: 'Performance / analytics cookies', right: 'Count pages visited and time on a page (Google Analytics)' },
      { left: 'Functional cookies', right: 'Remember your language, region and layout' },
      { left: 'Advertising / targeting cookies', right: 'Follow you across sites to show personalized ads' },
    ],
    why: 'Advertising and targeting cookies are the ones the slide calls the most controversial for privacy.',
  },
  {
    id: 'E3', topic: 'ethics', src: 'slides', ref: 'ch3a s2–6, ch3b s12–13',
    title: 'Surveillance and tracking technologies',
    pairs: [
      { left: 'Geofence', right: 'A virtual perimeter that triggers a response when a device enters or leaves' },
      { left: 'Photo tagging', right: 'Naming faces so software can find them in untagged photos' },
      { left: 'Flock camera', right: 'An automated license plate reader that also records make and color' },
      { left: 'Web beacon', right: 'A tiny, often invisible image that reports your behavior' },
      { left: 'Session replay script', right: 'Records your mouse movement, clicks, scrolls and hovering' },
    ],
    why: 'Each one tracks a different thing: where you are, your face, your car, what you open, and what you do on a page.',
  },
  {
    id: 'E4', topic: 'ethics', src: 'slides', ref: 'ch3b s15–16',
    title: 'Privacy laws and the data they protect',
    pairs: [
      { left: 'GDPR', right: 'Europe' },
      { left: 'CCPA', right: 'California' },
      { left: 'Brazilian Data Protection Law', right: 'Brazil' },
      { left: 'Personal data', right: 'Name, address, IP address' },
      { left: 'Sensitive personal data', right: 'Genetic data, religious or political views' },
    ],
    why: 'The three laws on the slide, and the two kinds of data they cover.',
  },
  {
    id: 'E5', topic: 'ethics', src: 'slides', ref: 'ch3b s14',
    title: 'How apps track you',
    pairs: [
      { left: 'Device identifiers', right: 'Apple’s IDFA or the Android Advertising ID' },
      { left: 'SDKs', right: 'Code from analytics or ad companies built into the app' },
      { left: 'Local storage', right: 'Saved on the device to remember preferences and login status' },
      { left: 'Tracking pixels and APIs', right: 'Send information back to developers or third parties' },
    ],
    why: 'The four app-tracking methods from the image on slide 14 of the 9/16 deck.',
  },

  // ── Information Security ────────────────────────────────────────────────
  {
    id: 'S1', topic: 'security', src: 'slides', ref: 'ch4a s4, s16, s18',
    title: 'The core security terms',
    pairs: [
      { left: 'Threat', right: 'Any danger to which a system may be exposed' },
      { left: 'Exposure', right: 'The harm or damage that results if a threat compromises a resource' },
      { left: 'Vulnerability', right: 'The possibility that a threat will harm a resource' },
      { left: 'Data breach', right: 'Unauthorized individuals gain access to sensitive or confidential data' },
    ],
    why: 'Threat is the danger, exposure is the damage, vulnerability is the chance.',
  },
  {
    id: 'S2', topic: 'security', src: 'slides', ref: 'ch4a s6–8',
    title: 'The IBM breach figures',
    pairs: [
      { left: '$4.88 million', right: 'Average cost of a breach, globally' },
      { left: '1 in 4', right: 'Chance of an organization suffering a breach' },
      { left: '$9.5 million', right: 'Average cost of a breach in the U.S.' },
      { left: '$9.8 million', right: 'Average cost of a breach in healthcare' },
    ],
    why: 'All four were in orange on the slides. Healthcare is the highest; global is the lowest.',
  },
  {
    id: 'S3', topic: 'security', src: 'slides', ref: 'ch4a s24–30',
    title: 'Types of human error',
    pairs: [
      { left: 'Carelessness with computing devices', right: 'Leaving a company laptop in an Uber' },
      { left: 'Questionable e-mails', right: 'Clicking a link in mail from an unknown sender' },
      { left: 'Poor password selection', right: 'Using “password123” for every account' },
      { left: 'Unmanaged devices', right: 'Logging in from a hotel business-center computer' },
      { left: 'Discarded equipment', right: 'Throwing out a copier without wiping its memory' },
    ],
    why: 'Questionable e-mails are the top way organizations get compromised.',
  },
  {
    id: 'S4', topic: 'security', src: 'slides', ref: 'ch4a s32–35',
    title: 'Social engineering tactics',
    pairs: [
      { left: 'Phone call', right: 'Pretends to be IT and asks for your password' },
      { left: 'Physical', right: 'A fake badge or uniform to get into a secure area' },
      { left: 'Tailgating', right: 'Follows you through a door you hold open' },
      { left: 'Shoulder surfing', right: 'Reads your screen over your shoulder' },
    ],
    why: 'All four trick a legitimate employee rather than break a system.',
  },
  {
    id: 'S5', topic: 'security', src: 'slides', ref: 'ch4b s6–17',
    title: 'Deliberate threats and their examples',
    pairs: [
      { left: 'Espionage or trespass', right: 'Getting into a T-Mobile router to reach customer data' },
      { left: 'Sabotage or vandalism', right: 'Defacing the UK National Health Service website' },
      { left: 'Theft of equipment or information', right: 'Dumpster diving for documents' },
      { left: 'Compromise to intellectual property', right: 'Samsung copying iPhone features' },
      { left: 'Identity theft', right: 'Assuming someone else’s identity to reach their finances' },
    ],
    why: 'Five of the six deliberate threats on the class slides, each with the slide’s own example where it has one.',
  },
  {
    id: 'S6', topic: 'security', src: 'slides', ref: 'ch4b s19–29',
    title: 'Software attacks',
    pairs: [
      { left: 'Virus', right: 'Damages programs, deletes files or reformats drives' },
      { left: 'Worm', right: 'Replicates itself and spreads to other computers' },
      { left: 'Ransomware', right: 'Encrypts data until a payment is made' },
      { left: 'Botnet', right: 'Infected computers controlled by a remote bot master' },
      { left: 'DDoS attack', right: 'Floods a site with traffic to make it unusable' },
      { left: 'Doxxing', right: 'Threatens to publish stolen private data' },
    ],
    why: 'A botnet is the army; a DDoS is one thing the army does.',
  },
  {
    id: 'S7', topic: 'security', src: 'slides', ref: 'ch4a s12–15, ch4b s9, s22–24',
    title: 'The breach cases from class',
    pairs: [
      { left: 'Marriott', right: '383 million guest records, unencrypted passport numbers' },
      { left: 'Instagram', right: '489 million users’ data leaked (Nov 2024)' },
      { left: 'American Airlines and Southwest', right: 'Breached through a third-party recruiting vendor' },
      { left: 'Colonial Pipeline', right: 'Ransomware shut the fuel pipeline for 5+ days' },
      { left: 'T-Mobile', right: 'An intruder got in through a network router' },
    ],
    why: 'Cases are easy marks: know which company goes with which lesson.',
  },
  {
    id: 'S8', topic: 'security', src: 'book',
    title: 'Authentication factors (textbook)',
    pairs: [
      { left: 'Something you are', right: 'A fingerprint or face scan' },
      { left: 'Something you have', right: 'An ID badge or security token' },
      { left: 'Something you do', right: 'Your voice or signature' },
      { left: 'Something you know', right: 'A password or PIN' },
    ],
    why: 'Textbook Chapter 4 content. The Part 4 slides list passwords, biometrics and MFA as access controls but do not teach these four categories.',
  },

  {
    id: 'S9', topic: 'security', src: 'slides', ref: 'ch4c s4–11',
    title: 'Alien software and attacks on infrastructure',
    pairs: [
      { left: 'Adware', right: 'Causes pop-up advertisements' },
      { left: 'Spyware', right: 'Collects personal information without consent' },
      { left: 'Spamware', right: 'Sends unsolicited e-mail from harvested addresses' },
      { left: 'Tracking cookie', right: 'Follows your path, time and clicks for marketing' },
      { left: 'SCADA attack', right: 'Targets systems controlling refineries, water and power plants' },
      { left: 'Cyberwarfare', right: 'Attacks carried out or sponsored by countries' },
    ],
    why: 'Part 3 of the Chapter 4 decks (10/7).',
  },
  {
    id: 'S10', topic: 'security', src: 'slides', ref: 'ch4d s12–20',
    title: 'Communications (network) controls',
    pairs: [
      { left: 'Firewall', right: 'Keeps unauthorized Internet users out of private networks' },
      { left: 'Anti-malware', right: 'Finds and removes viruses, worms and other malware' },
      { left: 'Whitelisting', right: 'Names the only apps or sites allowed' },
      { left: 'Blacklisting', right: 'Names the apps or sites not allowed' },
      { left: 'Encryption', right: 'Scrambles data; public key locks, private key unlocks' },
      { left: 'TLS', right: 'Encrypts data between a Web server and browser' },
      { left: 'SIEM', right: 'Real-time alerts of suspicious activity from collected logs' },
    ],
    why: 'Part 4, slides 12–20.',
  },
  {
    id: 'S11', topic: 'security', src: 'slides', ref: 'ch4d s21–28',
    title: 'Risk management and insurance',
    pairs: [
      { left: 'Risk acceptance', right: 'No controls; absorb any damage' },
      { left: 'Risk limitation', right: 'Controls that minimize the impact' },
      { left: 'Risk transference', right: 'Shift the risk, e.g. buy insurance' },
      { left: 'Risk analysis', right: 'Value assets, estimate probability, compare costs' },
      { left: 'First-party cyber insurance', right: 'Covers your own company’s breach costs' },
      { left: 'Third-party cyber insurance', right: 'Covers you when another business sues' },
    ],
    why: 'Part 4, slides 21–28.',
  },

  // ── Textbook-only topics ────────────────────────────────────────────────
  {
    id: 'H1', topic: 'hardware', src: 'book',
    title: 'Memory and storage',
    pairs: [
      { left: 'Registers', right: 'Inside the CPU: the fastest, smallest storage' },
      { left: 'Cache', right: 'Very fast memory for the data the CPU uses most' },
      { left: 'RAM', right: 'Holds what is in use; lost when the power goes off' },
      { left: 'ROM', right: 'Holds startup instructions; kept without power' },
      { left: 'Solid-state drive', right: 'Secondary storage that keeps data long term' },
    ],
    why: 'From the CPU outward: faster and costlier per byte near the CPU, bigger and cheaper further away.',
  },
  {
    id: 'W1', topic: 'software', src: 'book',
    title: 'Kinds of software',
    pairs: [
      { left: 'Operating system', right: 'Manages the hardware and provides the interface' },
      { left: 'Application software', right: 'Does a specific job for the user' },
      { left: 'Open-source software', right: 'Source code anyone may use, study and modify' },
      { left: 'Software-as-a-Service', right: 'Rented over the Internet by subscription' },
    ],
    why: 'Systems vs application is the big split; open source and SaaS are about how you get it.',
  },
  {
    id: 'A1', topic: 'acquiring', src: 'book',
    title: 'The stages of the SDLC',
    pairs: [
      { left: 'Systems investigation', right: 'Is the problem worth solving, and is a fix feasible?' },
      { left: 'Systems analysis', right: 'Gather the user requirements' },
      { left: 'Systems design', right: 'Specify how the system will meet them' },
      { left: 'Programming and testing', right: 'Write the code and test it' },
      { left: 'Implementation', right: 'Convert from the old system to the new one' },
      { left: 'Operation and maintenance', right: 'Run, audit and update it over its life' },
    ],
    why: 'In order: whether, what, how, build, switch, keep.',
  },
  {
    id: 'A2', topic: 'acquiring', src: 'book',
    title: 'Conversion methods',
    pairs: [
      { left: 'Direct', right: 'Old system off, new one on, all at once' },
      { left: 'Pilot', right: 'One location or group goes first' },
      { left: 'Phased', right: 'Introduced in stages, module by module' },
      { left: 'Parallel', right: 'Old and new run side by side for a while' },
    ],
    why: 'Parallel is the safest and costliest; direct is the riskiest.',
  },
  {
    id: 'I1', topic: 'ai', src: 'book',
    title: 'How machines learn',
    pairs: [
      { left: 'Supervised learning', right: 'Trained on labeled examples' },
      { left: 'Unsupervised learning', right: 'Finds patterns in unlabeled data' },
      { left: 'Reinforcement learning', right: 'Learns by trial and error with rewards' },
      { left: 'Deep learning', right: 'Many-layered neural networks and large data' },
      { left: 'Natural language processing', right: 'Understands and generates human language' },
    ],
    why: 'Labels, no labels, rewards; deep learning is how; NLP is one thing it can do.',
  },
]

export function setById(id) {
  return MATCHING_SETS.find(s => s.id === id) ?? null
}
