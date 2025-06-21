import CardSettings from "components/Cards/CardSettings";
import React from "react";

export default function CardProfile() {
  return (
    <>
      <div>
        <div className="relative bg-lightBlue-400 pb-32 pt-20" style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1493397212122-2b85dda8106b?auto=format&fit=crop)",
        }}></div>

        <div className="flex flex-wrap justify-center">
          <div className="mb-12 -mt-24 flex justify-center">
            <CardSettings />
          </div>
        </div>
      </div>
    </>
  );
}