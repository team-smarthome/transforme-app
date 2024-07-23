function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full bg-boxdark-2 absolute">
        {/* <div className="flex h-screen items-center justify-center bg-boxdark-2"> */}
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-white dark:border-white border-t-transparent dark:border-t-bodydark2"></div>
    {/* </div> */}
    </div>
  );
}

export default LoadingSpinner;
