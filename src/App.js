import React, { Component } from 'react';
import auth from './auth/auth';
import Chatlist from './chat/list';
import Chatcontainer from "./chat/chatcontainer";
import EventBus from 'eventbusjs';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chatkeylist: [],
      chatlist:{},
      activechatkey: null,
      messagelist:[],
      cipher: null,
      messagetext:null
    };
    this.chatlistreceived = this.chatlistreceived.bind(this);
    this.messagelistreceived = this.messagelistreceived.bind(this);
    this.selectchat = this.selectchat.bind(this);
    this.SendMessage = this.SendMessage.bind(this);
    this.createcryptfunc = this.createcryptfunc.bind(this);
    this.setmessagetext = this.setmessagetext.bind(this);
    this.checkcipher = this.checkcipher.bind(this);
    this.setusername = this.setusername.bind(this);
  }
  componentDidMount() {
    console.log("auth", auth.getchats());
    EventBus.addEventListener("chatlist", this.chatlistreceived);
    EventBus.addEventListener("messagelist", this.messagelistreceived);
    EventBus.addEventListener("wrongcipher", this.checkcipher);
  }
  checkcipher(status){
    let obj = {};
    obj["activechatkey"] = null;
    this.setState(obj);
  }
  selectchat(key){
    if(this.state.cipher != null){
      let obj = {};
      obj["activechatkey"] = key;
      this.setState(obj);
      auth.getChatMessages(key, this.state.cipher);
    }else{
      alert("set secret key");
    }
  }
  SendMessage(message, username){
    auth.SendMessage(message , username, this.state.activechatkey, this.state.cipher);
    let obj = {};
    obj["messagetext"] = "";
    this.setState(obj);
  }
  createchat(name){
    console.log("name");
    auth.createnewchat(name);
  }
  createcryptfunc(cipher){
    console.log("here");
    let obj = {};
    obj["cipher"] = cipher;
    this.setState(obj);
    console.log(obj);
  }
  messagelistreceived(args){
      let obj = {};
      obj["messagelist"] = args.target;
      this.setState(obj);

      //var element = document.getElementById("yourDivID");
      //element.scrollTop = element.scrollHeight;
  }
  setmessagetext(text){
    let obj = {};
    obj["messagetext"] = text;
    this.setState(obj);
    console.log(obj);
  }
  chatlistreceived(args){
    let keylist = [];
    Object.entries(args.target).map(([key,value])=>{
        keylist.push(key.toString());
    });

    let obj = {};
    obj["chatlist"] = args.target;
    obj["chatkeylist"] = keylist;
    this.setState(obj);

  }
  setusername(username){
    let obj = {};
    obj["username"] = username;
    this.setState(obj);
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <Chatlist selectchat={this.selectchat} namelist={this.state.chatkeylist} createnew={this.createchat} />
          </div>
          <div className="col-md-8">
              <Chatcontainer setusername={this.setusername} username={this.state.username} SendMessage={this.SendMessage} MessageList={this.state.messagelist} setCipher={this.createcryptfunc} cipher={this.state.cipher} setMessagetext={this.setmessagetext} messagetext={this.state.messagetext} activechatkey={this.state.activechatkey}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;