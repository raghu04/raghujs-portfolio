import Link from "next/link";
import React, { FC } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

interface SocialProps {
  containerStyles: string;
  iconStyles: string;
}

const socials = [
  { icon: <FaGithub />, path: "https://github.com/raghu04", label: "GitHub" },
  { icon: <FaLinkedinIn />, path: "https://www.linkedin.com/in/raghujs", label: "LinkedIn" },
];

const Social: FC<SocialProps> = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map(({ path, icon, label }, index) => (
        <Link
          href={path}
          key={index}
          target="_blank"
          className={iconStyles}
          aria-label={label}
          rel="noopener noreferrer"
        >
          {icon}
        </Link>
      ))}
    </div>
  );
};

export default Social;
