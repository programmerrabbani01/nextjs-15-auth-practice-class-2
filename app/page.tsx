import { nextAuthOptions } from "@/helpers/nextAuthOptions.ts";
import { getServerSession } from "next-auth";

export default async function Home() {
  const data = await getServerSession(nextAuthOptions);

  console.log(data);

  return <>Hello</>;
}
