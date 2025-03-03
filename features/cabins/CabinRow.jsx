/* eslint-disable react/prop-types */
//import { useState } from "react";
import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { FiTrash2 } from "react-icons/fi";
import { BsPencilSquare } from "react-icons/bs"
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
//import { useCabinGlobalContext } from "../../Context/CabinContext";


// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
// eslint-disable-next-line react/prop-types
function CabinRow({ cabin, handleDelete }) {
  //const[setShowForm]=useState(false);
  //const { ModalOpen, setModalOpen }=useCabinGlobalContext();


  const { Id, Name, MaxCapacity, RegularPrice, Image } = cabin;
  console.log("test000", Id);
  return (
    <>
      <Table.Row>
        <Img src={Image.slice(Image.indexOf("ass"))} />
        <Cabin>{Name}</Cabin>
        <div>Fits upto {MaxCapacity}</div>
        <Price>{RegularPrice}</Price>
        <Discount>{formatCurrency(cabin.Discount)}</Discount>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={Id} />
              <Menus.List id={Id}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<BsPencilSquare />} >Edit</Menus.Button>
                </Modal.Open>
                <Modal.Open opens="delete"><Menus.Button icon={<FiTrash2 />}>Delete</Menus.Button></Modal.Open>
              </Menus.List>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete"><ConfirmDelete onConfirm={() => handleDelete(Id)} resourceName="cabins" disabled={false} /></Modal.Window>





          </Menus.Menu>
          </Modal>


        </div>

      </Table.Row>


    </>
  )

}
export default CabinRow;