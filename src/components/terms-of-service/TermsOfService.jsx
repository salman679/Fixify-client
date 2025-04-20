import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TableOfContents } from "../privacy/TableOfContents";

export default function TermsOfService() {
  // Last updated date
  const lastUpdated = "April 15, 2023";

  // Table of contents items
  const tocItems = [
    { id: "introduction", title: "Introduction" },
    { id: "eligibility", title: "Eligibility" },
    { id: "user-accounts", title: "User Accounts" },
    { id: "service-providers", title: "Service Providers" },
    { id: "booking-services", title: "Booking Services" },
    { id: "payments", title: "Payments and Fees" },
    { id: "cancellations", title: "Cancellations and Refunds" },
    { id: "prohibited-activities", title: "Prohibited Activities" },
    { id: "intellectual-property", title: "Intellectual Property" },
    { id: "disclaimer", title: "Disclaimer of Warranties" },
    { id: "limitation-liability", title: "Limitation of Liability" },
    { id: "indemnification", title: "Indemnification" },
    { id: "termination", title: "Termination" },
    { id: "governing-law", title: "Governing Law" },
    { id: "changes", title: "Changes to Terms" },
    { id: "contact", title: "Contact Information" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Terms of Service - Fixify</title>
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
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
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
                  Welcome to Fixify. These Terms of Service ("Terms") govern
                  your access to and use of the Fixify website, mobile
                  applications, and services (collectively, the "Services").
                  Please read these Terms carefully before using our Services.
                </p>
                <p>
                  By accessing or using our Services, you agree to be bound by
                  these Terms and our Privacy Policy. If you do not agree to
                  these Terms, you may not access or use the Services.
                </p>
                <p>
                  Fixify is a platform that connects customers seeking home
                  services with service providers who offer such services.
                  Fixify does not itself provide the services listed on the
                  platform but facilitates the connection between customers and
                  service providers.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="eligibility">
                <h2>Eligibility</h2>
                <p>
                  You must be at least 18 years old to use our Services. By
                  using our Services, you represent and warrant that you are at
                  least 18 years old and have the legal capacity to enter into
                  these Terms.
                </p>
                <p>
                  If you are using the Services on behalf of a business or other
                  entity, you represent and warrant that you have the authority
                  to bind that business or entity to these Terms.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="user-accounts">
                <h2>User Accounts</h2>
                <p>
                  To access certain features of our Services, you may need to
                  create an account. You are responsible for maintaining the
                  confidentiality of your account credentials and for all
                  activities that occur under your account.
                </p>
                <p>
                  You agree to provide accurate, current, and complete
                  information during the registration process and to update such
                  information to keep it accurate, current, and complete. We
                  reserve the right to suspend or terminate your account if any
                  information provided proves to be inaccurate, not current, or
                  incomplete.
                </p>
                <p>
                  You are responsible for all activities that occur under your
                  account. You agree to notify us immediately of any
                  unauthorized use of your account or any other breach of
                  security.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="service-providers">
                <h2>Service Providers</h2>
                <p>
                  Service providers on our platform are independent contractors
                  and not employees or agents of Fixify. Fixify does not
                  control, and is not responsible for, the services provided by
                  service providers.
                </p>
                <p>
                  Service providers are required to comply with all applicable
                  laws, regulations, and industry standards. However, Fixify
                  does not guarantee the quality, safety, or legality of
                  services offered by service providers.
                </p>
                <p>
                  While we strive to verify the identity and qualifications of
                  service providers, we do not guarantee the accuracy of any
                  information provided by service providers, including their
                  qualifications, experience, or availability.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="booking-services">
                <h2>Booking Services</h2>
                <p>
                  When you book a service through our platform, you are entering
                  into a contract directly with the service provider, not with
                  Fixify. Fixify acts as an intermediary to facilitate the
                  transaction.
                </p>
                <p>
                  You agree to provide accurate and complete information when
                  booking a service, including your contact information, service
                  location, and any special instructions or requirements.
                </p>
                <p>
                  You acknowledge that the availability of services is subject
                  to change and that service providers may need to reschedule or
                  cancel appointments due to unforeseen circumstances.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="payments">
                <h2>Payments and Fees</h2>
                <p>
                  All payments for services booked through our platform are
                  processed through our secure payment system. You agree to pay
                  all fees and charges associated with the services you book.
                </p>
                <p>
                  Service prices are set by individual service providers and may
                  vary based on factors such as complexity, duration, materials
                  required, and the service provider's expertise. All prices are
                  shown before you confirm your booking.
                </p>
                <p>
                  Fixify charges a service fee for facilitating the connection
                  between customers and service providers. This fee is included
                  in the total price shown at checkout.
                </p>
                <p>
                  You authorize us to charge the payment method you provide for
                  the services you book and any applicable fees. You agree to
                  maintain sufficient funds in your account or credit limit on
                  your card to cover all charges.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="cancellations">
                <h2>Cancellations and Refunds</h2>
                <p>
                  Cancellation policies may vary by service provider. The
                  applicable cancellation policy will be displayed before you
                  confirm your booking.
                </p>
                <p>
                  If you need to cancel a booking, you can do so through your
                  account dashboard. Cancellations made less than 24 hours
                  before the scheduled service may incur a cancellation fee.
                </p>
                <p>
                  Refunds are processed according to the applicable cancellation
                  policy and may take 5-10 business days to appear on your
                  account, depending on your payment method.
                </p>
                <p>
                  If a service provider cancels a booking, you will receive a
                  full refund of any amounts paid for that booking.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="prohibited-activities">
                <h2>Prohibited Activities</h2>
                <p>
                  You agree not to engage in any of the following prohibited
                  activities:
                </p>
                <ul>
                  <li>
                    Using our Services for any illegal purpose or in violation
                    of any local, state, national, or international law
                  </li>
                  <li>
                    Violating or infringing other people's intellectual
                    property, privacy, publicity, or other legal rights
                  </li>
                  <li>
                    Impersonating another person or entity, or falsifying or
                    deleting any author attributions or labels of the origin of
                    content
                  </li>
                  <li>
                    Interfering with or disrupting the Services or servers or
                    networks connected to the Services
                  </li>
                  <li>
                    Attempting to gain unauthorized access to any portion of the
                    Services or any other accounts, computer systems, or
                    networks connected to the Services
                  </li>
                  <li>
                    Using the Services to transmit any viruses, worms, defects,
                    Trojan horses, or other items of a destructive nature
                  </li>
                  <li>
                    Using the Services to develop, generate, transmit, or store
                    information that is defamatory, harmful, abusive, obscene,
                    or hateful
                  </li>
                  <li>
                    Collecting or harvesting any information from the Services,
                    including user accounts
                  </li>
                </ul>
              </section>

              <Separator className="my-8" />

              <section id="intellectual-property">
                <h2>Intellectual Property</h2>
                <p>
                  The Services and all content and materials included on the
                  Services, including text, graphics, logos, images, and
                  software, are the property of Fixify or its licensors and are
                  protected by copyright, trademark, and other intellectual
                  property laws.
                </p>
                <p>
                  You are granted a limited, non-exclusive, non-transferable,
                  and revocable license to access and use the Services for your
                  personal, non-commercial use. You may not reproduce,
                  distribute, modify, create derivative works of, publicly
                  display, publicly perform, republish, download, store, or
                  transmit any of the material on our Services without our prior
                  written consent.
                </p>
                <p>
                  Any feedback, comments, or suggestions you may provide
                  regarding the Services is entirely voluntary, and we will be
                  free to use such feedback, comments, or suggestions without
                  any obligation to you.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="disclaimer">
                <h2>Disclaimer of Warranties</h2>
                <p>
                  THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE"
                  BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                  IMPLIED. FIXIFY DISCLAIMS ALL WARRANTIES, INCLUDING, BUT NOT
                  LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR
                  A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p>
                  FIXIFY DOES NOT WARRANT THAT THE SERVICES WILL BE
                  UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED,
                  OR THAT THE SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE
                  ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
                </p>
                <p>
                  FIXIFY DOES NOT WARRANT OR MAKE ANY REPRESENTATIONS REGARDING
                  THE USE OR THE RESULTS OF THE USE OF THE SERVICES IN TERMS OF
                  THEIR CORRECTNESS, ACCURACY, RELIABILITY, OR OTHERWISE.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="limitation-liability">
                <h2>Limitation of Liability</h2>
                <p>
                  TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, FIXIFY
                  SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                  CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR
                  REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS
                  OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING
                  FROM:
                </p>
                <ul>
                  <li>
                    YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE
                    SERVICES
                  </li>
                  <li>
                    ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICES,
                    INCLUDING WITHOUT LIMITATION, ANY DEFAMATORY, OFFENSIVE, OR
                    ILLEGAL CONDUCT OF OTHER USERS OR THIRD PARTIES
                  </li>
                  <li>ANY CONTENT OBTAINED FROM THE SERVICES</li>
                  <li>
                    UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR
                    TRANSMISSIONS OR CONTENT
                  </li>
                </ul>
                <p>
                  IN NO EVENT SHALL FIXIFY'S AGGREGATE LIABILITY FOR ALL CLAIMS
                  RELATED TO THE SERVICES EXCEED THE GREATER OF ONE HUNDRED
                  DOLLARS ($100) OR THE AMOUNTS PAID BY YOU TO FIXIFY FOR THE
                  PAST SIX MONTHS FOR THE SERVICES AT ISSUE.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="indemnification">
                <h2>Indemnification</h2>
                <p>
                  You agree to defend, indemnify, and hold harmless Fixify, its
                  officers, directors, employees, and agents, from and against
                  any claims, liabilities, damages, losses, and expenses,
                  including, without limitation, reasonable legal and accounting
                  fees, arising out of or in any way connected with your access
                  to or use of the Services, your violation of these Terms, or
                  your violation of any rights of another.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="termination">
                <h2>Termination</h2>
                <p>
                  We may terminate or suspend your access to the Services
                  immediately, without prior notice or liability, for any reason
                  whatsoever, including without limitation if you breach these
                  Terms.
                </p>
                <p>
                  Upon termination, your right to use the Services will
                  immediately cease. If you wish to terminate your account, you
                  may simply discontinue using the Services or contact us to
                  request account deletion.
                </p>
                <p>
                  All provisions of these Terms which by their nature should
                  survive termination shall survive termination, including,
                  without limitation, ownership provisions, warranty
                  disclaimers, indemnity, and limitations of liability.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="governing-law">
                <h2>Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance
                  with the laws of Bangladesh, without regard to its conflict of
                  law provisions.
                </p>
                <p>
                  Any dispute arising from or relating to the subject matter of
                  these Terms shall be finally settled by arbitration in Dhaka,
                  Bangladesh, using the English language in accordance with the
                  Arbitration Rules and Procedures of Bangladesh.
                </p>
                <p>
                  Any judgment on the award rendered by the arbitrator may be
                  entered in any court of competent jurisdiction. You agree that
                  any arbitration under these Terms will take place on an
                  individual basis; class arbitrations and class actions are not
                  permitted.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="changes">
                <h2>Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material, we
                  will provide at least 30 days' notice prior to any new terms
                  taking effect. What constitutes a material change will be
                  determined at our sole discretion.
                </p>
                <p>
                  By continuing to access or use our Services after those
                  revisions become effective, you agree to be bound by the
                  revised terms. If you do not agree to the new terms, please
                  stop using the Services.
                </p>
              </section>

              <Separator className="my-8" />

              <section id="contact">
                <h2>Contact Information</h2>
                <p>
                  If you have any questions about these Terms, please contact us
                  at:
                </p>
                <div className="bg-muted/50 p-4 rounded-lg my-4">
                  <p>
                    <strong>Fixify</strong>
                    <br />
                    456 Service Avenue, Gulshan
                    <br />
                    Dhaka, Bangladesh
                    <br />
                    Email: legal@fixify.com
                    <br />
                    Phone: +880 123 456 789
                  </p>
                </div>
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
