// This file is designed to get the users from the backend db and allocate blockchain funds to them....
// For this to work, randnotex-backend needs to be serving.

// get all the users in the database via get req to randnotex-backend...

import Axios from "axios";
import { note } from "./controllers/index";
import Transaction from "./transaction";

const allocationAmount = 10000; // 10 k

const getAutoGeneratedUsers = () => {
	Axios.get(`http://localhost:8024/userfindAutoGens`).then(
		async (response: any) => {
			console.log(response.data); // should return all the auto generated users along with their addresses...
			let usersArray: any = [];
			// now i need to make the blockchain allocate funds
			for (let i = 0; i < response.data; i++) {
				note.pendingTransactions.push(
					new Transaction(null, response.data[i], allocationAmount)
				);
			}
		}
	);
};

getAutoGeneratedUsers();