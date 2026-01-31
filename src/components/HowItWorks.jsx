import React from "react";
import { motion } from "framer-motion";
import { FiUserPlus } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";

const steps = [
  {
    icon: FiUserPlus,
    title: "Create an Account",
    description:
      "Sign up by providing your details, set up your profile, and get started with job hunting or posting your opportunities.",
    color: "blue",
  },
  {
    icon: FaTasks,
    title: "Find or Post Jobs",
    description:
      "Explore job listings that match your skills or post job openings. Use our tools to manage and streamline your job search or hiring process.",
    color: "purple",
  },
  {
    icon: AiFillLike,
    title: "Apply or Hire",
    description:
      "Easily apply for jobs or find the right candidates. Our platform simplifies the application and hiring process.",
    color: "green",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-10 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4 uppercase">
            How It Works
          </h2>
          <p className="text-gray-400 text-lg">
            Get started in three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Connector Line (except for last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
                )}

                <div className="relative bg-gray-800 border border-gray-700 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div
                        className={`absolute inset-0 bg-${step.color}-500/20 blur-xl rounded-full`}
                      ></div>
                      <div className="relative bg-gradient-to-br from-blue-500 to-cyan-500 p-4 rounded-full">
                        <Icon className="text-white text-3xl" />
                      </div>
                    </div>
                  </div>

                  {/* Step Number */}
                  <div className="absolute top-4 right-4 text-6xl font-bold text-gray-700/20">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-3">
                    <h3 className="text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
