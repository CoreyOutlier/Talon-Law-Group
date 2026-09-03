/* ============================================================================
 * TALON LAW GROUP — SINGLE SOURCE OF TRUTH
 * Every word, number, phone and address on the site comes from this file.
 * Edit here, the whole site updates. No hunting through components.
 *
 * ⚠️  LEGAL ADVERTISING COMPLIANCE (PA RPC 7.1 / NY 22 NYCRR 1200 / GA 7.1)
 *     Case results and testimonials MUST be verifiable. Anything marked
 *     status: "needs-confirmation" is HIDDEN in production until you flip it
 *     to "verified". Do not publish a number Shaheen cannot document.
 * ========================================================================== */

export const SHOW_DRAFT_PROOF = process.env.NEXT_PUBLIC_SHOW_DRAFT_PROOF === "1";

export const site = {
  name: "Talon Law Group",
  legalName: "Talon Law Group (formerly The Law Office of Shaheen Wallace, Esq., LLC)",
  domain: "https://www.wallaceinjury.com",
  tagline: "Injury law with a closer's instinct.",
  description:
    "Talon Law Group is a Pittsburgh trial practice representing seriously injured people across Pennsylvania, New York and Georgia. Founded by Shaheen Wallace, Esq.",
  phone: "(844) 474-2448",
  phoneRaw: "+18444742448",
  smsRaw: "+18444742448",
  email: "info@wallaceinjury.com", // TODO: confirm the address Shaheen wants public
  address: {
    street: "5850 Ellsworth Avenue, Suite 230",
    city: "Pittsburgh",
    region: "PA",
    postal: "15232",
    country: "US",
  },
  geo: { lat: 40.4527, lng: -79.9245 }, // Shadyside, Pittsburgh — verify before launch
  hours: "Answered 24/7. A lawyer calls back — not a call center.",
  founded: "2015",
  jurisdictions: ["Pennsylvania", "New York", "Georgia"],
  social: {
    facebook: "https://www.facebook.com/shaheenesq/",
    linkedin: "https://www.linkedin.com/in/shaheen-wallace-esq-bb60b06/",
    instagram: "", // TODO
  },
} as const;

/* -------------------------------------------------------------------------- */
/* THE PROMISE — the three things that make a stranger pick up the phone       */
/* -------------------------------------------------------------------------- */

export const promises = [
  {
    k: "01",
    title: "You talk to the lawyer",
    body: "Not an intake screener. Not a case manager three states away. Shaheen answers your questions, and he is the one standing up in the courtroom.",
  },
  {
    k: "02",
    title: "Nothing unless we win",
    body: "No retainer. No hourly bill. No invoice while you heal. We are paid a percentage of what we recover for you — and nothing at all if we recover nothing.",
  },
  {
    k: "03",
    title: "Built to try, not to settle cheap",
    body: "Insurers price a case by the lawyer holding it. Ours is a trial file from day one, and the carriers know it. That is where leverage comes from.",
  },
] as const;

/* -------------------------------------------------------------------------- */
/* PRACTICE AREAS                                                              */
/* -------------------------------------------------------------------------- */

