import Form from "../../ui/Form";
import { useEffect, useState } from 'react';
import { createAPIEndpoint, ENDPOINT } from '../../services/settingsService/settingApi';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from "../../ui/Spinner";
import { toast } from "react-hot-toast";

function UpdateSettingsForm() {
  const [settings, setSettings] = useState([]);
  const [loader, setLoader] = useState(true);
  let settingsID="";

  function getAllSettings() {
    setLoader(true);

    createAPIEndpoint(ENDPOINT.GETSETTINGS).fetchAll().then((settings) => { setSettings(settings.data); setLoader(false); })

  }

  settingsID = settings[0]?.Id ?? ""

  let init_Setting = false;
  let settingUpdateObj = {};
  function handleUpdate(e, field) {
    const { value } = e.target;


    if (!init_Setting) {
      settingUpdateObj = {Id:settingsID, MinBookingLength: settings[0]?.MinBookingLength ?? "", MaxBookingLength: settings[0]?.MaxBookingLength ?? "", MaxGuestPerBooking: settings[0]?.MaxGuestPerBooking ?? "", BreakFastPrice: settings[0]?.BreakFastPrice ?? "" };
      init_Setting = true;
    }



    const x = { [field]: value }

    if (Object.keys(x) == "MinBookingLength") {
      settingUpdateObj = { ...settingUpdateObj, MinBookingLength: x[field] };

    }
    if (Object.keys(x) == "MaxBookingLength") {
      settingUpdateObj = { ...settingUpdateObj, MaxBookingLength: x[field] };

    }
    if (Object.keys(x) == "MaxGuestPerBooking") {
      settingUpdateObj = { ...settingUpdateObj, MaxGuestPerBooking: x[field] };

    }
    if (Object.keys(x) == "BreakFastPrice") {
      settingUpdateObj = { ...settingUpdateObj, BreakFastPrice: x[field] };

    }
    let flag = false;
    for (let i in Object.values(settingUpdateObj)) {
      if (Object.values(settingUpdateObj)[i].length == 0) {
        flag = true;
        break;
      }
    }
    if(flag)
    {
      toast.error("Please fill all the fields.")
    }
    else
    {
      setLoader(true);
      createAPIEndpoint(ENDPOINT.UPDATESETTINGS).updatesettings(settingUpdateObj).then((val) => { setSettings(val.data.dtSettings); setLoader(false);
        if (val.data.StatusCode==="200")
        {
          toast.success(val.data.StatusMessage)
        }


      })

    }

  }

  useEffect(() => getAllSettings(), []);
  let x=0;
  if (x) {
    return (<Spinner />)
  }
  else {
    return (

      <Form>
        <FormRow label='Minimum nights/booking'>
          <Input type='number' id='min-nights'disabled={loader} onBlur={(e) => handleUpdate(e, "MinBookingLength")} defaultValue={settings[0]?.MinBookingLength ?? ""} />
        </FormRow>
        <FormRow label='Maximum nights/booking'>
          <Input type='number' id='max-nights' disabled={loader} onBlur={(e) => handleUpdate(e, "MaxBookingLength")} defaultValue={settings[0]?.MaxBookingLength ?? ""} />
        </FormRow>
        <FormRow label='Maximum guests/booking'>
          <Input type='number' id='max-guests' disabled={loader} onBlur={(e) => handleUpdate(e, "MaxGuestPerBooking")} defaultValue={settings[0]?.MaxGuestPerBooking ?? ""} />
        </FormRow>
        <FormRow label='Breakfast price'>
          <Input type='number' id='breakfast-price' disabled={loader} onBlur={(e) => handleUpdate(e, "BreakFastPrice")} defaultValue={settings[0]?.BreakFastPrice ?? ""} />
        </FormRow>
      </Form>
    );
  }


}

export default UpdateSettingsForm;
