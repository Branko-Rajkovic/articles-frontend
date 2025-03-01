function Error() {
  return (
    <div className="flex flex-col items-center h-screen bg-slate-500">
      <img
        src="/images/error.png"
        alt="error-image"
        className="m-8 border-2 rounded-full w-96"
      />
      <p className="m-8 text-4xl text-slate-100">
        <span>💥</span> Something went wrong!
      </p>
    </div>
  );
}

export default Error;
