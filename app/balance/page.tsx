import Button from "@/components/Button";
import BalancePopUp from "@/components/BalancePopUp";

export const metadata = {
  title: "Balance | SEA Cinema",
  description: "User's balance page SEA Cinema",
};

const Balance = async () => {
  // Test data
  const transactions = [
    {
      id: 13204239848239428934,
      time: "2023-07-01T03:53:36.000Z",
      amount: -100000,
    },
    { id: 2, time: "2023-07-01T03:53:37.000Z", amount: +200000 },
    { id: 3, time: "2023-07-01T03:53:38.000Z", amount: +300000 },
    { id: 4, time: "2023-07-01T03:53:39.000Z", amount: -400000 },
    { id: 5, time: "2023-07-01T03:53:40.000Z", amount: +500000 },
    { id: 6, time: "2023-07-01T03:53:41.000Z", amount: -600000 },
    { id: 7, time: "2023-07-01T03:53:42.000Z", amount: -700000 },
    { id: 8, time: "2023-07-01T03:53:43.000Z", amount: +800000 },
    { id: 9, time: "2023-07-01T03:53:44.000Z", amount: +900000 },
    { id: 10, time: "2023-07-01T03:53:45.000Z", amount: +1000000 },
  ];

  // Get user balance (useServerSession)

  return (
    <main className="flex flex-auto justify-center px-5 py-10 font-inter text-custom-white xl:py-16">
      <section className="flex flex-col items-center gap-7">
        {/* Title */}
        <h1 className="text-center text-2xl font-bold xl:text-3xl">
          My Balance: Rp 5000000
        </h1>

        {/* Withdraw or Top Up */}
        <div className="flex w-full max-w-xs flex-row items-center gap-5">
          <Button
            popUp={<BalancePopUp type="withdraw" />}
            fullWidth={true}
            color="trans-red"
          >
            Withdraw
          </Button>
          <Button
            popUp={<BalancePopUp type="topup" />}
            fullWidth={true}
            color="red"
          >
            Top Up
          </Button>
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
