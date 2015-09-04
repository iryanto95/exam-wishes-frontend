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
var Dialog = require('material-ui/lib/dialog');
var IconButton = require('material-ui/lib/icon-button');
var List = require('material-ui/lib/lists/list');
var ListItem = require('material-ui/lib/lists/list-item');
var Snackbar = require('material-ui/lib/snackbar');

var Package = React.createClass({
	childContextTypes: {
		muiTheme: React.PropTypes.object
	},

	getChildContext: function() {
		return {
			muiTheme: ThemeManager.getCurrentTheme()
		};
	},

	showDialog: function() {
		this.props.showDialog(this.props.index);
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
			<div>
				<Paper className="packageClass" zDepth={1} rounded={false} onTouchTap={this.showDialog}>
					<img style={imgStyle} draggable="false" src={this.props.primaryImage}/>
					<div style={packageContentStyle}>
						<div style={{width: '70%', display:'inline-block'}}>
							<h1>{this.props.title}</h1>
							<p>Quantity Left: {this.props.quantity}</p>
						</div>
						<div style={{display: 'inline-block', float: 'right', marginTop: '16px'}}>
							<h1 style={{fontColor: '#E53935'}}>{this.props.price}</h1>
						</div>
					</div>
				</Paper>
			</div>
		);
	}
});

