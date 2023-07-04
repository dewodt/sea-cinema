import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CancelBookButton from "@/components/CancelBookButton";

export const metadata = {
  title: "Tickets | SEA Cinema",
  description: "User's tickets page SEA Cinema",
};

const Tickets = async () => {
  // Get session data
  const session = await getServerSession(authOptions);
  // If not logged in, redirect to home
  if (!session) {
    redirect("/signin");
  }
  const userId = session.id;

  const tickets = await prisma.ticket.findMany({
    where: { userId: userId },
    orderBy: { dateTimeStart: "desc" },
    include: { movie: { select: { title: true } } },
  });

  return (
    <main className="flex flex-auto justify-center px-5 py-10 font-inter text-custom-white xl:py-16">
      <section className="flex flex-col items-center gap-7">
        {/* Title */}
        <h1 className="text-center text-2xl font-bold xl:text-3xl">
          My Tickets
        </h1>

        {/* Tables */}
        <div className="w-[90vw] overflow-x-auto sm:w-[85vw] lg:w-fit">
          <table className="table-auto border-collapse whitespace-nowrap border-2 border-custom-white text-center text-base text-custom-white xl:text-lg">
            {/* Table Header */}
            <tr>
              <th className="border-2 border-custom-white px-3 py-2 font-bold xl:px-4 xl:py-3">
                Ticket ID
              </th>
              <th className="border-2 border-custom-white px-3 py-2 font-bold xl:px-4 xl:py-3">
                Time Start
              </th>
              <th className="border-2 border-custom-white px-3 py-2 font-bold xl:px-4 xl:py-3">
                Seat
              </th>
              <th className="border-2 border-custom-white px-3 py-2 font-bold xl:px-4 xl:py-3">
                Movie Title
              </th>
              <th className="border-2 border-custom-white px-3 py-2 font-bold xl:px-4 xl:py-3">
                Detail
              </th>
            </tr>

            {/* Table Content */}
            {tickets.map((ticket) => {
              return (
                <tr key={ticket.id}>
                  <td className="border-2 border-custom-white px-3 py-2 xl:px-4 xl:py-3">
                    {ticket.id}
                  </td>
                  <td className="border-2 border-custom-white px-3 py-2 xl:px-4 xl:py-3">
                    {ticket.dateTimeStart.toLocaleString("en-US", {
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
                  <td className="border-2 border-custom-white px-3 py-2 xl:px-4 xl:py-3">
                    {ticket.seatNumber}
                  </td>
                  <td className="border-2 border-custom-white px-3 py-2 xl:px-4 xl:py-3">
                    {ticket.movie.title}
                  </td>
                  <td className="border-2 border-custom-white px-3 py-2 xl:px-4 xl:py-3">
                    {Date.now() < ticket.dateTimeStart.getTime() ? (
                      // Client component to handle disable while loading.
                      <CancelBookButton
                        id={ticket.id}
                        date={ticket.dateTimeStart}
                        seat={ticket.seatNumber}
                        title={ticket.movie.title}
                      />
                    ) : (
                      "Expired"
                    )}
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

export default Tickets;
