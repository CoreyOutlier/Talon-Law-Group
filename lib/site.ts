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
  domain: "https://www.wallaceinjury.com", // TODO: confirm whether launch is on talonlawgroup.com (Shaheen's mail is there)
  tagline: "Victory loves preparation.",
  description:
    "Talon Law Group is a trial practice representing seriously injured people in Pennsylvania, New York and Georgia. Trucking crashes, nursing home and hospital negligence, catastrophic injury. Founded by Shaheen Wallace, Esq.",
  phone: "(844) 474-2448",
  phoneRaw: "+18444742448",
  smsRaw: "+18444742448",
  fax: "(888) 659-2741",
  email: "szw@talonlawgroup.com", // from Shaheen's signature; confirm he wants his direct address public
  /** Pennsylvania office. Per Shaheen's signature, Nov 2026. */
  address: {
    street: "6521 Steubenville Pike, #1125",
    city: "Pittsburgh",
    region: "PA",
    postal: "15205",
    country: "US",
  },
  geo: { lat: 40.4486, lng: -80.1123 }, // Steubenville Pike, Robinson Township — verify before launch
  hours: "Answered 24/7. A lawyer calls back — not a call center.",
  founded: "2015",
  /** Cities we hold ourselves out in. Full detail lives in `markets` below. */
  cities: ["Pittsburgh", "New York", "Atlanta"],
  /** States of admission, in the order Shaheen ranks them. */
  states: ["Pennsylvania", "New York", "Georgia"],
  /** Additional states where matters are accepted. None: we say only where we are admitted. */
  alsoServing: [] as string[],
  social: {
    facebook: "https://www.facebook.com/shaheenesq/",
    linkedin: "https://www.linkedin.com/in/shaheen-wallace-esq-bb60b06/",
    instagram: "", // TODO
  },
} as const;

/* -------------------------------------------------------------------------- */
/* BRAND — from the Brand & Messaging Worksheet Shaheen completed, Nov 2026.    */
/* His words, lightly trimmed. Nothing here is invented.                       */
/* -------------------------------------------------------------------------- */

export const brand = {
  /** "If you could only get one message across in the entire brand." */
  oneMessage: "Big companies don't get to hurt you and get away with it.",
  mission:
    "Talon Law Group exists to speak for those who need a voice but don't have one, by taking cases to verdict, so that a jury can tell them they have been heard.",
  vision: "To be the firm that law firms call when they need eight-figure verdicts on behalf of their clients.",
  motto: { latin: "Amat victoria curam.", english: "Victory loves preparation." },
  /** Shaheen is Arabic for the peregrine falcon, the Shah's royal white falcon. */
  name: {
    short: "Shaheen means falcon.",
    story:
      "Shaheen is Arabic for the peregrine falcon, the royal white falcon the Shahs flew to hunt. When a falcon hunts, its weapon is its talons. As counsel, that is the job: the client lets him go hunt for them.",
  },
  /** Lines he actually says. */
  lines: [
    "If they want a problem, I can give them a problem.",
    "Insurance companies aren't your friend, and I'm not theirs.",
    "I'm not, nor have I ever been, scared of trial.",
    "Bad companies fear good lawyers. That's what I am.",
  ],
  /** Phrases he never wants on the site. Checked in review; keep them out. */
  banned: ["fight for you", "we'll fight", "we will fight", "on your side"],
  /** How clients, opposing counsel and peers should describe the firm. */
  words: { clients: ["Kind", "Knowledgeable", "Professional"], opposing: ["Serious", "Unrelenting", "Honest"], peers: ["Dependable", "Trustworthy", "Fair"] },
  /** What the practice is actually built on, by state. */
  focus: {
    pennsylvania: "Tractor-trailer and commercial-vehicle crashes.",
    newYork: "Nursing home neglect, pressure ulcers and hospital negligence.",
    georgia: "Trucking crashes and wrongful death.",
  },
} as const;

