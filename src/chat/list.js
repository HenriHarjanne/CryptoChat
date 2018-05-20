import React from 'react';

const list = (props) => {
  return (
    <div className="row">
    	<div className="col-md-12">
    		<div className="row">
    			<div className="col-md-12">
    				<h2>Chatrooms</h2>
    			</div>
    		</div>
    		<div className="row">
		    	{props.namelist.map(SingleName =>
		    		<div className="col-md-12" onClick={(e) => props.selectchat(SingleName)} key={SingleName}>{SingleName}</div>
		    	)}
	    	</div>
	    	<div className="row">
	    		<div className="col-md-12" onClick={(e) => props.createnew("test")}>  </div>
	    	</div>
	    </div>
    </div>
  )
}

export default list;