import Button from "@/components/Button";
import TicketsPopUp from "@/components/TicketsPopUp";

export const metadata = {
  title: "Tickets | SEA Cinema",
  description: "User's tickets page SEA Cinema",
};

const Tickets = async () => {
  // Test data
  const tickets = [
    {
      id: "123456789012345",
      time: "2023-08-01T03:53:36.000Z",
      seatnumber: 1,
      moviename: "The Matrix",
    },
    {
      id: "234567890123456",
      time: "2023-07-01T03:53:37.000Z",
      seatnumber: 2,
      moviename: "The Lion King",
    },
    {
      id: "345678901234567",
      time: "2023-07-01T03:53:38.000Z",
      seatnumber: 3,
      moviename: "The Godfather",
    },
    {
      id: "456789012345678",
      time: "2023-07-01T03:53:39.000Z",
      seatnumber: 4,
      moviename: "The Shawshank Redemption",
    },
    {
      id: "567890123456789",
      time: "2023-07-01T03:53:40.000Z",
      seatnumber: 5,
      moviename: "The Dark Knight",
    },
    {
      id: "678901234567890",
      time: "2023-07-01T03:53:41.000Z",
      seatnumber: 6,
      moviename: "Forrest Gump",
    },
    {
      id: "789012345678901",
      time: "2023-07-01T03:53:42.000Z",
      seatnumber: 7,
      moviename: "The Silence of the Lambs",
    },
    {
      id: "890123456789012",
      time: "2023-07-01T03:53:43.000Z",
      seatnumber: 8,
      moviename: "Pulp Fiction",
    },
    {
      id: "901234567890123",
      time: "2023-07-01T03:53:44.000Z",
      seatnumber: 9,
      moviename: "The Lord of the Rings",
    },
    {
      id: "012345678901234",
      time: "2023-07-01T03:53:45.000Z",
      seatnumber: 10,
      moviename: "Star Wars",
    },
  ];

  // Get user balance (useServerSession)

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
              const id = ticket.id;
              const date = new Date(ticket.time).toLocaleString("en-US", {
                calendar: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              });
              const seat = ticket.seatnumber;
              const title = ticket.moviename;
              return (
                <tr key={id}>
                  <td className="border-2 border-custom-white px-3 py-2 xl:px-4 xl:py-3">
                    {id}
                  </td>
                  <td className="border-2 border-custom-white px-3 py-2 xl:px-4 xl:py-3">
                    {date}
                  </td>
                  <td className="border-2 border-custom-white px-3 py-2 xl:px-4 xl:py-3">
                    {seat}
                  </td>
                  <td className="border-2 border-custom-white px-3 py-2 xl:px-4 xl:py-3">
                    {title}
                  </td>
                  <td className="border-2 border-custom-white px-3 py-2 xl:px-4 xl:py-3">
                    {Date.now() < new Date(ticket.time).getTime() ? (
                      <Button
                        paddingY="10px"
                        paddingX="15px"
                        color="trans-red"
                        popUp={
                          <TicketsPopUp date={date} seat={seat} title={title} />
                        }
                      >
                        Cancel
                      </Button>
                    ) : (
                      "-"
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
