import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";

/* The terms and conditions from the old site (wallaceinjury.com/terms-and-conditions), carried
   over at Shaheen's instruction, Nov 2026. Only the firm's contact block is drawn from site data. */

export const metadata: Metadata = { title: "Terms and Conditions", robots: { index: false } };

const LEGAL = "The Law Office of Shaheen Wallace, LLC d/b/a Talon Law Group";

export default function Terms() {
  return (
    <>
      <PageHeader eyebrow="Last updated March 16, 2026" lines={["Terms and", "conditions."]} />
      <section className="legal shell max-w-[72ch] pb-28 text-[15px] leading-relaxed text-fg/75">
        <h2>1. Acceptance of terms</h2>
        <p>By accessing and using the {LEGAL} website and any related services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.</p>

        <h2>2. Website usage</h2>
        <h3>2.1 Permitted use</h3>
        <p>You may use our website for lawful purposes only. You agree to use the website in a manner consistent with any and all applicable laws and regulations.</p>
        <h3>2.2 Prohibited activities</h3>
        <p>You may not use our website to:</p>
        <ul>
          <li>Violate any local, state, national, or international law or regulation</li>
          <li>Transmit any advertising or promotional material, including "junk mail," "chain letters," "spam," or similar solicitations</li>
          <li>Impersonate or attempt to impersonate the firm, a firm employee, another user, or any other person or entity</li>
          <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
        </ul>

        <h2>3. Attorney-client relationship</h2>
        <h3>3.1 No attorney-client relationship</h3>
        <p>The information on this website is for general informational purposes only. Nothing on this site should be taken as legal advice for any individual case or situation. The information is not intended to create, and receipt or viewing does not constitute, an attorney-client relationship between you and {LEGAL}.</p>
        <h3>3.2 Consultation required</h3>
        <p>An attorney-client relationship is only formed after we have agreed to represent you and you have signed a representation agreement. Until such time, you remain free to seek legal counsel elsewhere.</p>

        <h2>4. Communications and messaging</h2>
        <h3>4.1 Text messaging services</h3>
        <p>By providing your phone number and opting in to receive text messages from {LEGAL}, you consent to receive automated text messages at the phone number provided. These messages may include appointment reminders, case updates, and other communications related to our services.</p>
        <h3>4.2 Message frequency and charges</h3>
        <p>Message frequency varies. Standard message and data rates may apply. You may opt out at any time by replying "STOP" to any text message from us.</p>
        <h3>4.3 SMS terms</h3>
        <ul>
          <li>By opting in, you agree to receive text messages from {LEGAL}</li>
          <li>We will only send messages related to legal services and your case</li>
          <li>You may opt out at any time by texting "STOP"</li>
          <li>For help, text "HELP" or contact us directly</li>
          <li>Mobile information will not be shared with third parties/affiliates for marketing/promotional purposes. See our <Link href="/privacy" className="link-draw text-accent">privacy policy</Link>.</li>
        </ul>

        <h2>5. Privacy and confidentiality</h2>
        <h3>5.1 Information collection</h3>
        <p>We collect information you provide directly to us, such as when you contact us through our website, phone, or other communication methods.</p>
        <h3>5.2 Use of information</h3>
        <p>Information collected is used to:</p>
        <ul>
          <li>Provide legal services and consultation</li>
          <li>Communicate with you about your case or inquiry</li>
          <li>Send appointment reminders and updates</li>
          <li>Improve our services</li>
        </ul>
        <h3>5.3 Confidentiality</h3>
        <p>We maintain strict confidentiality standards in accordance with attorney-client privilege and applicable legal ethics rules across all jurisdictions in which we are licensed to practice.</p>

        <h2>6. Intellectual property rights</h2>
        <h3>6.1 Website content</h3>
        <p>The service and its original content, features, and functionality are and will remain the exclusive property of {LEGAL} and its licensors. The service is protected by copyright, trademark, and other applicable laws.</p>
        <h3>6.2 User content</h3>
        <p>By submitting content to our website, you grant us a non-exclusive, royalty-free license to use, modify, and display such content in connection with providing our services.</p>

        <h2>7. Disclaimers</h2>
        <h3>7.1 Website availability</h3>
        <p>We do not guarantee that our website will be available at all times. We may experience hardware, software, or other issues, or need to perform maintenance related to the website, resulting in interruptions, delays, or errors.</p>
        <h3>7.2 Information accuracy</h3>
        <p>While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind about the completeness, accuracy, reliability, suitability, or availability of the website or the information contained therein.</p>

        <h2>8. Limitation of liability</h2>
        <p>In no event shall {LEGAL}, nor its members, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses resulting from your use of the website.</p>

        <h2>9. Indemnification</h2>
        <p>You agree to defend, indemnify, and hold harmless {LEGAL} and its licensees and licensors, and their employees, contractors, agents, officers, and members, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from your use of the website or your breach of these Terms.</p>

        <h2>10. Termination</h2>
        <p>We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use the website will immediately cease.</p>

        <h2>11. Governing law</h2>
        <p>These Terms shall be interpreted and governed by the laws of the Commonwealth of Pennsylvania, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>

        <h2>12. Changes to terms</h2>
        <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will endeavor to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>

        <h2>13. Severability</h2>
        <p>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, and the remaining provisions will continue in full force and effect.</p>

        <h2>14. Contact information</h2>
        <p>If you have any questions about these Terms and Conditions, please contact us at:</p>
        <address className="not-italic">
          {LEGAL}<br />
          {site.address.street}<br />
          {site.address.city}, {site.address.region} {site.address.postal}<br />
          <a href={`tel:${site.phoneRaw}`} className="link-draw">{site.phone}</a><br />
          <a href={`mailto:${site.email}`} className="link-draw">{site.email}</a>
        </address>
      </section>
    </>
  );
}
