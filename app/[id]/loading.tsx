const Loading = () => {
  return (
    <main className="flex flex-auto items-center justify-center">
      <div className="flex flex-row items-center gap-4">
        {/* Spinning stuff */}
        <div className="h-7 w-7 animate-spin rounded-full border-4 border-t-4 border-custom-dark-gray border-t-custom-light-red xl:h-8 xl:w-8" />

        {/* Text */}
        <h1 className="font-inter text-xl font-bold text-custom-white xl:text-2xl">
          Loading...
        </h1>
      </div>
    </main>
  );
};

export default Loading;
