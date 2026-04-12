const ReadingProgressBar = ({ value }) => {
  return (
    <div className="fixed top-0 left-0 z-[70] w-full h-[3px] bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-cyan-300 to-indigo-400 transition-[width] duration-150"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};

export default ReadingProgressBar;
