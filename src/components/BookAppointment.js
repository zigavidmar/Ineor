import React, { Component } from 'react'
import '../sass/bookappointment.scss';
import { TimePicker } from './TimePicker';
import { Link, Redirect } from 'react-router-dom';

export class BookAppointment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            barbers: [],
            services: [],
            startDate: new Date(),
            price: "Service Price",
            isDisabled: true,
            serviceDuration: 0,
            serviceDisable: true,
            getWorkingHours: null,
            test: [],
            formValidated: null,
        };

    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
    
        //Name
        if(!fields["name"] || !fields["surname"]){
          formIsValid = false;
          errors["name"] = "Please enter your full name";
        }
    
        if(typeof fields["name"] !== "undefined"){
          if(!fields["name"].match(/^[a-zA-Z]+$/)){
            formIsValid = false;
            errors["name"] = "Only letters";
          }      	
        }
    
        //Email
        if(!fields["email"]){
          formIsValid = false;
          errors["email"] = "Please enter your email";
        }
    
        if(typeof fields["email"] !== "undefined"){
          let lastAtPos = fields["email"].lastIndexOf('@');
          let lastDotPos = fields["email"].lastIndexOf('.');
    
          if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
            formIsValid = false;
            errors["email"] = "Please enter a valid email";
          }
        }

        //Phone
        if(!fields["phone"]){
            formIsValid = false;
            errors["phone"] = "Please enter phone number";
          }

        //Barber
        if(!fields["barber"]){
            formIsValid = false;
            errors["barber"] = "Please select a barber";
        }

        //Service
        if(!fields["service"]){
            formIsValid = false;
            errors["service"] = "Please select a service";
        }

        this.setState({errors: errors});
        return formIsValid;
    }
    
    handleChange(field, e){    		
        let fields = this.state.fields;
        fields[field] = e.target.value;        
        this.setState({fields});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        if(this.handleValidation()){
            this.setState({
                formValidated: true,
            })
        } else {
            this.setState({
                formValidated: false,
            })
        }
    }

    handleClick = (field,e) => {
        let fields = this.state.fields;
        fields['service'] = e.target.value;        
        this.setState({fields});

        this.setState({
            price: e.target.value,
            isDisabled: false,
        })
        
    }

    onChange = ( field, e) => {
        this.setState({
            getWorkingHours: this.state.barbers.map(barber => barber.workHours),
            serviceDisable: false,
        });

        let fields = this.state.fields;
        fields['barber'] = e.target.value;        
        this.setState({fields});
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
        })
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
        })
        .catch(err => {
            alert("Failed to load our Services" + err)
        });

    }


    render() {
        const { barbers, services, price, fields, errors, getWorkingHours, isDisabled } = this.state;
        if (this.state.formValidated === true) {
            return <Redirect to="barberbooked"/>
        } else {
            
        }
        return (
            <div className="booking-app-wrapper">
                <div className="booking-app-title">
                    <h2>Book your appointment</h2>
                </div>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className="input-wrapper">
                        <input type="text" placeholder="First Name" onChange={this.handleChange.bind(this, "name")} value={fields["name"] || ''}/>
                        <span className="error">{errors["name"]}</span>
                    </div>

                    <div className="input-wrapper">
                        <input type="text" placeholder="Last Name" onChange={this.handleChange.bind(this, "surname")} value={fields["surname"] || ''}/>
                    </div>

                    <div className="input-wrapper">
                        <input placeholder="Email" onChange={this.handleChange.bind(this, "email")} value={fields["email"] || ''} />
                        <span className="error">{errors["email"]}</span>
                    </div>

                    <div className="input-wrapper">
                        <input pattern="[0][0-9]{8}" placeholder="Phone Number" onChange={this.handleChange.bind(this, "phone")} value={fields["phone"] || ''}/>
                        <span className="error">{errors["phone"]}</span>
                    </div>

                    <div className="input-wrapper">
                       <select value={fields["barber"] || ''} onChange={this.onChange.bind(this, "barber")}>
                           <option hidden>Select Barber</option>
                           {barbers.map(barber => (
                                <option key={barber.id}>
                                {barber.firstName} {barber.lastName}
                                </option>
                            ))}
                       </select>
                       <span className="error">{errors["barber"]}</span>
                    </div>

                    <div className="input-wrapper">
                       <select value={fields["service"] || ''} onChange={this.handleClick.bind(this, "service")} disabled={(this.state.serviceDisable === true ) ? "disabled" : null}>
                           <option hidden>Select Service</option>
                           {services.map(service => (
                                <option value={service.price}
                                    key={service.id}>
                                    {service.name}
                                </option>
                            ))}
                       </select>
                       <span className="error">{errors["service"]}</span>
                    </div>

                    <TimePicker getWorkingHours={getWorkingHours} disabled={isDisabled} />

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
