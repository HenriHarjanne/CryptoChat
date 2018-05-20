import React from 'react';
import moment from 'moment';

const list = (props) => {
	const handlesubmit = (e) => {
		e.preventDefault();
		props.SendMessage(props.messagetext, props.username);
	}

  return (
    <div className="row">
    	<div className="col-md-12">
    		<div className="row">
	    		<div className="col-md-12">
	    			<h5>Insert secretkey</h5>
	    			<input type="password" className="form-control" name="cipher" placeholder="secretkey" value={props.cipher}  onChange={(e) => props.setCipher(e.target.value)}/>
	    		</div>
	    	</div>
	    	{props.activechatkey != null && 
	    		<div className="row messagecontainer">
	    			<div className="col-md-12">
			    		<div className="row messagescontainer">
					    	{props.MessageList.map(SingleMessage => 
					    		<div key={SingleMessage.timestamp} className="col-md-12">
					    			<div className="row">
					    				<div className="col-md-12">
					    					{moment.unix(SingleMessage.timestamp).format("DD.MM.YYYY HH:mm")} - {SingleMessage.nick}
					    				</div>
					    			</div>
					    			<div className="row">
					    				<div className="col-md-12">
					    					{SingleMessage.message}
					    				</div>
					    			</div>
					    		</div>
					    	)}
				    	</div>
				    	<form onSubmit={handlesubmit}>
					    	<div className="row">
						    		<div className="col-md-2">
						    			<input type="text" className="form-control" placeholder="nickname" name="cipher" value={props.username}  onChange={(e) => props.setusername(e.target.value)}/>
						    		</div>
						    		<div className="col-md-10">
						    			<input type="text" className="form-control" placeholder="message" name="cipher" value={props.messagetext}  onChange={(e) => props.setMessagetext(e.target.value)}/>
						    		</div>
						    		<div className="col-md-12" >
						    			<button type="submit" value="Send message"> Send messages </button>
						    		</div>
					    	</div>
					    </form>
				    </div>
			    </div>
	    	}
    		
	    </div>
    </div>
  )
}

export default list;