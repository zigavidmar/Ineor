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
      timeDisabled: this.props.timeDisabled,
      time: null,
    }
  }

  handleChange = (val) => {
    this.setState({
      startDate: val,
      timeDisabled: false,
      time: null,
    });

    const getDay = val.getDay();

    if (getDay === 1) {
      this.setState({
        startHour: this.props.getWorkingHours.map(day => day[0].startHour),
        endHour: this.props.getWorkingHours.map(day => day[0].endHour)
      });
    } else if (getDay === 2) {
      this.setState({
        startHour: this.props.getWorkingHours.map(day => day[1].startHour),
        endHour: this.props.getWorkingHours.map(day => day[1].endHour)
      });
    } else if (getDay === 3) {
      this.setState({
        startHour: this.props.getWorkingHours.map(day => day[2].startHour),
        endHour: this.props.getWorkingHours.map(day => day[2].endHour)
      });
    } else if (getDay === 4) {
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

  handleTime = (value) => {
    this.setState({
      time: value,
    });
  }

  render() {
    const { startDate, startHour, endHour} = this.state;
    const now = moment().toDate();
    const isWeekday = date => {
      const day = date.getDay();
      return day !== 0 && day !== 6;
    };
    const checkIfBooked = time => {

    }
    return (
      <div>
        <div className="input-wrapper">
          <DatePicker
              selected={startDate}
              onChange={this.handleChange}
              filterDate={isWeekday}
              minDate={new Date()}
              maxDate={addMonths(new Date(), 5)}
              disabled={this.props.datedisabled}
              placeholderText="Select Date"
          />
        </div>
        <div className="input-wrapper">
          <DatePicker 
            selected={this.state.time}
            onChange={this.handleTime}
            showTimeSelect
            showTimeSelectOnly
            minTime={setHours(setMinutes(now, 0), startHour)}
            maxTime={setHours(setMinutes(now, 30), endHour - 1)}
            filterTime={checkIfBooked}
            timeIntervals={this.props.serviceDuration}
            disabled={this.state.timeDisabled}
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
