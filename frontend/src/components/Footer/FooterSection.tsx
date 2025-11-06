// src/components/Footer/FooterSection.tsx
import React from "react";
import type { FooterLink } from "./types";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  links?: FooterLink[];
  children?: React.ReactNode;
};

export default function FooterSection({ title, links, children }: Props) {
  return (
    <div>
      <h4 className="text-xl font-bold mb-4">{title}</h4>
      {links ? (
        <ul className="space-y-2 text-gray-600">
          {links.map((link) =>
            link.href ? (
              <li key={link.label}>
                <Link to={link.href}>{link.label}</Link>
              </li>
            ) : (
              <li key={link.label}>{link.label}</li>
            )
          )}
        </ul>
      ) : (
        children
      )}
    </div>
  );
}
