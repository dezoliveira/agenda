'use client'

import Image from "next/image";
import { auth } from "./lib/firebaseAuth";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log(auth)
  })

  return (
    <div className="container">
      <h1>Hello World</h1>
    </div>
  );
}
