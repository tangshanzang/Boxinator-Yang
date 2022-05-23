import { useSelector, useDispatch } from 'react-redux';
import { setColour, setShowNewColour, setName, setWeight, setCountry, setForm, setShowNameError, setShowWeightError, setShowCountryError, setWeightErrorMsg, setAllOrdersFromDB, setShowColourPicker, setShowColourError } from '../../store/boxReducer';
import { hexToRgb, rgbToHex } from '../../helper/myHelper';
import { useEffect, useRef } from 'react';
import './createOrder.css'

const CreateOrder = () => {
  const { formValues, showNewColour, showNameError, showWeightError, showCountryError, weightErrorMsg, showColourPicker, showColourError } = useSelector((state) => state.boxer);
  const dispatch = useDispatch();
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:4000/createorder');
    const wsCurrent = ws.current;
    wsCurrent.onmessage = e => {
      let orderListFromDB = JSON.parse(e.data);
      dispatch(setAllOrdersFromDB(orderListFromDB));
    };
    // Warning close before connection established?
    // return () => {
    //   wsCurrent.close();
    // };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const newColourStyle = () => {
    let oldColour = formValues.colour;
    let newColour = rgbToHex(oldColour);
    let newStyle = {
      color: newColour,
    }
    return newStyle;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // If validation pass
    if (formValidation()) {
      // Create obj
      const newOrder = {
        name: formValues.name,
        weight: formValues.weight,
        colour: rgbToHex(formValues.colour),
        country: formValues.country,
      }

      ws.current.send(
        JSON.stringify(newOrder)
      )

      // Confirmation && reset form
      alert("Order has been saved");
      resetForm();
    }
  }

  const formValidation = () => {
    let isFormValid = true;
    Object.entries(formValues).forEach(([key, value]) => {
      let showErrorMsg;
      switch (key) {
        case 'name': {
          if (value === '') {
            showErrorMsg = true;
            isFormValid = false;
          }
          else {
            showErrorMsg = false;
          }
          dispatch(setShowNameError(showErrorMsg));
          break;
        }
        case 'weight': {
          if (value === '') {
            showErrorMsg = true;
            isFormValid = false;
            dispatch(setWeightErrorMsg('Please enter weight'));
          }
          else {
            showErrorMsg = false;
          }
          dispatch(setShowWeightError(showErrorMsg));
          break;
        }
        case 'colour': {
          if (value === '') {
            showErrorMsg = true;
            isFormValid = false;
          }
          else {
            showErrorMsg = false;
          }
          dispatch(setShowColourError(showErrorMsg));
          break;
        }
        case 'country': {
          if (value === 'default') {
            showErrorMsg = true;
            isFormValid = false;
          }
          else {
            showErrorMsg = false;
          }
          dispatch(setShowCountryError(showErrorMsg));
          break;
        }
        default: {
        }
      }
    })
    return isFormValid;
  }

  const resetForm = () => {
    let resetedForm = {
      name: '',
      weight: '',
      colour: '',
      country: 'default',
      cost: '',
    }

    dispatch(setForm(resetedForm));
  }

  const handleInput = (e) => {
    switch (e.target.className) {
      case 'Input-Name': {
        dispatch(setName(e.target.value));
        break;
      }
      case 'Input-Weight': {
        // According to the description i got, it should reset to 0.
        // However it would create a problem for cost calculation, thus i put it to 0.1
        if (e.target.value < 0.1) {
          dispatch(setWeightErrorMsg('Invalid inpiut, weight has been reset to our minimum weight'));
          dispatch(setShowWeightError(true));
          dispatch(setWeight(0.1));
        }
        else {
          dispatch(setWeight(e.target.value));
        }
        break;
      }
      case 'Input-Colour': {
        const colourInRgb = hexToRgb(e.target.value);

        if (colourInRgb.b !== 0) {
          dispatch(setShowNewColour());
        }

        dispatch(setColour(colourInRgb));
        break;
      }
      case 'Select-Country': {
        dispatch(setCountry(e.target.value));
        break;
      }
      default: {
      }
    }
  }

  const test = () => {
    dispatch(setShowColourPicker(true));
  }

  return (

    <div className="Form-Container">
      <form className="Form">
        <div className="Form-Name">
          <label className="Label-Name">Name</label>
          <input type="text" className="Input-Name" onInput={(e) => { handleInput(e) }} value={formValues.name} />
          {showNameError && <p>Please enter name</p>}
        </div>

        <div className="Form-Weight">
          <label className="Label-Weight">Weight (kg)</label>
          <input type="number" className="Input-Weight" onInput={(e) => { handleInput(e) }} value={formValues.weight} />
          {showWeightError && <p>{weightErrorMsg}</p>}
        </div>

        <div className="Form-Colour">
          <label className="Label-Colour">Box Colour</label>
          {showColourPicker ? <input type="color" className="Input-Colour" onInput={(e) => { handleInput(e) }} value={rgbToHex(formValues.colour)} />
            : <button className="Form-pickerBtn" onClick={test}>Click to show colour picker</button>}
          {showNewColour && <p className="newColour" >Blue colour is disabled, your selected colour would be:
            <span style={newColourStyle()}>{' Your New Colour'}</span>
          </p>}
          {showColourError && <p>Please select colour</p>}
        </div>

        <div className="Form-Country">
          <label className="Label-Country">Country</label>
          <select className="Select-Country" onInput={(e) => { handleInput(e) }} value={formValues.country}>
            <option value="default" disabled>Select Country</option>
            <option value="sweden">Sweden</option>
            <option value="china">China</option>
            <option value="brazil">Brazil</option>
            <option value="australia">Australia</option>
          </select>
          {showCountryError && <p>Please select country</p>}
        </div>

        <div className="Form-SaveBtn-Container">
          <button className="Form-SaveBtn" onClick={(e) => { handleSubmit(e) }}>Save</button>
        </div>
      </form>
    </div>
  )
}

export default CreateOrder;