//import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useEffect, useState } from "react";
import { createAPIEndpoint, ENDPOINT } from "../../services/bookingsService/BookingApi";
import Spinner from "../../ui/Spinner";
import BookingRow from "./BookingRow";
//import Spinner from "../../ui/Spinner";

function BookingTable() {
  const[bookings,setBookings]=useState([]);
  const[isLoading,setIsLoading]=useState(true);
  function GetBookings()
  {
    setIsLoading(true);
    createAPIEndpoint(ENDPOINT.GETBOOKINGS).fetchAll().then((val)=>{setBookings(val.data);setIsLoading(false);})
  }
  useEffect(()=>GetBookings(),[]);

  if(isLoading)
  {
    return <Spinner/>
  }

  if (!bookings.length) return <Empty resourceName="Bookings"/>

else
{
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

}

export default BookingTable;
