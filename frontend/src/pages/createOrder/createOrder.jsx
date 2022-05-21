import { useSelector, useDispatch } from 'react-redux';
import { setColour, setShowNewColour, setName, setWeight, setCountry } from '../../store/boxReducer';
import { hexToRgb, rgbToHex } from '../../helper/myHelper';

const CreateOrder = () => {
  const { formValues, showNewColour } = useSelector((state) => state.boxer);
  const dispatch = useDispatch();

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

    const newOrder = {
      name: formValues.name,
      weight: formValues.weight,
      colour: rgbToHex(formValues.colour),
      country: formValues.country,
    }

    // add a reset form here after sending through ws;

    console.log(newOrder);
  }

  const handleInput = (e) => {
    switch (e.target.className) {
      case 'Input-Name': {
        dispatch(setName(e.target.value));
        break;
      }
      case 'Input-Weight': {
        const min = 0.1;
        const max = 100;
        const value = Math.max(min, Math.min(max, Number(e.target.value)))
        dispatch(setWeight(value));
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
        // console.log(e.target.value);
        dispatch(setCountry(e.target.value));
        break;
      }
      default: {
        console.log('voof')
      }
    }
  }

  return (

    <div>
      <form className="Form">
        <div className="Form-Name">
          <label className="Label-Name">Name</label>
          <input type="text" className="Input-Name" onInput={(e) => { handleInput(e) }} value={formValues.name} />
        </div>

        <div className="Form-Weight">
          <label className="Label-Weight">Weight</label>
          <input type="number" className="Input-Weight" onInput={(e) => { handleInput(e) }} value={formValues.weight} />
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
        </div>

        <div className="Form-SaveBtn">
          <button onClick={(e) => { handleSubmit(e) }}>Save</button>
        </div>
      </form>
    </div>
  )
}

export default CreateOrder;