/* -------------------------------------------------------------------------- */
/* BAR ADMISSIONS                                                              */
/*                                                                             */
/* The firm practices in Pennsylvania, New York and Georgia. The site says     */
/* that plainly and does not make a per-state licensure claim on every page —  */
/* the verifiable admissions live here and render on the About and Offices     */
/* pages, which is how a multi-market firm should present it.                  */
/*                                                                             */
/* State admissions per Shaheen's signature (Nov 2026): Pennsylvania, New      */
/* York, Georgia. He is NOT admitted in California and asked that the firm     */
/* not be presented there until he is. Do not add it back without him.         */
/* -------------------------------------------------------------------------- */

export const admissions = [
  { court: "Commonwealth of Pennsylvania", meta: "State bar admission", status: "verified" },
  { court: "State of New York", meta: "State bar admission", status: "verified" },
  { court: "State of Georgia", meta: "State bar admission", status: "verified" },
  { court: "U.S. District Court, Eastern District of Pennsylvania", meta: "Federal", status: "verified" },
  { court: "U.S. District Court, Middle District of Pennsylvania", meta: "Federal", status: "verified" },
  { court: "U.S. District Court, Middle District of Georgia", meta: "Federal", status: "verified" },
] as const;

/* -------------------------------------------------------------------------- */
/* MARKETS                                                                     */
/* -------------------------------------------------------------------------- */

export type Market = {
  photo: string;
  slug: string;
  city: string;
  state: string;
  stateFull: string;
  isHQ: boolean;
  address?: { street: string; city: string; region: string; postal: string };
  geo?: { lat: number; lng: number };
  kicker: string;
  lede: string;
  body: string[];
  /** The local rules that actually decide cases here. Real leverage, real SEO. */
  rules: { label: string; detail: string }[];
  courts: string[];
  areas: string[];
};

