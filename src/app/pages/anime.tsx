"use client";
import { useState } from "react";

export default function Anime() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`w-full h-screen`}>
      <div  className="w-full h-screen">
        <div className="bg-[#2f2f2f]">
          <button onClick={() => setOpen(!open)} className="">
            Genre{" "}
            <span
              className={`px-2 ${
                open ? "transform rotate-90" : "transform -rotate-90"
              }`}>
              &gt;
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
