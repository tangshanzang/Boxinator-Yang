import { useSelector, useDispatch } from 'react-redux';
import { setColour, setShowNewColour, setName, setWeight, setCountry, setForm, setShowNameError, setShowWeightError, setShowCountryError, setWeightErrorMsg, setAllOrdersFromDB } from '../../store/boxReducer';
import { hexToRgb, rgbToHex } from '../../helper/myHelper';

const CreateOrder = () => {
  const { formValues, showNewColour, showNameError, showWeightError, showCountryError, weightErrorMsg } = useSelector((state) => state.boxer);
  const dispatch = useDispatch();
  const createOrderWss = new WebSocket('ws://localhost:4000/createorder');

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

      // Send to backedn via Wss
      createOrderWss.send(
        JSON.stringify(newOrder)
      )

      // Confirmation && reset form
      alert("Order has been saved");
      resetForm();

      // Update order list on the listOrder page
      createOrderWss.onmessage = (list) => {
        let orderListFromDB = JSON.parse(list.data);
        dispatch(setAllOrdersFromDB(orderListFromDB));
      }
    }
  }

  const formValidation = () => {
    let isFormValid = true;
    Object.entries(formValues).forEach(([key, value]) => {
      // no error for colour because default colour will always exist (black 0,0,0)
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

  return (

    <div>
      <form className="Form">
        <div className="Form-Name">
          <label className="Label-Name">Name</label>
          <input type="text" className="Input-Name" onInput={(e) => { handleInput(e) }} value={formValues.name} />
          {showNameError && <p>Please enter name</p>}
        </div>

        <div className="Form-Weight">
          <label className="Label-Weight">Weight</label>
          <input type="number" className="Input-Weight" onInput={(e) => { handleInput(e) }} value={formValues.weight} />
          {showWeightError && <p>{weightErrorMsg}</p>}
        </div>

        <div className="Form-Colour">
          <label className="Label-Colour">Colour</label>
          <input type="color" className="Input-Colour" onInput={(e) => { handleInput(e) }} value={rgbToHex(formValues.colour)} />
          {showNewColour && <p className="newColour" >Blue colour is disabled, your selected colour would be:
            <span style={newColourStyle()}>{' Your New Colour'}</span>
          </p>}
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

        <div className="Form-SaveBtn">
          <button onClick={(e) => { handleSubmit(e) }}>Save</button>
        </div>
      </form>
    </div>
  )
}

export default CreateOrder;