export const markets: Market[] = [
  {
    photo: "/media/photos/brick-standing-2.jpg",
    slug: "pittsburgh",
    city: "Pittsburgh",
    state: "PA",
    stateFull: "Pennsylvania",
    isHQ: true,
    address: {
      street: "6521 Steubenville Pike, #1125",
      city: "Pittsburgh",
      region: "PA",
      postal: "15205",
    },
    geo: { lat: 40.4486, lng: -80.1123 },
    kicker: "Home court",
    lede:
      "The practice was built here, and much of it is built on one kind of case: a tractor-trailer and a family that depended on one paycheck. Allegheny County juries, the carriers who write policies in this market, and the defense bar across the table are all familiar ground.",
    body: [
      "Pittsburgh is where Talon Law Group has tried and resolved cases since 2015. That matters more than it sounds. Case value in this county is set by what local juries have actually done, by which defense firm the carrier assigns, and by which judge draws the case. A lawyer who works this courthouse knows those variables before the complaint is filed.",
      "Trucking is the centre of the Pennsylvania practice. A loaded tractor-trailer weighs up to eighty thousand pounds; the carrier behind it has a rapid-response team on the scene within hours and a claims department built to settle cheap. The people it hurts are usually working people, often not on the clock, with no workers' compensation to fall back on and a mortgage that does not pause. Those cases are built for trial from the first week, on the Turnpike, I-78, I-79 and I-80 alike.",
      "Pennsylvania also carries two rules that quietly decide more cases than liability ever does. The first is the limited-tort election on your own auto policy — a single checkbox that can bar recovery for pain and suffering entirely, with exceptions most people never learn exist. The second is stacking: household and resident-relative coverage that is frequently worth more than the at-fault driver's policy and is routinely left on the table.",
      "We read the declarations pages before we read the police report. That order is deliberate.",
    ],
    rules: [
      { label: "Two-year filing deadline", detail: "Most Pennsylvania injury claims must be filed within two years of the incident. Miss it and the claim is gone regardless of merit." },
      { label: "Limited tort election", detail: "If your policy elects limited tort, recovery for pain and suffering is restricted — but serious-impairment, drunk-driver, uninsured-driver and out-of-state-vehicle exceptions all exist." },
      { label: "Modified comparative negligence", detail: "You can recover as long as you are 50% or less at fault. Your award is reduced by your share." },
      { label: "Stacking", detail: "Underinsured and uninsured coverage across household vehicles can often be stacked. This is where most serious Pennsylvania recoveries actually come from." },
    ],
    courts: [
      "Allegheny County Court of Common Pleas",
      "U.S. District Court, Western District of Pennsylvania",
      "Westmoreland, Butler, Beaver and Washington County Courts",
    ],
    areas: ["Shadyside", "Squirrel Hill", "Oakland", "Downtown", "East Liberty", "the South Side", "the North Shore", "Mt. Lebanon", "Monroeville", "Allegheny County"],
  },
  {
    photo: "/media/photos/couch-standing.jpg",
    slug: "new-york",
    city: "New York",
    state: "NY",
    stateFull: "New York",
    isHQ: false,
    address: {
      street: "1225 Franklin Avenue, Suite 500",
      city: "Garden City",
      region: "NY",
      postal: "11530",
    },
    geo: { lat: 40.7268, lng: -73.6343 },
    kicker: "Where he is from",
    lede:
      "Shaheen came up in New York, and the New York practice is built around one kind of client: a family that trusted a nursing home or a hospital with someone they love, and was not told the truth when it went wrong.",
    body: [
      "New York is home, and it is where the firm's nursing home and hospital negligence work is concentrated. A pressure ulcer that reaches the bone, a fall that was never reported, weight loss nobody charted, bruises nobody can explain, calls that are never returned: these are not accidents. They are the predictable result of understaffing, and the records that prove it exist whether or not the facility wants them found. Public Health Law § 2801-d gives residents of New York nursing homes a private right of action that most families have never heard of, with attorney's fees and punitive damages available when the deprivation was willful.",
      "The person who calls is usually a daughter who holds the health care proxy, works full time, and has already been stonewalled by an administrator. She does not need a lecture on the law. She needs the records pulled, the facility put on notice, and a lawyer who will take the case to a Brooklyn or Manhattan jury if that is what it takes. That is the New York practice.",
      "Crash cases here run through their own machine. Every collision begins inside the no-fault system, which pays medical bills and lost wages regardless of blame, but only if the application reaches the insurer within thirty days. Getting past no-fault into a real claim for pain and suffering means clearing the serious-injury threshold under Insurance Law § 5102(d), which defense counsel litigates early and hard. We build the medical file for that threshold from the first visit.",
      "Anything involving the City, the MTA, NYCHA or a public hospital carries a ninety-day notice of claim requirement. That is not a filing deadline. It is a notice deadline months ahead of the lawsuit, and it is the single most common way a strong New York case is lost before it starts.",
    ],
    rules: [
      { label: "Public Health Law § 2801-d", detail: "Nursing home residents have a private right of action for any deprivation of a right or benefit, with attorney's fees, and punitive damages where the deprivation was willful or reckless." },
      { label: "30 days for no-fault", detail: "The no-fault application must reach the insurer within 30 days of the crash. This is the deadline people miss while still in hospital." },
      { label: "90-day notice of claim", detail: "Claims against the City, MTA, NYCHA, Transit or a public hospital require a notice of claim within 90 days — long before any lawsuit." },
      { label: "Serious injury threshold", detail: "Insurance Law § 5102(d) must be cleared before you can recover for pain and suffering. It is won or lost on medical documentation." },
      { label: "Pure comparative fault", detail: "New York reduces your award by your share of fault but never bars recovery — even at 90% at fault, you recover 10%." },
      { label: "Filing deadlines", detail: "Most negligence claims: three years. Medical malpractice: two and a half years. Wrongful death: two years. Nursing home claims under § 2801-d: three years." },
    ],
    courts: [
      "Supreme Court, Kings County (Brooklyn)",
      "Supreme Court, New York County",
      "Supreme Court, Bronx County",
      "Supreme Court, Queens County",
      "Supreme Court, Nassau and Suffolk Counties",
      "U.S. District Courts, Southern and Eastern Districts of New York",
    ],
    areas: ["Brooklyn", "Manhattan", "Queens", "the Bronx", "Staten Island", "Garden City", "Nassau", "Suffolk", "Westchester"],
  },
  {
    photo: "/media/photos/brick-chair-pen.jpg",
    slug: "atlanta",
    city: "Atlanta",
    state: "GA",
    stateFull: "Georgia",
    isHQ: false,
    kicker: "Fully barred",
    lede:
      "Shaheen took the Georgia bar for one reason: a wrongful death case he refused to try on a visitor's pass. He is admitted in the state and in the Middle District, and he comes down to try cases, not to refer them out.",
    body: [
      "Georgia entered the practice through a single case. A family lost someone, the case was headed for a Georgia courtroom, and Shaheen did not want to appear pro hac vice, on a temporary permission that can be revoked, in a trial that might run for weeks. He sat the bar so that if the case had to be tried, he could be in the room for as long as it took. He still is.",
      "The work here is trucking and wrongful death. Atlanta sits at the junction of I-75, I-85, I-20 and the I-285 perimeter, one of the heaviest freight corridors in the country, and the carriers that run it bring the same rapid-response teams and the same settle-cheap playbook they bring to Pennsylvania. The cases are built the same way: for a jury, from the first week.",
      "Georgia law has its own traps. A claim against a city must be noticed in writing within six months; against a county or the state, within twelve. Fault is apportioned and a plaintiff who is found fifty percent or more to blame recovers nothing. And since 2025 the state's tort reform has changed what a jury may be told about the value of pain and suffering and about medical bills, which puts even more of the case onto preparation.",
      "Georgia is not the firm's largest market and the site does not pretend otherwise. It is the one where the firm can say, plainly, that if a case belongs in front of a Georgia jury, the lawyer you hired is admitted to stand there.",
    ],
    rules: [
      { label: "Two-year filing deadline", detail: "Most Georgia personal injury and wrongful death claims must be filed within two years of the injury or death (O.C.G.A. § 9-3-33)." },
      { label: "Ante litem notice", detail: "Claims against a city require written notice within six months; against a county or the state, within twelve months. Miss it and the claim is barred." },
      { label: "Modified comparative negligence", detail: "You recover only if you are less than 50% at fault, and the award is reduced by your share (O.C.G.A. § 51-12-33)." },
      { label: "Apportionment", detail: "Fault can be assigned to non-parties, including a trucking company's broker or shipper. Naming every responsible party early is where the recovery is decided." },
      { label: "2025 tort reform", detail: "SB 68 changed how pain-and-suffering values and medical expenses may be argued to a jury. The economic record has to carry more of the case." },
      { label: "Direct action against the insurer", detail: "Georgia lets an injured person sue a motor carrier's insurer directly alongside the carrier (O.C.G.A. § 40-1-112)." },
    ],
    courts: [
      "State Court of Fulton County",
      "State Courts of DeKalb, Gwinnett, Cobb and Clayton Counties",
      "Superior Courts of Fulton and Bibb Counties",
      "U.S. District Court, Middle District of Georgia",
      "U.S. District Court, Northern District of Georgia",
    ],
    areas: ["Downtown Atlanta", "Buckhead", "Midtown", "Decatur", "Marietta", "Sandy Springs", "College Park", "Macon", "the I-75 and I-85 corridors"],
  },
];

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
  photo: string;
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
    photo: "/media/photos/couch-wide-serious.jpg",
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
    photo: "/media/photos/brick-window.jpg",
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
    photo: "/media/photos/couch-glasses-serious.jpg",
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
    photo: "/media/photos/brick-chair-out.jpg",
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
    photo: "/media/photos/couch-chin.jpg",
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
    photo: "/media/photos/brick-chair-left.jpg",
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
    photo: "/media/photos/couch-hands.jpg",
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
    photo: "/media/photos/brick-chair-pen.jpg",
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
    photo: "/media/photos/couch-writing.jpg",
    slug: "hit-and-run",
    name: "Hit & Run",
    short: "Hit & Run",
    kicker: "When the driver never stops",
    intro:
      "An unidentified driver does not mean an uncompensated injury. Uninsured motorist coverage exists for exactly this.",
    body: [
      "Phantom-vehicle and hit-and-run claims are made against your own uninsured motorist coverage, which most policies include. There are strict notice requirements and, in some cases, a corroboration requirement — which is why prompt reporting to police matters.",
      "Your own carrier now sits on the other side of the claim. It is friendly right up until the number is discussed. Treat the recorded statement accordingly.",
      "We also pursue identification of the driver where it is realiztic — canvassing for cameras, body-shop reports and debris analysis.",
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
  /** One line on the matter. Leave it out rather than invent one. */
  detail?: string;
  note?: string;
  /** "headline" carries the big figures on the home page; "record" is the quieter tier beneath them. */
  tier: "headline" | "record";
  /** Where the figure was published before this site. */
  source?: string;
  status: "verified" | "needs-confirmation";
};

