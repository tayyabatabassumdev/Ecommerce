import { motion } from "framer-motion";

interface OverlayProps {
  onClose: () => void;
}

export default function Overlay({ onClose }: OverlayProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-90"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    />
  );
}
