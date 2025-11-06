interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function Button({ children, loading, ...props }: ButtonProps) {
  return (
    <button
      className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
      {...props}
    >
      {loading ? "Processing..." : children}
    </button>
  );
}