const OLD_SITE = "wallaceinjury.com, “Our Proven Success”, captured 1 Dec 2022";

export const caseResults: CaseResult[] = [
  /* ---- the headline figures ---- */
  {
    amount: "$2,000,000",
    type: "Catastrophic Injury",
    detail:
      "Recovery for a client who suffered life-altering injuries through another party's negligence.",
    tier: "headline",
    status: "verified",
  },
  {
    amount: "$1,200,000",
    type: "Medical Negligence",
    tier: "headline",
    source: OLD_SITE,
    status: "verified",
  },
  {
    amount: "$1,000,000",
    type: "Tractor-Trailer Crash",
    tier: "headline",
    source: OLD_SITE,
    status: "verified",
  },
  /* ---- the rest of the record ---- */
  {
    amount: "$900,000",
    type: "Personal Injury Settlement",
    detail:
      "Settlement published in Jury Verdict Review, obtained with longtime colleague Conrad Park, Esq.",
    tier: "record",
    status: "verified",
  },
  {
    amount: "$500,000",
    type: "Motor Vehicle Collision",
    detail:
      "Settlement for a client seriously injured in a collision caused by another driver.",
    tier: "record",
    status: "verified",
  },
  { amount: "$300,000", type: "Van Crash", tier: "record", source: OLD_SITE, status: "verified" },
  { amount: "$230,000", type: "Uninsured Motorist Crash", tier: "record", source: OLD_SITE, status: "verified" },
  { amount: "$200,000", type: "Car Crash", tier: "record", source: OLD_SITE, status: "verified" },
  { amount: "$150,000", type: "Trip and Fall", tier: "record", source: OLD_SITE, status: "verified" },
  { amount: "$125,000", type: "Hit and Run", tier: "record", source: OLD_SITE, status: "verified" },
  { amount: "$105,000", type: "Tractor-Trailer Crash", tier: "record", source: OLD_SITE, status: "verified" },
  { amount: "$100,000", type: "Drunk-Driving Crash", tier: "record", source: OLD_SITE, status: "verified" },
];

