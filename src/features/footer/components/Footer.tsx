import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F8F8F8]">
      <hr className="h-0.5 w-full border-0 bg-[#222222]"></hr>
      <div className="flex justify-center">
        <div className="flex w-5/6 flex-col gap-4 space-y-2 py-4 text-center text-neutral-900 md:w-3/6 md:justify-between md:space-y-0">
          <p className="text-sm font-light text-[#222222]">
            Powered by creativity and coffee.
          </p>
          <p className="text-sm font-light text-[#222222]">
            © Kevin Le 2023. All rights reserved.
          </p>
          <div className="mb-1 flex flex-row items-center justify-center space-x-2">
            <a
              href="https://github.com/kevinleaves"
              rel="noreferrer"
              target="_blank"
            >
              <GitHubIcon className="cursor-pointer transition-transform hover:-translate-y-1" />
            </a>
            <a
              href="https://www.linkedin.com/in/kevinleaves/"
              rel="noreferrer"
              target="_blank"
            >
              <LinkedInIcon className="cursor-pointer transition-transform hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
