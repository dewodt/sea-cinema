<p align="center">
<img src="https://cinema.dewodt.com/sea-cinema-link-preview.png" alt="TOASTI Logo" width="500">
</p>

# 🎞️ Description

Introducing SEA Cinema, a rising star in the movie theater industry known for
its affordable ticket prices and wide range of movie genres. The app allows users to effortlessly browse through a collection of movies.
With the ticket booking feature, users can easily select showtimes, choose seats,
and secure their reservations in seconds.

# 🚫 Constraints

- There's only one cinema location available that is located in Pondok Indah Mall, South Jakarta, Indonesia.
- Because the only location is in Jakarta, the showtimes is based on UTC+7.

# ⚙️ How To Run

To access the app, you can go to one of the links:

- [cinema.dewodt.com](https://cinema.dewodt.com/)

- [sea-cinema.vercel.app](https://sea-cinema.vercel.app/)

Note that cloning the repository and running `npm run dev` will not work because I don't share `.env` file.

# 🛠️ Frameworks/Tools Used

- NextJS App Router (Fullstack Framework)
- React (JS Library)
- TailwindCSS (CSS Framework)
- Typescript (Typesafe for JavaScript)
- NextAuth (Authentication)
- CockroachDB (Database Provider)
- Prisma (Object Relational Mapper)
- bcrypt (Hashing Passwords)

# 🌐 Pages

## Sign Up

- Only unsigned in user can access this page.
- The sign up page includes a form consisting of name, age, username, and password.
- An error toast will appear if some of the form is empty, username already exists, or age input is not valid.
- After all validation is passed, the filled password is first hashed using bcrypt then the app add a user data to the database.
- After sign up is success, a success toast appear and the user is redirected to the sign in page.

## Sign In

- Only unsigned in user can access this page.
- The sign in page includes a form consisting of username and password.
- An error toast will appear if the form is empty, username is not found, or username is found but password doesn't matched.
- The input password is matched to the hashed password saved in the database using bcrypt.
- After the sign in is success, user is redirected to the home page.

## Home Page

- Everyone can access this page.
- The home page contains list of movies from the database showing the poster and the title.
- When the poster is clicked, it will redirect user to the movie detail page.

## Movie Detail Page

- Everyone can access this page.
- If the movie id in the pathname is incorrect, it will throw Error 404 page.
- The movie detail page contains the title, age rating, release date, description, and schedule for the movie (NOTE: Schedule is based on Jakarta, UTC+7).
- The schedule time has options for today and tomorrow with each of it has 4 showtimes, (12:00, 15:00, 18:00, and 21:00 WIB).
- Clicking the option will redirect user to the booking page.
- If time has passed, the button in the schedule will be disabled. If the user forces to enter the booking page, a `notFound()` will be thrown.

## Movie Booking Page

- Only signed in user can access this page. If the user is not signed in, user will be redirected to the sign in page.
- The movie booking page contains a form consisting of 64 seats (checkbox) where user can only select 6 seats in one book.
- Sold seat is gray, picked seat is red, and empty seat is black.
- Seat checkbox is disabled if the seat is sold or the number of selected seat is already 6.
- An error toast will occur if no seat is selected, user's balance is not enough, the user's age is not old enough to watch the movie, or somehow in the process someone else bought the ticket earlier than us.
- After all validation is successfull, a new ticket data is created, user's balance is updated, and user's transaction is also updated. Then, a success toast appears and the user will be redirected to the tickets page.

## Balance Page

- Only signed in user can access this page. If the user is not signed in, user will be redirected to the sign in page.
- This page contains a list of transactions made by the user (topup, withdrawal, book ticket, cancel ticket).
- If the user clicks the top up/withdrawal menu, a pop up will appear and ask the user the amount of top up/withdrawal.
- A toast error will appear if the form is empty or the filled amount is less or equal than 0. For withdrawal only, an error toast will also appear if the input amount is larger than Rp500.000,00 or if your balance is not enough.
- After all validation is successfull, a success toast will appear and your balance history is updated.

## Tickets Page

- Only signed in user can access this page. If the user is not signed in, user will be redirected to the sign in page.
- This page contains a list of tickets owned by the user. If the time now has passed time show time, the ticket will be marked as expired otherwise the ticket can be canceled.
- The cancel ticket will remove the ticket from your ticket list and add your balance based on the price of the ticket. The chair can then be booked again by any user.

## 404 Page

- When page is not found, user is redirected to the Error 404 not found page.
