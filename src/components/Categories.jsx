import React from "react";
import { motion } from "framer-motion";

const categories = [
  {
    img: "/software.jpg",
    title: "Software Development",
    description: "Explore jobs in software development",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    img: "/dataScience.jpg",
    title: "Data Science",
    description: "Find jobs in data science",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    img: "/security.jpg",
    title: "Cybersecurity",
    description: "Discover jobs in cybersecurity",
    gradient: "from-red-500 to-orange-500",
  },
  {
    img: "/it.jpg",
    title: "IT Support",
    description: "Explore jobs in IT support",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    img: "/webdev.jpg",
    title: "Web Development",
    description: "Explore jobs in web development",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    img: "/aiml.jpg",
    title: "AI & Machine Learning",
    description: "Explore jobs in AI and Machine Learning",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    img: "/devops.jpg",
    title: "DevOps",
    description: "Discover jobs in DevOps",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    img: "/cloud.jpg",
    title: "Cloud Computing",
    description: "Explore jobs in cloud computing",
    gradient: "from-sky-500 to-blue-500",
  },
];

const Categories = () => {
  return (
    <section className="py-10 bg-gray-900">
      <div className="mx-auto px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4 uppercase">
            Job Categories
          </h2>
          <p className="text-gray-400 text-lg">
            Find the perfect role that matches your expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-gray-800 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={category.img}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                ></div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-400 text-sm">{category.description}</p>
              </div>

              {/* Hover Effect Border */}
              <div
                className={`absolute inset-0 border-2 border-transparent group-hover:border-blue-500/30 rounded-xl transition-all duration-300 pointer-events-none`}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
