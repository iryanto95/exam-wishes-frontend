var React = require('react');
var mui = require('material-ui');
var RaisedButton = mui.RaisedButton;
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;
var AppBar = require('material-ui/lib/app-bar');
var Paper = require('material-ui/lib/paper');
var FloatingActionButton = require('material-ui/lib/floating-action-button');
var TextField = require('material-ui/lib/text-field');
var DropDownMenu = require('material-ui/lib/drop-down-menu');
var FlatButton = require('material-ui/lib/flat-button')

var Package = React.createClass({
	render: function() {
		var paperStyle = {
			width: '336px',
			display: 'inline-block',
			marginRight: '24px',
			marginLeft: '24px'
			// height: '320px',
		};

		var imgStyle = {
			display: 'block',
			width: '336px',
			// height: '209px',
			overflow: 'hidden'
		};

		var packageContentStyle = {
			padding: '16px',
			textAlign: 'left'
		};
		return(
			<Paper zDepth={1} rounded={false} style={paperStyle}>
				<img style={imgStyle} draggable="false" src={this.props.imgUrl}/>
				<div style={packageContentStyle}>
					<div style={{width: '70%', display:'inline-block'}}>
						<h1>{this.props.title}</h1>
						<p>{this.props.description}</p>
					</div>
					<div style={{display: 'inline-block', float: 'right', marginTop: '16px'}}>
						<h1 style={{fontColor: '#E53935'}}>{this.props.price}</h1>
					</div>
				</div>
			</Paper>
		);
	}
});

var ExamPackages = React.createClass({
	render: function(){
		var packageContainerStyle = {
			width: '100%',
			textAlign: 'center',
			marginTop: '90px',
			position: 'relative'
		};

		var verticalMiddleStyle = {
			marginLeft: '24px',
			marginRight: '24px',
			transform: 'translateY(-202px)',
			display: 'inline-block'
		}

		return (
			<div style={packageContainerStyle}>
				<FloatingActionButton style={verticalMiddleStyle}>&lt;</FloatingActionButton>
				<Package imgUrl="https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/07e/0ec/16ed7ed.jpg" title="GEBE" price="$2.5" description="trollololol"/>
				<Package imgUrl="https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/07e/0ec/16ed7ed.jpg" title="GEBE" price="$2.5" description="trollololol"/>
				<Package imgUrl="https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/07e/0ec/16ed7ed.jpg" title="GEBE" price="$2.5" description="trollololol"/>
				<FloatingActionButton style={verticalMiddleStyle}>&gt;</FloatingActionButton>
			</div>
		);
	}
});

var PackageForm = React.createClass({
	render: function() {
		var formStyle = {
			display: 'inline-block',
			marginTop: '48px',
			padding: '60px',
			textAlign: 'left',
			width: '1104px'
		};

		var menuItems = [
			{ payload: '1', text: 'Asin Cenat Cenut' },
			{ payload: '2', text: 'Poster Jolie' },
			{ payload: '3', text: 'Indomie Hampir Basi' }
		];

		return(
			<Paper zDepth={1} rounded={false} style={formStyle}>
				<div className="clearfix">
					<div style={{display:'inline-block', width: '25%', float: 'left'}}>
						<h2>Product</h2>
						<DropDownMenu menuItems={menuItems} autoWidth={false} style={{width: '100%'}}/>
					</div>
					<div style={{display:'inline-block', width: '37.5%', float: 'left'}}>
						<h2>From</h2>
						<TextField id="senderName" hintText="Sender's Name" style={{width: '95%'}}/>
					</div>
					<div style={{display:'inline-block', width: '37.5%', float: 'left'}}>
						<h2>To</h2>
						<TextField id="recipientName" hintText="Recipient's Name" style={{width: '95%'}}/>
					</div>
				</div>
				<div style={{display:'inline-block', width:'25%', float: 'left', textAlign: 'center'}}>
				<br/><br/>
				Click to upload image
				</div>
				<div style={{display:'inline-block', width:'75%', float: 'left'}}>
					<br/><br/>
					<h2>Address</h2>
					<TextField id="recipientAddress" hintText="Recipient's Address" multiLine={true} style={{width: '97%'}}/>
					<br/><br/><br/>
					<h2>Message</h2>
					<TextField id="message" hintText="Message" multiLine={true} style={{width: '97%'}}/>
					<br/><br/><br/>
				</div>
				<div style={{textAlign:'center'}}>
					<div style={{display:'inline-block', width:'15%'}}>
						<RaisedButton label="Add" primary={true}/>
					</div>
					<div style={{display:'inline-block', width:'15%'}}>
						<FlatButton label="Clear" primary={true}/>
					</div>
				</div>
			</Paper>
		);
	}
});
var PackageOrder = React.createClass({
	render: function() {
		var formStyle = {
			display: 'inline-block',
			marginTop: '48px',
			padding: '60px',
			textAlign: 'left',
			width: '1104px'
		};

		var menuItems = [
			{ payload: '1', text: 'Asin Cenat Cenut' },
			{ payload: '2', text: 'Poster Jolie' },
			{ payload: '3', text: 'Indomie Hampir Basi' }
		];

		var formValueStyle = {
			display: 'inline-block',
			marginTop: '16px',
			fontSize: '150%'
		}

		return(
			<Paper zDepth={1} rounded={false} style={formStyle}>
				<div style={{position: 'relative'}} className="clearfix">
					<div style={{position: 'absolute', top: '-32px', right: '-32px'}}>
						<FloatingActionButton style={{marginRight: '16px'}}>edit</FloatingActionButton>
						<FloatingActionButton>delete</FloatingActionButton>
					</div>
					<div style={{display:'inline-block', width: '25%', float: 'left'}}>
						<h2>Product</h2>
						<span style={formValueStyle}>{this.props.package}</span>
					</div>
					<div style={{display:'inline-block', width: '37.5%', float: 'left'}}>
						<h2>From</h2>
						<span style={formValueStyle}>{this.props.sender}</span>
					</div>
					<div style={{display:'inline-block', width: '37.5%', float: 'left'}}>
						<h2>To</h2>
						<span style={formValueStyle}>{this.props.recipient}</span>
					</div>

				</div>
				<div style={{display:'inline-block', width:'25%', float: 'left', textAlign: 'center'}}>
				<br/><br/>
				Click to upload image
				</div>
				<div style={{display:'inline-block', width:'75%', float: 'left'}}>
					<br/><br/>
					<h2>Address</h2>
					<span style={formValueStyle}>{this.props.address}</span>
					<br/><br/><br/>
					<h2>Message</h2>
						<span style={formValueStyle}>{this.props.message}</span>
				</div>
			</Paper>
		);
	}
});

var Customer_main = React.createClass({

	childContextTypes: {
		muiTheme: React.PropTypes.object
	},

	getChildContext: function() {
		return {
			muiTheme: ThemeManager.getCurrentTheme()
		};
	},

	render: function() {
		return (
			<div>
				<AppBar title='PINTU Shop' showMenuIconButton={false} zDepth={1}/>
				<div style={{textAlign: 'center', minWidth: '1400px'}}>
					<ExamPackages/>
					<PackageForm/>
					<PackageOrder package="Asin Cenat-cenut" sender="William Surya Wijaya" recipient="Albert Datui" address="NTU" message="Good luck!"/>
				</div>
			</div>
		);
	},
});

module.exports = Customer_main;