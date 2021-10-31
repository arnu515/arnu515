import React from "react";

const Index: React.FC = () => {
  return (
    <main className="grid place-items-center text-white bg-gray-900 min-h-screen">
      <section className="mx-auto w-[50%] max-w-[1100px] min-w-[350px] px-6 py-4">
        <div className="flex items-center justify-center m-4">
          <img src="/avatar.png" alt="Avatar" className="rounded-lg w-32 h-32" />
        </div>
        <h1 className="text-center text-5xl m-4 font-bold">arnu515.gq</h1>
        <p className="text-2xl text-center text-gray-500 m-4">
          New Website coming soon
        </p>
        <p className="text-center m-4">
          <a
            href="https://github.com/arnu515/arnu515/tree/dev"
            className="text-white bg-black border px-4 py-2 border-transparent rounded cursor-pointer hover:bg-[#212121]"
            style={{ transition: "all 500ms ease" }}
          >
            View code
          </a>
        </p>
      </section>
    </main>
  );
};

export default Index;
