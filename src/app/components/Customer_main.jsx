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
var FlatButton = require('material-ui/lib/flat-button');
var Slider = require('react-slick');
var MediaQuery = require('react-responsive');

var Package = React.createClass({
	childContextTypes: {
		muiTheme: React.PropTypes.object
	},

	getChildContext: function() {
		return {
			muiTheme: ThemeManager.getCurrentTheme()
		};
	},

	render: function() {
		var imgStyle = {
			display: 'block',
			width: '100%',
			overflow: 'hidden'
		};

		var packageContentStyle = {
			padding: '16px',
			textAlign: 'left'
		};

		return(
			<Paper className="packageClass" zDepth={1} rounded={false}>
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

var PackagesCarousel = React.createClass({
	render: function () {
		var settings = {
			arrows: true,
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1
		};

		var settingsv = {
			arrows: false,
			dots: false,
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 0,
			vertical: true
		};

		return (
			<div>
				{this.props.width > 800 ?
					<div>
						{this.props.packages ?
						<Slider {...settings} style={{width: '1000px'}}>
							{this.props.packages}
						</Slider>
						: <div></div>}
					</div>
				: <div>
					{this.props.packages ?
						<div>{this.props.packages}</div>
					: <div></div>}
					</div>}
			</div>
		);
	}
});

var PackageForm = React.createClass({
	shouldComponentUpdate: function(nextProps, nextState) {
		if(this.props.width != nextProps.width){
			this.refs.from.setValue(this.state.from);
			this.refs.to.setValue(this.state.to);
			this.refs.address.setValue(this.state.address);
			this.refs.message.setValue(this.state.message);
		}
		return true;
	},

	getInitialState: function() {
		return {
			requireImage: false,
			selectedPackage: 0,
			from: '',
			to: '',
			img: null,
			address: '',
			message: '',
			image_uri: 'https://dl.dropboxusercontent.com/u/105015583/blankimage.png',
		};
	},

	getDefaultProps: function() {
		return {
			packages: [{}]
		};
	},

	checkRequireImage: function(e,index,object) {
		this.setState({selectedPackage: index});
		if(this.props.requireImageIndex.indexOf(index) > -1)
			this.setState({requireImage: true});
		else
			this.setState({requireImage: false});
	},

	readImg: function(e) {
		var self = this;
		var reader = new FileReader();
		var file = e.target.files[0];

		reader.onload = function(upload) {
			self.setState({
				image_uri: upload.target.result,
			});
		}

		reader.readAsDataURL(file);
	},

	updateSavedValues: function() {
		this.setState({
			from: $('#senderName').val(),
			to: $('#recipientName').val(),
			address: $('#recipientAddress').val(),
			message: $('#message').val()
		})
	},

	addOrder: function() {
		var product = this.state.selectedPackage + 1;
		var sender = $('#senderName').val();
		var recipient = $('#recipientName').val();
		var address = $('#recipientAddress').val();
		var message = $('#message').val();
		this.props.onAddOrder(product,sender,recipient,address,message,this.state.image_uri);
		this.clearForm();
	},

	clearForm: function() {
		$('#senderName').val("");
		$('#recipientName').val("");
		$('#recipientAddress').val("");
		$('#message').val("");
		$('#imageButton').val("");
		this.setState({image_uri: 'https://dl.dropboxusercontent.com/u/105015583/blankimage.png'});
	},

	render: function() {
		var formStyle = {
			display: 'block',
			marginTop: '48px',
			padding: '60px',
			textAlign: 'left',
			overflow:'hidden'
		};

		return(
			<Paper zDepth={1} rounded={false} style={formStyle} className="clearfix">
				{this.props.width > 1200 ?
					<div>
						<div className="clearfix">
							<div style={{display:'inline-block', width: '20%', marginRight:'5%', float: 'left'}}>
								<h2>Product</h2>
								<DropDownMenu id="package" selectedIndex={this.state.selectedPackage} menuItems={this.props.packages} autoWidth={false} style={{width: '100%'}} onChange={this.checkRequireImage}/>
							</div>
							<div style={{display:'inline-block', width: '37.5%', float: 'left'}}>
								<h2>From</h2>
								<TextField ref="from" id="senderName" hintText="Sender's Name" style={{width: '95%'}} onChange={this.updateSavedValues}/>
							</div>
							<div style={{display:'inline-block', width: '37.5%', float: 'left'}}>
								<h2>To</h2>
								<TextField ref="to" id="recipientName" hintText="Recipient's Name" style={{width: '95%'}} onChange={this.updateSavedValues}/>
							</div>
						</div>
						<div style={{display:'inline-block', width:'20%', marginRight:'5%', float: 'left'}}>
						{this.state.requireImage || (this.props.requireImageIndex.indexOf(0) > -1 && this.state.selectedPackage === 0) ?
							<div>
								<br/><br/>
								Image
									<input type="file" id="imageButton" onChange={this.readImg}/>
								<div style={{width: '100%', paddingBottom: '100%', height:'0', backgroundColor: '#cccccc', overflow:'hidden'}}>
									<img id="image" src={this.state.image_uri} style={{height: '100%'}}/>
								</div>
							</div>
							: <div>&nbsp;</div>}
						</div>
						<div style={{display:'inline-block', width:'75%', float: 'left'}}>
							<br/><br/>
							<h2>Address</h2>
							<TextField ref="address" id="recipientAddress" hintText="Recipient's Address" multiLine={true} style={{width: '97%'}} onChange={this.updateSavedValues}/>
							<br/><br/><br/>
							<h2>Message</h2>
							<TextField ref="message" id="message" hintText="Message" multiLine={true} style={{width: '97%'}} onChange={this.updateSavedValues}/>
							<br/><br/><br/><br/><br/>
						</div>
						<div style={{textAlign:'center'}}>
							<div style={{display:'inline-block', width:'15%', marginRight:'16px'}}>
								<RaisedButton label="Add" primary={true} onClick={this.addOrder}/>
							</div>
							<div style={{display:'inline-block', width:'15%', marginLeft:'16px'}}>
								<FlatButton label="Clear" primary={true} onClick={this.clearForm}/>
							</div>
						</div>
					</div>
					: <div>
						<h2>Product</h2>
						<DropDownMenu id="package" selectedIndex={this.state.selectedPackage} menuItems={this.props.packages} autoWidth={false} style={{width: '100%'}} onChange={this.checkRequireImage}/>
						<br/><br/>
						<h2>From</h2>
						<TextField ref="from" id="senderName" hintText="Sender's Name" style={{width: '100%'}} onChange={this.updateSavedValues}/>
						<br/><br/>
						<h2>To</h2>
						<TextField ref="to" id="recipientName" hintText="Recipient's Name" style={{width: '100%'}} onChange={this.updateSavedValues}/>
						<br/><br/>
						<h2>Address</h2>
						<TextField ref="address" id="recipientAddress" hintText="Recipient's Address" multiLine={true} style={{width: '100%'}} onChange={this.updateSavedValues}/>
						<br/><br/>
						<h2>Message</h2>
						<TextField ref="message" id="message" hintText="Message" multiLine={true} style={{width: '100%'}} onChange={this.updateSavedValues}/>
						<br/><br/>
						{this.state.requireImage || (this.props.requireImageIndex.indexOf(0) > -1 && this.state.selectedPackage === 0) ?
							<div>
								Image<br/>
								<input type="file" id="imageButton" onChange={this.readImg}/>
								<img src={this.state.image_uri} style={{width: '100%'}}/><br/><br/>
							</div>
							:<div></div>
						}
						<div style={{textAlign:'center'}}>
							<div style={{display:'inline-block', marginRight:'16px'}}>
								<RaisedButton label="Add" primary={true} onClick={this.addOrder}/>
							</div>
							<div style={{display:'inline-block', marginLeft:'16px'}}>
								<FlatButton label="Clear" primary={true} onClick={this.clearForm}/>
							</div>
						</div>
					</div>
				}
			</Paper>
		);
	}
});

var PackageOrder = React.createClass({
	childContextTypes: {
		muiTheme: React.PropTypes.object
	},

	getChildContext: function() {
		return {
			muiTheme: ThemeManager.getCurrentTheme()
		};
	},

	deleteOrder: function() {
		this.props.onDeleteOrder(this.props.id);
	},

	editOrder: function() {
		this.setState({disableForm: false});
	},

	updateOrder: function() {
		this.setState({disableForm: true});
		var sender = $('#sender').val();
		var recipient = $('#recipient').val();
		var address = $('#address').val();
		var message = $('#message').val();
		this.props.onUpdateOrder(this.props.id,sender,recipient,address,message);
	},

	getInitialState: function() {
		return {
			disableForm: true
		};
	},

	render: function() {
		var formStyle = {
			display: 'block',
			marginTop: '48px',
			padding: '60px',
			textAlign: 'left'
		};

		var formValueStyle = {
			display: 'inline-block',
			marginTop: '8px',
			fontSize: '150%'
		};

		return(
			<Paper zDepth={1} rounded={false} style={formStyle} className="clearfix">
				{this.props.width > 1200 ?
					<div>
						<div style={{position: 'relative'}} className="clearfix">
							<div style={{position: 'absolute', top: '-32px', right: '-32px'}}>
								{this.state.disableForm ?
									<FloatingActionButton style={{marginRight: '16px'}} iconClassName="zmdi zmdi-edit" onClick={this.editOrder}></FloatingActionButton>
									: <FloatingActionButton style={{marginRight: '16px'}} iconClassName="zmdi zmdi-check" onClick={this.updateOrder}></FloatingActionButton>
								}
								<FloatingActionButton iconClassName="zmdi zmdi-delete" onClick={this.deleteOrder}></FloatingActionButton>
							</div>
							<div style={{display:'inline-block', width: '25%', float: 'left'}}>
								<h2>Product</h2>
								<span style={formValueStyle}>{this.props.package}</span>
							</div>
							<div style={{display:'inline-block', width: '37.5%', float: 'left'}}>
								<h2>From</h2>
								<TextField id="sender" disabled={this.state.disableForm} defaultValue={this.props.sender} />
							</div>
							<div style={{display:'inline-block', width: '37.5%', float: 'left'}}>
								<h2>To</h2>
								<TextField id="recipient" disabled={this.state.disableForm} defaultValue={this.props.recipient} />
							</div>
						</div>
						<div style={{display:'inline-block', width:'20%', marginRight:'5%', float: 'left'}}>
						{this.props.image ? 
							<div>
								Image
								<div style={{width: '100%', paddingBottom: '100%', height:'0', backgroundColor: '#cccccc', overflow:'hidden'}}>
									<img src={this.props.image} style={{height: '100%'}}/>
								</div>
								<br/><br/>
							</div>
							: <div>&nbsp;</div>}
						</div>
						<div style={{display:'inline-block', width:'75%', float: 'left'}}>
							<br/><br/>
							<h2>Address</h2>
							<TextField id="address" disabled={this.state.disableForm} defaultValue={this.props.address} multiLine={true}/>
							<br/><br/><br/>
							<h2>Message</h2>
							<TextField id="message" disabled={this.state.disableForm} defaultValue={this.props.message} multiLine={true}/>
						</div>
					</div>
					: <div>
						<h2>Product</h2>
						<span style={formValueStyle}>{this.props.package}</span>
						<br/><br/>
						<h2>From</h2>
						<TextField id="recipient" disabled={this.state.disableForm} defaultValue={this.props.sender} />
						<br/><br/>
						<h2>To</h2>
						<TextField id="recipient" disabled={this.state.disableForm} defaultValue={this.props.recipient} />
						<br/><br/>
						<h2>Address</h2>
						<TextField id="address" disabled={this.state.disableForm} defaultValue={this.props.address} multiLine={true}/>
						<br/><br/>
						<h2>Message</h2>
						<TextField id="message" disabled={this.state.disableForm} defaultValue={this.props.message} multiLine={true}/>
						<br/><br/>
						{this.props.image ? 
							<div>
								Image
								<div style={{width: '100%', paddingBottom: '100%', height:'0', backgroundColor: '#cccccc', overflow:'hidden'}}>
									<img src={this.props.image} style={{width: '100%'}}/>
								</div>
								<br/><br/>
							</div>
							: <div>&nbsp;</div>}
						<div style={{textAlign:'center'}}>
							<div style={{display:'inline-block', marginRight:'16px'}}>
								{this.state.disableForm ?
									<RaisedButton label="Edit" primary={true} onClick={this.editOrder}/>
									: <RaisedButton label="Update" primary={true} onClick={this.updateOrder}/>
								}
							</div>
							<div style={{display:'inline-block', marginLeft:'16px'}}>
								<RaisedButton label="Delete" primary={true} onClick={this.deleteOrder}/>
							</div>
						</div>
					</div>
				}
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

	getDefaultProps: function() {
		return{
			packageStyle: {
				padding: '16px',
				boxSizing: 'border-box'
			}
		};
	},

	getInitialState: function() {
		return {
			packages: [],
			packagesJson: [],
			packageOptions: [{ payload: '1', text: ''}],
			packageOrderList: [],
			packageOrderListJson: [],
			requireImageIndex: [],
			windowWidth: $(window).width()
		};
	},

	componentDidMount: function(argument) {
        window.addEventListener("resize", this.updateDimensions);
		this.loadPackages();
		this.loadOrderList();
	},

	loadPackages: function() {
		var packages = [];
		var packagesJson = [];
		var requireImageIndex = [];

		packagesJson = [
			{
				title: 'Asin Cenat Cenut',
				price: '3.5',
				description: 'Asin dan agak manis',
				imgUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/093/237/0024897.jpg',
				requireImage: true
			},
			{
				title: 'Poster Jolie',
				price: '2.5',
				description: 'Si ganteng',
				imgUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/093/237/0024897.jpg',
				requireImage: false
			},
			{
				title: 'Indomie Hampir Basi',
				price: '3.5',
				description: 'Dari toko terdekat',
				imgUrl: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/093/237/0024897.jpg',
				requireImage: true
			}
		];

		for(var i = 0; i < packagesJson.length; i++)
		{
			packages.push(<div style={this.props.packageStyle}>
				<Package imgUrl={packagesJson[i].imgUrl} title={packagesJson[i].title} price={packagesJson[i].price} description={packagesJson[i].description}/>
				</div>);

			if(packagesJson[i].requireImage)
				requireImageIndex.push(i);
		}

		this.loadPackageOptions(packagesJson);

		this.setState({packages: packages, packagesJson: packagesJson, requireImageIndex: requireImageIndex});
	},

	loadOrderList: function() {
		var packageOrderList = [];
		var packageOrderListJson = this.state.packageOrderListJson;
		var package;
		var packageOptions = this.state.packageOptions;
		for(var i = 0; i < packageOrderListJson.length; i++){
			for(var j = 0; j < packageOptions.length; j++){
				if(packageOptions[j].payload == packageOrderListJson[i].package)
					package = packageOptions[j].text;
			}
			packageOrderList.push(<PackageOrder width={this.state.windowWidth} package={package} sender={packageOrderListJson[i].sender}
				recipient={packageOrderListJson[i].recipient} image={packageOrderListJson[i].image} address={packageOrderListJson[i].address}
				message={packageOrderListJson[i].message} id={packageOrderListJson[i].id} onDeleteOrder={this.deleteOrder}
				onUpdateOrder={this.updateOrder}/>);
		}
		this.setState({packageOrderList: packageOrderList});
	},

	loadPackageOptions: function(packagesJson) {
		var packageOptions = [];

		for(var i = 0; i < packagesJson.length; i++) {
			packageOptions.push({payload: String(i+1), text: packagesJson[i].title});
		}

		this.setState({packageOptions: packageOptions});
	},

	handleAddOrder: function(product,sender,recipient,address,message,image) {
		var packageOrderListJson = this.state.packageOrderListJson;
		packageOrderListJson.unshift({image: image, package: product, sender: sender, recipient: recipient, address: address, message: message, id: packageOrderListJson.length});
		this.setState({packageOrderListJson: packageOrderListJson});
		this.loadOrderList();
	},

	deleteOrder: function(id){
		var packageOrderListJson = this.state.packageOrderListJson;
		for(var i = 0; i < this.state.packageOrderListJson.length; i++){
			if(packageOrderListJson[i].id == id)
				packageOrderListJson.splice(i,1);
		}
		this.setState({packageOrderListJson: packageOrderListJson});
		this.loadOrderList();
	},

	updateOrder: function(id,sender,recipient,address,message) {
		var packageOrderListJson = this.state.packageOrderListJson;
		packageOrderListJson[id].sender = sender;
		packageOrderListJson[id].recipient = recipient;
		packageOrderListJson[id].address = address;
		packageOrderListJson[id].message = message;
		this.setState({packageOrderListJson: packageOrderListJson});
		this.loadOrderList();
	},

	componentWillUnmount: function() {
		window.removeEventListener("resize", this.updateDimensions);
	},

	updateDimensions: function() {
		this.setState({windowWidth: $(window).width()});
		this.loadOrderList();
	},

	render: function() {
		return (
			<div>
				<AppBar title='PINTU Shop' showMenuIconButton={false} zDepth={1}/>
				<div style={{textAlign: 'center', width:'76.67%', margin: '90px auto 90px auto'}}>
					<PackagesCarousel width={this.state.windowWidth} packages={this.state.packages}/>
					<PackageForm packages={this.state.packageOptions} width={this.state.windowWidth} requireImageIndex={this.state.requireImageIndex}
						onAddOrder={this.handleAddOrder}/>
					{this.state.packageOrderList}
				</div>
			</div>
		);
	},
});

module.exports = Customer_main;