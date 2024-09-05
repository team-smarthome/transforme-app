const Loader = ({width, height}) => {
  return (
    <div className="flex h-screen items-center justify-center bg-boxdark-2 ">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-white dark:border-white border-t-transparent dark:border-t-bodydark2"></div>
    </div>
  );
};

export default Loader;
