import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CheckCircle, Users, Clock, Wrench, Shield } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutUs() {
  // Company stats
  const stats = [
    { label: "Years of Experience", value: "5+" },
    { label: "Satisfied Customers", value: "10,000+" },
    { label: "Service Providers", value: "500+" },
    { label: "Cities Covered", value: "15+" },
  ];

  // Team members
  const team = [
    {
      name: "Md Salman Izhar",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      bio: "With over 10 years of experience in the service industry, Salman founded Fixify to connect skilled professionals with customers in need.",
    },
    {
      name: "Fatima Rahman",
      role: "Operations Director",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      bio: "Fatima oversees all service operations, ensuring quality standards are maintained across our platform.",
    },
    {
      name: "Ahmed Khan",
      role: "Technical Lead",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      bio: "Ahmed leads our technical team, developing innovative solutions to connect service providers with customers seamlessly.",
    },
    {
      name: "Nadia Islam",
      role: "Customer Success Manager",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
      bio: "Nadia ensures that every customer has an exceptional experience with our platform and service providers.",
    },
  ];

  // Core values
  const values = [
    {
      icon: Shield,
      title: "Trust & Reliability",
      description:
        "We verify all service providers and ensure they meet our high standards of professionalism and expertise.",
    },
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description:
        "Every service comes with a satisfaction guarantee, ensuring you receive the highest quality work.",
    },
    {
      icon: Clock,
      title: "Timeliness",
      description:
        "We respect your time and ensure our service providers arrive promptly for scheduled appointments.",
    },
    {
      icon: Wrench,
      title: "Expertise",
      description:
        "Our network consists of skilled professionals with years of experience in their respective fields.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>About Us - Fixify</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold sm:text-5xl mb-6">About Fixify</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connecting you with trusted professionals for all your home service
            needs since 2019.
          </p>
        </motion.div>

        {/* Our Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-12 items-center mb-24"
        >
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Fixify was founded in 2019 with a simple mission: to make home
                services accessible, reliable, and hassle-free for everyone.
                What started as a small platform connecting local handymen with
                homeowners has grown into Bangladesh&#39;s leading home services
                marketplace.
              </p>
              <p>
                Our founder, Md Salman Izhar, experienced firsthand the
                challenges of finding reliable service providers for home
                repairs. This frustration led to the creation of Fixify – a
                platform that vets and verifies professionals before connecting
                them with customers.
              </p>
              <p>
                Today, we serve thousands of customers across Bangladesh,
                providing a wide range of services from plumbing and electrical
                work to cleaning and landscaping. Our commitment to quality,
                reliability, and customer satisfaction remains at the heart of
                everything we do.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/5 rounded-xl -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Fixify team meeting"
              className="rounded-lg shadow-lg"
            />
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="py-16 bg-primary/5 rounded-2xl mb-24"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Our Impact</h2>
              <p className="text-muted-foreground mt-4">
                The numbers speak for themselves
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Core Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at Fixify
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Card className="h-full dark:bg-gray-800">
                  <CardContent className="pt-6">
                    <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The passionate people behind Fixify&#39;s success
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <Card className="h-full dark:bg-gray-800">
                  <CardContent className="pt-6 text-center">
                    <Avatar className="h-24 w-24 mx-auto mb-4 border-2 border-primary/20">
                      <AvatarImage
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                      />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary text-sm mb-4">{member.role}</p>
                    <p className="text-muted-foreground text-sm">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Join Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center bg-primary/5 py-16 rounded-2xl"
        >
          <div className="max-w-3xl mx-auto px-4">
            <Users className="h-12 w-12 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-muted-foreground mb-8">
              Whether you&#39;re a skilled professional looking to offer your
              services or a customer in need of quality home services, Fixify is
              here to connect you with the right people.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth/signup"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Sign Up Today
              </a>
              <a
                href="/services"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Browse Services
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
