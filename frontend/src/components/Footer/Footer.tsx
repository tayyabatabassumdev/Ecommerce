// src/components/Footer/Footer.tsx
import  Button  from "../../components/ui/Button";
import FooterSection from "./FooterSection";
import type { FooterLink } from "./types";

export default function Footer() {
  const navLinks: FooterLink[] = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const helpLinks: FooterLink[] = [
    { label: "FAQs" },
    { label: "Privacy Policy" },
    { label: "Shipping" },
    { label: "Returns" },
  ];

  return (
    <footer className="bg-[#f9f7f3] py-10 px-6 md:px-10 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Branding */}
        <FooterSection title="Furnito">
          <p className="text-gray-600">
            Bringing comfort and elegance to your living space.
          </p>
        </FooterSection>

        {/* Navigation Links */}
        <FooterSection title="Links" links={navLinks} />

        {/* Help Links */}
        <FooterSection title="Help" links={helpLinks} />

        {/* Newsletter */}
        <FooterSection title="Newsletter">
          <input
            type="email"
            placeholder="Your email"
            className="border border-gray-300 px-4 py-2 rounded-lg w-full mb-3 focus:outline-none"
          />
          <Button className="bg-yellow-600 hover:bg-yellow-700 text-white w-full rounded-full">
            Subscribe
          </Button>
        </FooterSection>
      </div>

      <p className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} Furnito. All Rights Reserved.
      </p>
    </footer>
  );
}
