// Teaching material: the layer that comes BEFORE the questions.
//
// One lesson per Test 2 topic (see topics.js). Every section, key term and
// "know this" item carries `src` ('slides' | 'book' | 'ours') and, when it is
// from a deck, `ref` (deck id + slide number, e.g. 'ch4a s17'), so the UI can
// show where it came from and a future deck can outrank textbook items.
//
// `emph` on a key term or know-this item records that the instructor set it in
// COLOR on the slide (read from the raw .pptx XML, not by eye). The decks use
// blue, red, orange and green; bold alone is not counted as emphasis because
// most definitions are bold. Title runs set to the theme's text color (tx1) are
// not emphasis either. docs/sources.md has the full color map.
//
// There is NO instructor study guide or review slide for Test 2. The know-this
// lists are OURS, assembled from what the instructor emphasized and defined, and
// the UI says so. Never present one as the instructor's own list.

export const LESSONS = [
  // ── Chapter 3 · Ethics and Privacy ───────────────────────────────────────
  {
    id: 'ethics', topic: 'ethics', title: 'Ethics & Privacy', icon: '🕵️', minutes: 12,
    tagline: 'The four kinds of ethical issue, how you are tracked online, and the laws that push back.',
    sections: [
      {
        heading: 'How technology tracks people', src: 'slides', ref: 'ch3a s2–6, s11',
        bullets: [
          'A **geofence** is a virtual perimeter around a real, physical area. **Geofencing** uses GPS, Wi-Fi, cellular data or sensors (RFID tags) to create that boundary, so software can **trigger a response when a device enters or leaves the area.**',
          '**Photo tagging** assigns names to images of people. Facial recognition then indexes the facial features and searches untagged photos for matches. **The person in the photo is not aware this is happening.**',
          'Once you are tagged, that photo can be matched across the whole Internet or private databases, including ones fed by **surveillance cameras**. A car dealership could photograph you on the lot and profile you (where you live, where you work) to get an edge in the sale.',
          '**Flock cameras** are automated license plate readers that also record the car’s make, color and other identifying features.',
          '**Electronic surveillance**: technology has made it easy to track people through searches, purchases, GPS location, facial recognition, photo tagging, public cameras and drone or satellite photos.',
        ],
      },
      {
        heading: 'The four categories of ethical issues', src: 'slides', ref: 'ch3a s7–14',
        body: 'The diversity and ever-expanding use of IT applications have created ethical issues that fall into **four general categories**:',
        table: {
          head: ['Category', 'What it involves', 'The question it asks'],
          rows: [
            ['**Privacy**', 'Collecting, storing and disseminating information about individuals', 'What can be collected about me, and who gets it?'],
            ['**Accuracy**', 'The authenticity, fidelity and correctness of information collected and processed', 'Is it right? Who is accountable for errors, and how are the injured compensated (if at all)?'],
            ['**Property**', 'The ownership and value of information', 'Who owns the information? Can corporate computers be used for private purposes?'],
            ['**Accessibility**', 'Who should have access to information, and whether they should pay for it', 'Who may access it? Should companies charge for access, or sell it?'],
          ],
        },
        callout: 'An easy way to hold the four: **P-A-P-A**, Privacy, Accuracy, Property, Accessibility. Accuracy examples on the slide are **financial and healthcare** records.',
      },
      {
        heading: 'Privacy issues', src: 'slides', ref: 'ch3a s9–11',
        bullets: [
          '**Information privacy** is the right of individuals to control what personal information about them is collected, stored, shared and used by others.',
          'Where it shows up: social media, mobile apps, AI systems, health apps, watches and rings, and **Meta Glasses** (highlighted on the slide).',
          'Typical privacy violations: **collecting personal data without informed consent**; **sharing customer or employee information with third parties without permission**; **tracking people’s online activity, location or purchases without their knowledge.**',
        ],
      },
      {
        heading: 'Cookies', src: 'slides', ref: 'ch3b s3–11',
        body: 'A cookie is **a text file stored on your computer or phone from websites you visit** (highlighted on the slide). It can hold a unique identifier, login session information, user preferences, shopping cart data and tracking identifiers. Cookies can remember logins, save a cart, remember language, track you across websites, and feed analytics and advertising.',
        table: {
          head: ['Type', 'What it does', 'Examples'],
          rows: [
            ['1. **Essential**', 'Needed for the site to work. Usually cannot be turned off without breaking the site.', 'Logging in, keeping a shopping cart, security features'],
            ['2. **Performance / analytics**', 'Help the site owner understand how visitors use the site', 'Pages visited, time on a page, traffic statistics (Google Analytics)'],
            ['3. **Functional**', 'Remember your preferences', 'Language, region, customized layouts'],
            ['4. **Advertising / targeting**', 'Track you across websites to deliver personalized ads', 'Meta/Facebook and Google Ads cookies, retargeting cookies'],
          ],
        },
        callout: 'The slide adds, in red: advertising and targeting cookies **“are often the most controversial from a privacy standpoint.”**',
      },
      {
        heading: 'First-party vs third-party cookies', src: 'slides', ref: 'ch3b s10–11',
        bullets: [
          '**First-party cookies** (session or persistent) are set directly by **the website you visit**. They remember your information and settings for that site and **cannot track you on other websites.**',
          '**Third-party cookies** are placed by **someone other than the site’s owner** and collect data for that third party. Marketing companies and data brokers use them to **track users across websites** for ads and analytics.',
        ],
      },
      {
        heading: 'Other tracking technologies', src: 'slides', ref: 'ch3b s12–14',
        bullets: [
          '**Web beacons** (also called **web bugs** or tracking beacons) are very small, often **transparent images** embedded in websites or e-mails to monitor the user’s behavior, usually for a third party.',
          '**Session replay scripts** record a visitor’s activity on a site: mouse movement, clicks and scrolls. They can even record **how long you hover over a link you never click.**',
          '**App tracking** (from the image on slide 14) uses **device identifiers** (Apple’s IDFA, the Android Advertising ID), **SDKs** from analytics or ad companies, **local storage** on the device, and **tracking pixels and APIs** that send data back to developers or third parties.',
        ],
      },
      {
        heading: 'Data privacy laws', src: 'slides', ref: 'ch3b s15–18',
        body: '**Europe (General Data Protection Regulation, GDPR), Brazil (Brazilian Data Protection Law) and California (California Consumer Privacy Act, CCPA)** have laws giving consumers more control over the personal information online businesses collect.',
        bullets: [
          'Consumers get four rights: **to know** what is collected and how it is used and shared; **to delete** it; **to opt out of its sale**; and **to non-discrimination** for using these rights.',
          'They cover **personal data** (can identify a person: name, address, **IP address**) and **sensitive personal data** (genetic data, race, religious or political views, sexual orientation).',
          'These laws **also fine companies that fail to protect consumer data** in a breach (highlighted on the slide).',
          'They are **complex for organizations**: countries have conflicting requirements, and a U.S. company doing business abroad is subject to foreign laws.',
        ],
      },
      {
        heading: 'Cookie policies', src: 'slides', ref: 'ch3b s19–33',
        bullets: [
          'A cookie policy describes **what cookies are, which types are used, what data is collected, why, whether third parties receive it, and how users can accept, reject or delete cookies.**',
          'Why they matter: **transparency** about data collection, **user control**, **legal compliance**, and **trust** between users and organizations.',
          'Class walked through a real one, the **NBA’s privacy policy**: what it collects (identifiers, device, usage and location data), how it uses and shares it, your choices, its cookies, its security (“no system can be guaranteed to be 100% secure”), children’s data, and separate California, European and Brazilian rights sections.',
        ],
      },
      {
        heading: 'In the textbook chapter, not on the class slides', src: 'book',
        body: 'The textbook’s Chapter 3 also covers the ideas below. The class slides do not, so treat them as a lower priority than everything above, but know the terms: the syllabus says exams can draw on the book.',
        bullets: [
          '**Ethics** are the principles of right and wrong that individuals use to make choices that guide their behavior.',
          'Ethical frameworks: **utilitarian** (the most good, the least harm), **rights** (respects the moral rights of everyone affected), **fairness** (treats people equally, or fairly based on a defensible standard), **common good** (what benefits the community as a whole). Some editions add **deontology** (duty to follow moral rules regardless of outcome).',
          '**Responsibility** means accepting the consequences of your decisions; **accountability** is determining who is responsible for an action; **liability** is the legal concept that lets injured parties recover damages.',
          'Something can be **unethical but legal** (or the reverse): laws and ethics overlap but are not the same.',
          '**Opt-out** model: the business may collect your data until you ask it to stop. **Opt-in** model: it may not collect until you specifically agree. Privacy advocates prefer opt-in.',
          'A **digital dossier** is the electronic profile of you that data aggregators build, and **profiling** is the process of building it.',
        ],
      },
    ],
    keyTerms: [
      { term: 'Geofence', def: 'A virtual perimeter for a real-world geographic area; geofencing triggers a response when a device enters or leaves it.', src: 'slides', ref: 'ch3a s2' },
      { term: 'Photo tagging', def: 'Assigning names to images of people; facial recognition then finds that face in untagged photos. The person is not aware of it.', src: 'slides', ref: 'ch3a s3' },
      { term: 'Information privacy', def: 'The right of individuals to control what personal information about them is collected, stored, shared and used by others.', src: 'slides', ref: 'ch3a s9' },
      { term: 'Privacy issues', def: 'Collecting, storing and disseminating information about individuals.', src: 'slides', ref: 'ch3a s8' },
      { term: 'Accuracy issues', def: 'The authenticity, fidelity and correctness of information collected and processed.', src: 'slides', ref: 'ch3a s8' },
      { term: 'Property issues', def: 'The ownership and value of information.', src: 'slides', ref: 'ch3a s8' },
      { term: 'Accessibility issues', def: 'Who should have access to information and whether they should pay a fee for it.', src: 'slides', ref: 'ch3a s8' },
      { term: 'Cookie', def: 'A text file stored on your computer or phone from websites you visit.', src: 'slides', ref: 'ch3b s3', emph: 'blue' },
      { term: 'Advertising (targeting) cookies', def: 'Track you across websites to deliver personalized ads; often the most controversial for privacy.', src: 'slides', ref: 'ch3b s9', emph: 'red' },
      { term: 'First-party cookie', def: 'Set by the website you visit; cannot track you on other sites.', src: 'slides', ref: 'ch3b s10' },
      { term: 'Third-party cookie', def: 'Placed by an entity other than the site owner; used by marketers and data brokers to track you across sites.', src: 'slides', ref: 'ch3b s11' },
      { term: 'Web beacon (web bug)', def: 'A tiny, often transparent image in a website or e-mail that monitors the user’s behavior.', src: 'slides', ref: 'ch3b s12' },
      { term: 'Session replay script', def: 'A program that records a visitor’s mouse movement, clicks and scrolls, even hovering over a link.', src: 'slides', ref: 'ch3b s13' },
      { term: 'GDPR', def: 'General Data Protection Regulation: Europe’s data privacy law.', src: 'slides', ref: 'ch3b s15' },
      { term: 'CCPA', def: 'California Consumer Privacy Act: California’s data privacy law.', src: 'slides', ref: 'ch3b s15' },
      { term: 'Sensitive personal data', def: 'Genetic data, race, religious or political views, sexual orientation and similar.', src: 'slides', ref: 'ch3b s16' },
      { term: 'Opt-in vs opt-out', def: 'Opt-in: no data collected until you agree. Opt-out: collected until you ask it to stop.', src: 'book' },
      { term: 'Digital dossier', def: 'The electronic profile of a person built by data aggregators (profiling).', src: 'book' },
    ],
    knowThis: [
      { q: 'Name and define the **four categories** of ethical issues in IT.', a: '**Privacy** (collecting, storing, disseminating info about individuals), **Accuracy** (authenticity, fidelity, correctness), **Property** (ownership and value of information), **Accessibility** (who has access and whether they pay).', src: 'slides', ref: 'ch3a s8' },
      { q: 'What is a **cookie**?', a: 'A **text file stored on your computer or phone from websites you visit** (blue on the slide). It can hold an identifier, login session, preferences, cart data and tracking identifiers.', src: 'slides', ref: 'ch3b s3', emph: 'blue' },
      { q: 'Name the **four types of cookies**, and say which is most controversial.', a: '**Essential, performance/analytics, functional, advertising/targeting.** Advertising and targeting cookies are “often the most controversial from a privacy standpoint” (red on the slide).', src: 'slides', ref: 'ch3b s5–9', emph: 'red' },
      { q: 'First-party vs third-party cookies: what is the difference?', a: 'First-party: set by **the site you visit**, and cannot track you on other sites. Third-party: placed by **someone other than the site owner**, used to **track you across websites**.', src: 'slides', ref: 'ch3b s10–11' },
      { q: 'What are **web beacons** and **session replay scripts**?', a: 'Web beacons (web bugs): tiny, often transparent images in sites or e-mails that monitor you. Session replay scripts: record your mouse movement, clicks and scrolls, even how long you hover over a link.', src: 'slides', ref: 'ch3b s12–13' },
      { q: 'Which three places have laws giving consumers control over their data, and what four rights do they give?', a: '**Europe (GDPR), Brazil, California (CCPA).** The right to **know**, to **delete**, to **opt out of the sale** of your data, and to **non-discrimination** for using those rights.', src: 'slides', ref: 'ch3b s15' },
      { q: 'Besides consumer rights, what else do these privacy laws include?', a: '**Fines for companies that do not protect consumer data** (data breaches). Blue on the slide.', src: 'slides', ref: 'ch3b s17', emph: 'blue' },
      { q: 'What is a **geofence**, and what is photo tagging?', a: 'A geofence is a **virtual perimeter for a real physical area**; software reacts when a device enters or leaves it. Photo tagging assigns names to faces, and facial recognition then finds that face in untagged photos, **without the person knowing.**', src: 'slides', ref: 'ch3a s2–3' },
    ],
  },

  // ── Chapter 4 · Information Security ─────────────────────────────────────
  {
    id: 'security', topic: 'security', title: 'Information Security', icon: '🛡️', minutes: 16,
    tagline: 'Why data gets stolen, what it costs, the threats behind it, and the controls and risk management that defend against them.',
    sections: [
      {
        heading: 'Why organizations are targets', src: 'slides', ref: 'ch4a s2–5',
        bullets: [
          'Organizations collect and store huge amounts of data in information systems exposed to many threats, and **data is valuable**.',
          'Bad actors **use the information themselves (identity theft) or sell it** (blue on the slide).',
          'A **data breach** occurs when unauthorized individuals gain access to sensitive, protected or confidential data. (The slide credits this definition to Microsoft’s Copilot.)',
          'Attackers sometimes target one company, but **most of the time they look for the easiest target, and it only takes one person** to provide a way in (blue on the slide).',
        ],
      },
      {
        heading: 'What a breach costs', src: 'slides', ref: 'ch4a s6–15',
        table: {
          head: ['IBM-sponsored survey', 'Figure'],
          rows: [
            ['Average cost of a breach, **global**', '**$4.88 million**'],
            ['Chance of suffering a breach', '**1 in 4**'],
            ['Average cost, **U.S.**', '**$9.5 million**'],
            ['Average cost, **healthcare industry**', '**$9.8 million**'],
          ],
        },
        bullets: [
          'The four kinds of **organizational impact**: **financial loss** (direct costs, penalties, lost revenue), **operational impact** (downtime, recovery, lost productivity), **reputational consequences** (brand damage, lost customers), and **legal and regulatory fallout** (lawsuits, investigations).',
          '**Direct costs**: lawsuits, fines, lost business operations. **Indirect costs**: notifying customers and running hotlines, free credit monitoring, discounts on future products, forensic experts and consultants, lost future business, and **decreased customer trust.**',
          '**Marriott**: a 2014 breach found in 2018, **383 million guest records**, 5.25 million unencrypted passport numbers, class actions, a $23.8M UK fine (GDPR had first proposed about $123M), and a reputation hit.',
          '**Instagram** (Nov 2024): data on **489 million users** leaked. **American Airlines and Southwest** (May 2023): breached through a **third-party vendor** system both used for pilot recruiting.',
          'The 14 companies on one slide (Target, Home Depot, Uber, Facebook, MGM and others) lost data on **over 900 million customers** between them.',
        ],
        callout: 'Numbers are easy marks to lose. **$4.88M global, 1 in 4 odds, $9.5M U.S., $9.8M healthcare** were the colored figures on the slides.',
      },
      {
        heading: 'Information security, and why it is hard', src: 'slides', ref: 'ch4a s16–21',
        bullets: [
          '**Information security**: all the processes and policies designed to protect an organization’s information and information systems from **unauthorized access, use, disclosure, disruption, modification or destruction.**',
          'Every organization must take it seriously, and it is expensive. **Small organizations are at a disadvantage**: fewer resources, and more easily crippled by a breach.',
          'It is **impossible** for organizations to provide perfect security (red and underlined on the slide).',
          'A **threat** is any danger to which a system may be exposed. **Exposure** is the harm, loss or damage that can result if a threat compromises the resource. **Vulnerability** is the possibility that a threat will harm the resource.',
          '**Five factors** make organizations more vulnerable: (1) today’s interconnected, interdependent, wirelessly networked business environment; (2) smaller, faster, cheaper computers and storage; (3) **decreasing skills needed to be a hacker**; (4) **international organized crime** taking over cybercrime; (5) **lack of management support.**',
          'The risks: stolen customer data (losses, fines, lost trust, lawsuits), **losing access to systems and data (downtime costs)**, stolen trade secrets and patents, and, for countries, **cyberterrorism and cyberwarfare** (attacks on power grids and water supplies).',
          'The **two major categories of threats** are **unintentional** and **deliberate**.',
        ],
      },
      {
        heading: 'Unintentional threats: human error', src: 'slides', ref: 'ch4a s22–30, ch4b s3–4',
        body: 'Unintentional threats are acts performed **without malicious intent** that still threaten security. **Employee negligence causes most data breaches**: employees are a huge weak link, and it only takes one to compromise an organization.',
        table: {
          head: ['Type of human error', 'Example'],
          rows: [
            ['Carelessness with computing devices', 'Losing a laptop, tablet or phone (left in an Uber)'],
            ['**Questionable e-mails**', 'Opening mail from unknown senders, clicking links or attachments. **The top way organizations get compromised** (orange on the slide).'],
            ['Careless Internet surfing', 'Visiting questionable sites, bringing in malware and alien software'],
            ['Poor password selection and use', 'Choosing and using weak passwords'],
            ['Carelessness with one’s office', 'Not logging off or locking the door when you leave'],
            ['Carelessness with unmanaged devices', 'Devices outside IT’s control: customers’ and partners’ computers, hotel business centers'],
            ['Carelessness with discarded equipment', 'Throwing out computers, phones, copiers or printers without wiping the memory and drives'],
            ['Careless monitoring of environmental hazards', 'Dirt, dust, humidity and static electricity that harm equipment (from the textbook table shown in class)'],
          ],
        },
        bullets: [
          'Unintentional threats on the **IT side** too: flaws in **software design, app settings, server configuration and network equipment.**',
        ],
      },
      {
        heading: 'Unintentional threats: social engineering', src: 'slides', ref: 'ch4a s31–35',
        body: '**Social engineering** is an attack in which the perpetrator uses **social skills to trick or manipulate legitimate employees** into giving up confidential company information such as passwords. It counts as unintentional because the employee who gives the information away means no harm.',
        table: {
          head: ['Kind', 'How it works'],
          rows: [
            ['**Phone calls**', 'The attacker impersonates IT staff, a manager or a vendor and talks you out of a username and password. “Stop and think about what information you give out over the phone!” (red on the slide)'],
            ['**Physical**', 'A fake badge (IT, manager, exterminator, A/C tech, fire marshal, auditor) to get credentials or into a secure area'],
            ['**Tailgating**', 'Following closely and asking you to “hold the door” into a restricted area'],
            ['**Shoulder surfing**', 'Watching an employee’s screen over their shoulder (airport, train, café)'],
          ],
        },
      },
      {
        heading: 'Deliberate threats', src: 'slides', ref: 'ch4b s5–17',
        body: 'The slide is titled **“10 Common Types of Deliberate Threats”**. The class decks cover nine of them: these five, software attacks below, and alien software, SCADA attacks and cyberterrorism/cyberwarfare from Part 3. Only information extortion is textbook-only.',
        bullets: [
          '**Espionage or trespass**: an unauthorized person tries to gain illegal access to organizational information. Software and networking gear have flaws attackers exploit, **mostly unintentional** (coding errors, wrong settings, weak security). **Software patches and updates are critical**, and **third-party vendor security matters** (both green on the slides). Example: in 2020 someone got into a **T-Mobile router** and reached servers holding customer data.',
          '**Sabotage or vandalism**: deliberately defacing an organization’s systems or website (**web defacement**). Example: the UK National Health Service website, 2018.',
          '**Theft of equipment or information**: walking around a facility looking for computers, and **dumpster diving**.',
          '**Identity theft**: the deliberate assumption of another person’s identity, usually to reach their finances or frame them for a crime. Methods: stealing data from databases, infiltrating organizations that store lots of it, **phishing**, stealing mail and dumpster diving. Recovery is costly and slow, and hurts credit, jobs and insurance.',
          '**Compromises to intellectual property**: IP is property created by people or corporations, protected by **trade secret, patent and copyright** law. A **trade secret** is a company secret not based on public information (the Coca-Cola recipe). Example: Apple v. Samsung, Samsung ordered in 2018 to pay **$539 million** for copying iPhone features. **Piracy** is copying software without paying the owner; the shift to cloud software helped companies fight it.',
        ],
      },
      {
        heading: 'Software attacks', src: 'slides', ref: 'ch4b s18–47',
        bullets: [
          '**Malware** is malicious software designed to wreak havoc. **Viruses** damage programs, delete files or reformat drives. **Worms** **replicate themselves and spread** to other computers, eating disk space and bandwidth.',
          '**Ransomware** (green on the slide) is **digital extortion**: it blocks access to a system or **encrypts the organization’s data** until a ransom is paid, usually in **bitcoin**. **Ransomware-as-a-service** lets criminals rent it.',
          '**Doxxing**: instead of threatening to delete the data, criminals threaten to **release it to the public**.',
          'Ransomware costs: **direct** = the ransom; **indirect** = restoring from backup, business interruption, lost reputation, lawsuits, lost data, higher cybersecurity insurance.',
          'A **botnet** is a collection of infected computers (bots) controlled by a remote bot master or herder. A **DDoS** (distributed denial of service) attack floods a website or network with traffic from many infected computers to make it unusable.',
          '**Phishing** uses deception (official-looking e-mails, messages or texts) to get sensitive personal information. **Spear phishing** targets specific people or organizations. **Whaling** is spear phishing aimed at **high-value people: executives and HR.**',
        ],
        callout: '**Colonial Pipeline, May 7, 2021**: an employee found a ransom note at 5 a.m., and by 6:10 a.m. the largest fuel pipeline in the U.S. was shut down, for **over 5 days**. A **$4.4 million** ransom was paid, yet the system stayed down. The way in: a **password for an inactive employee account found on the dark web**, used through a **VPN** account. The hackers were inside for over a week and stole 100+ MB to threaten doxxing.',
      },
      {
        heading: 'Spotting phishing (from the 17 examples in class)', src: 'slides', ref: 'ch4b s30–47',
        bullets: [
          'The red flags in class: a **sender address that does not match** the company (a “Bank of America” mail from comcast.net), **“Dear Customer / Dear member”**, **urgency and threats** (account blocked, license suspended), **links that hide a different address** (bit.ly), spelling and grammar errors, and requests to **“verify” or pay.**',
          'Examples covered: fake Amazon, SunTrust, Bank of America, IRS, PayPal, Netflix, Instagram copyright notice, USPS and DMV texts, Apple ID texts, fake “your iPhone is hacked” pop-ups, an Office 365 alert, and **CEO-style requests** (“I’m in a meeting, handle this invoice”).',
          '**Never click on links in e-mails or texts.** Open a browser and go to the company’s site yourself (blue on the slide).',
          'Students are targeted more: financial aid, scholarships and jobs. **Never pay money for a job or internship**, and give your Social Security number or bank details only after you are officially hired.',
        ],
      },
      {
        heading: 'Alien software', src: 'slides', ref: 'ch4c s4–8',
        body: '**Alien software** (pestware) is any software **secretly installed on a computer without the knowledge of the user**. It **includes malware** (green on the slide), but not all of it is malicious: some is used for tracking and marketing.',
        table: {
          head: ['Kind', 'What it does'],
          rows: [
            ['**Adware**', 'Causes **pop-up advertisements**. Hit rate around 4–10%. Often installed with “free” software such as browser extensions; can also track browsing and location.'],
            ['**Spyware**', 'Collects personal information **without consent**. **Keyloggers** record keystrokes and browsing; **screen scrapers** record a “movie” of the screen; **stalkerware** adds screenshots, location, video and call recording, and intercepting app messages.'],
            ['**Spamware**', 'Pulls e-mail addresses from websites or PCs and **sends unsolicited e-mail**, even to your own address book so it looks like it came from you. Mainly advertising, but can carry viruses and worms.'],
            ['**Cookies**', 'Small amounts of information websites store on your computer: user names, passwords, card details; **required for shopping carts**. **Tracking cookies** follow your path, time and clicks, usually for marketing.'],
          ],
        },
      },
      {
        heading: 'SCADA attacks, cyberterrorism and cyberwarfare', src: 'slides', ref: 'ch4c s9–11',
        bullets: [
          '**SCADA (supervisory control and data acquisition)** systems **monitor or control chemical, physical and transport processes**: oil refineries, water and sewage treatment, electrical generators, power plants. They open and close valves and pumps and control pressure, flow, voltage and current. A **SCADA attack** targets them, e.g. a cyberattack on a utility or a nuclear facility.',
          '**Cyberterrorism and cyberwarfare**: attackers use a target’s computer systems to cause **physical, real-world harm or severe disruption**, often to carry out a **political agenda**, from gathering data to attacking critical infrastructure (SCADA, financial systems).',
          'The difference: **cyberterrorism** is carried out by **individuals and groups**; **cyberwarfare** is carried out or sponsored by **countries / government entities.**',
        ],
        callout: 'With Part 3, the class decks now cover **nine of the ten** deliberate threats. Only **information extortion** is textbook-only.',
      },
      {
        heading: 'How attacks happen', src: 'slides', ref: 'ch4d s2',
        bullets: [
          'The **most common way in** for successful attacks (malware, data breaches, ransomware) is **phishing and spear phishing**: the **human element** vulnerability.',
          'Employees receive hundreds of e-mails a day, and many jobs require downloading files and opening attachments.',
          'Websites also often infect PCs with alien software.',
        ],
      },
      {
        heading: 'How organizations protect themselves', src: 'slides', ref: 'ch4d s3–6',
        body: 'Three defenses against malware, ransomware, data breaches and other threats (blue on the slide): **education**, **information security controls** and **risk management**.',
        bullets: [
          '**“The single most valuable control is user education and training”** (orange, bold and underlined: the strongest emphasis in the deck). Effective, ongoing education makes **every member** of the organization aware of how vital information security is.',
          '**Information security controls** are designed to protect **all the components of an information system: data, software, hardware and networks.**',
        ],
      },
      {
        heading: 'Controls: physical and access', src: 'slides', ref: 'ch4d s7–11',
        body: 'The **three major types** of information security controls: **physical**, **access** and **communications** controls.',
        bullets: [
          '**Physical controls** prevent unauthorized individuals from gaining **physical access** to a company’s facilities or areas within them: walls, doors, fencing, gates, locks, badges, guards, alarm systems.',
          '**Access controls** prevent unauthorized individuals from **using information resources** (passwords, biometrics): password rules and **complexity**, and **MFA / two-factor authentication** (green on the slide).',
          '**Authentication** identifies **who the individual is**. **Authorization** is the **rights and privileges** the user has in the organization’s systems: the appropriate level of access.',
        ],
      },
      {
        heading: 'Controls: communications (network) controls', src: 'slides', ref: 'ch4d s12–20',
        body: 'Communications controls **secure the movement of data and access across networks**.',
        table: {
          head: ['Control', 'What it does'],
          rows: [
            ['**Firewall**', 'Prevents unauthorized Internet users from accessing private networks'],
            ['**Anti-malware (antivirus)**', 'Identifies and eliminates viruses, worms and other malicious software'],
            ['**Whitelisting**', 'IT identifies the **only** applications or websites allowed to run or be accessed'],
            ['**Blacklisting**', 'IT identifies applications or websites that are **not** allowed'],
            ['**Encryption**', 'Converts (scrambles) a message so no one but the intended receiver can read it. A **public key** locks, a **private key** unlocks; **digital certificates** are certified by a third-party certificate authority'],
            ['**VPN**', 'A private, secure network out on the Internet that remote users (employees, vendors, customers) connect to and share information through'],
            ['**TLS**', 'Transport Layer Security: secures Internet transactions (card purchases, online banking) by encrypting data between a Web server and browser'],
            ['**Employee monitoring**', 'A proactive guard against human mistakes: monitors e-mail and browsing'],
            ['**SIEM**', 'Security Information and Event Management: collects data from firewalls, servers and cloud apps and uses analytics and real-time monitoring to **notify of suspicious activity in real time**'],
          ],
        },
        callout: 'Whitelisting = the allowed list (everything else blocked). Blacklisting = the blocked list (everything else allowed). Easy to flip under pressure.',
      },
      {
        heading: 'Auditing and risk management', src: 'slides', ref: 'ch4d s21–26',
        bullets: [
          '**Information systems auditing** (green on the slide), by **internal auditors** or **external consultants**, helps organizations implement the right **risk management plan**.',
          'The **goal of risk management** is to **identify, control and minimize the impact of threats**, reducing risk to acceptable levels. It is **impossible to eliminate all risk** (red on the slide).',
          '**Risk analysis** makes sure the security program is cost-effective, in **three steps**: (1) assess the **value** of each asset being protected; (2) estimate the **probability** each asset will be compromised; (3) **compare** the probable costs of the asset being compromised with the costs of protecting it.',
          '**Risk mitigation** is the organization taking concrete action, with **two functions**: implement controls to **prevent** identified threats, and develop a means of **recovery** if a threat becomes reality.',
        ],
        table: {
          head: ['Risk mitigation strategy', 'What the organization does'],
          rows: [
            ['**Risk acceptance**', 'Accepts the risk, continues with **no controls**, absorbs any damage'],
            ['**Risk limitation**', 'Implements **controls** that minimize the impact of the threat'],
            ['**Risk transference**', 'Transfers the risk by other means of compensation: **buying insurance**, a third-party vendor'],
          ],
        },
      },
      {
        heading: 'Cyber liability insurance', src: 'slides', ref: 'ch4d s27–29',
        bullets: [
          '**First-party insurance protects your own company**: forensic analysis to find the attack source, public relations, notifying clients, credit monitoring, lost income.',
          '**Third-party insurance** protects businesses that provide professional services to other businesses (consulting firms, contractors, software companies) **if another company sues them** over errors that led to its losses: legal fees, government fines, settlements.',
          'What affects the cost of cyber insurance (set in color on the slide): **size and industry**, the **amount and sensitivity of data**, **annual revenue**, and the **strength of information security measures.**',
        ],
      },
      {
        heading: 'When the network or data is compromised', src: 'slides', ref: 'ch4d s30–33',
        bullets: [
          'If data was accessed or stolen, you **must start notifying those affected** (employees, customers, vendors) and you are **subject to fines and lawsuits.**',
          'If it is **ransomware**: pay and hope they hand over the encryption key? (The slide asks it as a question.)',
          'Can you **continue business operations?**',
          '**Backups are key**, and so is being able to **restore** from them.',
        ],
      },
      {
        heading: 'In the textbook chapter, not on the class slides', src: 'book',
        body: 'Parts 3 and 4 now cover alien software, SCADA, cyberterrorism, controls and risk management from the slides. These few textbook points still have no slide behind them; know them at the definition level.',
        bullets: [
          'The tenth deliberate threat, **information extortion**: stealing or threatening to steal data, then demanding payment.',
          'The textbook’s four ways to **authenticate**: **something you are** (biometrics: fingerprint, face), **something you have** (badge, token), **something you do** (voice, signature), **something you know** (password, PIN). **Least privilege**: give users only the access their job needs.',
          '**Business continuity planning** keeps the business running after a disaster. Backup sites: **hot** (fully equipped, ready to go), **warm** (equipment but not current data), **cold** (just the building and utilities). The slides only say **backups are key**.',
        ],
      },
    ],
    keyTerms: [
      { term: 'Data breach', def: 'When unauthorized individuals gain access to sensitive, protected or confidential data.', src: 'slides', ref: 'ch4a s4' },
      { term: 'Information security', def: 'All the processes and policies that protect an organization’s information and systems from unauthorized access, use, disclosure, disruption, modification or destruction.', src: 'slides', ref: 'ch4a s16' },
      { term: 'Threat', def: 'Any danger to which a system may be exposed.', src: 'slides', ref: 'ch4a s18' },
      { term: 'Exposure', def: 'The harm, loss or damage that can result if a threat compromises a resource.', src: 'slides', ref: 'ch4a s18' },
      { term: 'Vulnerability', def: 'The possibility that a threat will harm a resource.', src: 'slides', ref: 'ch4a s18' },
      { term: 'Unintentional threat', def: 'An act performed without malicious intent that still threatens security, such as human error.', src: 'slides', ref: 'ch4a s22' },
      { term: 'Human error', def: 'Employee negligence; causes most data breaches.', src: 'slides', ref: 'ch4a s23', emph: 'green' },
      { term: 'Social engineering', def: 'Using social skills to trick or manipulate legitimate employees into giving up confidential information such as passwords.', src: 'slides', ref: 'ch4a s31', emph: 'green' },
      { term: 'Tailgating', def: 'Following someone closely through a door into a restricted area.', src: 'slides', ref: 'ch4a s34' },
      { term: 'Shoulder surfing', def: 'Watching someone’s screen over their shoulder.', src: 'slides', ref: 'ch4a s35' },
      { term: 'Espionage or trespass', def: 'An unauthorized individual trying to gain illegal access to organizational information.', src: 'slides', ref: 'ch4b s6' },
      { term: 'Sabotage or vandalism', def: 'Deliberately defacing an organization’s systems or website.', src: 'slides', ref: 'ch4b s10' },
      { term: 'Identity theft', def: 'The deliberate assumption of another person’s identity, usually to reach their finances or frame them for a crime.', src: 'slides', ref: 'ch4b s12' },
      { term: 'Trade secret', def: 'An intellectual work, such as a business plan, that is a company secret and not based on public information.', src: 'slides', ref: 'ch4b s15' },
      { term: 'Piracy', def: 'Copying a software program without paying the owner.', src: 'slides', ref: 'ch4b s17' },
      { term: 'Malware', def: 'Malicious software designed to wreak havoc.', src: 'slides', ref: 'ch4b s19' },
      { term: 'Worm', def: 'Malware that replicates itself and spreads to other computers.', src: 'slides', ref: 'ch4b s19' },
      { term: 'Ransomware', def: 'Digital extortion: blocks access or encrypts data until a ransom is paid, usually in bitcoin.', src: 'slides', ref: 'ch4b s20', emph: 'green' },
      { term: 'Doxxing', def: 'Threatening to release stolen private data to the public.', src: 'slides', ref: 'ch4b s27' },
      { term: 'Botnet', def: 'A collection of infected computers (bots) controlled by a remote bot master.', src: 'slides', ref: 'ch4b s28' },
      { term: 'DDoS attack', def: 'Distributed denial of service: flooding a site or network with traffic from many infected computers to make it unusable.', src: 'slides', ref: 'ch4b s28' },
      { term: 'Phishing', def: 'Using deceptive, official-looking e-mails, messages or texts to get sensitive personal information.', src: 'slides', ref: 'ch4b s29' },
      { term: 'Spear phishing', def: 'Phishing personalized to target specific individuals or organizations.', src: 'slides', ref: 'ch4b s29' },
      { term: 'Whaling', def: 'Spear phishing aimed at high-value individuals, usually executives and HR.', src: 'slides', ref: 'ch4b s29' },
      { term: 'Alien software', def: 'Software secretly installed on a computer without the user’s knowledge (pestware); includes malware, but some is only for tracking and marketing.', src: 'slides', ref: 'ch4c s4', emph: 'blue' },
      { term: 'Adware', def: 'Alien software that causes pop-up advertisements; often installed with “free” software.', src: 'slides', ref: 'ch4c s5' },
      { term: 'Spyware', def: 'Alien software that collects personal information without consent: keyloggers, screen scrapers, stalkerware.', src: 'slides', ref: 'ch4c s6' },
      { term: 'Keylogger', def: 'Spyware that records your keystrokes and browsing history.', src: 'slides', ref: 'ch4c s6' },
      { term: 'Spamware', def: 'Alien software that harvests e-mail addresses and sends unsolicited e-mail, even from your own account.', src: 'slides', ref: 'ch4c s7' },
      { term: 'Tracking cookie', def: 'A cookie that tracks your path on the Internet, time spent and links clicked, usually for marketing.', src: 'slides', ref: 'ch4c s8' },
      { term: 'SCADA attack', def: 'An attack on supervisory control and data acquisition systems, which control processes in refineries, water treatment and power plants.', src: 'slides', ref: 'ch4c s9', emph: 'blue' },
      { term: 'Cyberterrorism vs cyberwarfare', def: 'Using computer systems to cause real-world harm or disruption; cyberterrorism by individuals and groups, cyberwarfare by countries.', src: 'slides', ref: 'ch4c s10–11', emph: 'blue' },
      { term: 'User education and training', def: '“The single most valuable control.”', src: 'slides', ref: 'ch4d s5', emph: 'orange' },
      { term: 'Information security controls', def: 'Controls that protect every component of an information system: data, software, hardware and networks.', src: 'slides', ref: 'ch4d s6', emph: 'blue' },
      { term: 'Physical controls', def: 'Keep unauthorized people out of facilities: walls, doors, locks, badges, guards, alarms.', src: 'slides', ref: 'ch4d s8', emph: 'blue' },
      { term: 'Access controls', def: 'Keep unauthorized people from using information resources: passwords, biometrics, MFA.', src: 'slides', ref: 'ch4d s9', emph: 'blue' },
      { term: 'MFA / two-factor authentication', def: 'Requiring more than one proof of identity to sign in.', src: 'slides', ref: 'ch4d s10', emph: 'green' },
      { term: 'Authentication vs authorization', def: 'Authentication identifies who the individual is; authorization is the rights and privileges (level of access) that user has.', src: 'slides', ref: 'ch4d s11' },
      { term: 'Communications controls', def: 'Network controls that secure the movement of data and access across networks.', src: 'slides', ref: 'ch4d s12', emph: 'blue' },
      { term: 'Firewall', def: 'A system that prevents unauthorized Internet users from accessing private networks.', src: 'slides', ref: 'ch4d s13' },
      { term: 'Whitelisting vs blacklisting', def: 'Whitelisting names the only apps or sites allowed; blacklisting names the ones not allowed.', src: 'slides', ref: 'ch4d s15' },
      { term: 'Encryption', def: 'Scrambling a message so only the intended receiver can read it; a public key locks, a private key unlocks.', src: 'slides', ref: 'ch4d s16' },
      { term: 'VPN', def: 'A private, secure network on the Internet that remote users connect to and share information through.', src: 'slides', ref: 'ch4d s17' },
      { term: 'TLS', def: 'Transport Layer Security: encrypts data between a Web server and browser for card purchases and online banking.', src: 'slides', ref: 'ch4d s18' },
      { term: 'SIEM', def: 'Security Information and Event Management: collects security data and gives real-time alerts of suspicious activity.', src: 'slides', ref: 'ch4d s20' },
      { term: 'Information systems auditing', def: 'Internal auditors or external consultants helping an organization put the right risk management plan in place.', src: 'slides', ref: 'ch4d s21', emph: 'green' },
      { term: 'Risk management', def: 'Identifying, controlling and minimizing the impact of threats; it is impossible to eliminate all risk.', src: 'slides', ref: 'ch4d s23', emph: 'red' },
      { term: 'Risk analysis', def: 'Value each asset, estimate the probability it is compromised, compare that cost with the cost of protecting it.', src: 'slides', ref: 'ch4d s24' },
      { term: 'Risk acceptance', def: 'Accepting the risk, using no controls, and absorbing any damage.', src: 'slides', ref: 'ch4d s26' },
      { term: 'Risk limitation', def: 'Implementing controls that minimize the impact of a threat.', src: 'slides', ref: 'ch4d s26' },
      { term: 'Risk transference', def: 'Transferring the risk by other means of compensation, such as buying insurance.', src: 'slides', ref: 'ch4d s26' },
      { term: 'First- vs third-party cyber insurance', def: 'First-party protects your own company; third-party protects you when another business sues over your errors.', src: 'slides', ref: 'ch4d s27–28' },
    ],
    knowThis: [
      { q: 'Define **threat**, **exposure** and **vulnerability**, and tell them apart.', a: 'Threat: **any danger** a system may be exposed to. Exposure: the **harm, loss or damage** that results if a threat compromises it. Vulnerability: the **possibility** that a threat will harm it.', src: 'slides', ref: 'ch4a s18' },
      { q: 'What did the IBM-sponsored survey estimate? (four figures)', a: '**$4.88 million** global average cost of a breach; a **1 in 4** chance of suffering one; **$9.5 million** U.S. average; **$9.8 million** in healthcare. All colored on the slides.', src: 'slides', ref: 'ch4a s6–8', emph: 'orange' },
      { q: 'Can an organization provide perfect security?', a: 'No. It is **impossible** for organizations to provide perfect security (red and underlined on the slide).', src: 'slides', ref: 'ch4a s17', emph: 'red' },
      { q: 'What are the **five factors** that make organizations more vulnerable?', a: '(1) Interconnected, interdependent, wirelessly networked business; (2) smaller, faster, cheaper computers and storage; (3) **decreasing skills needed to hack**; (4) **international organized crime** in cybercrime; (5) **lack of management support.**', src: 'slides', ref: 'ch4a s19' },
      { q: 'What are the **two major categories** of threats?', a: '**Unintentional** and **deliberate**.', src: 'slides', ref: 'ch4a s21' },
      { q: 'What causes most data breaches, and what is the top way organizations get compromised?', a: '**Employee negligence (human error)** causes most breaches. **Questionable e-mails** (opening unknown mail and clicking links or attachments) are the top way in (orange on the slide).', src: 'slides', ref: 'ch4a s23–25', emph: 'orange' },
      { q: 'What is **social engineering**? Name its four forms from class.', a: 'Using social skills to trick legitimate employees into giving up confidential information. **Phone calls, physical impersonation, tailgating, shoulder surfing.**', src: 'slides', ref: 'ch4a s31–35', emph: 'green' },
      { q: 'Why are software **patches** critical, and why does **third-party vendor** security matter?', a: 'Software has flaws (mostly unintentional) that attackers exploit to get in, and patches close them. A vendor’s weak security can expose your organization, as with **American Airlines and Southwest** in 2023. Both points are green on the slides.', src: 'slides', ref: 'ch4b s7–8', emph: 'green' },
      { q: 'What is **ransomware**, and what happened at **Colonial Pipeline**?', a: 'Digital extortion that blocks access or **encrypts data until a ransom is paid** (usually bitcoin). Colonial (May 2021): the largest U.S. fuel pipeline was shut for **5+ days**; a **$4.4M** ransom was paid; the way in was an **inactive account’s password found on the dark web**, used over a **VPN**.', src: 'slides', ref: 'ch4b s20–24', emph: 'green' },
      { q: 'Phishing vs spear phishing vs whaling?', a: '**Phishing**: deceptive messages to anyone. **Spear phishing**: personalized to specific people or organizations. **Whaling**: spear phishing aimed at **executives and HR**.', src: 'slides', ref: 'ch4b s29' },
      { q: 'What is the one rule for links in e-mails and texts?', a: '**Never click them.** Open a browser and go to the company’s website yourself (blue on the slide).', src: 'slides', ref: 'ch4b s47', emph: 'blue' },
      { q: 'What is **alien software**? Name its kinds from class.', a: 'Software **secretly installed without the user’s knowledge** (pestware). It **includes malware** but is not always malicious. Kinds: **adware** (pop-ups), **spyware** (keyloggers, screen scrapers, stalkerware), **spamware** (sends unsolicited e-mail), and **cookies / tracking cookies**.', src: 'slides', ref: 'ch4c s4–8', emph: 'blue' },
      { q: 'What do **SCADA** systems do, and what is the difference between **cyberterrorism** and **cyberwarfare**?', a: 'SCADA systems **monitor or control physical processes** in refineries, water treatment and power plants. Both cyber attacks aim at real-world harm, often political: **cyberterrorism** is by **individuals and groups**, **cyberwarfare** by **countries / governments**.', src: 'slides', ref: 'ch4c s9–11', emph: 'blue' },
      { q: 'What is the most common way successful attacks get into organizations?', a: '**Phishing and spear phishing**: the **human element** vulnerability.', src: 'slides', ref: 'ch4d s2' },
      { q: 'What are the three ways organizations protect against threats, and which is the single most valuable control?', a: '**Education, information security controls, risk management.** **“The single most valuable control is user education and training”** (orange, bold and underlined).', src: 'slides', ref: 'ch4d s4–5', emph: 'orange' },
      { q: 'Name the **three major types** of information security controls and give an example of each.', a: '**Physical** (walls, locks, badges, guards), **access** (passwords, biometrics, **MFA**), **communications / network** (firewalls, anti-malware, white/blacklisting, encryption, VPN, TLS, employee monitoring, SIEM).', src: 'slides', ref: 'ch4d s7–20', emph: 'blue' },
      { q: '**Authentication** vs **authorization**?', a: 'Authentication identifies **who** the individual is. Authorization is the **rights and privileges** that user has: the appropriate level of access.', src: 'slides', ref: 'ch4d s11' },
      { q: 'What is the goal of **risk management**, and can all risk be eliminated?', a: 'To **identify, control and minimize the impact of threats**, reducing risk to acceptable levels. No: it is **impossible to eliminate all risk** (red on the slide).', src: 'slides', ref: 'ch4d s23', emph: 'red' },
      { q: 'What are the **three steps of risk analysis**?', a: '(1) Assess the **value** of each asset; (2) estimate the **probability** it is compromised; (3) **compare** the probable cost of a compromise with the cost of protecting it.', src: 'slides', ref: 'ch4d s24' },
      { q: 'Name the **three risk mitigation strategies**.', a: '**Acceptance** (no controls, absorb the damage), **limitation** (controls that minimize the impact), **transference** (insurance or a third party).', src: 'slides', ref: 'ch4d s26' },
      { q: 'First-party vs third-party cyber insurance, and what drives its cost?', a: '**First-party** protects your own company (forensics, PR, notifying clients, credit monitoring, lost income). **Third-party** protects you when another business sues over your errors. Cost depends on **size and industry, amount and sensitivity of data, annual revenue, strength of security measures** (colored on the slide).', src: 'slides', ref: 'ch4d s27–29' },
    ],
  },

  // ── Hardware (textbook only) ─────────────────────────────────────────────
  {
    id: 'hardware', topic: 'hardware', title: 'Hardware', icon: '🖥️', minutes: 8,
    tagline: 'The physical parts of a computer system, from the CPU to storage.',
    sections: [
      {
        heading: 'What hardware is', src: 'book',
        bullets: [
          '**Hardware** is the physical equipment of a computer system: the **central processing unit (CPU)**, **primary storage**, **secondary storage**, **input** and **output** devices, and communication devices.',
          'A strategic question for any organization: how to keep up with fast-changing hardware, and whether to **buy or lease** it.',
        ],
      },
      {
        heading: 'The computer hierarchy (largest to smallest)', src: 'book',
        bullets: [
          '**Supercomputers**: the fastest, for massive calculations (weather, simulations).',
          '**Mainframes**: large, powerful machines handling huge transaction volumes (banks, airlines).',
          '**Microcomputers / personal computers**: desktops, laptops and notebooks.',
          '**Mobile and wearable devices**: tablets, smartphones, smartwatches and similar.',
        ],
      },
      {
        heading: 'The CPU', src: 'book',
        bullets: [
          'The **CPU** performs the computation inside the computer. It has a **control unit** (directs the flow of instructions), an **arithmetic-logic unit, ALU** (does the math and comparisons) and **registers** (tiny, very fast storage for the data being worked on).',
          'Speed depends on **clock speed** (gigahertz), word length and the number of cores.',
          '**Moore’s Law**: the number of transistors on a chip, and so its power, roughly **doubles about every two years** while cost falls.',
        ],
      },
      {
        heading: 'Memory and storage', src: 'book',
        table: {
          head: ['Kind', 'What it is', 'Keeps data when power is off?'],
          rows: [
            ['**Registers**', 'Inside the CPU; the fastest, smallest storage', 'No'],
            ['**Cache memory**', 'Very fast memory holding data the CPU uses most', 'No'],
            ['**RAM** (random access memory)', 'Primary storage for the programs and data in use', '**No: volatile**'],
            ['**ROM** (read-only memory)', 'Holds startup instructions', '**Yes: nonvolatile**'],
            ['**Secondary storage**', 'Hard drives (magnetic), **solid-state drives** (flash), optical discs, tape', 'Yes'],
          ],
        },
        bullets: [
          'The closer storage is to the CPU, the **faster and more expensive per byte**, and the smaller it is.',
          'Capacity units: **byte** (8 bits) → **kilobyte** → **megabyte** → **gigabyte** → **terabyte** → **petabyte**, each about 1,000 times the last.',
        ],
      },
      {
        heading: 'Input and output', src: 'book',
        bullets: [
          '**Input** devices get data into the computer: keyboards, mice, touchscreens, scanners, cameras, microphones, sensors.',
          '**Output** devices present results: monitors, printers, speakers, and 3D printers.',
        ],
      },
    ],
    keyTerms: [
      { term: 'CPU', def: 'Central processing unit: performs the computation. Control unit + ALU + registers.', src: 'book' },
      { term: 'ALU', def: 'Arithmetic-logic unit: the part of the CPU that does math and comparisons.', src: 'book' },
      { term: 'Moore’s Law', def: 'Chip power roughly doubles about every two years while cost falls.', src: 'book' },
      { term: 'RAM', def: 'Random access memory: primary storage for what is in use. Volatile.', src: 'book' },
      { term: 'ROM', def: 'Read-only memory: holds startup instructions. Nonvolatile.', src: 'book' },
      { term: 'Cache memory', def: 'Very fast memory close to the CPU for frequently used data.', src: 'book' },
      { term: 'Secondary storage', def: 'Nonvolatile storage outside the CPU: hard drives, solid-state drives, optical discs, tape.', src: 'book' },
      { term: 'Mainframe', def: 'A large, powerful computer handling huge transaction volumes.', src: 'book' },
      { term: 'Supercomputer', def: 'The fastest kind of computer, for massive calculations.', src: 'book' },
    ],
    knowThis: [
      { q: 'What are the three parts of the CPU?', a: 'The **control unit**, the **arithmetic-logic unit (ALU)** and **registers**.', src: 'book' },
      { q: 'RAM vs ROM: which is volatile, and what does each hold?', a: '**RAM is volatile**: it holds the programs and data in use and loses them when power is off. **ROM is nonvolatile**: it holds startup instructions.', src: 'book' },
      { q: 'What does Moore’s Law say?', a: 'Chip power (transistors per chip) roughly **doubles about every two years** while cost falls.', src: 'book' },
      { q: 'Order the computer hierarchy from largest to smallest.', a: '**Supercomputers → mainframes → personal computers → mobile and wearable devices.**', src: 'book' },
    ],
  },

  // ── Software (textbook only) ─────────────────────────────────────────────
  {
    id: 'software', topic: 'software', title: 'Software', icon: '💾', minutes: 7,
    tagline: 'The instructions that run on the hardware, who writes them, and how they are licensed.',
    sections: [
      {
        heading: 'What software is', src: 'book',
        bullets: [
          '**Software** is a set of computer **programs**, each a sequence of instructions telling the hardware what to do. **Documentation** describes how the programs work.',
          'Two main kinds: **systems software** (runs the computer itself) and **application software** (does a specific job for the user).',
        ],
      },
      {
        heading: 'Systems software: the operating system', src: 'book',
        bullets: [
          'The **operating system (OS)** is the main systems software. It **manages the hardware**, provides **a user interface** (usually a **graphical user interface, GUI**), and gives application programs a consistent way to use the hardware.',
          'Examples: Windows, macOS, Linux, iOS, Android.',
          'Systems software also includes **utilities** (backup, antivirus, file management).',
        ],
      },
      {
        heading: 'Application software', src: 'book',
        bullets: [
          '**Application software** does a specific task for the user: spreadsheets, word processing, databases, enterprise systems, apps.',
          '**Proprietary** application software is owned by a company; it can be **off-the-shelf** (bought ready-made, e.g. Microsoft Office) or **custom** (written for one organization). Off-the-shelf is cheaper and faster to get; custom fits better but costs more and takes longer.',
          '**Open-source** software makes its source code available to anyone to use, study and modify, often free (Linux, Firefox). Benefits: low cost, many contributors; drawbacks: support and responsibility can be unclear.',
        ],
      },
      {
        heading: 'Software issues', src: 'book',
        bullets: [
          '**Software defects (bugs)**: errors in code. Every large program has some, which is why patches matter (the same point Chapter 4 makes about security).',
          '**Software licensing**: you usually buy a **license to use** software, not the software itself. Copying it without paying is **piracy** (Chapter 4).',
          '**Software-as-a-Service (SaaS)**: renting software over the Internet by subscription instead of installing it (Microsoft 365, Salesforce).',
        ],
      },
    ],
    keyTerms: [
      { term: 'Software', def: 'Computer programs (sequences of instructions) plus their documentation.', src: 'book' },
      { term: 'Systems software', def: 'Software that runs the computer itself, chiefly the operating system.', src: 'book' },
      { term: 'Application software', def: 'Software that performs a specific task for the user.', src: 'book' },
      { term: 'Operating system', def: 'Manages the hardware, provides the user interface, and serves application programs.', src: 'book' },
      { term: 'GUI', def: 'Graphical user interface: icons, windows and pointers instead of typed commands.', src: 'book' },
      { term: 'Open-source software', def: 'Software whose source code anyone can use, study and modify.', src: 'book' },
      { term: 'Off-the-shelf software', def: 'Ready-made software bought rather than custom-built.', src: 'book' },
      { term: 'SaaS', def: 'Software-as-a-Service: software rented over the Internet by subscription.', src: 'book' },
      { term: 'Software license', def: 'Permission to use software, rather than ownership of it.', src: 'book' },
    ],
    knowThis: [
      { q: 'Systems software vs application software?', a: '**Systems software** runs the computer (the operating system, utilities). **Application software** does a specific job for the user (spreadsheets, apps).', src: 'book' },
      { q: 'What three things does an operating system do?', a: 'It **manages the hardware**, provides the **user interface** (usually a GUI), and gives **application programs** a consistent way to use the hardware.', src: 'book' },
      { q: 'What is open-source software?', a: 'Software whose **source code is available to anyone to use, study and modify**, often free (Linux).', src: 'book' },
    ],
  },

  // ── Acquiring information systems (textbook only) ────────────────────────
  {
    id: 'acquiring', topic: 'acquiring', title: 'Acquiring Information Systems', icon: '🛒', minutes: 10,
    tagline: 'How an organization plans for, justifies and gets the systems it needs.',
    sections: [
      {
        heading: 'Planning and justifying IT', src: 'book',
        bullets: [
          'Acquisition starts from the **organization’s strategic plan**. The **IS (IT) strategic plan** lines IT up with it, often overseen by an **IT steering committee** of managers from across the business.',
          'Before buying, the organization assesses **costs vs benefits**. Benefits can be **tangible** (measurable savings) or **intangible** (better decisions, customer satisfaction), which are hard to put a number on.',
          'Common methods: **net present value (NPV)**, **return on investment (ROI)**, **breakeven analysis**, the **business case**, and a **scoring approach** that weights several criteria.',
        ],
      },
      {
        heading: 'The ways to acquire a system', src: 'book',
        table: {
          head: ['Strategy', 'In short', 'Trade-off'],
          rows: [
            ['**Buy** off-the-shelf', 'Purchase a ready-made package', 'Fast and cheaper; may not fit the business exactly'],
            ['**Lease**', 'Rent the software', 'Lower up-front cost; less control'],
            ['**Software-as-a-Service**', 'Subscribe over the Internet', 'No install or maintenance; depends on the vendor'],
            ['**Open source**', 'Use free, modifiable code', 'Low cost; support is on you'],
            ['**Outsourcing**', 'Hire an outside firm to build or run it', 'Expertise and capacity; less control, vendor risk'],
            ['**Custom development**', 'Build it in-house or by contract', 'Exact fit; slowest and most expensive'],
          ],
        },
      },
      {
        heading: 'The systems development life cycle (SDLC)', src: 'book',
        body: 'The **SDLC** is the traditional, structured way to develop a large system, in **sequential stages**:',
        bullets: [
          '**1. Systems investigation**: is there a problem worth solving? The **feasibility study** checks **technical**, **economic**, **behavioral (organizational)** and **legal** feasibility.',
          '**2. Systems analysis**: study the current system and gather the **user requirements**.',
          '**3. Systems design**: specify how the new system will meet them (logical design, then physical design).',
          '**4. Programming and testing**: write the code and test it.',
          '**5. Implementation**: switch from the old system to the new one (the conversion methods below).',
          '**6. Operation and maintenance**: run it, audit it, fix and update it over its life.',
          'Strengths: control, documentation, fewer surprises on large projects. Weaknesses: **slow and rigid**, and changing requirements are costly.',
        ],
      },
      {
        heading: 'Conversion methods (implementation)', src: 'book',
        table: {
          head: ['Method', 'How the switch happens', 'Risk'],
          rows: [
            ['**Direct**', 'Turn the old system off and the new one on, all at once', 'Highest risk, cheapest'],
            ['**Pilot**', 'New system in one location or group first', 'Moderate'],
            ['**Phased**', 'New system introduced in stages (modules)', 'Moderate'],
            ['**Parallel**', 'Old and new run side by side for a while', 'Lowest risk, most expensive'],
          ],
        },
      },
      {
        heading: 'Alternatives to the SDLC', src: 'book',
        bullets: [
          '**Joint application design (JAD)**: users and developers work out requirements together in group sessions.',
          '**Rapid application development (RAD)**: build and refine working prototypes quickly with heavy user involvement.',
          '**Agile development**: deliver working software in **short iterations**, adapting as requirements change (**Scrum** is a popular agile method).',
          '**End-user development**: users build their own applications. Fast, but can create unmanaged “shadow IT”.',
        ],
      },
      {
        heading: 'Choosing a vendor', src: 'book',
        bullets: [
          'An organization identifies potential vendors and sends a **request for proposal (RFP)** describing what it needs; vendors reply with proposals.',
          'It then evaluates the vendors and packages, negotiates the contract, and agrees a **service-level agreement (SLA)** that spells out the performance and support the vendor must deliver.',
        ],
      },
    ],
    keyTerms: [
      { term: 'IT steering committee', def: 'Managers from across the business who align IT with the organization’s strategy.', src: 'book' },
      { term: 'Feasibility study', def: 'Checks technical, economic, behavioral and legal feasibility in systems investigation.', src: 'book' },
      { term: 'SDLC', def: 'Systems development life cycle: investigation, analysis, design, programming and testing, implementation, operation and maintenance.', src: 'book' },
      { term: 'Parallel conversion', def: 'Running old and new systems side by side; lowest risk, most expensive.', src: 'book' },
      { term: 'Direct conversion', def: 'Switching all at once; highest risk.', src: 'book' },
      { term: 'Agile development', def: 'Building software in short iterations that adapt to changing requirements.', src: 'book' },
      { term: 'JAD', def: 'Joint application design: users and developers set requirements together.', src: 'book' },
      { term: 'RAD', def: 'Rapid application development: quick prototypes refined with users.', src: 'book' },
      { term: 'RFP', def: 'Request for proposal: a document asking vendors to propose how they would meet a need.', src: 'book' },
      { term: 'SLA', def: 'Service-level agreement: the performance and support a vendor commits to.', src: 'book' },
      { term: 'Outsourcing', def: 'Hiring an outside firm to build or run a system.', src: 'book' },
    ],
    knowThis: [
      { q: 'Name the six stages of the SDLC in order.', a: '**Systems investigation → systems analysis → systems design → programming and testing → implementation → operation and maintenance.**', src: 'book' },
      { q: 'What four kinds of feasibility does a feasibility study check?', a: '**Technical, economic, behavioral (organizational) and legal.**', src: 'book' },
      { q: 'Name the four conversion methods and the lowest-risk one.', a: '**Direct, pilot, phased, parallel.** **Parallel** is lowest risk (and most expensive); **direct** is highest risk.', src: 'book' },
      { q: 'Name four ways to acquire a system.', a: 'Any four of: **buy off-the-shelf, lease, software-as-a-service, open source, outsourcing, custom development** (in-house or contract).', src: 'book' },
    ],
  },

  // ── Artificial intelligence (textbook only) ──────────────────────────────
  {
    id: 'ai', topic: 'ai', title: 'Artificial Intelligence', icon: '🤖', minutes: 9,
    tagline: 'What AI is, how machines learn, and what AI can and cannot do.',
    sections: [
      {
        heading: 'What AI is', src: 'book',
        bullets: [
          '**Artificial intelligence (AI)** is a subfield of computer science concerned with building systems that **perform tasks that normally require human intelligence**: learning, reasoning, recognizing patterns, understanding language.',
          'The **Turing test** asks whether a person questioning a hidden human and a hidden computer can tell which is which. If not, the computer is said to show intelligence.',
          '**Weak (narrow) AI** does one specific task (a chess engine, a spam filter). **Strong AI (artificial general intelligence)** would match human intelligence across tasks, and does not exist yet.',
        ],
      },
      {
        heading: 'Natural vs artificial intelligence', src: 'book',
        table: {
          head: ['', 'Natural (human)', 'Artificial'],
          rows: [
            ['Preserving knowledge', 'Perishable', 'Permanent'],
            ['Duplicating and spreading it', 'Slow, expensive', 'Easy, cheap'],
            ['Cost', 'Can be high', 'Can be low, falling'],
            ['Consistency', 'Variable', 'Consistent'],
            ['Creativity and common sense', 'Strong', 'Limited'],
            ['Learning from context and experience', 'Broad', 'Narrow, needs data'],
          ],
        },
      },
      {
        heading: 'Machine learning and deep learning', src: 'book',
        bullets: [
          '**Machine learning** lets a system **learn from data** instead of being explicitly programmed for every case.',
          '**Supervised learning**: trained on **labeled** examples (these e-mails are spam, these are not). **Unsupervised learning**: finds **patterns in unlabeled** data (grouping customers). **Reinforcement learning**: learns by **trial and error with rewards** (game playing, robots).',
          '**Neural networks** loosely imitate the brain: layers of connected nodes that adjust their connections as they learn. **Deep learning** uses neural networks with **many layers** and huge amounts of data.',
          'AI needs **lots of good data**, and **biased data produces biased results**, an ethics issue that links back to Chapter 3.',
        ],
      },
      {
        heading: 'What AI can do', src: 'book',
        bullets: [
          '**Computer vision**: recognizing images and faces (the photo tagging from Chapter 3).',
          '**Natural language processing (NLP)**: understanding and generating human language (chatbots, translation).',
          '**Speech recognition**: turning speech into text (voice assistants).',
          '**Robotics**: machines that sense and act in the physical world.',
          '**Intelligent agents**: software that performs tasks for a user (bots, assistants).',
          '**Expert systems**: capture a human expert’s knowledge as rules to give advice.',
        ],
      },
      {
        heading: 'Generative AI', src: 'book',
        bullets: [
          '**Generative AI** creates new content (text, images, code, audio) from patterns learned in its training data. **Large language models (LLMs)** such as ChatGPT and Microsoft’s **Copilot** generate text. (The class slides quote Copilot’s definition of a data breach.)',
          'Its risks: **hallucinations** (confident but wrong answers), bias, privacy (what you type may be stored or used), and intellectual property questions about training data.',
        ],
      },
    ],
    keyTerms: [
      { term: 'Artificial intelligence', def: 'Systems that perform tasks normally requiring human intelligence.', src: 'book' },
      { term: 'Turing test', def: 'If a questioner cannot tell a hidden computer from a hidden human, the computer shows intelligence.', src: 'book' },
      { term: 'Weak (narrow) AI', def: 'AI that performs one specific task.', src: 'book' },
      { term: 'Strong AI (AGI)', def: 'Hypothetical AI matching human intelligence across tasks.', src: 'book' },
      { term: 'Machine learning', def: 'Systems that learn from data rather than explicit programming.', src: 'book' },
      { term: 'Supervised learning', def: 'Machine learning trained on labeled examples.', src: 'book' },
      { term: 'Unsupervised learning', def: 'Machine learning that finds patterns in unlabeled data.', src: 'book' },
      { term: 'Reinforcement learning', def: 'Machine learning by trial and error with rewards.', src: 'book' },
      { term: 'Neural network', def: 'Layers of connected nodes, loosely modeled on the brain, that adjust as they learn.', src: 'book' },
      { term: 'Deep learning', def: 'Machine learning with many-layered neural networks and large data.', src: 'book' },
      { term: 'Natural language processing', def: 'AI that understands and generates human language.', src: 'book' },
      { term: 'Generative AI', def: 'AI that creates new content (text, images, code) from learned patterns.', src: 'book' },
      { term: 'Hallucination', def: 'A confident but false answer from a generative AI system.', src: 'book' },
    ],
    knowThis: [
      { q: 'Supervised vs unsupervised vs reinforcement learning?', a: 'Supervised: learns from **labeled** examples. Unsupervised: finds **patterns in unlabeled** data. Reinforcement: learns by **trial and error with rewards**.', src: 'book' },
      { q: 'Weak AI vs strong AI?', a: '**Weak (narrow)** AI does one task and exists today. **Strong AI (AGI)** would match human intelligence across tasks and does not exist yet.', src: 'book' },
      { q: 'What is the Turing test?', a: 'If a questioner cannot tell a hidden computer from a hidden human by their answers, the computer is said to show intelligence.', src: 'book' },
      { q: 'What is a hallucination in generative AI?', a: 'A **confident but false** answer. It is why generative AI output must be checked.', src: 'book' },
    ],
  },
]

export function lessonById(id) {
  return LESSONS.find(l => l.id === id) || null
}
