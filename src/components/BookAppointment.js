import React, { Component } from 'react'
import '../sass/bookappointment.scss';
import { DatePick } from './DatePick';
import { TimePick } from './TimePick';


export class BookAppointment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            surname: "",
            email: "",
            phoneNumber: "",
            barbers: [],
            services: [],
            startDate: new Date(),
            price: "Service Price",
            isDisabled: true,
            serviceDuration: 0,
            startHour: null,
            endHour: null,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    
    handleChange(event) {
        this.setState({name: event.target.name});
        this.setState({surname: event.target.surname});
        this.setState({email: event.target.email});
        this.setState({phoneNumber: event.target.phoneNumber});
    }

    handleClick = event => {
        this.setState({
            price: event.target.value,
            isDisabled: false,
        })
    }

    onChange = event => {

        this.setState({
            startHour: this.state.barbers.map(barber => barber.workHours.map(hour => hour.startHour)),
        }, () => console.log(this.state.startHour));
        this.setState({
            endHour: this.state.barbers.map(barber => barber.workHours.map(hour => hour.endHour)),
        }, () => console.log(this.state.endHour)) 
    }
    
    handleSubmit(event) {
        alert('Appointment submitted')
        event.preventDefault();
    }

    componentDidMount() {
        const baseUrl = 'http://localhost:3004';
        // GET BARBERS
        fetch(baseUrl + '/barbers')
        .then(getBarbers => {
            return getBarbers.json();
        })

        .then(getBarbers => {
            this.setState({
                barbers: getBarbers
            })
/*             console.log(getBarbers);
 */        })
        
        .catch(err => {
            alert("Failed to load our Barbers" + err)
        });

        // GET SERVICES
        fetch(baseUrl + '/services')
        .then(getServices => {
            return getServices.json();
        })

        .then(getServices => {
            this.setState({
                services: getServices
            })
/*             console.log(getServices);
 */        })
        
        .catch(err => {
            alert("Failed to load our Services" + err)
        });

    }


    render() {
        const { barbers, services, price } = this.state;
        return (
            <div className="booking-app-wrapper">
                <div className="booking-app-title">
                    <h2>Book your appointment</h2>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <div className="input-wrapper">
                        <input type="text" placeholder="First Name" value={this.state.value} onChange={this.handleChange} required/>
                    </div>

                    <div className="input-wrapper">
                        <input type="text" placeholder="Last Name" value={this.state.surname} onChange={this.handleChange} required/>
                    </div>

                    <div className="input-wrapper">
                        <input placeholder="Email" pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/" value={this.state.email} onChange={this.handleChange} required />
                    </div>

                    <div className="input-wrapper">
                        <input type="tel" pattern="[0][0-9]{8}" placeholder="Phone Number" value={this.state.phoneNumber} onChange={this.handleChange} required/>
                    </div>

                    <div className="input-wrapper">
                       <select onChange={this.onChange}>
                           <option hidden>Select Barber</option>
                           {barbers.map(barber => (
                                <option onClick={() => this.props.data.changeDuration(false)} key={barber.id}>
                                {barber.firstName} {barber.lastName}
                                </option>
                            ))}
                       </select>
                    </div>

                    <div className="input-wrapper">
                       <select onChange={this.handleClick}>
                           <option hidden>Select Service</option>
                           {services.map(service => (
                                <option 
                                    key={service.id} value={service.price}>
                                    {service.name}
                                </option>
                            ))}
                       </select>
                    </div>

                    <div className="input-wrapper">
                        <DatePick/>
                    </div>

                    <div className="input-wrapper" >
                        <TimePick startHour={this.state.startHour} endHour={this.state.endHour} serviceDuration={this.state.serviceDuration} disabled={this.state.isDisabled}/>
                    </div>

                    <div className="input-wrapper price">
                        <input value={price === 'Service Price' ? price : 'Price is ' + price + '$'} disabled/>
                    </div>
                    
                    <input type="submit" value="Book appointment" />
                </form>
            </div>
        )
    }
}

export default BookAppointment
