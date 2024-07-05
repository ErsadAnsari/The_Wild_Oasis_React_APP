/* eslint-disable react/prop-types */
import React,{useContext,useState } from "react";
import { ENDPOINT } from "../services/cabinService/cabinapi"
import { createAPIEndpoint } from "../services/cabinService/cabinapi";
const CabinContext = React.createContext();
const CabinProvider=({children})=>
{
    const [allCabins, setAllCabins] = useState("");
    const [showForm, setShowForm] = useState(false);
    const[modalOpen,setModalOpen]=useState(false);
    const [openName, setOpenName] = useState("");
    function getALlCabins() {
        setAllCabins("");
        createAPIEndpoint(ENDPOINT.GETALLCABINS).fetchAll().then((cabins) => setAllCabins(cabins.data))
    }

    return(
        <CabinContext.Provider value={{ allCabins, setAllCabins, getALlCabins, showForm, setShowForm, modalOpen, setModalOpen, openName, setOpenName }}>
            {children}
        </CabinContext.Provider>
    )
}
const useCabinGlobalContext=()=>
{
    return useContext(CabinContext);
}
export {CabinContext,CabinProvider,useCabinGlobalContext}