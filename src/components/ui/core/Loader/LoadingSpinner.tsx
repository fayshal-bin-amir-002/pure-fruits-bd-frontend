const LoadingSpinner = () => {
  return (
    <div className="h-[50vh] md:h-[60vh] flex items-center justify-center">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#27d15e] border-t-transparent"
        role="status"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
