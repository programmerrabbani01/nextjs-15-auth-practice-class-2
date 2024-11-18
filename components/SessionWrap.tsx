"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";

export default function SessionWrap({ children }) {
  return (
    <>
      {/* for handel useSession control */}
      <SessionProvider>{children}</SessionProvider>
    </>
  );
}