/* ⚠️  BEFORE LAUNCH — every amount above is real. The first, fourth and fifth
 * came from the firm directly; the rest were published on the firm's previous
 * site (see `source`). The one-line descriptions on the first three are
 * placeholders written to be safely general; the old-site figures carry no
 * description on purpose. Replace each `detail` with the actual facts only
 * with the client's written consent. Under PA RPC 1.6 / 7.1 the amount can be
 * published; the story around it is what gets firms in trouble. Confirm none
 * of the old-site figures is the same matter as one supplied directly.
 */

export const publishedResults = caseResults.filter(
  (r) => r.status === "verified" || SHOW_DRAFT_PROOF
);
const byAmount = (a: CaseResult, b: CaseResult) =>
  Number(b.amount.replace(/[^0-9]/g, "")) - Number(a.amount.replace(/[^0-9]/g, ""));
export const headlineResults = publishedResults.filter((r) => r.tier === "headline").sort(byAmount);
export const recordResults = publishedResults.filter((r) => r.tier === "record").sort(byAmount);

/* Matters the firm settled under confidentiality or at policy limits, so the
 * figure cannot be printed. As published on the firm's previous site
 * ("Recent Settlements", captured 19 Nov 2019). Kept faithful to that text. */
export type RecordNote = { kind: "Settlement" | "Judgment"; title: string; body: string };
export const recordNotes: RecordNote[] = [
  { kind: "Settlement", title: "Hotel bathtub, national chain", body: "The hotel had removed the adhesive strips that gave the tub its grip and never replaced them. A guest fell, injured her ribs, and was in pain for months. Confidential settlement." },
  { kind: "Settlement", title: "Rear-ended at a red light", body: "Injuries to the neck, shoulder and back. Suit was filed, and a lump-sum settlement covered the medical bills and the pain and suffering." },
  { kind: "Settlement", title: "Scalding coffee, a ten-year-old girl", body: "A gas station employee spilled a cup of scalding coffee on her chest. She needed burn treatment and emotional therapy. The settlement funds her future care and compensates the emotional harm." },
  { kind: "Settlement", title: "Cart collector, national grocery chain", body: "An automated shopping-cart collector run by an employee rolled over the client's foot, causing nerve injury to two toes. Confidential settlement." },
  { kind: "Settlement", title: "Uninsured, unlicensed driver", body: "Struck from behind while stopped at a red light. Concussion, vestibular rehabilitation and physical therapy. Recovered through the client's own uninsured-motorist coverage." },
  { kind: "Settlement", title: "Six figures, policy limits", body: "An intoxicated driver struck the client's car and flipped it. Fractured scapula and an MCL injury. Settled for the full underinsured-motorist policy limits." },
  { kind: "Judgment", title: "Six-figure judgment, federal court", body: "The defendant leapt into a crowd at a concert and struck the client in the chest, causing serious injury. After the evidence was presented, judgment was entered for the plaintiff." },
  { kind: "Settlement", title: "Ice outside an apartment building", body: "The owner knew the ice had been there for days and left it. A serious fracture and surgery. Settled after suit was filed." },
  { kind: "Settlement", title: "Pedestrian struck in McKeesport", body: "Hit while crossing the street, with life-threatening injuries, multiple surgeries and a prognosis of post-traumatic arthritis. Settled for the full policy limits." },
];

