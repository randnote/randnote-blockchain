import Moment from 'moment';

// getting the current time in local time...
const getTimeFormatted = () =>{
	let time: string  = Moment(Date.now()).format("YYYY-MM-DD");  
	console.log(time)
    return time;
}

export default getTimeFormatted;