"use client";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";

export default function IconMotionTest() {
  const icons = [
    { icon: <FaGithub />, color: "text-gray-100" },
    { icon: <FaLinkedin />, color: "text-blue-500" },
    { icon: <FaTwitter />, color: "text-sky-400" },
  ];

  return (
    <div className="flex space-x-8 items-center justify-center mt-10">
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className={`text-4xl cursor-pointer ${item.color}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.2, type: "spring", stiffness: 120 }}
          whileHover={{ scale: 1.5, rotate: 10 }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );
}
