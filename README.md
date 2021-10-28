# This is the server application for randNote

## What is RandNote? 
1. RandNote is a virtual crypto currency and ecosystem that was created by Daniel Mamphekgo as a learning demonstaration.

## What does this ecosystem consist of ?
1. The server applicatio(which is the project you are currently viewing)
2. The website; where users will be able to login, generate a private key and purchase the crypto note. They will also be able to buy with their bank cards(will virtuall be implemented). The users will not need to login to see the price of the the Note as it will be on the homepage.
3. The Mining tool(C++ application) which will let the user provide thier private key(generated through their website accounts).

## How does the mining work?
1. A client requests the block to be mined, the server delivers.
2. The client solves the hash and sends another request to the server, this time with the solved hash as a param.
3. The server gets the hash and compares it to its own hash that it too has been solving in the meantime. It gets the answer from the client and if they match, the block is added.
- You might be wondering- what will happend if there are multipe clients trying to solve the hash = answer is - the first to send the hash is the winner. all the others will get a status 200 however with a 'sorry, did not mine' message, and so they will try again for the next block.
- This means that the server application will always be running solving hashes as well(which is absolutely insane)... it is what it is.

## How many transactions per block?
- Currently that amount varies, We have not added a timer that only loads a new block after every 10 minutes(like Bitcoin), instead there could be as little as 1 to as many as a billion+ transactions because mining only happens when a 3rd party node asks to mine the block... 
- This is obviously a big issue and will be solved(so, contribute and solve it yourself lol).

## How does it all work? 
- The users create an account and login, they then create a wallet where a public and private key will be generated for them through the website. The system will encrypt the private keys before storing it in the backend.
- Users will also be able to virtually add their bank card and purchase crypto on the platform(website). Users will be able to send RandNote to other users via a public key. If the user sends Notes to a non existant address, the coin will therfore be lost forever.
- A user can decide to mine the crpto using the C++ & QT developed desktop application that they would need to install on their windows computers. The application will only require the users public address and all the rewards will be allocated to that particular address. If the user provides the wrong address then the Notes generated will be lost forever.
- With the generated Notes, the user can then transact with other users. 
- Users can opt to sell their Notes on the platform and get cash in Dollars as a result. 


## Convertions and money allocations
- When a user deposits money into the system( They choose to deposit in what currency and choose the value) e.g Sipho deposits R15 or James deposits $1, both are the same value and should both equally purchase 1 RandNote(assuming thats the value of the Note at the time). When the user deposits, their balance will be shown on the system however they would still need to convert their $/R to Notes. 
- The system will work just like how any normal system would. If a user decides to sell/buy thier Note, a charge will be made and the company(the website) will earn money.

## Extras
- This is an Open source project. Any new ideas and additions are always welcome.
- This project should never be turned into a real platform that accepts real money as it is not stable and has alot of security risks.
