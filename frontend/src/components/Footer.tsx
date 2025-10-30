// src/components/Footer.tsx
import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="bg-[#f9f7f3] py-10 px-6 md:px-10 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-xl font-bold mb-4">Furnito</h4>
          <p className="text-gray-600">
            Bringing comfort and elegance to your living space.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Links</h4>
          <ul className="space-y-2 text-gray-600">
            <li>Home</li>
            <li>Shop</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Help</h4>
          <ul className="space-y-2 text-gray-600">
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Shipping</li>
            <li>Returns</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Newsletter</h4>
          <input
            type="email"
            placeholder="Your email"
            className="border border-gray-300 px-4 py-2 rounded-lg w-full mb-3 focus:outline-none"
          />
          <Button className="bg-yellow-600 hover:bg-yellow-700 text-white w-full rounded-full">
            Subscribe
          </Button>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-8">
        © {new Date().getFullYear()} Furnito. All Rights Reserved.
      </p>
    </footer>
  );
}
