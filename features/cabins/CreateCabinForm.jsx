/* eslint-disable no-debugger */
//import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import { ENDPOINT } from "../../services/cabinService/cabinapi";
import { createAPIEndpoint } from "../../services/cabinService/cabinapi";
import { useCabinGlobalContext } from "../../Context/CabinContext";
import { toast } from "react-hot-toast";


// const FormRow = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 24rem 1fr 1.2fr;
//   gap: 2.4rem;

//   padding: 1.2rem 0;

//   &:first-child {
//     padding-top: 0;
//   }

//   &:last-child {
//     padding-bottom: 0;
//   }

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }

//   &:has(button) {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

// const Label = styled.label`
//   font-weight: 500;
// `;

// const Error = styled.span`
//   font-size: 1.4rem;
//   color: var(--color-red-700);
// `;

// eslint-disable-next-line react/prop-types
function CreateCabinForm({ cabinToEdit = {}, onModalClose }) {
  const{Id:editId,...editValues}=cabinToEdit;
  


const isEditSession=Boolean(editId);
console.log("eee",editValues)
  const { setAllCabins, getALlCabins }=useCabinGlobalContext();
  const{register,handleSubmit,formState,getValues}=useForm({defaultValues:isEditSession?editValues:{}});
  const{errors}=formState;
  function onSubmit(values)
  {
    setAllCabins("");
    // if(isEditSession)
    // {
    //   showFormEdit(false);
    // }
    // else
    // {
    //   onModalClose(false);
    //   setModalOpen(false);
    // }

    console.log("sub ",values)


    console.log("Form data ",values.Image[0]);
    const payload = new FormData();
    payload.append("ImageFile",values.Image[0]);
    payload.append("ImageName", values.Image[0].name)
    payload.append("CabinName", values.Name);
    payload.append("MaxCapacity",values.MaxCapacity);
    payload.append("RegularPrice", values.RegularPrice);
    payload.append("Discount", values.Discount);
    payload.append("Description", values.Description)


    // debugger;

    // for edit
    if(isEditSession)
    {
      setAllCabins("");

      console.log("edit data ", cabinToEdit);
      const EditCabinPayload = { Id: editId, Name: values.Name, MaxCapacity: values.MaxCapacity, RegularPrice: values.RegularPrice, Discount: values.Discount, Description: values.Description };
      console.log("111",EditCabinPayload);



      createAPIEndpoint(ENDPOINT.UPDATECABIN).updatecabin(EditCabinPayload).then((val) => { console.log("update000 ", val.data.dtCabins); setAllCabins(val.data.dtCabins); if (val.data.StatusMessage ==="Updated successfully"){
        toast.success("Updated successfully");
      } });

    }
    else
    {
      createAPIEndpoint(ENDPOINT.ADDCABIN).addCabin(payload).then((val) => {
        console.log("add ", val.data.StatusCode);
        if (val.data.StatusCode == 200) {
          toast.success("WOW cabin is added!");
        }

        getALlCabins();
      });
    }
    onModalClose?.()
  }
  const onError = function (errors) {
    console.log('Failed validation!', errors);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)} type={onModalClose?"modal":"regular"}>
      <FormRow label='Cabin name' error={errors?.Name?.message}>
        {/* <Label htmlFor="name">Cabin name</Label> */}
        <Input type="text" id="Name" {...register("Name", { required: 'This field is required' })} />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.MaxCapacity?.message}>
        {/* <Label htmlFor="maxCapacity">Maximum capacity</Label> */}
        <Input type="number" id="MaxCapacity" {...register("MaxCapacity", {
          required: 'This field is required', min: {
            value: 1,
            message: 'Capacity should be at least 1',
          },
})} />
      </FormRow>

      <FormRow label='Regular price' error={errors?.RegularPrice?.message}>
        {/* <Label htmlFor="regularPrice">Regular price</Label> */}
        <Input type="number" id="RegularPrice"{...register("RegularPrice", {
          required: 'This field is required',
          min: {
            value: 1,
            message: 'Price should be at least 1',
          },
        })}/>
      </FormRow>

      <FormRow label='Discount' error={errors?.Discount?.message}>
        {/* <Label htmlFor="discount">Discount</Label> */}
        <Input type="number" id="Discount" defaultValue={0}  {...register("Discount", {
           required: "Can't be empty, make it at least 0",
          validate: (value) =>
            Number(getValues().RegularPrice) >= Number(value) ||
            'Discount should be less than regular price',
        })}/>
      </FormRow>

      <FormRow label='Description for website'
        error={errors?.Description?.message}>
        {/* <Label htmlFor="description">Description for website</Label> */}
        <Textarea type="number" id="Description" defaultValue=""  {...register("Description", { required: 'This field is required' })}/>
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.Image?.message}>
        {/* <Label htmlFor="image">Cabin photo</Label> */}
        <FileInput id="Image" disabled={isEditSession?true:false} type="file" accept="image/*"  {...register("Image", { required:isEditSession?false: 'This field is required' })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}

        <Button>{isEditSession?"Update":"Add New"}</Button>
        <Button variation="secondary" type="reset" onClick={() => { onModalClose?.()}}
        // if(isEditSession)
        // {
        //   showFormEdit(false);
        // }
        // else
        // {
        //  // setModalOpen(false);
        //   onModalClose(false);
        //   //setShowForm(false);
        //  // onModalClose(false);
        // }


        >
          Cancel
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