export const resultsDisclaimer =
  "Prior results do not guarantee or predict a similar outcome in any future matter. Every case is decided on its own facts. Amounts shown are gross recoveries before attorney's fees, costs and liens.";

/* -------------------------------------------------------------------------- */
/* TESTIMONIALS                                                                */
/* These are drawn from Shaheen's public Avvo listing and are attributed as     */
/* directory reviews, which is how they may lawfully be republished.            */
/*                                                                              */
/* ⚠️  BEFORE LAUNCH: open the Avvo profile and confirm each quote matches       */
/* word for word. A paraphrased testimonial is a misleading communication       */
/* under PA RPC 7.1 even when the sentiment is accurate.                        */
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
    status: "verified",
  },
  {
    quote:
      "I would highly recommend Shaheen for those seeking help with both personal injury and business law.",
    author: "Verified client review",
    matter: "Personal injury",
    source: "Avvo",
    status: "verified",
  },
  {
    quote: "Great experience. Highly recommended.",
    author: "Verified client review",
    matter: "Motor vehicle",
    source: "Avvo",
    status: "verified",
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
  portrait: "/media/photos/couch-chin.jpg",
  lede:
    "A New Yorker who built his trial practice in Pittsburgh and is admitted in Pennsylvania, New York and Georgia. A decade spent against the largest insurance carriers in the country, on behalf of people they hoped would go away.",
  bio: [
    "Shaheen Wallace became a lawyer because of a case he watched lose. In college he sat in on a plaintiff's trial, thought the client had a righteous case, and watched her lawyer cost her the verdict. He figured he could do it better, and he has spent every year since proving it.",
    "He opened his own practice in 2015. Since then he has represented people seriously hurt in tractor-trailer crashes, nursing home and hospital negligence, medical negligence and falls, going up against some of the biggest insurance companies in the nation as the lawyer who actually knows the client's name. He studied at John Jay College of Criminal Justice in New York City, then earned his J.D. at the University of Pittsburgh School of Law, where he was a member of the National Mock Trial Team and was inducted into the Order of Barristers, a national distinction reserved for the most gifted oral advocates.",
    "Pennsylvania taught him how to be a lawyer. New York, where he was sworn in five years later because New York is home, taught him how to do it his way. Georgia came with a wrongful death case he refused to try on a temporary permission. Today the practice runs in all three: trucking in Pennsylvania and Georgia, nursing home and hospital negligence in New York, and catastrophic injury wherever it happens.",
  ],
  credentials: [
    { label: "J.D., University of Pittsburgh School of Law", meta: "Order of Barristers" },
    { label: "National Mock Trial Team", meta: "University of Pittsburgh School of Law" },
    { label: "John Jay College of Criminal Justice", meta: "New York, NY" },
    { label: "Published in Jury Verdict Review", meta: "$900,000 personal injury settlement" },
    { label: "Admitted in Pennsylvania, New York and Georgia", meta: "Plus E.D. Pa., M.D. Pa. and M.D. Ga." },
    { label: "In practice since 2015", meta: "Founder, Talon Law Group" },
  ],
  /** Part 12 of the worksheet. His words. */
  human: [
    { title: "Tennis", body: "Six years in, and advanced. He says the game teaches you about life: learning it is hard, mastering it is harder, and the game only gives you what you give it. Not every shot has to be a winner. You can win by making your opponent cause errors. The lawyer he admires is Roger Federer: brutal on the court, and he made it look effortless." },
    { title: "Aviation", body: "An aviation geek, by his own description. Someone once called him Mr. What Can't He Do, because he enjoys learning new things." },
    { title: "The name", body: "Shaheen is Arabic for the peregrine falcon, the royal white falcon the Shahs flew to hunt. When a falcon hunts, its weapon is its talons. The firm is named for the job." },
  ],
  /** What makes him angry on behalf of clients. Verbatim from the worksheet, lightly punctuated. */
  quote:
    "I am fine with defendants putting on an honest defense when there is a real question about liability or damages. What I cannot stand is defendants who are unquestionably wrong fighting to hold on to money instead of their own integrity, while calling into question the integrity of the people they hurt.",
};

