"use client";
import { useState } from "react";
import Navbar from "./components/navbar";

export default function Anime() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Navbar />
      <div>
        <div>
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
