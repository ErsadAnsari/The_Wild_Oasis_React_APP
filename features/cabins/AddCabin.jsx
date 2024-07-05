
//import { useState } from 'react';
//import { useCabinGlobalContext } from '../../Context/CabinContext';
//import { useCabinGlobalContext } from '../../Context/CabinContext';
import Button from '../../ui/Button'
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';
//import CreateCabinForm from './CreateCabinForm';


// const AddCabin = () => {
//     const { modalOpen, setModalOpen }=useCabinGlobalContext();
//    // const[isModalOpen,setIsModalOpen]=useState(false);
//   return (
//     <div>
//           <Button onClick={() => setModalOpen(() => true)}>Add New Cabin</Button>
//           {modalOpen && <Modal ><CreateCabinForm  /></Modal>}
//     </div>
//   )
// }
function AddCabin()
{
    return(
        <Modal>
            <Modal.Open opens="cabin-form">
                <div><Button>Add new cabin</Button></div>
            </Modal.Open>
            <Modal.Window name="cabin-form">
                <CreateCabinForm/>
            </Modal.Window>


        {/* <Modal.Open opens="table">
                <Button>Table</Button>
            </Modal.Open>
            <Modal.Window name="table">
                <CabinTable/>
            </Modal.Window>
            */}
        </Modal >
    )
}
export default AddCabin;