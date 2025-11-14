
export const Input = React.forwardRef(({ className = "", ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg px-4 py-2 w-full outline-none transition duration-200 ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";