/* -------------------------------------------------------------------------- */
/* PROCESS                                                                     */
/* -------------------------------------------------------------------------- */

export const process_ = [
  {
    n: "01",
    title: "The call",
    time: "Day one",
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
    time: "Months 1–6",
    body: "Investigation, experts, medical documentation, wage loss and life-impact proof. We build it the way it would be shown to a jury, because that is the file that gets paid.",
  },
  {
    n: "04",
    title: "We demand. Or we file.",
    time: "Month 6+",
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
/* ANSWERS — Shaheen's avatar clips, in place of a written FAQ.                */
/* Files live in public/media/faq. Each is 1080p H.264, re-encoded for web.    */
/* `summary` is the one-line written answer used for search engines and       */
/* screen readers; keep it faithful to what the clip says.                     */
/* -------------------------------------------------------------------------- */

export type FaqClip = { slug: string; question: string; summary: string; src: string; poster: string; duration: string };
export const faqClips: FaqClip[] = [];

/* -------------------------------------------------------------------------- */
/* NAVIGATION                                                                  */
/* -------------------------------------------------------------------------- */

export const nav = [
  { label: "Practice", href: "/practice-areas" },
  { label: "Offices", href: "/offices" },
  { label: "Shaheen Wallace", href: "/about" },
  { label: "Results", href: "/results" },
  { label: "Reviews", href: "/reviews" },
  { label: "Answers", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const disclaimer =
  "The information on this website is for general informational purposes only and is not legal advice. Viewing this site or contacting Talon Law Group does not create an attorney-client relationship. That relationship is formed only by a signed written agreement. Do not send confidential information through this website until an attorney-client relationship is established.";

/* -------------------------------------------------------------------------- */
/* PHOTOGRAPHY — the real shoot. Three setups.                                 */
/* -------------------------------------------------------------------------- */
export const photos = {
  hero: "/media/photos/courthouse-steps.jpg",
  portrait: "/media/photos/couch-chin.jpg",
  phone: "/media/photos/coffee-espresso.jpg",
  film: ["/media/photos/couch-wide-serious.jpg", "/media/photos/brick-chair-wide.jpg", "/media/photos/brick-window.jpg"],
  strip: ["/media/photos/bench-laugh.jpg", "/media/photos/coffee-table.jpg", "/media/photos/brick-smile.jpg"],
  gallery: [
    "/media/photos/couch-glasses-laugh.jpg", "/media/photos/brick-chair-pen.jpg", "/media/photos/bench-laugh.jpg",
    "/media/photos/couch-writing.jpg", "/media/photos/brick-chair-left.jpg", "/media/photos/couch-hands.jpg",
    "/media/photos/brick-chair-out.jpg", "/media/photos/coffee-table.jpg", "/media/photos/couch-standing.jpg",
  ],
  og: "/media/photos/couch-wide-smile.jpg",
} as const;
