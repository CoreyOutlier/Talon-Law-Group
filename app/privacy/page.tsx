import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { PageHeader } from "@/components/PageHeader";

/* The privacy policy from the old site (wallaceinjury.com/privacy-policy), carried over at
   Shaheen's instruction, Nov 2026. Only the firm's contact block is drawn from site data so it
   cannot drift from the rest of the site. */

export const metadata: Metadata = { title: "Privacy Policy", robots: { index: false } };

const LEGAL = "The Law Office of Shaheen Wallace, LLC d/b/a Talon Law Group";

export default function Privacy() {
  return (
    <>
      <PageHeader eyebrow="Last updated March 16, 2026" lines={["Privacy", "policy."]} />
      <section className="legal shell max-w-[72ch] pb-28 text-[15px] leading-relaxed text-fg/75">
        <p>As you browse our website, trusted third-party vendors may place anonymous cookies (small text files that do not damage a visitor's system or files) or similar technologies on your computer in order to better understand how you use the site and ways that we can improve your experience to tailor more relevant content to you. No personal data is collected in this process. Most browsers will allow a user to accept or deny cookies. If a visitor rejects our cookies, they may still use our site.</p>

        <h2>What information do we collect?</h2>
        <p>We collect information from you when you register on our site or fill out a form.</p>
        <p>When registering on this site, as appropriate, you may be asked to enter your: name, e-mail address, phone number or other information. You may, however, visit our site anonymously.</p>
        <p>Google, as a third-party vendor, uses cookies to serve ads on this site. Google's use of the DART cookie enables it to serve ads to your users based on their visit to your sites and other sites on the Internet. Users may opt-out of the use of the DART cookie by visiting the Google ad and content network privacy policy.</p>

        <h2>What do we use your information for?</h2>
        <p>Any of the information we collect from you may be used in one of the following ways:</p>
        <ul>
          <li>To personalize your experience (your information helps us to better respond to your individual needs)</li>
          <li>To improve our website (we continually strive to improve our website offerings based on the information and feedback we receive from you)</li>
          <li>To improve customer service (your information helps us to more effectively respond to your customer service requests and support needs)</li>
        </ul>

        <h2>How do we protect your information?</h2>
        <p>We implement a variety of security measures to maintain the safety of your personal information when you access your personal information.</p>
        <p>We offer the use of a secure server. All supplied sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into our Database to be only accessed by those authorized with special access rights to our systems, and are required to keep the information confidential.</p>
        <p>After a transaction, your private information (credit cards, social security numbers, financials, etc.) will not be kept on file for more than 60 days.</p>

        <h2>Do we use cookies?</h2>
        <p>Yes. Cookies are small files that a site or its service provider transfers to your computer hard drive through your Web browser (if you allow) that enables the sites or service providers systems to recognize your browser and capture and remember certain information.</p>
        <p>We use cookies to understand and save your preferences for future visits.</p>

        <h2>Do we disclose any information to outside parties?</h2>
        <p>We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. The information we gather remains confidential and is stored in our private, secured database. Should there come a time when you want your information sent to another party, a wet signature or secure electronic signature will be required.</p>
        <ul>
          <li>Special notice to {LEGAL} clients with signed retainers: If you are an active client, the {LEGAL} team will contact you via phone, text message, and email. Personal information, including mobile phone numbers or opt-in data will not be shared with third parties for promotional or marketing purposes.</li>
          <li>By providing your phone number to {LEGAL}, you agree and acknowledge that {LEGAL} may send text messages to your wireless phone number regarding case details, and ask for the documents, including status updates and reminders for important dates or notifications. Message and data rates may apply. Message frequency will vary, and you will be able to opt out by replying "STOP" to unsubscribe or "HELP" for further assistance. Mobile information will not be shared with third parties/affiliates for marketing/promotional purposes.</li>
          <li>{LEGAL} collects opt-in verbally from their customers. Customers may opt in to receive messages either in person at a physical location or over the phone when they call. When a customer is registered for the first time, they are asked to provide a phone number, and staff is trained to ask if the customer would like to opt in to SMS-based billing notifications. They will be verbally informed that "Message and data rates may apply," "Message frequency may vary," and they can "text HELP for support or more information and STOP to unsubscribe at any time." They will also be informed that their phone number will not be shared with third parties for marketing or promotional purposes.</li>
        </ul>

        <h2>Sharing of personal information</h2>
        <p>No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties. We do not collect your information and provide it to third-party services for processing. The phone numbers we collect and the consent we receive will not be shared with third-party providers.</p>

        <h2>Children's Online Privacy Protection Act compliance</h2>
        <p>We are in compliance with the requirements of COPPA (Children's Online Privacy Protection Act), we do not collect any information from anyone under 13 years of age. Our website, products, and services are all directed to people who are at least 13 years old or older.</p>

        <h2>Online privacy policy only</h2>
        <p>This online privacy policy applies only to information collected through our website and not to information collected offline.</p>

        <h2>Terms and conditions</h2>
        <p>Please also visit our <Link href="/terms" className="link-draw text-accent">terms and conditions</Link> section establishing the use, disclaimers, and limitations of liability governing the use of our website.</p>

        <h2>Your consent</h2>
        <p>By using our site, you consent to our website's privacy policy.</p>

        <h2>Changes to our privacy policy</h2>
        <p>If we decide to change our privacy policy, we will post those changes on this page.</p>

        <h2>Contact us</h2>
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
