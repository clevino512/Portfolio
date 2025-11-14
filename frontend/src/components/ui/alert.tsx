

export const Alert = ({ children, type = "info", className = "" }) => {
  const types = {
    info: "bg-blue-50 border-blue-400 text-blue-700",
    success: "bg-green-50 border-green-400 text-green-700",
    warning: "bg-yellow-50 border-yellow-400 text-yellow-700",
    error: "bg-red-50 border-red-400 text-red-700",
  };

  return (
    <div
      className={`border-l-4 p-4 rounded-lg shadow-sm ${types[type]} ${className}`}
      role="alert"
    >
      {children}
    </div>
  );
};

export const AlertTitle = ({ children }) => (
  <h4 className="font-semibold mb-1">{children}</h4>
);

export const AlertDescription = ({ children }) => (
  <p className="text-sm leading-relaxed">{children}</p>
);
