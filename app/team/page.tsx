"use client";

import { useSession } from "next-auth/react";
import React from "react";

export default function Team() {
  const { data } = useSession();

  console.log(data);

  return <div>page</div>;
}
