import { useSelector, useDispatch } from 'react-redux';
import { setColour } from '../../store/boxReducer';
import { hexToRgb, rgbToHex } from '../../helper/myHelper';

const CreateOrder = () => {
  const { formValues } = useSelector((state) => state.boxer);
  const dispatch = useDispatch();

  const testColour = (e) => {
    dispatch(setColour(hexToRgb(e.target.value)));
    // console.log(formValues.colour)
  }

  return (

    <div>
      <form className="Form">
        <div className="Form-Name">
          <label className="Label-Name">Name</label>
          <input type="text" className="Input-Name" />
        </div>

        <div className="Form-Weight">
          <label className="Label-Weight">Weight</label>
          <input type="text" className="Input-Weight" />
        </div>

        <div className="Form-Colour">
          <label className="Label-Colour">Colour</label>
          <input type="color" className="Input-Colour" value={rgbToHex(formValues.colour)} onChange={(e) => { testColour(e) }} />
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
          <button>Save</button>
        </div>
      </form>
    </div>
  )
}

export default CreateOrder;