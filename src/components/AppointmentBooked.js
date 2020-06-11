import React, { Component } from 'react'
import '../sass/bookingsuccess.scss';

export class AppointmentBooked extends Component {

    constructor(props) {
        super(props);
        this.state = {
           gifs: [],
           selectedGif: null,
        };

    }


    componentDidMount() {
        const getGif = 'http://api.giphy.com/v1/gifs/search?api_key=KeTn0RgXZQF8EDkUGgQmSaJYuWPEz5mI&q=barber';

        // GET GIF

        fetch(getGif)
        .then(response => {
            return response.json();
        })
        .then(response => {
            this.setState({
                gifs: response
            }, () => console.log(this.state.gifs))
        })
        .catch(err => {
            alert("Failed to load gif" + err)
        });

    }

    render() {
        const { gifs } = this.state;
        return (
            <div className="section-booking-success">
                <div className="container">

                    <div className="center-wrapper">
                        <h2>Appointment successfully booked</h2>

                        <div className="success-gif-wrapper">
                            {/* {gifs.map(gif => (console.log(gif.images)))} */}
                            <img src="" />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default AppointmentBooked
