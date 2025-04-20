"use client";

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Clock,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("contact");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  // FAQ data
  const faqs = [
    {
      question: "How do I book a service?",
      answer:
        "Booking a service is easy! Simply browse our services, select the one you need, choose your preferred date and time, and confirm your booking. You'll receive a confirmation email with all the details.",
    },
    {
      question: "Are your service providers verified?",
      answer:
        "Yes, all service providers on Fixify undergo a thorough verification process. We check their identity, qualifications, experience, and conduct background checks to ensure they meet our high standards.",
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer:
        "Customer satisfaction is our priority. If you're not completely satisfied with a service, please contact us within 48 hours, and we'll work to resolve the issue, which may include sending another professional or offering a refund.",
    },
    {
      question: "Can I reschedule or cancel my booking?",
      answer:
        "Yes, you can reschedule or cancel your booking through your account dashboard. Please note that cancellations made less than 24 hours before the scheduled service may incur a cancellation fee.",
    },
    {
      question: "How are service prices determined?",
      answer:
        "Service prices are set by individual service providers based on factors like complexity, duration, materials required, and their expertise. All prices are transparent and shown before you confirm your booking.",
    },
    {
      question: "Do you offer emergency services?",
      answer:
        "Yes, we offer emergency services for critical issues like plumbing leaks, electrical problems, and lockouts. Look for the 'Emergency Service' tag when browsing services.",
    },
  ];

  // Office locations
  const offices = [
    {
      city: "Dhaka",
      address: "456 Service Avenue, Gulshan, Dhaka",
      phone: "+880 123 456 789",
      email: "dhaka@fixify.com",
      hours: "Mon-Fri: 9AM-6PM",
    },
    {
      city: "Chittagong",
      address: "78 Port Road, Agrabad, Chittagong",
      phone: "+880 123 456 790",
      email: "chittagong@fixify.com",
      hours: "Mon-Fri: 9AM-6PM",
    },
    {
      city: "Sylhet",
      address: "25 Tea Garden Lane, Sylhet",
      phone: "+880 123 456 791",
      email: "sylhet@fixify.com",
      hours: "Mon-Fri: 9AM-6PM",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Contact Us - Fixify</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold sm:text-5xl mb-6">Get In Touch</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions or need assistance? We&apos;re here to help you with
            anything you need.
          </p>
        </motion.div>

        {/* Tabs for Contact Form, FAQs, and Locations */}
        <Tabs
          defaultValue="contact"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-24"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="contact">Contact Us</TabsTrigger>
              <TabsTrigger value="faq">FAQs</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
            </TabsList>
          </div>

          {/* Contact Form Tab */}
          <TabsContent value="contact">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              <div className="md:col-span-1">
                <div className="space-y-6">
                  <Card>
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">Email Us</h3>
                        <p className="text-muted-foreground mb-2">
                          We&apos;ll respond within 24 hours
                        </p>
                        <a
                          href="mailto:support@fixify.com"
                          className="text-primary hover:underline"
                        >
                          support@fixify.com
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">Call Us</h3>
                        <p className="text-muted-foreground mb-2">
                          Mon-Fri from 8am to 5pm
                        </p>
                        <a
                          href="tel:+8801234567890"
                          className="text-primary hover:underline"
                        >
                          +880 123 456 789
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="flex items-start gap-4 p-6">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-lg mb-1">Visit Us</h3>
                        <p className="text-muted-foreground mb-2">
                          Our headquarters
                        </p>
                        <address className="not-italic text-primary">
                          456 Service Avenue, Dhaka
                        </address>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="md:col-span-2"
              >
                <Card>
                  <CardContent className="p-6">
                    {isSubmitted ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                        <h3 className="text-2xl font-bold mb-2">
                          Message Sent!
                        </h3>
                        <p className="text-muted-foreground max-w-md">
                          Thank you for reaching out. We&apos;ll have received
                          your message and will get back to you shortly.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name</Label>
                          <Input id="name" placeholder="Your Name" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Your Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Your Email"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Inquiry Type</Label>
                          <RadioGroup
                            defaultValue="general"
                            className="flex flex-wrap gap-6"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="general" id="general" />
                              <Label
                                htmlFor="general"
                                className="cursor-pointer"
                              >
                                General Inquiry
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="support" id="support" />
                              <Label
                                htmlFor="support"
                                className="cursor-pointer"
                              >
                                Technical Support
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="billing" id="billing" />
                              <Label
                                htmlFor="billing"
                                className="cursor-pointer"
                              >
                                Billing Question
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="feedback" id="feedback" />
                              <Label
                                htmlFor="feedback"
                                className="cursor-pointer"
                              >
                                Feedback
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Your Message"
                            rows={5}
                            required
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <span className="mr-2">Sending...</span>
                              <Send className="h-4 w-4 animate-pulse" />
                            </>
                          ) : (
                            <>
                              <span className="mr-2">Send Message</span>
                              <Send className="h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* FAQs Tab */}
          <TabsContent value="faq">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="border-0 shadow-lg dark:bg-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-8">
                    <div className="bg-primary/10 p-4 rounded-full">
                      <MessageSquare className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-center mb-8">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {faqs.map((faq, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b pb-6 last:border-0 last:pb-0"
                      >
                        <h3 className="text-lg font-semibold mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-muted-foreground">{faq.answer}</p>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-8 text-center">
                    <p className="text-muted-foreground mb-4">
                      Still have questions?
                    </p>
                    <Button onClick={() => setActiveTab("contact")}>
                      Contact Our Support Team
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Locations Tab */}
          <TabsContent value="locations">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto"
            >
              <div className="grid md:grid-cols-3 gap-6">
                {offices.map((office, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Card className="h-full dark:bg-gray-800">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-4">
                          {office.city} Office
                        </h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                            <span>{office.address}</span>
                          </div>
                          <div className="flex items-start">
                            <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                            <a
                              href={`tel:${office.phone}`}
                              className="hover:text-primary"
                            >
                              {office.phone}
                            </a>
                          </div>
                          <div className="flex items-start">
                            <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                            <a
                              href={`mailto:${office.email}`}
                              className="hover:text-primary"
                            >
                              {office.email}
                            </a>
                          </div>
                          <div className="flex items-start">
                            <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                            <span>{office.hours}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Map Section */}
              <div className="mt-12">
                <Card className="overflow-hidden border-0 shadow-lg dark:bg-gray-800">
                  <CardContent className="p-0">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38703692693!2d90.27923991057358!3d23.780863188726198!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1651825200000!5m2!1sen!2sbd"
                      width="100%"
                      height="450"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Fixify Office Locations"
                    ></iframe>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center bg-primary/5 py-16 rounded-2xl"
        >
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-8">
              Whether you need a service or have more questions, our team is
              ready to assist you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/services">Browse Services</a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setActiveTab("contact")}
              >
                Contact Support
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
