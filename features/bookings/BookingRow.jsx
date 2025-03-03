/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({ booking
  // booking: {
  //   id: bookingId,
  //   created_at,
  //   startDate,
  //   endDate,
  //   numNights,
  //   numGuests,
  //   totalPrice,
  //   status,
  //   guests: { fullName: guestName, email },
  //   cabins: { name: cabinName },
  // },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "red",
  };

  return (
    <Table.Row>
      <Cabin>{booking.Name}</Cabin>

      <Stacked>
        <span>{booking.FullName}</span>
        <span>{booking.Email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(booking.StartDate))
            ? "Today"
            : formatDistanceFromNow(booking.StartDate)}{" "}
          &rarr; {booking.NoOfNights} night stay

        </span>
        <span>
          {format(new Date(booking.StartDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(booking.EndDate), "MMM dd yyyy")}

        </span>
      </Stacked>

      <Tag type={statusToTagName[booking.Status]}>{booking.Status.replace("-", " ")}</Tag>

      <Amount>{booking.TotalPrice}₹</Amount>
    </Table.Row>
  );
}

export default BookingRow;
