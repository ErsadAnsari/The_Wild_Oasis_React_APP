/* eslint-disable no-debugger */
//import styled from "styled-components";
import { useEffect} from "react";
import { createAPIEndpoint } from "../../services/cabinService/cabinapi";
import { ENDPOINT } from "../../services/cabinService/cabinapi";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabinGlobalContext } from "../../Context/CabinContext";
import { toast } from "react-hot-toast";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";


// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;
function CabinTable() {
  const { allCabins, setAllCabins, getALlCabins }=useCabinGlobalContext();
  const [searchParams] = useSearchParams();


  useEffect(() => {
getALlCabins();

  }, [])
  console.log("all cabins ", allCabins);
  function deleteCabinById(id) {


      toast.success("Selected cabin has been deleted!");
      setAllCabins("");
      createAPIEndpoint(ENDPOINT.DELETECABIN).deleteById(id).then((cabin) => setAllCabins(cabin.data)).catch((er)=>console.log("error",er))


    //debugger;
    console.log("000", typeof id)

  }
  if (allCabins === "") {
    return (<Spinner />)
  }
  else {
    // for filter-------------

    const filterValue=searchParams.get("discount")??"all";
    console.log("filter ",filterValue);
    let filteredCabins;
    if(filterValue==="all") filteredCabins=allCabins;
    if(filterValue==="no-discount") filteredCabins=allCabins.filter((cabins)=>Number(cabins.Discount)==0);
    if(filterValue==="with-discount") filteredCabins=allCabins.filter((cabins)=>Number(cabins.Discount>0));
    // for sorting------------
    const sortBy = searchParams.get("sortBy")||"Name";
    const[field,direction]=sortBy.split("-");

    console.log("field000 ",field);
    console.log("direction000",direction);
    const modifier=direction==="asc"?1:-1;
    let sortedCabins;
    sortedCabins = filteredCabins.sort((a, b) => (a[field] - b[field])*modifier);
    let direction1=direction||"asc";
    if(field=="Name")
    {
      if(direction1==="asc")
      {
       sortedCabins= filteredCabins.sort((a, b) =>
          a.Name.localeCompare(b.Name));
      }
      else
      {
       sortedCabins= filteredCabins.sort((a, b) =>
          b.Name.localeCompare(a.Name));
      }
    }








    return(
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>


        </Table.Header>
          <Table.Body data={sortedCabins} render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} handleDelete={deleteCabinById} />} />


      </Table>
    </Menus>
    );
  }

}
export default CabinTable;