var PackagesCarousel = React.createClass({
	render: function () {
		return (
			<div>
				{this.props.width > 1000 ?
					<div>
						{this.props.packages ?
						<Slider {...this.props.settings}>
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

var PackageImagesCarousel = React.createClass({
	render: function () {
		return (
			<div>
				{this.props.width > 800 ?
					<div>
						{this.props.images ?
						<Slider {...this.props.settings}>
							{this.props.images}
						</Slider>
						: <div></div>}
					</div>
				: <div>
					{this.props.images ?
						<div>{this.props.images}</div>
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
			from: this.refs.from.getValue(),
			to: this.refs.to.getValue(),
			address: this.refs.address.getValue(),
			message: this.refs.message.getValue()
		})
	},

	addOrder: function() {
		var product = this.state.selectedPackage;
		var sender = this.refs.from.getValue();
		var recipient = this.refs.to.getValue();
		var address = this.refs.address.getValue();
		var message = this.refs.message.getValue();
		this.props.onAddOrder(product,sender,recipient,address,message,this.state.image_uri);
		this.clearForm();
	},

	clearForm: function() {
		this.refs.from.clearValue();
		this.refs.to.clearValue();
		this.refs.address.clearValue();
		this.refs.message.clearValue();
		$('#imageButton').val("");
		this.setState({selectedPackage: 0, image_uri: 'https://dl.dropboxusercontent.com/u/105015583/blankimage.png'});
	},

	render: function() {
		var formStyle = {
			display: 'block',
			marginTop: '48px',
			padding: '60px',
			textAlign: 'left',
			overflow:'hidden',
			marginLeft: '16px',
			marginRight: '16px'
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
								<TextField ref="from" hintText="Sender's Name" style={{width: '95%'}} onChange={this.updateSavedValues}/>
							</div>
							<div style={{display:'inline-block', width: '37.5%', float: 'left'}}>
								<h2>To</h2>
								<TextField ref="to" hintText="Recipient's Name" style={{width: '95%'}} onChange={this.updateSavedValues}/>
							</div>
						</div>
						<div style={{display:'inline-block', width:'20%', marginRight:'5%', float: 'left'}}>
						{this.state.requireImage || (this.props.requireImageIndex.indexOf(0) > -1 && this.state.selectedPackage === 0) ?
							<div>
								<br/><br/>
								Image
								<input type="file" id="imageButton" onChange={this.readImg}/>
								<img src={this.state.image_uri} style={{width: '100%', height: '100%'}}/>
							</div>
							: <div>&nbsp;</div>}
						</div>
						<div style={{display:'inline-block', width:'75%', float: 'left'}}>
							<br/><br/>
							<h2>Address</h2>
							<TextField ref="address" hintText="Recipient's Address" multiLine={true} style={{width: '97%'}} onChange={this.updateSavedValues}/>
							<br/><br/><br/>
							<h2>Message</h2>
							<TextField ref="message" hintText="Message" multiLine={true} style={{width: '97%'}} onChange={this.updateSavedValues}/>
							<br/><br/><br/><br/><br/>
						</div>
						<div style={{textAlign:'center'}}>
							<div style={{display:'inline-block', width:'15%', marginRight:'16px'}}>
								<RaisedButton label="Add" secondary={true} onClick={this.addOrder}/>
							</div>
							<div style={{display:'inline-block', width:'15%', marginLeft:'16px'}}>
								<FlatButton label="Clear" secondary={true} onClick={this.clearForm}/>
							</div>
						</div>
					</div>
					: <div>
						<h2>Product</h2>
						<DropDownMenu id="package" selectedIndex={this.state.selectedPackage} menuItems={this.props.packages} autoWidth={false} style={{width: '100%'}} onChange={this.checkRequireImage}/>
						<br/><br/>
						<h2>From</h2>
						<TextField ref="from" hintText="Sender's Name" style={{width: '100%'}} onChange={this.updateSavedValues}/>
						<br/><br/>
						<h2>To</h2>
						<TextField ref="to" hintText="Recipient's Name" style={{width: '100%'}} onChange={this.updateSavedValues}/>
						<br/><br/>
						<h2>Address</h2>
						<TextField ref="address" hintText="Recipient's Address" multiLine={true} style={{width: '100%'}} onChange={this.updateSavedValues}/>
						<br/><br/>
						<h2>Message</h2>
						<TextField ref="message" hintText="Message" multiLine={true} style={{width: '100%'}} onChange={this.updateSavedValues}/>
						<br/><br/>
						{this.state.requireImage || (this.props.requireImageIndex.indexOf(0) > -1 && this.state.selectedPackage === 0) ?
							<div>
								Image
								<input type="file" id="imageButton" onChange={this.readImg}/>
								<img src={this.state.image_uri} style={{width: '100%', height: '100%'}}/>
							</div>
							:<div></div>
						}
						<div style={{textAlign:'center'}}>
							<br/><br/>
							<div style={{display:'inline-block', marginRight:'16px'}}>
								<RaisedButton label="Add" secondary={true} onClick={this.addOrder}/>
							</div>
							<div style={{display:'inline-block', marginLeft:'16px'}}>
								<FlatButton label="Clear" secondary={true} onClick={this.clearForm}/>
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
		$('body').css("overflow","scroll");
		this.refs.confirmationDialog.dismiss();
		this.props.onDeleteOrder(this.props.id);
	},

	openConfirmationDialog: function() {
		this.refs.confirmationDialog.show();
	},

	closeConfirmationDialog: function() {
		this.refs.confirmationDialog.dismiss();
	},

	editOrder: function() {
		this.setState({disableForm: false});
	},

	updateOrder: function() {
		this.setState({disableForm: true});
		var sender = this.refs.from.getValue();
		var recipient = this.refs.to.getValue();
		var address = this.refs.address.getValue();
		var message = this.refs.message.getValue();
		this.props.onUpdateOrder(this.props.id,sender,recipient,address,message);
	},

	getInitialState: function() {
		return {
			disableForm: true
		};
	},

	getDefaultProps: function() {
		return {
			noImg: 'https://dl.dropboxusercontent.com/u/105015583/blankimage.png'
		};
	},

	componentDidMount: function() {
		this.refs.from.setValue(this.props.sender);
	    $(this.refs.collapseCard.getDOMNode()).paperCollapse();
	},

	render: function() {
		var formStyle = {
			display: 'block',
			marginTop: '48px',
			padding: '60px',
			textAlign: 'left',
			marginLeft: '16px',
			marginRight: '16px'
		};

		var formValueStyle = {
			display: 'inline-block',
			marginTop: '8px',
			fontSize: '150%'
		};

		var customActions = [
			<FlatButton
				label="No"
				secondary={true}
				onTouchTap={this.closeConfirmationDialog} />,
			<FlatButton
				label="Yes"
				primary={true}
				onTouchTap={this.deleteOrder} />
		];

		return(
			<div>
				<Dialog ref="confirmationDialog"
					title="Delete Order"
					actions={customActions}
					modal={false} style={{textAlign: 'left'}}>
					Are you sure you want to delete this order?
				</Dialog>
				{this.props.width > 1200 ?
					<Paper zDepth={1} rounded={false} style={formStyle} className="clearfix">
						<div>
							<div style={{position: 'relative'}} className="clearfix">
								<div style={{position: 'absolute', top: '-32px', right: '-32px'}}>
									{this.state.disableForm ?
										<FloatingActionButton style={{marginRight: '16px'}} iconClassName="zmdi zmdi-edit" onClick={this.editOrder} secondary={true}></FloatingActionButton>
										: <FloatingActionButton style={{marginRight: '16px'}} iconClassName="zmdi zmdi-check" onClick={this.updateOrder} secondary={true}></FloatingActionButton>
									}
									<FloatingActionButton iconClassName="zmdi zmdi-delete" onClick={this.openConfirmationDialog} primary={true}></FloatingActionButton>
								</div>
								<div style={{display:'inline-block', width: '25%', float: 'left'}}>
									<h2>Product</h2>
									<span style={formValueStyle}>{this.props.package}</span>
								</div>
								<div style={{display:'inline-block', width: '37.5%', float: 'left'}}>
									<h2>From</h2>
									<TextField ref="from" disabled={this.state.disableForm} defaultValue={this.props.sender}/>
								</div>
								<div style={{display:'inline-block', width: '37.5%', float: 'left'}}>
									<h2>To</h2>
									<TextField ref="to" disabled={this.state.disableForm} defaultValue={this.props.recipient} />
								</div>
							</div>
							<div style={{display:'inline-block', width:'20%', marginRight:'5%', float: 'left'}}>
							{this.props.image != this.props.noImg ? 
								<div>
									Image
									<img src={this.props.image} style={{width: '100%', height: '100%'}}/>
									<br/><br/>
								</div>
								: <div>&nbsp;</div>}
							</div>
							<div style={{display:'inline-block', width:'75%', float: 'left'}}>
								<br/><br/>
								<h2>Address</h2>
								<TextField ref="address" disabled={this.state.disableForm} defaultValue={this.props.address} multiLine={true}/>
								<br/><br/><br/>
								<h2>Message</h2>
								<TextField ref="message" disabled={this.state.disableForm} defaultValue={this.props.message} multiLine={true}/>
							</div>
						</div>
					</Paper>
					: <div style={{textAlign: 'left'}}>
						<Paper style={{margin: '16px', paddingTop: '16px', paddingBottom: '16px', paddingLeft: '60px', paddingRight: '60px'}} rounded={false} zDepth={1}>
							<ListItem primaryText={"To: "+this.props.recipient}>
								<ListItem disabled={true}>
								<div style={{marginLeft: '-36px'}}>
									<h2>Product</h2>
									<span>{this.props.package}</span>
									<br/><br/>
									<h2>From</h2>
									<TextField ref="from" disabled={this.state.disableForm} defaultValue={this.props.sender} />
									<br/><br/>
									<h2>To</h2>
									<TextField ref="to" disabled={this.state.disableForm} defaultValue={this.props.recipient} />
									<br/><br/>
									<h2>Address</h2>
									<TextField ref="address" disabled={this.state.disableForm} defaultValue={this.props.address} multiLine={true}/>
									<br/><br/>
									<h2>Message</h2>
									<TextField ref="message" disabled={this.state.disableForm} defaultValue={this.props.message} multiLine={true}/>
									<br/><br/>
									{this.props.image != this.props.noImg  ? 
										<div>
											Image
											<img src={this.props.image} style={{width: '100%'}}/>
											<br/><br/>
										</div>
										: <div>&nbsp;</div>}
									<div style={{textAlign:'center'}}>
										<div style={{display:'inline-block', marginRight:'16px'}}>
											{this.state.disableForm ?
												<RaisedButton label="Edit" secondary={true} onClick={this.editOrder}/>
												: <RaisedButton label="Update" secondary={true} onClick={this.updateOrder}/>
											}
										</div>
										<div style={{display:'inline-block', marginLeft:'16px'}}>
											<RaisedButton label="Delete" primary={true} onClick={this.openConfirmationDialog}/>
										</div>
									</div>
								</div>
								</ListItem>
							</ListItem>
						</Paper>
						{/*<div ref="collapseCard" style={formStyle} className="collapse-card">
							<div className="collapse-card__heading">
								<div className="collapse-card__title">
									<div className="collapse-card__title__left" style={{color: '#000000'}}>
										<h2 className="recipient-name">To: {this.props.recipient}</h2>
									</div>
									<div className="collapse-card__title__right">
										<IconButton iconClassName="zmdi zmdi-chevron-down"/>
									</div>
								</div>
							</div>
							<div className="collapse-card__body" style={{textAlign: 'left'}}>
								
							</div>
						</div>*/}
					</div>
				}
			</div>
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

	componentWillMount: function() {
		ThemeManager.setPalette({
			primary1Color: "#1565C0",
			accent1Color: "#E8524F",
		});
	},

	getDefaultProps: function() {
		return{
			packageStyle: {
				padding: '16px',
				boxSizing: 'border-box'
			},
			carouselSettings: {
				arrows: true,
				dots: false,
				infinite: true,
				speed: 500,
				slidesToShow: 3,
				slidesToScroll: 1
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
			windowWidth: $(window).width(),
			dialogIndex: -1,
			dialogImages: [],
			totalPrice: 0
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
				description: 'Lorem ipsum dolor sit amet, consul deterruisset id cum, mei an mucius accusata. Iisque omittam te mei. Eos te eirmod feugait disputando. Eam ei oratio accusam, ei sea zril perfecto. Ne dicat sapientem est, est id graece omittam, at eum summo falli assentior. In has graeco intellegam, eos tota inermis quaerendum an. Iuvaret constituto no mea. Sea an solum intellegat. Omnesque voluptaria theophrastus pro cu, te nec assum tempor minimum, ei cum quod facer labitur. Falli harum veritus has ut, eu natum signiferumque qui.',
				primaryImage: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/093/237/0024897.jpg',
				images: [
					'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/093/237/0024897.jpg',
					'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/093/237/0024897.jpg',
					'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/093/237/0024897.jpg'
				],
				requireImage: true,
				quantity: 50
			},
			{
				title: 'Poster Jolie',
				price: '2.5',
				description: 'Lorem ipsum dolor sit amet, consul deterruisset id cum, mei an mucius accusata. Iisque omittam te mei. Eos te eirmod feugait disputando. Eam ei oratio accusam, ei sea zril perfecto. Ne dicat sapientem est, est id graece omittam, at eum summo falli assentior. In has graeco intellegam, eos tota inermis quaerendum an. Iuvaret constituto no mea. Sea an solum intellegat. Omnesque voluptaria theophrastus pro cu, te nec assum tempor minimum, ei cum quod facer labitur. Falli harum veritus has ut, eu natum signiferumque qui.',
				primaryImage: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/093/237/0024897.jpg',
				images: [
					'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/093/237/0024897.jpg',
					'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/093/237/0024897.jpg',
					'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/093/237/0024897.jpg'
				],
				requireImage: false,
				quantity: 50
			},
			{
				title: 'Indomie Hampir Basi',
				price: '3.5',
				description: 'Lorem ipsum dolor sit amet, consul deterruisset id cum, mei an mucius accusata. Iisque omittam te mei. Eos te eirmod feugait disputando. Eam ei oratio accusam, ei sea zril perfecto. Ne dicat sapientem est, est id graece omittam, at eum summo falli assentior. In has graeco intellegam, eos tota inermis quaerendum an. Iuvaret constituto no mea. Sea an solum intellegat. Omnesque voluptaria theophrastus pro cu, te nec assum tempor minimum, ei cum quod facer labitur. Falli harum veritus has ut, eu natum signiferumque qui.',
				primaryImage: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/093/237/0024897.jpg',
				images: [
					'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/093/237/0024897.jpg',
					'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/093/237/0024897.jpg',
					'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/8/005/093/237/0024897.jpg'
				],
				requireImage: true,
				quantity: 50
			}
		];

		for(var i = 0; i < packagesJson.length; i++)
		{
			packages.push(
				<div style={this.props.packageStyle}>
				<Package primaryImage={packagesJson[i].primaryImage} title={packagesJson[i].title} price={packagesJson[i].price} quantity={packagesJson[i].quantity}
				showDialog={this.showDialog} closeDialog={this.closeDialog} index={i}/>
				</div>
			);

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
				if(packageOptions[j].payload == packageOrderListJson[i].package + 1)
					package = packageOptions[j].text;
			}
			packageOrderList.push(
				<PackageOrder width={this.state.windowWidth} package={package} sender={packageOrderListJson[i].sender}
				recipient={packageOrderListJson[i].recipient} image={packageOrderListJson[i].image} address={packageOrderListJson[i].address}
				message={packageOrderListJson[i].message} id={packageOrderListJson[i].id} onDeleteOrder={this.deleteOrder}
				onUpdateOrder={this.updateOrder}/>
				);
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
		this.refs.addSnackbar.show();
		var packageOrderListJson = this.state.packageOrderListJson;
		packageOrderListJson.push({image: image, package: product, sender: sender, recipient: recipient, address: address, message: message, id: packageOrderListJson.length});
		this.setState({packageOrderListJson: packageOrderListJson, totalPrice: Number(this.state.totalPrice) + Number(this.state.packagesJson[product].price)});
		this.loadOrderList();
	},

	deleteOrder: function(id){
		this.refs.deleteSnackbar.show();
		var packageOrderListJson = this.state.packageOrderListJson;
		var totalPrice = this.state.totalPrice;
		for(var i = 0; i < this.state.packageOrderListJson.length; i++){
			if(packageOrderListJson[i].id == id){
				totalPrice -=  Number(this.state.packagesJson[id].price);
				packageOrderListJson.splice(i,1);
			}
		}
		this.setState({packageOrderListJson: packageOrderListJson, totalPrice: totalPrice});
		this.loadOrderList();
	},

	updateOrder: function(id,sender,recipient,address,message) {
		this.refs.updateSnackbar.show();
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

	showDialog: function(index) {
		var dialogImages = [];
		for(var i = 0; i < this.state.packagesJson[index].images.length; i++){
			dialogImages.push(
				<div style={this.props.packageStyle}>
				<img src={this.state.packagesJson[index].images[i]} style={{width: '100%'}}/>
				</div>
			);
		}

		this.setState({dialogIndex: index, dialogImages: dialogImages});
		this.refs.dialog.show();
	},

	closeDialog: function() {
		this.refs.dialog.dismiss();
	},

	closeSnackbar: function() {
		this.refs.addSnackbar.dismiss();
		this.refs.updateSnackbar.dismiss();
		this.refs.deleteSnackbar.dismiss();
	},

	render: function() {
		return (
			<div>
				<AppBar title='PINTU Shop' showMenuIconButton={false} zDepth={1}/>			
				{this.state.dialogIndex > -1 && this.state.windowWidth > 1000 ?
					<Dialog ref="dialog" modal={false}>
						<div>
							<div style={{width: '100%', textAlign: 'right'}}>
								<IconButton iconClassName="zmdi zmdi-close" onClick={this.closeDialog}/>
							</div>
							<div style={{padding: '24px'}}>
								<PackageImagesCarousel width={this.state.windowWidth} images={this.state.dialogImages} settings={this.props.carouselSettings}/>
								<div style={{marginLeft: '16px', marginRight:'16px'}}>
									<div className="clearfix" style={{display: 'block'}}>
										<div style={{width: '70%', display:'inline-block'}}>
											<h1>{this.state.packagesJson[this.state.dialogIndex].title}</h1>
											<p>Quantity Left: {this.state.packagesJson[this.state.dialogIndex].quantity}</p>
										</div>
										<div style={{display: 'inline-block', marginTop: '16px', width: '20%', textAlign: 'right'}}>
											<h1 style={{fontColor: '#E53935'}}>{this.state.packagesJson[this.state.dialogIndex].price}</h1>
										</div>
									</div>
									<br/><br/>
									<p>{this.state.packagesJson[this.state.dialogIndex].description}</p>
								</div>
							</div>
						</div>
					</Dialog>
					: <div></div>
				}
				<div style={{width:'76.67%', margin: '90px auto 90px auto'}}>
					<PackagesCarousel width={this.state.windowWidth} packages={this.state.packages} settings={this.props.carouselSettings}/>
					<PackageForm packages={this.state.packageOptions} width={this.state.windowWidth} requireImageIndex={this.state.requireImageIndex}
						onAddOrder={this.handleAddOrder}/>
					{this.state.packageOrderList}
				</div>
				{ this.state.windowWidth <= 1000 ?
					<div>
						<div style={{backgroundColor: '#1565C0', color: '#ffffff', padding: '16px 0 16px 0', textAlign:'center'}}>
							Total: ${this.state.totalPrice}
						</div>
					</div>
					: <div></div>
				}
				<Snackbar ref="addSnackbar" message="Your order has been added" action="OK" onActionTouchTap={this.closeSnackbar} autoHideDuration={2000} />
				<Snackbar ref="updateSnackbar" message="Your order has been updated" action="OK" onActionTouchTap={this.closeSnackbar} autoHideDuration={2000} />
				<Snackbar ref="deleteSnackbar" message="Your order has been deleted" action="OK" onActionTouchTap={this.closeSnackbar} autoHideDuration={2000} />
			</div>
		);
	},
});

module.exports = Customer_main;