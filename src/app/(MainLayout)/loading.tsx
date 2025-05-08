const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen flex-col">
      <div className="w-12 h-12 border-4 border-[#0AA5CD] border-t-transparent rounded-full animate-spin mb-4"></div>
      <h1 className="text-lg font-semibold text-gray-600">Loading...</h1>
    </div>
  );
};

export default Loading;
