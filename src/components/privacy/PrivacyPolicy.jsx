import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Shield, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TableOfContents } from "./TableOfContents";

export default function PrivacyPolicy() {
  // Last updated date
  const lastUpdated = "April 15, 2023";

  // Table of contents items
  const tocItems = [
    { id: "introduction", title: "Introduction" },
    { id: "information-we-collect", title: "Information We Collect" },
    { id: "how-we-use-information", title: "How We Use Your Information" },
    { id: "information-sharing", title: "Information Sharing and Disclosure" },
    { id: "your-choices", title: "Your Choices and Rights" },
    { id: "data-security", title: "Data Security" },
    { id: "international-transfers", title: "International Data Transfers" },
    { id: "children-privacy", title: "Children's Privacy" },
    { id: "policy-changes", title: "Changes to This Privacy Policy" },
    { id: "contact-us", title: "Contact Us" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Privacy Policy - Fixify</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <div className="flex items-center justify-center text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            <span>Last Updated: {lastUpdated}</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Table of Contents - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold mb-4">On This Page</h2>
              <TableOfContents items={tocItems} />
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {/* Table of Contents - Mobile */}
            <div className="lg:hidden mb-8">
              <details className="bg-muted/50 rounded-lg p-4">
                <summary className="text-lg font-semibold cursor-pointer">
                  Table of Contents
                </summary>
                <div className="mt-4 ml-4">
                  <TableOfContents items={tocItems} />
                </div>
              </details>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section id="introduction">
                <h2>Introduction</h2>
                <p>
                  Welcome to Fixify. We respect your privacy and are committed
                  to protecting your personal data. This Privacy Policy explains
                  how we collect, use, disclose, and safeguard your information
                  when you visit our website or use our services.
                </p>
                <p>
                  Please read this Privacy Policy carefully. If you do not agree
                  with the terms of this Privacy Policy, please do not access
                  the site or use our services.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="information-we-collect">
                <h2>Information We Collect</h2>
                <p>
                  We collect information that you provide directly to us,
                  information we obtain automatically when you use our services,
                  and information from third-party sources.
                </p>

                <h3>Personal Information You Provide</h3>
                <p>
                  We may collect the following types of personal information:
                </p>
                <ul>
                  <li>
                    <strong>Identity Information:</strong> Name, email address,
                    postal address, phone number, and other similar contact
                    data.
                  </li>
                  <li>
                    <strong>Account Information:</strong> Username, password,
                    account preferences, and profile information.
                  </li>
                  <li>
                    <strong>Financial Information:</strong> Payment details,
                    billing address, and other financial information when you
                    make a purchase or book a service.
                  </li>
                  <li>
                    <strong>Service Information:</strong> Details about the
                    services you request, including location, scheduling
                    preferences, and special instructions.
                  </li>
                  <li>
                    <strong>Communications:</strong> Information you provide
                    when you contact us, respond to surveys, or leave reviews.
                  </li>
                </ul>

                <h3>Information We Collect Automatically</h3>
                <p>When you use our services, we may automatically collect:</p>
                <ul>
                  <li>
                    <strong>Device Information:</strong> IP address, browser
                    type, operating system, device identifiers, and mobile
                    network information.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Pages visited, time spent on
                    pages, links clicked, and other actions taken on our
                    platform.
                  </li>
                  <li>
                    <strong>Location Information:</strong> General location
                    based on IP address or more precise location if you grant
                    permission.
                  </li>
                  <li>
                    <strong>Cookies and Similar Technologies:</strong>{" "}
                    Information collected through cookies, web beacons, and
                    similar technologies. See our Cookie Policy for more
                    details.
                  </li>
                </ul>

                <h3>Information from Third Parties</h3>
                <p>We may receive information about you from:</p>
                <ul>
                  <li>
                    <strong>Social Media:</strong> When you connect your social
                    media accounts to our services.
                  </li>
                  <li>
                    <strong>Service Providers:</strong> Third-party vendors who
                    provide services on our behalf.
                  </li>
                  <li>
                    <strong>Partners:</strong> Business partners with whom we
                    offer co-branded services or engage in joint marketing
                    activities.
                  </li>
                  <li>
                    <strong>Public Sources:</strong> Publicly available
                    information, such as social media profiles or public
                    records.
                  </li>
                </ul>
              </section>

              <Separator className="my-8" />

              <section id="how-we-use-information">
                <h2>How We Use Your Information</h2>
                <p>We use your information for various purposes, including:</p>
                <ul>
                  <li>Providing, maintaining, and improving our services</li>
                  <li>
                    Processing transactions and sending related information
                  </li>
                  <li>Connecting customers with service providers</li>
                  <li>Sending service notifications and updates</li>
                  <li>Responding to your comments, questions, and requests</li>
                  <li>Personalizing your experience and delivering content</li>
                  <li>Sending marketing communications about our services</li>
                  <li>
                    Monitoring and analyzing trends, usage, and activities
                  </li>
                  <li>
                    Detecting, preventing, and addressing fraud and security
                    issues
                  </li>
                  <li>
                    Complying with legal obligations and enforcing our terms
                  </li>
                </ul>
              </section>

              <Separator className="my-8" />

              <section id="information-sharing">
                <h2>Information Sharing and Disclosure</h2>
                <p>
                  We may share your information in the following circumstances:
                </p>

                <h3>With Service Providers</h3>
                <p>
                  When you book a service, we share relevant information with
                  the service provider to facilitate the service. This may
                  include your name, contact information, service location, and
                  special instructions.
                </p>

                <h3>With Third-Party Service Providers</h3>
                <p>
                  We may share your information with third-party vendors,
                  consultants, and other service providers who need access to
                  such information to carry out work on our behalf.
                </p>

                <h3>For Legal Reasons</h3>
                <p>
                  We may disclose your information if we believe it is necessary
                  to comply with a legal obligation, protect and defend our
                  rights or property, prevent fraud, or protect the safety of
                  our users or the public.
                </p>

                <h3>Business Transfers</h3>
                <p>
                  If we are involved in a merger, acquisition, financing, or
                  sale of all or a portion of our assets, your information may
                  be transferred as part of that transaction.
                </p>

                <h3>With Your Consent</h3>
                <p>
                  We may share your information with third parties when you have
                  given us your consent to do so.
                </p>

                <h3>Aggregated or De-identified Information</h3>
                <p>
                  We may share aggregated or de-identified information that
                  cannot reasonably be used to identify you.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="your-choices">
                <h2>Your Choices and Rights</h2>
                <p>
                  You have certain choices about how we use your information:
                </p>

                <h3>Account Information</h3>
                <p>
                  You can update your account information by logging into your
                  account. If you wish to deactivate your account, please
                  contact us, but note that we may retain certain information as
                  required by law or for legitimate business purposes.
                </p>

                <h3>Marketing Communications</h3>
                <p>
                  You can opt out of receiving promotional emails by following
                  the instructions in those emails. If you opt out, we may still
                  send you non-promotional communications, such as those about
                  your account or our ongoing business relations.
                </p>

                <h3>Cookies</h3>
                <p>
                  Most web browsers are set to accept cookies by default. If you
                  prefer, you can usually choose to set your browser to remove
                  or reject cookies. Please note that if you choose to remove or
                  reject cookies, this could affect the availability and
                  functionality of our services.
                </p>

                <h3>Your Rights</h3>
                <p>
                  Depending on your location, you may have certain rights
                  regarding your personal information, such as:
                </p>
                <ul>
                  <li>
                    The right to access personal information we hold about you
                  </li>
                  <li>
                    The right to request correction of inaccurate information
                  </li>
                  <li>The right to request deletion of your information</li>
                  <li>The right to object to processing of your information</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent</li>
                </ul>
                <p>
                  To exercise these rights, please contact us using the
                  information provided in the "Contact Us" section.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="data-security">
                <h2>Data Security</h2>
                <p>
                  We take reasonable measures to help protect your personal
                  information from loss, theft, misuse, unauthorized access,
                  disclosure, alteration, and destruction. However, no internet
                  or electronic transmission is ever fully secure or error-free.
                </p>
                <p>
                  We implement appropriate technical and organizational measures
                  to ensure a level of security appropriate to the risk,
                  including:
                </p>
                <ul>
                  <li>Encryption of sensitive information</li>
                  <li>Regular security assessments and testing</li>
                  <li>Access controls and authentication procedures</li>
                  <li>Regular backups and data recovery procedures</li>
                  <li>Employee training on data protection and security</li>
                </ul>
              </section>

              <Separator className="my-8" />

              <section id="international-transfers">
                <h2>International Data Transfers</h2>
                <p>
                  We are based in Bangladesh, and the information we collect is
                  governed by Bangladeshi law. If you are accessing our services
                  from outside Bangladesh, please be aware that your information
                  may be transferred to, stored, and processed in Bangladesh or
                  other countries where our servers are located.
                </p>
                <p>
                  By using our services, you consent to the transfer of your
                  information to Bangladesh and other countries which may have
                  different data protection rules than those of your country.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="children-privacy">
                <h2>Children's Privacy</h2>
                <p>
                  Our services are not intended for children under the age of
                  18. We do not knowingly collect personal information from
                  children under 18. If you are a parent or guardian and believe
                  that your child has provided us with personal information,
                  please contact us. If we become aware that we have collected
                  personal information from a child under 18 without
                  verification of parental consent, we will take steps to remove
                  that information from our servers.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="policy-changes">
                <h2>Changes to This Privacy Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. If we
                  make material changes, we will notify you by email or by
                  posting a notice on our website prior to the change becoming
                  effective. We encourage you to review this Privacy Policy
                  periodically for the latest information on our privacy
                  practices.
                </p>
                <p>
                  Your continued use of our services after any changes to this
                  Privacy Policy constitutes your acceptance of the updated
                  policy.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="contact-us">
                <h2>Contact Us</h2>
                <p>
                  If you have any questions, concerns, or requests regarding
                  this Privacy Policy or our privacy practices, please contact
                  us at:
                </p>
                <div className="bg-muted/50 p-4 rounded-lg my-4">
                  <p>
                    <strong>Fixify</strong>
                    <br />
                    456 Service Avenue, Gulshan
                    <br />
                    Dhaka, Bangladesh
                    <br />
                    Email: privacy@fixify.com
                    <br />
                    Phone: +880 123 456 789
                  </p>
                </div>
                <p>
                  We will respond to your request within a reasonable timeframe.
                </p>
              </section>
            </div>

            {/* Back to Top Button */}
            <div className="mt-12 text-center">
              <Button
                variant="outline"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                Back to Top
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
