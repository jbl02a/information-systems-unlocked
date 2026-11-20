// The Test 3 cram sheet: two Letter pages (asserted by scripts/verify-browser.mjs
// printing it to PDF), the same print rules as the Test 2 sheet. Every fact is
// from the class decks or the assigned articles; the few terms the slides only
// NAME are marked "(textbook)". If content is added, cut something: never let it
// spill onto a third page.
export default function CramSheetT3() {
  return (
    <div className="cram-page">
      <header className="cram-head">
        <h1>Intro to Information Systems &mdash; Test 3 Cram Sheet</h1>
        <p>Our reading of what Test 3 covers (no study guide in the materials): Ch. 5 data &amp; knowledge management &middot; Ch. 6 networking &middot; data visualization &middot; project management &middot; Ch. 7 e-commerce &middot; Ch. 9 social computing &middot; the assigned articles.
          Formats it <strong>may</strong> use: multiple choice, true/false, matching, fill in the blank, short answer (mix not stated).</p>
      </header>

      <section className="cram-section">
        <h2>Ch. 5 &mdash; Managing data, governance, databases</h2>
        <p className="cram-lead"><strong>Managing data</strong> = acquiring, organizing, storing, accessing, analyzing, interpreting. <strong>API</strong> connects systems so data can be shared (Banner &harr; Salesforce).
          <strong> Data governance</strong> = the company&rsquo;s rules for creating, collecting, storing, deleting, handling and protecting its data. <strong>Master data management</strong> = one strategy for it: a &ldquo;single version of the truth&rdquo; for core data (customer, product, employee, vendor).
          <strong> Database</strong> = organized collection of structured data stored electronically (&ldquo;an electronic filing cabinet&rdquo;). Databases minimize <strong>redundancy, isolation, inconsistency</strong> and <strong>integrity</strong> problems; but data in one place needs very high security.</p>
        <p className="cram-note"><strong>Design steps</strong>: tables &rarr; <strong>ER model</strong> (entities, attributes, relationships) &rarr; <strong>normalization</strong> &rarr; implementation in a <strong>DBMS</strong> (Oracle, MySQL, SQL Server, Access).
          <strong> Business rules</strong> = constraints/policies on how data is structured, stored, used. Relationships: one-to-one &middot; one-to-many (customer &rarr; orders) &middot; many-to-many (patients &harr; doctors); mandatory vs optional.
          <strong> Normalization</strong> = related tables that remove duplicate data and prevent <strong>update, insert, delete anomalies</strong> (one value per cell; a fact stored once).
          <strong> Primary key</strong> uniquely identifies a record in its table (Order Number). <strong>Foreign key</strong> = field that identifies a row in <em>another</em> table (Customer ID in ORDER).</p>
      </section>

      <section className="cram-section">
        <h2>SQL, data stores, big data, knowledge</h2>
        <table>
          <thead><tr><th>Query</th><th>Means</th></tr></thead>
          <tbody>
            <tr><td className="mono">SELECT student_name FROM table1 WHERE Major = &apos;Finance&apos; AND GPA &gt; 2.99</td><td>Ben Jones (Sally Adams is Finance but 2.94)</td></tr>
            <tr><td className="mono">SELECT * &hellip; WHERE city IN (&apos;Paris&apos;, &apos;Tokyo&apos;)</td><td><span className="mono">*</span> = all columns; IN = any of a list</td></tr>
            <tr><td className="mono">&hellip; BETWEEN 2 AND 5 &middot; IS NOT NULL &middot; &gt; 2</td><td>range (inclusive) &middot; value not missing &middot; greater than</td></tr>
            <tr><td className="mono">SELECT country, SUM(number_of_rooms) &hellip; GROUP BY country</td><td>one total per country. Aggregates: SUM AVG MAX MIN COUNT</td></tr>
          </tbody>
        </table>
        <p className="cram-note"><strong>SQL</strong> = most popular query language (SELECT, FROM, WHERE). <strong>AND</strong> needs both true.
          <strong> Data lake</strong> = all data, any source/format &middot; <strong>warehouse</strong> = historical data by subject for decision makers &middot; <strong>mart</strong> = small, low-cost warehouse for one department. <strong>ETL</strong> = extract, transform, load (into the warehouse).
          <strong> Big data</strong>: the 3 Vs &mdash; <strong>volume, velocity, variety</strong>. <strong>Data</strong> (recorded, unorganized) &rarr; <strong>information</strong> (organized, has meaning) &rarr; <strong>knowledge</strong> (experience applied to information to solve problems).
          <em> Textbook:</em> ERP (integrates a firm&rsquo;s functions), TPS (records each transaction, like Square POS), CRM.</p>
      </section>

      <section className="cram-section">
        <h2>Ch. 6 &mdash; Networks, media, devices, protocols</h2>
        <p className="cram-lead"><strong>Network</strong> = connects computers to share resources and transmit data. Types: PAN, <strong>LAN</strong> (one building; dorm Wi-Fi), CAN, MAN, WAN (the Internet = a global WAN). Enterprise network = many LANs + WANs on a backbone.
          <strong> Authentication</strong> = is the user legitimate? <strong>Authorization</strong> = what may they access?</p>
        <table>
          <thead><tr><th>Wired media</th><th></th><th>Device</th><th>Does</th></tr></thead>
          <tbody>
            <tr><td>Twisted-pair</td><td>most common, fast</td><td><strong>Switch</strong></td><td>connects wired devices, manages packets</td></tr>
            <tr><td>Coaxial</td><td>cable modems, faster</td><td><strong>Wi-Fi router</strong></td><td>connects wireless devices</td></tr>
            <tr><td>Fiber optics</td><td>backbone, <strong>fastest</strong></td><td><strong>Router</strong> / <strong>firewall</strong></td><td>network boundary + Internet / blocks outside access</td></tr>
          </tbody>
        </table>
        <p className="cram-note"><strong>Wireless</strong> is only part of the journey; wired is typically faster. <strong>Packet switching</strong>: data split into packets (sender IP, recipient IP, packet count, sequence) that travel separately and reassemble.
          <strong> Ethernet</strong> = most common LAN protocol. <strong>TCP/IP</strong> = the Internet&rsquo;s protocol: establishes the connection, sequences the transfer, acknowledges packets.
          Connections: dial-up, DSL, cable modem, satellite, wireless, <strong>FTTH</strong>. Wireless threats: <strong>rogue access point</strong> (evil twin), war driving, eavesdropping, RF jamming.</p>
      </section>

      <section className="cram-section">
        <h2>The Internet, satellites, IoT</h2>
        <table>
          <thead><tr><th></th><th>GEO</th><th>MEO</th><th>LEO</th></tr></thead>
          <tbody>
            <tr><td>Height</td><td>22,300 mi, stationary</td><td>6,434 mi</td><td>400&ndash;700 mi, moves fast</td></tr>
            <tr><td>Cost / life</td><td>most expensive, longest</td><td>less, 6&ndash;12 yrs</td><td>least expensive, shortest</td></tr>
            <tr><td>Use</td><td>TV (&asymp;0.25 s delay)</td><td>GPS</td><td>telephone (many satellites)</td></tr>
          </tbody>
        </table>
        <p className="cram-note"><strong>IP address</strong> = a computer&rsquo;s unique Internet address (from your provider); <strong>DNS</strong> maps names to addresses. TLDs: .com, .edu, <strong>.mil</strong> (military), <strong>.gov</strong> (civilian government), .org.
          <strong> Backbone</strong> = global fiber-optic network; 400+ undersea cables; ~90% of repairs from fishing anchors and nets; Tonga had one cable (5 weeks to repair).
          <strong> IoT</strong>: connectivity, data collection, automation, integration; risk = hackers get in through devices.</p>
      </section>

      <section className="cram-section">
        <h2>Data visualization</h2>
        <p className="cram-lead"><strong>Data visualization</strong> = data in a graphical/visual format so people see patterns, trends, relationships, insights. Six forms: <strong>bar</strong> (compare categories) &middot; <strong>line</strong> (trend over time) &middot; <strong>pie</strong> (proportions) &middot; <strong>scatter</strong> (relationship between variables) &middot; <strong>map</strong> (geography) &middot; <strong>dashboard</strong> (several, to monitor performance).</p>
        <p className="cram-note">Why it matters (5): complex data easier to understand; trends and patterns; better decisions; reveals outliers/problems; communicates well. <strong>Iceberg</strong>: the chart is the tip; data movement &amp; architecture, governance &amp; management, strategy &amp; culture sit below.
          Flow: sources &rarr; pipeline (extract &amp; load, transform) &rarr; lake / warehouse / marts &rarr; visualization. Demos: highlighting made the 9s pop; column chart = Orange most (893), Purple fewest (96); <strong>box and whiskers</strong> found the best salesperson.</p>
      </section>

      <section className="cram-section">
        <h2>Project management</h2>
        <p className="cram-lead"><strong>Project</strong> = temporary endeavor to create a unique product, service or result. <strong>Triple constraint</strong> = cost, time, scope &rarr; the <strong>baseline</strong>. <strong>Scope creep</strong> = additions without approval; prevented by <strong>change control</strong>.
          Process groups, in order: <strong>Initiating</strong> (charter, sponsor, stakeholders) &rarr; <strong>Planning</strong> (scope, schedule, risk, cost, resources; arguably the most important) &rarr; <strong>Executing</strong> &rarr; <strong>Monitoring &amp; Controlling</strong> &rarr; <strong>Closing</strong> (accepted, documented, invoices paid, lessons learned).</p>
        <p className="cram-note">Team: <strong>sponsor</strong> (funds) &middot; <strong>project manager</strong> (plans, coordinates) &middot; team members (deliverables) &middot; SMEs (expertise) &middot; stakeholders (interest in outcome). PM skills: communication, leadership, planning &amp; organization, risk &amp; problem solving, adaptability.
          <strong> Risk</strong> = might happen (negative = threat, positive = opportunity) &middot; <strong>issue</strong> = already happened &middot; <strong>assumption</strong> = treated as true &middot; <strong>constraint</strong> = limits options. Communication = the single most important aspect.
          <strong> Waterfall</strong>: linear, plan upfront, deliver at end (a building). <strong>Agile</strong>: iterative, small increments, continuous feedback (a mobile app). Gantt chart = the schedule.</p>
      </section>

      <section className="cram-section">
        <h2>Ch. 7 &mdash; E-commerce</h2>
        <p className="cram-lead"><strong>E-commerce</strong> = buying, selling, transferring or exchanging products, services or information via networks; <strong>e-business</strong> = all business activities; <strong>m-commerce</strong> = on mobile devices.
          Degrees: <strong>brick-and-mortar</strong> &middot; <strong>virtual / pureplay</strong> (Netflix, Spotify) &middot; <strong>partial EC / clicks-and-mortar</strong> (Walmart). <strong>Amazon = partial EC</strong> (physical delivery).
          Models: online retailer, marketplace (Etsy), subscription, <strong>freemium</strong>, advertising-supported (Google), affiliate marketing. B2C, B2B, C2C (eBay textbook), C2B (photographer licenses a photo).</p>
        <p className="cram-note"><strong>Gateway</strong> flow: checkout &rarr; encryption &rarr; authorization request &rarr; approve/decline &rarr; settlement. Actors: customer, merchant, gateway (tokenizes), processor/acquirer, card network (Visa, Mastercard), <strong>issuing bank</strong> (approves). <strong>Authorization is not settlement.</strong>
          <strong> TLS</strong>: encryption, authentication, integrity. <strong>HTTPS</strong> secures the connection, not the seller&rsquo;s honesty. Tap to pay = <strong>NFC</strong> + <strong>tokenization</strong> (one-time token).
          Issues: <strong>channel conflict</strong>, order fulfillment, <strong>personalized pricing</strong> (Orbitz/Mac users). <strong>Showrooming</strong> = see in store, buy online; <strong>webrooming</strong> = research online, buy in store. Loyalty programs = retention marketing.</p>
      </section>

      <section className="cram-section">
        <h2>Ch. 9 &mdash; Social computing</h2>
        <p className="cram-lead"><strong>Social computing</strong> = IT that integrates social behavior and information systems to create value. <strong>Web 2.0</strong> = user-generated content. <strong>Filter bubble</strong> = personalized results that only reinforce your views.
          <strong> Social commerce</strong> = e-commerce through social computing. <strong>Social proof</strong> = deciding by what others do (reviews, ratings, testimonials, influencers, UGC, engagement, popularity indicators, celebrities).</p>
        <p className="cram-note"><strong>Social intelligence</strong> (social listening) = monitoring and analyzing social data for strategy. <strong>Collaborative consumption</strong> = access over ownership (Airbnb, Uber). <strong>Social capital</strong> = number of connections.
          <strong> Addictive</strong> (red on the slide): dopamine, variable rewards, social validation, novelty / infinite scroll, FOMO. Loop: <strong>cue &rarr; routine &rarr; reward</strong>. Bot manipulation: <strong>seed &rarr; amplify &rarr; approve &rarr; harass</strong>.
          Risks: biased UGC, cyberbullying, security, IP violations, data leakage, employee reluctance. <em>Textbook:</em> viral marketing = people pass the message on.</p>
      </section>

      <section className="cram-section">
        <h2>The assigned articles</h2>
        <p className="cram-note"><strong>FBI dark web bomb buyer</strong> (Forbes, 2017): behind Tor, unmasked by a <strong>Network Investigative Technique</strong> (a booby-trapped document), a pen-trap, and a <strong>Stingray</strong> (fake cell tower; also sweeps up bystanders&rsquo; data). Most dark web weapons sites are scams or honeypots.
          <strong> Reporter offered a cut</strong> (BBC, 2025): a <strong>Medusa ransomware-as-a-service</strong> recruiter offered 15%, then 25%, for access; then <strong>MFA bombing</strong> (login prompts about once a minute). Lesson: insiders are a target; never approve a prompt you did not start.
          <strong> Cable ship</strong> (BBC, 2025): finds the fault, an <strong>ROV</strong> cuts the cable, crew splice it; crew at sea 6+ months a year. <strong>Crypto theft</strong> (BBC, 2026): headline $700m, body about $713m in 2025; <strong>wrench attacks</strong> (Ledger&rsquo;s David Balland); old tricks still work.</p>
      </section>

      <p className="cram-foot">Information Systems Unlocked &middot; Test 3 &middot; from the instructor&rsquo;s class decks (10/19&ndash;11/18) and assigned articles; &ldquo;textbook&rdquo; marks terms the slides only name.</p>
    </div>
  )
}