export type PracticeArea = {
  slug: string;
  name: string;
  short: string;
  kicker: string;
  intro: string;
  body: string[];
  urgency: string;
  stat?: { value: string; label: string; source: string };
  faqs: { q: string; a: string }[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "truck-accidents",
    name: "Truck & Tractor-Trailer",
    short: "Truck Accidents",
    kicker: "80,000 pounds against 4,000",
    intro:
      "A trucking company's rapid-response team is on scene within hours. Ours needs to be too.",
    body: [
      "Commercial carriers do not wait for a lawsuit. Within hours of a serious crash, an adjuster, an investigator and defense counsel are already at the scene photographing skid marks and taking statements. By the time most people are out of the hospital, the story has been written without them.",
      "We move on the evidence that decides these cases: the electronic control module, the driver's hours-of-service logs, dispatch records, maintenance history, the carrier's hiring file, and the dashcam footage that gets overwritten on a 30-day loop. A spoliation letter in the first week is often worth more than a year of litigation later.",
      "Trucking cases also carry layered insurance — the driver, the motor carrier, the broker, the shipper, the trailer owner. Finding every policy is how a catastrophic injury gets paid for properly instead of capped at a single limit.",
    ],
    urgency: "Critical evidence is routinely destroyed within 30 days.",
    faqs: [
      {
        q: "The trucking company already offered me money. Should I take it?",
        a: "An early offer is a measure of what the carrier is afraid of, not what your case is worth. It arrives before your treatment is finished, which means before anyone — including your doctors — knows the full extent of your injury. Have it reviewed before you sign anything.",
      },
      {
        q: "Who is actually responsible in a truck case?",
        a: "Often more than one party: the driver, the motor carrier that employed them, the company that loaded the trailer, the maintenance contractor, and sometimes the broker who arranged the haul. Each may carry separate insurance.",
      },
    ],
  },
  {
    slug: "car-accidents",
    name: "Car & Motor Vehicle Crashes",
    short: "Car Accidents",
    kicker: "The most common case. Rarely the simple one.",
    intro:
      "Pennsylvania's limited tort election, stacking, UM/UIM — the fine print decides what your claim is worth before liability is ever argued.",
    body: [
      "Most people discover their own auto policy for the first time after a crash. In Pennsylvania, one checkbox — limited tort versus full tort — can decide whether you are permitted to recover for pain and suffering at all. There are exceptions that a careful lawyer can use. Most people never learn they exist.",
      "Then there is the at-fault driver's coverage, which is frequently the state minimum and nowhere near the cost of a spinal fusion. Underinsured motorist coverage, household stacking, and resident-relative policies are where real recoveries usually come from. We map every available policy before we make a single demand.",
      "We handle the medical liens, the wage documentation and the property damage so you are dealing with your recovery instead of a claims department.",
    ],
    urgency: "Pennsylvania's statute of limitations is two years from the crash.",
    faqs: [
      {
        q: "I have limited tort. Is my case over?",
        a: "No. Limited tort has real exceptions — serious impairment of a bodily function, an out-of-state vehicle, a drunk driver, an uninsured driver, and others. Do not assume you are barred until a lawyer reads the actual policy.",
      },
      {
        q: "Should I give the other insurer a recorded statement?",
        a: "No. You have no obligation to give a statement to the other driver's carrier, and it exists to find contradictions to use later. Refer them to counsel.",
      },
    ],
  },
  {
    slug: "medical-malpractice",
    name: "Medical Malpractice",
    short: "Medical Malpractice",
    kicker: "When the institution closes ranks",
    intro:
      "Hospitals defend these cases with unlimited resources and expert witnesses on retainer. They should be met the same way.",
    body: [
      "Medical negligence cases are the most expensive and most technically demanding in civil litigation. Pennsylvania requires a certificate of merit from a qualified expert within sixty days of filing. New York and Georgia have their own thresholds. A case brought without the right specialist behind it does not survive.",
      "We fund the experts, obtain the complete chart including nursing notes and audit trails, and reconstruct the timeline that the discharge summary smooths over. Missed diagnosis, surgical error, medication error, failure to monitor, delayed intervention — each turns on a different standard of care.",
      "These matters are not filed lightly and they are not settled cheaply. We take them when the record supports them, and we prepare them for a jury.",
    ],
    urgency: "Records requests and expert review take months. Start early.",
    faqs: [
      {
        q: "A bad outcome happened. Is that malpractice?",
        a: "Not automatically. Medicine carries risk, and a poor result is not negligence by itself. The question is whether the care fell below the accepted standard and whether that failure caused the harm. That takes a qualified expert to answer.",
      },
    ],
  },
  {
    slug: "wrongful-death",
    name: "Wrongful Death",
    short: "Wrongful Death",
    kicker: "For the family left behind",
    intro:
      "Two claims run in parallel in Pennsylvania — wrongful death for the family, survival for the estate. Both have to be pled correctly.",
    body: [
      "Pennsylvania law creates two distinct causes of action after a death caused by negligence. The wrongful death claim belongs to the statutory beneficiaries and covers their loss — support, services, guidance, funeral and medical expenses. The survival action belongs to the estate and covers what the person themselves lost, including conscious pain and suffering before death and a lifetime of earnings.",
      "There is administrative work that has to happen alongside the litigation: opening the estate, appointing a personal representative, coordinating with probate counsel. We handle it so the family is not managing a court docket while grieving.",
      "We keep these files quiet, we keep them dignified, and we prepare them to be tried.",
    ],
    urgency: "The estate usually must be opened before suit can be filed.",
    faqs: [
      {
        q: "Who is allowed to bring the claim?",
        a: "In Pennsylvania, the personal representative of the estate files, for the benefit of the surviving spouse, children or parents. If no representative is appointed within six months, a beneficiary may file.",
      },
    ],
  },
  {
    slug: "slip-and-fall",
    name: "Slip, Trip & Fall",
    short: "Slip & Fall",
    kicker: "Premises liability",
    intro:
      "Property owners win these cases on two words: notice and status. We build the file around both.",
    body: [
      "A fall claim is not won by proving you fell. It is won by proving the owner knew, or should have known, about the hazard and did nothing — and that you were lawfully there. Incident reports, inspection logs, prior complaints, maintenance schedules and surveillance video are the evidence that decides it, and most of it is in the defendant's exclusive possession.",
      "Video is the perishable piece. Many retailers overwrite footage on a short cycle. A preservation demand sent immediately is often the difference between a documented claim and one word against another.",
      "Pennsylvania applies comparative negligence, so expect the defense to argue you were distracted or the hazard was open and obvious. We prepare for that argument from day one instead of reacting to it at deposition.",
    ],
    urgency: "Store surveillance is often erased in 14 to 30 days.",
    faqs: [
      {
        q: "I did not report it to the manager. Does that end it?",
        a: "No, but it makes documentation more important. Photographs, witness names, medical records with a consistent history, and the clothing and footwear you were wearing all help establish what happened.",
      },
    ],
  },
  {
    slug: "nursing-home-abuse",
    name: "Nursing Home Neglect & Abuse",
    short: "Nursing Home",
    kicker: "Understaffing is a business decision",
    intro:
      "Pressure ulcers, falls, dehydration, unexplained fractures and medication errors are rarely accidents. They are the predictable result of running a facility short.",
    body: [
      "Facilities are required to keep detailed records — care plans, turn and reposition schedules, wound assessments, staffing sheets and state survey results. Those documents very often tell a different story than the one told to the family.",
      "We obtain the complete chart, the corporate ownership structure and the facility's citation history. Many homes operate through layered LLCs designed to limit exposure. Identifying the operator and the true owner is part of the work.",
      "Arbitration clauses buried in admission paperwork are common and are not always enforceable. Do not assume a signature closed the courthouse door.",
    ],
    urgency: "Records can be altered. Request them through counsel, not directly.",
    faqs: [
      {
        q: "We signed an arbitration agreement at admission. Are we stuck?",
        a: "Not necessarily. These agreements are frequently signed by someone without legal authority for the resident, presented as a condition of admission, or drafted unconscionably. They are challengeable.",
      },
    ],
  },
  {
    slug: "birth-injuries",
    name: "Birth Injury",
    short: "Birth Injury",
    kicker: "A lifetime of care, costed properly",
    intro:
      "Hypoxic injury, shoulder dystocia and delayed cesarean cases turn on the fetal monitoring strip and the minutes around it.",
    body: [
      "The electronic fetal monitoring record is the spine of a birth injury case. It shows what the tracing was telling the team and when, which makes the question of when intervention should have occurred an answerable one.",
      "These cases require maternal-fetal medicine, neonatology, neuroradiology and life-care planning experts. The damages model is the most complex in tort law because it must fund decades of therapy, equipment, home modification, attendant care and lost earning capacity for a child who has not yet started school.",
      "The limitations period for a minor is treated differently than for an adult. If you have questions about an older birth, ask rather than assume.",
    ],
    urgency: "Minors' claims follow different deadlines. Ask before assuming.",
    faqs: [
      {
        q: "Our child was born years ago. Is it too late?",
        a: "Possibly not. Claims on behalf of minors are handled differently than adult claims in Pennsylvania. It costs nothing to have the timeline reviewed.",
      },
    ],
  },
  {
    slug: "pedestrian-and-bicycle-accidents",
    name: "Pedestrian & Bicycle",
    short: "Pedestrian & Bicycle",
    kicker: "No steel between you and the impact",
    intro:
      "A person on foot or on a bike absorbs the entire force. The injuries are severe and the blame-shifting starts immediately.",
    body: [
      "The first defense in nearly every pedestrian case is that the person stepped out, was not in a crosswalk, was wearing dark clothing, or was on a phone. Physical evidence — point of impact, throw distance, vehicle damage, signal timing and traffic camera footage — answers those claims far better than argument does.",
      "Cyclists face the same reflex, plus a helmet debate that is often legally irrelevant to liability. We keep the focus on the driver's duty.",
      "Because these collisions frequently produce catastrophic injury against a minimum-limits driver, uninsured and underinsured motorist coverage matters enormously. Pedestrians and cyclists are often covered under their own auto policy even though no car of theirs was involved.",
    ],
    urgency: "Traffic and business camera footage disappears fast.",
    faqs: [
      {
        q: "I was hit while walking and I do not own a car. Is there any coverage?",
        a: "Possibly. You may be covered under a resident relative's auto policy for medical benefits and underinsured motorist coverage. This is one of the most commonly missed sources of recovery.",
      },
    ],
  },
  {
    slug: "hit-and-run",
    name: "Hit & Run",
    short: "Hit & Run",
    kicker: "When the driver never stops",
    intro:
      "An unidentified driver does not mean an uncompensated injury. Uninsured motorist coverage exists for exactly this.",
    body: [
      "Phantom-vehicle and hit-and-run claims are made against your own uninsured motorist coverage, which most policies include. There are strict notice requirements and, in some cases, a corroboration requirement — which is why prompt reporting to police matters.",
      "Your own carrier now sits on the other side of the claim. It is friendly right up until the number is discussed. Treat the recorded statement accordingly.",
      "We also pursue identification of the driver where it is realistic — canvassing for cameras, body-shop reports and debris analysis.",
    ],
    urgency: "UM claims carry short notice deadlines under your own policy.",
    faqs: [
      {
        q: "My own insurance is handling it. Do I still need a lawyer?",
        a: "Yes. In an uninsured motorist claim your insurer is the adverse party. It evaluates and pays the claim, and its interest is in paying less.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* CASE RESULTS                                                                */
/* ⚠️  Only "verified" entries render in production.                           */
/* -------------------------------------------------------------------------- */

export type CaseResult = {
  amount: string;
  type: string;
  detail: string;
  note?: string;
  status: "verified" | "needs-confirmation";
};

export const caseResults: CaseResult[] = [
  {
    amount: "$900,000",
    type: "Personal Injury Settlement",
    detail:
      "Settlement published in Jury Verdict Review, obtained with longtime colleague Conrad Park, Esq.",
    status: "verified",
  },
  // ---- DRAFT SLOTS — replace with real, documentable results, then flip status ----
  { amount: "$0", type: "Truck Collision", detail: "REPLACE ME — description of the case, injury and outcome.", status: "needs-confirmation" },
  { amount: "$0", type: "Premises Liability", detail: "REPLACE ME", status: "needs-confirmation" },
  { amount: "$0", type: "Wrongful Death", detail: "REPLACE ME", status: "needs-confirmation" },
  { amount: "$0", type: "Medical Malpractice", detail: "REPLACE ME", status: "needs-confirmation" },
  { amount: "$0", type: "Motor Vehicle Crash", detail: "REPLACE ME", status: "needs-confirmation" },
];

export const publishedResults = caseResults.filter(
  (r) => r.status === "verified" || SHOW_DRAFT_PROOF
);

export const resultsDisclaimer =
  "Prior results do not guarantee or predict a similar outcome in any future matter. Every case is decided on its own facts. Amounts shown are gross recoveries before attorney's fees, costs and liens.";

/* -------------------------------------------------------------------------- */
/* TESTIMONIALS                                                                */
/* ⚠️  Paraphrased from public directory listings. Confirm exact wording and    */
/*     obtain client consent before publishing. Attribute by first name +       */
/*     last initial at most.                                                    */
/* -------------------------------------------------------------------------- */

export type Testimonial = {
  quote: string;
  author: string;
  matter: string;
  source: string;
  status: "verified" | "needs-confirmation";
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "His communication, persistence and dedication to me as a client was outstanding.",
    author: "Verified client review",
    matter: "Personal injury",
    source: "Avvo",
    status: "needs-confirmation",
  },
  {
    quote:
      "I would highly recommend Shaheen for those seeking help with both personal injury and business law.",
    author: "Verified client review",
    matter: "Personal injury",
    source: "Avvo",
    status: "needs-confirmation",
  },
  {
    quote: "Great experience. Highly recommended.",
    author: "Verified client review",
    matter: "Motor vehicle",
    source: "Avvo",
    status: "needs-confirmation",
  },
];

export const publishedTestimonials = testimonials.filter(
  (t) => t.status === "verified" || SHOW_DRAFT_PROOF
);

/* -------------------------------------------------------------------------- */
/* ATTORNEY                                                                    */
/* -------------------------------------------------------------------------- */

export const attorney = {
  name: "Shaheen Z. Wallace",
  suffix: "Esq.",
  role: "Founder & Trial Attorney",
  portrait: "/media/shaheen/portrait.jpg",
  lede:
    "A trial lawyer from New York who built his practice in Pittsburgh, and who has spent a decade taking on the largest insurance carriers in the country on behalf of people they hoped would go away.",
  bio: [
    "Shaheen Wallace opened his own practice in 2015. Since then he has represented people seriously hurt in motor vehicle crashes, truck wrecks, medical negligence and falls — going up against some of the biggest insurance companies in the nation, and doing it as the lawyer who actually knows the client's name.",
    "He came to law through advocacy, not through a boardroom. He studied at John Jay College of Criminal Justice in New York City, then earned his J.D. at the University of Pittsburgh School of Law, where he was a prominent member of the National Mock Trial Team and was inducted into the Order of Barristers — a national distinction reserved for the most gifted oral advocates.",
    "He has litigated civil matters throughout Pennsylvania ranging from auto collisions and premises liability to nursing home abuse and wrongful death, and today serves injured people across Pennsylvania, New York and Georgia.",
  ],
  credentials: [
    { label: "J.D., University of Pittsburgh School of Law", meta: "Order of Barristers" },
    { label: "National Mock Trial Team", meta: "University of Pittsburgh School of Law" },
    { label: "John Jay College of Criminal Justice", meta: "New York, NY" },
    { label: "Published in Jury Verdict Review", meta: "$900,000 personal injury settlement" },
    { label: "Admitted in Pennsylvania", meta: "Serving PA, NY and GA" },
    { label: "In practice since 2015", meta: "Founder, Talon Law Group" },
  ],
};

/* -------------------------------------------------------------------------- */
/* PROCESS                                                                     */
/* -------------------------------------------------------------------------- */

export const process_ = [
  {
    n: "01",
    title: "The call",
    time: "Today",
    body: "You tell us what happened. We tell you honestly whether you have a case and what it will take. No pressure, no obligation, no fee to find out.",
  },
  {
    n: "02",
    title: "We take the weight",
    time: "Week one",
    body: "Evidence preservation letters go out. We notify the carriers, shut off the adjuster calls, order records, and put your treatment and your bills in order.",
  },
  {
    n: "03",
    title: "We build the file",
    time: "Months one to six",
    body: "Investigation, experts, medical documentation, wage loss and life-impact proof. We build it the way it would be shown to a jury, because that is the file that gets paid.",
  },
  {
    n: "04",
    title: "We demand. Or we file.",
    time: "When you are medically stable",
    body: "A documented demand goes to the carrier. If the number is not right, we file suit. That decision is yours, and you make it with real information.",
  },
  {
    n: "05",
    title: "You get paid",
    time: "Resolution",
    body: "We negotiate down the medical liens so more of the recovery stays with you, close the file, and account for every dollar in writing.",
  },
];

/* -------------------------------------------------------------------------- */
/* NAVIGATION                                                                  */
/* -------------------------------------------------------------------------- */

export const nav = [
  { label: "Practice", href: "/practice-areas" },
  { label: "Shaheen Wallace", href: "/about" },
  { label: "Results", href: "/results" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

export const disclaimer =
  "The information on this website is for general informational purposes only and is not legal advice. Viewing this site or contacting Talon Law Group does not create an attorney-client relationship. That relationship is formed only by a signed written agreement. Do not send confidential information through this website until an attorney-client relationship is established.";
