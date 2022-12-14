import React from "react";

const Loading = () => {
  return (
    <section className="lg:pt-20">
      <div className="flex items-center justify-center my-20 md:my-36">
        <div className="w-24 h-24 border-l-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
    </section>
  );
};

export default Loading;
