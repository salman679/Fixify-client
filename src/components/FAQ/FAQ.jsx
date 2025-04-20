import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Search, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");

  // FAQ categories and questions
  const faqCategories = [
    {
      id: "general",
      name: "General",
      questions: [
        {
          id: "what-is-fixify",
          question: "What is Fixify?",
          answer:
            "Fixify is a service marketplace platform that connects customers with verified service providers for various home services, repairs, and maintenance needs. Our platform makes it easy to find, book, and manage services all in one place.",
        },
        {
          id: "how-to-use",
          question: "How do I use Fixify?",
          answer:
            "Using Fixify is simple! Browse through our available services, select the one you need, choose your preferred date and time, and book your appointment. You can track the status of your booking, communicate with service providers, and leave reviews after the service is completed.",
        },
        {
          id: "service-areas",
          question: "Where is Fixify available?",
          answer:
            "Fixify is currently available in major cities across Bangladesh, including Dhaka, Chittagong, Sylhet, and surrounding areas. We're continuously expanding to new locations to serve more customers.",
        },
        {
          id: "customer-support",
          question: "How can I contact customer support?",
          answer:
            "You can reach our customer support team through multiple channels: email at support@fixify.com, phone at +880 123 456 789, or through the contact form on our website. Our support team is available Monday through Friday, 9 AM to 6 PM.",
        },
      ],
    },
    {
      id: "booking",
      name: "Booking & Services",
      questions: [
        {
          id: "book-service",
          question: "How do I book a service?",
          answer:
            "To book a service, browse our service categories or search for a specific service. Select the service you need, choose your preferred date and time, provide any special instructions, and confirm your booking. You'll receive a confirmation email with all the details.",
        },
        {
          id: "cancel-reschedule",
          question: "Can I cancel or reschedule my booking?",
          answer:
            "Yes, you can cancel or reschedule your booking through your account dashboard. Please note that cancellations made less than 24 hours before the scheduled service may incur a cancellation fee. To reschedule, simply select a new date and time that works for you.",
        },
        {
          id: "service-not-listed",
          question: "What if the service I need isn't listed?",
          answer:
            "If you can't find the specific service you need, please contact our customer support team. We'll do our best to connect you with a suitable service provider or add the service to our platform if there's sufficient demand.",
        },
        {
          id: "emergency-services",
          question: "Do you offer emergency services?",
          answer:
            "Yes, we offer emergency services for critical issues like plumbing leaks, electrical problems, and lockouts. Look for the 'Emergency Service' tag when browsing services. Emergency services typically have a faster response time but may come with additional charges.",
        },
      ],
    },
    {
      id: "providers",
      name: "Service Providers",
      questions: [
        {
          id: "provider-verification",
          question: "How are service providers verified?",
          answer:
            "All service providers on Fixify undergo a thorough verification process. We check their identity, qualifications, experience, and conduct background checks. We also collect and verify business documentation and insurance information where applicable.",
        },
        {
          id: "become-provider",
          question: "How can I become a service provider on Fixify?",
          answer:
            "To become a service provider on Fixify, create an account, complete your profile with all required information, submit necessary documentation for verification, and list your services. Our team will review your application and contact you once approved.",
        },
        {
          id: "provider-ratings",
          question: "How does the rating system work?",
          answer:
            "After each completed service, customers can rate their experience on a scale of 1 to 5 stars and leave a review. These ratings help maintain quality standards and allow other customers to make informed decisions when choosing service providers.",
        },
        {
          id: "provider-fees",
          question: "What fees do service providers pay?",
          answer:
            "Service providers pay a small commission fee on each completed booking. The exact fee structure is available in the service provider agreement. There are no upfront costs or monthly fees to join the platform.",
        },
      ],
    },
    {
      id: "payment",
      name: "Payments & Pricing",
      questions: [
        {
          id: "payment-methods",
          question: "What payment methods do you accept?",
          answer:
            "We accept various payment methods including credit/debit cards, mobile banking (bKash, Nagad), and bank transfers. All payments are processed securely through our platform to protect your financial information.",
        },
        {
          id: "service-pricing",
          question: "How is service pricing determined?",
          answer:
            "Service prices are set by individual service providers based on factors like complexity, duration, materials required, and their expertise. All prices are transparent and shown before you confirm your booking.",
        },
        {
          id: "additional-charges",
          question: "Are there any additional charges?",
          answer:
            "The price shown for each service includes the basic service fee. Additional charges may apply for extra work, parts, or materials required to complete the service. Any potential additional charges will be communicated to you before work begins.",
        },
        {
          id: "refund-policy",
          question: "What is your refund policy?",
          answer:
            "If you're not satisfied with a service, please contact us within 48 hours of service completion. We'll investigate the issue and may offer a partial or full refund, or arrange for the service to be redone, depending on the circumstances.",
        },
      ],
    },
    {
      id: "account",
      name: "Account & Profile",
      questions: [
        {
          id: "create-account",
          question: "How do I create an account?",
          answer:
            "To create an account, click on the 'Sign Up' button in the top right corner of the website. You can sign up using your email address or through your Google account. Fill in the required information and you're ready to start using Fixify!",
        },
        {
          id: "forgot-password",
          question: "I forgot my password. How can I reset it?",
          answer:
            "If you forgot your password, click on the 'Login' button, then select 'Forgot password?' Enter your email address, and we'll send you a link to reset your password. Follow the instructions in the email to create a new password.",
        },
        {
          id: "update-profile",
          question: "How do I update my profile information?",
          answer:
            "To update your profile information, log in to your account, click on your profile picture in the top right corner, and select 'Profile'. From there, you can edit your personal information, change your profile picture, and update your contact details.",
        },
        {
          id: "delete-account",
          question: "Can I delete my account?",
          answer:
            "Yes, you can delete your account by contacting our customer support team. Please note that deleting your account will permanently remove all your data from our system, including booking history and reviews.",
        },
      ],
    },
  ];

  // Filter questions based on search query
  const filteredFAQs = searchQuery
    ? faqCategories
        .map((category) => ({
          ...category,
          questions: category.questions.filter(
            (q) =>
              q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              q.answer.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((category) => category.questions.length > 0)
    : faqCategories;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Frequently Asked Questions - Fixify</title>
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
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about Fixify and our services
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setSearchQuery("")}
              >
                Clear
              </Button>
            )}
          </div>
        </motion.div>

        {/* FAQ Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {searchQuery ? (
            // Search Results
            <div>
              <h2 className="text-xl font-semibold mb-6">
                {filteredFAQs.reduce(
                  (total, category) => total + category.questions.length,
                  0
                )}{" "}
                results for "{searchQuery}"
              </h2>
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((category) => (
                  <div key={category.id} className="mb-8">
                    <h3 className="text-lg font-medium mb-4">
                      {category.name}
                    </h3>
                    <Accordion type="single" collapsible className="space-y-4">
                      {category.questions.map((faq) => (
                        <AccordionItem
                          key={faq.id}
                          value={faq.id}
                          className="border rounded-lg p-1"
                        >
                          <AccordionTrigger className="px-4 py-2 hover:no-underline">
                            <span className="text-left font-medium">
                              {faq.question}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No results found for your search.
                  </p>
                  <Button onClick={() => setSearchQuery("")}>
                    View All FAQs
                  </Button>
                </div>
              )}
            </div>
          ) : (
            // Categorized FAQs
            <Tabs defaultValue={faqCategories[0].id}>
              <TabsList className="w-full flex flex-wrap justify-start mb-8 h-auto">
                {faqCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="mb-2"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {faqCategories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border rounded-lg p-1"
                      >
                        <AccordionTrigger className="px-4 py-2 hover:no-underline">
                          <span className="text-left font-medium">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 pt-2 text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </motion.div>

        {/* Still Have Questions Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center bg-primary/5 py-12 px-6 rounded-2xl"
        >
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            If you couldn't find the answer to your question, our support team
            is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <a href="/contact">Contact Support</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:support@fixify.com">Email Us</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
