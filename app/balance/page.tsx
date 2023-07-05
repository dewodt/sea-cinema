import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BalanceButtons from "@/components/BalanceButtons";
import type { Metadata } from "next";

const Balance = async () => {
  // Get session data, If not logged in, redirect to sign in
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
  }
  const username = session.username;

  // Get user's balance data (because session is valid, we can ensure that the user is exist)
  const { balance } = (await prisma.user.findUnique({
    where: { username: username },
    select: { balance: true },
  })) as { balance: number };

  // Get user's transaction data
  const transactions = await prisma.transaction.findMany({
    orderBy: { time: "desc" },
    where: { user: { username: username } },
  });

  return (
    <main className="flex flex-auto justify-center px-5 py-10 font-inter text-custom-white xl:py-16">
      <section className="flex flex-col items-center gap-7">
        {/* Title */}
        <h1 className="text-center text-2xl font-bold xl:text-3xl">
          My Balance:{" "}
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(balance)}
        </h1>

        {/* Withdraw or Top Up */}
        <div className="flex w-full max-w-xs flex-row items-center gap-5">
          <BalanceButtons />
        </div>

        {/* Tables */}
        <div className="w-[320px] overflow-x-auto sm:w-fit">
          <table className="table-auto border-collapse whitespace-nowrap border-2 border-custom-white text-center text-base xl:text-lg">
            {/* Table Header */}
            <tr>
              <th className="border-2 border-custom-white px-3 py-2 font-bold xl:px-4 xl:py-3">
                Transaction ID
              </th>
              <th className="border-2 border-custom-white px-3 py-2 font-bold xl:px-4 xl:py-3">
                Time
              </th>
              <th className="border-2 border-custom-white px-3 py-2 font-bold xl:px-4 xl:py-3">
                Amount
              </th>
            </tr>

            {/* Table Content */}
            {transactions.map((transaction) => {
              const id = transaction.id;
              const time = transaction.time;
              const amount = transaction.amount;
              const amountIDR = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(amount);
              return (
                <tr key={id}>
                  <td className="border-2 border-custom-white px-3 py-2 xl:px-4 xl:py-3">
                    {id}
                  </td>
                  <td className="border-2 border-custom-white px-3 py-2 xl:px-4 xl:py-3">
                    {new Date(time).toLocaleString("en-US", {
                      calendar: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                      timeZone: "Asia/Jakarta",
                    })}
                  </td>
                  <td
                    className={`border-2 border-custom-white px-3 py-2 xl:px-4 xl:py-3 ${
                      amount > 0 ? "text-custom-green" : "text-custom-light-red"
                    }`}
                  >
                    {amount > 0 ? `+${amountIDR}` : amountIDR}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </section>
    </main>
  );
};

export default Balance;

export const metadata: Metadata = {
  title: "Balance | SEA Cinema",
  description: "User's balance page SEA Cinema",
  generator: "Next.js",
  applicationName: "SEA Cinema",
  colorScheme: "dark",
  openGraph: {
    title: "Balance | SEA Cinema",
    description: "User's balance page SEA Cinema",
    url: "https://cinema.dewodt.com",
    siteName: "SEA Cinema",
    images: [
      {
        url: "https://cinema.dewodt.com/sea-cinema-link-preview.png",
        width: 1200,
        height: 630,
        alt: "SEA Cinema",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Balance | SEA Cinema",
    description: "User's balance page SEA Cinema",
    images: [
      {
        url: "https://cinema.dewodt.com/sea-cinema-link-preview.png",
        width: 1200,
        height: 630,
        alt: "SEA Cinema",
      },
    ],
  },
};
