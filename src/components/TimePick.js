import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { setMinutes, setHours } from 'date-fns';
import moment from 'moment'

export class TimePick extends Component {

  constructor(props) {
    super(props)
    this.state = {
      startDate: null
    }
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  render() {
    const { startDate } = this.state;
    const now = moment().toDate();
    const endingHours = this.props.endHour;
    var d = new Date();
    var n = d.getDay();
    calculateTime = () => {
       
    }
    return (
      <div>
         <DatePicker 
          selected={startDate}
          onChange={this.handleChange}
          showTimeSelect
          showTimeSelectOnly
          minTime={setMinutes(now, 0)}
          maxTime={setHours(setMinutes(now, 45), 23)}
          timeIntervals={this.props.serviceDuration}
          disabled={this.props.disabled}
          timeCaption="Time"
          excludeTimes={[19,20]}
          dateFormat="h:mm aa"
          placeholderText="Select Time"
        />
      </div>
    )
  }
}

export default TimePick
