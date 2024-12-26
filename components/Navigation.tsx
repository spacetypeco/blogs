"use client";

import { Rotate as Hamburger } from "hamburger-react";

import Link from "next/link";
import { useState } from "react";

export default function Navigation() {
  const els = "Lynne's Blug".split("").map((c, idx) => {
    return (
      <div
        className="p-1 rounded-full"
        style={{
          transform: `translateY(${Math.random() * 10 - 5}px)`,
        }}
      >
        <h2>{c}</h2>
      </div>
    );
  });

  return (
    <Link href="/" className="color-scarlet-hover">
      <nav className="container w-full flex pt-12 t5">{els}</nav>
    </Link>
  );
}
