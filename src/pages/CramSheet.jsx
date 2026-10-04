import { useScrollTop } from '../lib/useScrollTop'

// One printable sheet for the night before, held to TWO Letter pages (asserted
// by scripts/verify-browser.mjs printing it to PDF). Light-on-white because its
// purpose is paper; @media print in index.css strips the nav, footer and toolbar.
//
// Slide topics first. Textbook-only content is marked "(textbook, not slides)"
// in its heading, the same provenance rule as the rest of the app. If content
// is added, tighten the print rules in index.css rather than letting it spill
// onto a third page.
export default function CramSheet() {
  useScrollTop([])
  return (
    <div className="cram">
      <div className="cram-toolbar no-print">
        <div>
          <h1 className="text-2xl font-extrabold text-strong">Cram Sheet</h1>
          <p className="text-sm text-dim">Test 2 on two printed pages. For the night before and the walk in.</p>
        </div>
        <button onClick={() => window.print()}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-cyan-700 text-white font-bold hover:opacity-90 shrink-0">
          🖨️ Print
        </button>
      </div>

      <div className="cram-page">
        <header className="cram-head">
          <h1>Intro to Information Systems &mdash; Test 2 Cram Sheet</h1>
          <p>Topics (syllabus): ethics &amp; privacy &middot; information security &middot; hardware &middot; software &middot; acquiring IS &middot; AI.
            Formats it <strong>may</strong> use: multiple choice, true/false, matching, fill in the blank, short answer (mix not stated).
            Chapters 3&ndash;4 are from the class slides; the other four topics are textbook content (no slides yet).</p>
        </header>

        <section className="cram-section">
          <h2>Ch. 3 &mdash; Ethics &amp; Privacy</h2>
          <table>
            <thead><tr><th>Ethical issue (P-A-P-A)</th><th>Involves</th></tr></thead>
            <tbody>
              <tr><td><strong>Privacy</strong></td><td>Collecting, storing, disseminating info about individuals</td></tr>
              <tr><td><strong>Accuracy</strong></td><td>Authenticity, fidelity, correctness (who is accountable for errors?)</td></tr>
              <tr><td><strong>Property</strong></td><td>Ownership and value of info (corporate computers for private use?)</td></tr>
              <tr><td><strong>Accessibility</strong></td><td>Who may access info, and should they pay?</td></tr>
            </tbody>
          </table>
          <p className="cram-note"><strong>Information privacy</strong> = your right to control what personal info is collected, stored, shared, used.
            <strong> Geofence</strong> = virtual perimeter; triggers when a device enters/leaves. <strong>Photo tagging</strong> = naming faces; facial recognition finds them in untagged photos, person not aware. <strong>Flock cameras</strong> = license plate readers (+ make, color).</p>
        </section>

        <section className="cram-section">
          <h2>Cookies &amp; tracking</h2>
          <p className="cram-lead"><strong>Cookie</strong> = a text file stored on your computer/phone from websites you visit.</p>
          <table>
            <thead><tr><th>Type</th><th>Does</th></tr></thead>
            <tbody>
              <tr><td>1. Essential</td><td>Login, cart, security; can&rsquo;t disable without breaking the site</td></tr>
              <tr><td>2. Performance / analytics</td><td>Pages visited, time on page (Google Analytics)</td></tr>
              <tr><td>3. Functional</td><td>Language, region, layout</td></tr>
              <tr><td>4. Advertising / targeting</td><td>Track across sites for ads &mdash; <strong>most controversial</strong> for privacy</td></tr>
            </tbody>
          </table>
          <p className="cram-note"><strong>First-party</strong>: set by the site you visit, can&rsquo;t track you elsewhere. <strong>Third-party</strong>: placed by someone else (marketers, data brokers), tracks you <em>across</em> sites.
            <strong> Web beacon / web bug</strong>: tiny transparent image in a site or e-mail. <strong>Session replay script</strong>: records mouse, clicks, scrolls, even hovering.
            <strong> Apps</strong>: device IDs (IDFA, Android Ad ID), SDKs, local storage, tracking pixels &amp; APIs.</p>
        </section>

        <section className="cram-section">
          <h2>Privacy laws &amp; cookie policies</h2>
          <p className="cram-lead"><strong>GDPR</strong> (Europe), <strong>Brazilian Data Protection Law</strong>, <strong>CCPA</strong> (California). Rights: to <strong>know</strong>, to <strong>delete</strong>, to <strong>opt out of sale</strong>, to <strong>non-discrimination</strong>. Also <strong>fines</strong> for failing to protect data. Complex for organizations (conflicting countries&rsquo; laws).</p>
          <p className="cram-note"><strong>Personal data</strong>: name, address, IP address. <strong>Sensitive</strong>: genetic, race, religious/political views, sexual orientation.
            <strong> Cookie policy</strong> says what cookies are used, what data, why, shared with whom, how to accept/reject/delete &rarr; transparency, user control, legal compliance, trust.
            <em> Textbook, not slides:</em> opt-in (nothing until you agree) vs opt-out (until you say stop); utilitarian, rights, fairness, common-good frameworks; responsibility / accountability / liability.</p>
        </section>

        <section className="cram-section">
          <h2>Ch. 4 &mdash; Information Security: the basics</h2>
          <p className="cram-lead"><strong>Data breach</strong> = unauthorized individuals gain access to sensitive, protected or confidential data. <strong>Information security</strong> = processes &amp; policies protecting info and systems from unauthorized access, use, disclosure, disruption, modification, destruction. Perfect security is <strong>impossible</strong>. Attackers usually look for the <strong>easiest target</strong>; it takes <strong>1 person</strong>.</p>
          <table>
            <thead><tr><th>IBM figure</th><th></th><th>Term</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td>$4.88M</td><td>avg breach cost, global</td><td><strong>Threat</strong></td><td>any danger a system may be exposed to</td></tr>
              <tr><td>1 in 4</td><td>chance of a breach</td><td><strong>Exposure</strong></td><td>the harm/damage if a threat hits</td></tr>
              <tr><td>$9.5M</td><td>avg, U.S.</td><td><strong>Vulnerability</strong></td><td>the possibility a threat harms it</td></tr>
              <tr><td>$9.8M</td><td>avg, healthcare</td><td colSpan="2">Costs: direct (lawsuits, fines, lost operations) vs indirect (notification, credit monitoring, lost trust)</td></tr>
            </tbody>
          </table>
          <p className="cram-note"><strong>5 factors</strong> raising vulnerability: interconnected wireless business; smaller/faster/cheaper devices; <strong>decreasing skill</strong> to hack; organized crime; lack of management support.
            Cases: Marriott (383M records, unencrypted passports, $23.8M UK fine), Instagram (489M, 2024), American &amp; Southwest (third-party vendor, 2023).</p>
        </section>

        <section className="cram-section">
          <h2>Unintentional threats</h2>
          <p className="cram-lead"><strong>Human error</strong> (employee negligence) causes <strong>most breaches</strong>. Types: careless with devices &middot; <strong>questionable e-mails (the top way in)</strong> &middot; careless surfing &middot; weak passwords &middot; careless with office &middot; unmanaged devices (hotel PCs) &middot; discarded equipment not wiped &middot; environmental hazards (dust, humidity). IT side: software design, app settings, server config, network gear.</p>
          <p className="cram-note"><strong>Social engineering</strong> (counted as unintentional): using social skills to trick employees into giving info. <strong>Phone</strong> (pretend to be IT), <strong>physical</strong> (fake badge), <strong>tailgating</strong> (&ldquo;hold the door&rdquo;), <strong>shoulder surfing</strong>.</p>
        </section>

        <section className="cram-section">
          <h2>Deliberate threats &amp; software attacks</h2>
          <table>
            <thead><tr><th>Threat</th><th>Meaning / class example</th></tr></thead>
            <tbody>
              <tr><td>Espionage / trespass</td><td>Illegal access; T-Mobile router 2020. Flaws mostly unintentional &rarr; <strong>patches critical</strong>; <strong>vendor security</strong> matters</td></tr>
              <tr><td>Sabotage / vandalism</td><td>Defacing a site (UK NHS 2018)</td></tr>
              <tr><td>Theft of equipment/info</td><td>Walking the facility, dumpster diving</td></tr>
              <tr><td>Identity theft</td><td>Assuming someone&rsquo;s identity (phishing, stolen data, dumpster diving)</td></tr>
              <tr><td>Intellectual property</td><td>Trade secret (Coca-Cola recipe), patent (Apple v Samsung $539M), copyright; piracy</td></tr>
              <tr><td>Software attacks</td><td>Virus (damages files) &middot; <strong>worm</strong> (self-replicates) &middot; <strong>ransomware</strong> (encrypts until paid, bitcoin) &middot; doxxing (threat to publish) &middot; botnet &rarr; <strong>DDoS</strong> flood</td></tr>
            </tbody>
          </table>
          <p className="cram-note"><strong>Colonial Pipeline</strong> (May 2021): ransomware, 5+ days down, $4.4M paid; way in = inactive account&rsquo;s password on the dark web, via VPN.
            <strong> Phishing</strong> (anyone) &middot; <strong>spear phishing</strong> (specific targets) &middot; <strong>whaling</strong> (executives, HR). <strong>Never click links in e-mails/texts</strong>; never pay for a job.
            <em> Textbook, not slides:</em> info extortion, alien software (adware, spyware), cyberterrorism, SCADA attacks.</p>
        </section>

        <section className="cram-section">
          <h2>Security controls (textbook, not slides)</h2>
          <p className="cram-lead">Risk: <strong>acceptance</strong> (absorb) &middot; <strong>limitation</strong> (add controls) &middot; <strong>transference</strong> (insurance). Authentication = who you are: something you <strong>are</strong> (fingerprint), <strong>have</strong> (badge), <strong>do</strong> (voice), <strong>know</strong> (password). Authorization = what you may do (least privilege). Firewall, encryption (public key encrypts, private key decrypts), VPN, anti-malware. Backup sites: hot / warm / cold.</p>
        </section>

        <section className="cram-section">
          <h2>Hardware &amp; software (textbook, not slides)</h2>
          <p className="cram-lead"><strong>CPU</strong> = control unit + ALU (math, comparisons) + registers. <strong>Moore&rsquo;s Law</strong>: chip power doubles ~every 2 years. Memory, fastest first: registers &rarr; cache &rarr; <strong>RAM (volatile)</strong>; <strong>ROM</strong> nonvolatile (startup); secondary storage (HDD, SSD, optical). Hierarchy: supercomputer &rarr; mainframe &rarr; PC &rarr; mobile/wearable. Byte &rarr; KB &rarr; MB &rarr; GB &rarr; TB &rarr; PB.</p>
          <p className="cram-note"><strong>Systems software</strong> runs the computer (OS: manages hardware, user interface/GUI, serves apps). <strong>Application software</strong> does a user task. Off-the-shelf (cheap, fast) vs custom (fits, costly). <strong>Open source</strong>: code anyone can use and modify. You buy a <strong>license</strong>, not the software. <strong>SaaS</strong> = subscription over the Internet.</p>
        </section>

        <section className="cram-section">
          <h2>Acquiring IS &amp; AI (textbook, not slides)</h2>
          <p className="cram-lead"><strong>SDLC</strong>: investigation (feasibility: technical, economic, behavioral, legal) &rarr; analysis (requirements) &rarr; design &rarr; programming &amp; testing &rarr; implementation &rarr; operation &amp; maintenance. Conversion: <strong>direct</strong> (riskiest), pilot, phased, <strong>parallel</strong> (safest, costliest). Acquire by buy, lease, SaaS, open source, outsource, custom. JAD, RAD, <strong>agile</strong> (short iterations, Scrum). RFP to vendors; SLA sets service levels.</p>
          <p className="cram-note"><strong>AI</strong>: tasks needing human intelligence. Weak/narrow (one task, exists) vs strong/AGI (doesn&rsquo;t yet). Turing test. Machine learning: <strong>supervised</strong> (labeled), <strong>unsupervised</strong> (patterns, unlabeled), <strong>reinforcement</strong> (rewards). Deep learning = many-layered neural networks. NLP, computer vision, speech, robotics. Generative AI / LLMs; <strong>hallucination</strong> = confident but false. Biased data &rarr; biased results.</p>
        </section>

        <p className="cram-foot">Information Systems Unlocked &middot; Chapters 3&ndash;4 from the class slides; other topics from standard textbook content &mdash; check them against your notes.</p>
      </div>
    </div>
  )
}
