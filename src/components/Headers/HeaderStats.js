import React from "react";
import CardStats from "components/Cards/CardStats.js";

export default function HeaderStats({ stats, model }) {
  return (
    <>
      <div className="relative bg-lightBlue-400 pb-32 pt-20" style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop)",
      }}>
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            <h2 className="ml-5 text-white text-md uppercase hidden lg:inline-block font-semibold mb-4">{ model } Data :</h2>

            <div className="flex flex-wrap">
              {
                stats &&

                stats.map((stat, index) => (
                  <div className="w-full lg:w-6/12 xl:w-3/12 px-4" key={index}>
                    <CardStats stat={ stat } />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
