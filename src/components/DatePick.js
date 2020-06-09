import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from 'date-fns';

export const DatePick = () => {
    const [startDate, setStartDate] = useState(null);
    const isWeekday = date => {
    const day = date.getDay();
        return day !== 0 && day !== 6;
    };
    return (
        <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            filterDate={isWeekday}
            minDate={new Date()}
            maxDate={addMonths(new Date(), 5)}
            placeholderText="Select Date"
        />
    )
}