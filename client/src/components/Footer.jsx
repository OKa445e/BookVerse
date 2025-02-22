import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-800 text-white py-4 px-6 text-center mt-auto">
      <h1 className="text-lg font-semibold mb-2">
        &copy; 2025, Made by <span className="text-blue-400">Atharv Sinha</span>
      </h1>

      <div className="flex justify-center gap-5 text-xl">
        <a
          href="https://www.linkedin.com/in/atharv-sinha"
          className="hover:text-blue-400 transition duration-300"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/OKa445e"
          className="hover:text-gray-400 transition duration-300"
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
