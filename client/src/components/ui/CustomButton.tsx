import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface ButtonProps {
  text: string;
  className?: string;
}

const CustomButton: React.FC<ButtonProps> = ({ text, className = "" }) => {
  return (
    <motion.div
    whileHover={{ x: [0, -3, 3, -3, 3, 0] }} // Shake effect on hover
    whileTap={{ x: [0, -3, 3, -3, 3, 0] }} // Shake effect on tap
    transition={{ duration: 0.8  }} // Smooth transition
  >
    <button
      className={`bg-red-500 text-white font-bold py-2 px-5 rounded-full flex items-center gap-2 shadow-md hover:shadow-lg transition-all ${className}`}
    >
      {text}
     
        <ArrowRight size={20} />
    </button>
      </motion.div>
  );
};

export default CustomButton;
 