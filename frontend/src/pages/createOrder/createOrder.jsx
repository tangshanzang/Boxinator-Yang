import { useSelector, useDispatch } from 'react-redux';
import { setColour, setShowNewColour, setName } from '../../store/boxReducer';
import { hexToRgb, rgbToHex } from '../../helper/myHelper';

const CreateOrder = () => {
  const { formValues, showNewColour } = useSelector((state) => state.boxer);
  const dispatch = useDispatch();
  // let showNewColour = false;

  const updateColour = (e) => {
    const colourInRgb = hexToRgb(e.target.value);

    if (colourInRgb.b !== 0) {
      // showNewColour = true;
      dispatch(setShowNewColour());
    }

    dispatch(setColour(colourInRgb));
  }

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

    console.log(newOrder);
  }

  const handleInput = (e) => {
    switch (e.target.className) {
      case 'Input-Name': {
        dispatch(setName(e.target.value));
        break;
      }
      case 'testCase': {
        console.log('bla');
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
          <input type="text" className="Input-Weight" />
        </div>

        <div className="Form-Colour">
          <label className="Label-Colour">Colour</label>
          <input type="color" className="Input-Colour" value={rgbToHex(formValues.colour)} onInput={(e) => { updateColour(e) }} />
          {showNewColour && <p className="newColour" >Blue colour is disabled, your selected colour would be:
            <span style={newColourStyle()}>{' Your New Colour'}</span>
          </p>}
        </div>

        <div className="Form-Country">
          <label className="Form-Country">Country</label>
          <select className="Select-Country" defaultValue='default'>
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