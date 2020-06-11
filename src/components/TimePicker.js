import React, {Component} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { setMinutes, setHours, addMonths } from 'date-fns';
import moment from 'moment'
import '../sass/bookappointment.scss';


export class TimePicker extends Component {

  constructor(props) {
    super(props)
    this.state = {
      startDate: null,
      startHour: null,
      endHour: null,
    }
  }

  handleChange = (value) => {
    this.setState({
      startDate: value
    });
    if (value.getDay() === 1) {
      this.setState({
        startHour: this.props.getWorkingHours.map(day => day[0].startHour),
        endHour: this.props.getWorkingHours.map(day => day[0].endHour)
      });
    } else if (value.getDay() === 2) {
      this.setState({
        startHour: this.props.getWorkingHours.map(day => day[1].startHour),
        endHour: this.props.getWorkingHours.map(day => day[1].endHour)
      });
    } else if (value.getDay() === 3) {
      this.setState({
        startHour: this.props.getWorkingHours.map(day => day[2].startHour),
        endHour: this.props.getWorkingHours.map(day => day[2].endHour)
      });
    } else if (value.getDay() === 4) {
      this.setState({
        startHour: this.props.getWorkingHours.map(day => day[3].startHour),
        endHour: this.props.getWorkingHours.map(day => day[3].endHour)
      });
    } else {
      this.setState({
        startHour: this.props.getWorkingHours.map(day => day[4].startHour),
        endHour: this.props.getWorkingHours.map(day => day[4].endHour)
      });
    }
  };

  render() {
    const { startDate, startHour, endHour } = this.state;
    const now = moment().toDate();
    const isWeekday = date => {
    const day = date.getDay();
        return day !== 0 && day !== 6;
    };
    return (
      <div>
        <div className="input-wrapper">
          <DatePicker
              selected={startDate}
              onChange={this.handleChange}
              filterDate={isWeekday}
              minDate={new Date()}
              maxDate={addMonths(new Date(), 5)}
              disabled={this.props.disabled}
              placeholderText="Select Date"
          />
        </div>
        <div className="input-wrapper">
          <DatePicker 
            selected={startDate}
            onChange={this.handleChange}
            showTimeSelect
            showTimeSelectOnly
            minTime={setHours(setMinutes(now, 0), startHour)}
            maxTime={setHours(setMinutes(now, 30), endHour - 1)}
            timeIntervals={this.props.serviceDuration}
            disabled={this.props.disabled}
            timeCaption="Time"
            dateFormat="h:mm aa"
            placeholderText="Select Time"
          />
        </div>
      </div>
    )
  }
}

export default TimePicker
