import EventBus from 'eventbusjs';
import firebase from 'firebase';
import moment from 'moment';
import CryptoJS from 'crypto-js';

const userdefault = {

}

class AuthServiceImpl {
	constructor() {
		this.secretkey= null;
	}
	
	getchats(){
		let returnobj;
		let subsref = firebase.database().ref('/chats/');
		subsref.on('value', function(snapshot) {
			EventBus.dispatch("chatlist", snapshot.val());
		});
	}
	createnewchat(name){
	 /* firebase.database().ref('/chats/' + name).set({
	  	 codes: {
	  	 	0: 1234
	  	 }
	  });*/
	}
	SendMessage(messagetext, username, chatname,secretkey){
		console.log("username", username);
		let cipher = CryptoJS.AES.encrypt(messagetext, secretkey).toString();
		if(username == null){
			username = "anon";
		}
		let usernamecipher = CryptoJS.AES.encrypt(username, secretkey).toString();
		firebase.database().ref('/messages/'+chatname+'/'+moment().unix()).set({
	  			message: cipher,
	  			nick: usernamecipher
	  	});
	}
	getChatMessages(chatname, secretkey){
		if(secretkey != null){
			this.secretkey = secretkey;
		}else{
			secretkey = this.secretkey;
		}
		firebase.database().ref('/messages').off();

		let returnobj;
		let subsref = firebase.database().ref('/messages/'+chatname);
		subsref.on('value', function(snapshot) {
			let messagelist = [];
			console.log("called messages change!!");
			try{
				if(snapshot.val() != null && secretkey != null){
					Object.entries(snapshot.val()).map(([key,value])=>{
			        	let messageobj = {};

			        	var bytes  = CryptoJS.AES.decrypt(snapshot.val()[key].message.toString(), secretkey);
						var plaintext = bytes.toString(CryptoJS.enc.Utf8);

						
						
						var bytesusername  = CryptoJS.AES.decrypt(snapshot.val()[key].nick.toString(), secretkey);
						var plaintextusername = bytesusername.toString(CryptoJS.enc.Utf8);
						

						if(plaintext.length != 0){
							messageobj["message"] = plaintext;
			        		messageobj["timestamp"] = key;
			        		messageobj["nick"] = plaintextusername
			        		messagelist.push(messageobj);
						}
			        			      		});
		      		console.log("messagelist", messagelist);
		      		if(snapshot.val() != null && messagelist.length == 0){
						alert("Wrong secretkey for this chat");
						EventBus.dispatch("wrongcipher", true);
					}
				}

				EventBus.dispatch("messagelist", messagelist);
			}catch(e){
				console.log("jostain tyli error xD")
				alert("wrong secretkey");
				EventBus.dispatch("wrongcipher", true);
			}
			
		});

	}
	removelisteners(){
		firebase.database().ref('/chats').off();
	}

}

const AuthService = new AuthServiceImpl();


const config = {
	//stuffhere
}

firebase.initializeApp(config)




export default AuthService