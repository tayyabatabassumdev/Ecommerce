import type { ReactNode } from "react";
interface CardProps {
  title?: string;
  children: ReactNode;
}
const Card = ({ title, children }: CardProps) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
      {children}
    </div>
  );
};
export default Card;
