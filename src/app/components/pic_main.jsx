/** In this file, we create a React component which incorporates components provided by material-ui */

var React = require('react');
var mui = require('material-ui');
var AppBar = mui.AppBar;
var Tabs = mui.Tabs;
var Tab = mui.Tab;
var Checkbox = mui.Checkbox;
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

var Card = mui.Card;
var RaisedButton  = mui.RaisedButton;

/* =====================================
	TODO:
	- Dialog
	- Make card header not fixed height
======================================== */

var RecipientCard = React.createClass({
	getInitialState: function () {
		return {
			isOpen: false,
			isDelivered: false
		};
	},
	componentDidMount: function () {
	    $(this.refs.collapseCard.getDOMNode()).paperCollapse();
	},
	countTotalOrder: function(orders) {
		var total = 0;

		orders.forEach(function(order) {
			total += order.quantity;
		});

		return total;
	},
	render: function() {
		var recipient = this.props.recipient;
		var totalOrder = this.countTotalOrder(recipient.orders);
		var orderItems = recipient.orders.map(function(order, idx) {
			return(
				<li className="order-list__item" key={idx}>
					<p className="list__item__name">{order.name}</p>
					<p className="list__item__qty">{order.quantity} qty</p>
				</li>
			);
		});
		var bgColor = recipient.isDelivered ? "#9D9D9D" : ThemeManager.getCurrentTheme().palette.primary1Color;
		var deliverButton;
		if(recipient.isDelivered) {
			deliverButton = <RaisedButton label="Mark as Undelivered" onClick={this.props.onUndeliverButtonClick} value={recipient.id} />;
		} else {
			deliverButton = <RaisedButton label="Mark as Delivered" onClick={this.props.onDeliverButtonClick} value={recipient.id} />;
		}
		return(
			<div ref="collapseCard" className="collapse-card">
				<div className="collapse-card__heading" style={{background: bgColor}}>
					<div className="collapse-card__title">
						<div className="collapse-card__title__left">
							<h2 className="recipient-name">{recipient.name}</h2>
							<p className="recipient-addr">{recipient.address}</p>
						</div>
						<div className="collapse-card__title__right">
							<span className="order-total">{totalOrder}</span>
						</div>
					</div>
				</div>
				<div className="collapse-card__body">
					<ul className="order-list">
						{orderItems}
					</ul>
					{deliverButton}
				</div>
			</div>
		)
	},
});

var DeliveryTab = React.createClass({
	getInitialState: function () {
	    return {
	        recipientList: [
				{id: '123', name: 'John Appleseed', address: 'Hall 16 #12-3-4567', isDelivered: false, orders: [{name: "Product One", quantity: 2}, {name: "Product Two", quantity: 1}, {name: "Product Three", quantity: 3}]},
				{id: '456', name: 'Jane Appleseed', address: 'Hall 15 #12-3-4567', isDelivered: true, orders: [{name: "Product One", quantity: 1}, {name: "Product Two", quantity: 3}]},
				{id: '78', name: 'Jonathan Appleseed', address: 'Hall 3 #12-3-4567', isDelivered: false, orders: [{name: "Product Three", quantity: 15}]}
			] 
	    };
	},
	sortRecipientList: function() {
		function compare(a,b) {
			if (a.isDelivered < b.isDelivered)
				return -1;
			if (a.isDelivered > b.isDelivered)
				return 1;
			return 0;
		}

		this.state.recipientList.sort(compare);
	},
	componentWillMount: function () {
		this.sortRecipientList();
	},
	componentWillUpdate : function() {
		this.sortRecipientList();
	},
	handleDeliverButtonClick: function(obj) {
		var recipientId = obj.target.value;
		var recipientList = this.state.recipientList;
		var index = recipientList.map(function(x) {return x.id; }).indexOf(recipientId);

		var recipientItem = recipientList[index];
		recipientItem.isDelivered = !recipientItem.isDelivered;

		recipientList[index] = recipientItem;
		this.setState({recipientList: recipientList});

		// TODO Call API to mark as delivered
	},
	handleUndeliverButtonClick: function(obj) {
		var recipientId = obj.target.value;
		var recipientList = this.state.recipientList;
		var index = recipientList.map(function(x) {return x.id; }).indexOf(recipientId);

		var recipientItem = recipientList[index];
		recipientItem.isDelivered = !recipientItem.isDelivered;

		recipientList[index] = recipientItem;
		this.setState({recipientList: recipientList});

		// TODO Call API to mark as undelivered
	},
	render: function() {
		var that = this;
		var recipientCards = this.state.recipientList.map(function(recipient, idx) {
			return(
				<RecipientCard recipient={recipient} key={recipient.id} onDeliverButtonClick={that.handleDeliverButtonClick} onUndeliverButtonClick={that.handleUndeliverButtonClick} />
			);
		});
		return(
			<div className="tab tab--delivery">
				{recipientCards}
			</div>
		)
	},
});

var CollectionTab = React.createClass({
	getInitialState: function () {
	    return {
	        customerList: [
				{name: 'John Appleseed', id: 1,total: 12, phone: '8888-8888', paid: false},
				{name: 'Jane Appleseed', id: 23, total: 23, phone: '1234-5678', paid: false},
				{name: 'William Appleseed', id: 45, total: 45, phone: '8765-4321', paid: true},
				{name: 'Jonathan Appleseed', id: 67, total: 52, phone: '3333-3333', paid: false},
				{name: 'Jonathan Appleseed1', id: 627, total: 52, phone: '3333-3333', paid: false},
				{name: 'Jonathan Appleseed2', id: 673, total: 52, phone: '3333-3333', paid: false},
				{name: 'Jonathan Appleseed3', id: 675, total: 52, phone: '3333-3333', paid: false},
				{name: 'Jonathan Appleseed4', id: 676, total: 52, phone: '3333-3333', paid: false},
				{name: 'Jonathan Appleseed5', id: 677, total: 52, phone: '3333-3333', paid: false},
				{name: 'Jonathan Appleseed6', id: 678, total: 52, phone: '3333-3333', paid: false},
				{name: 'Jonathan Appleseed7', id: 679, total: 52, phone: '3333-3333', paid: false},
				{name: 'Jonathan Appleseed8', id: 617, total: 52, phone: '3333-3333', paid: false},
				{name: 'Jonathan Appleseed9', id: 627, total: 52, phone: '3333-3333', paid: false},
				{name: 'Jonathan Appleseed10', id: 367, total: 52, phone: '3333-3333', paid: false},
				{name: 'Jonathan Appleseed11', id: 467, total: 52, phone: '3333-3333', paid: false},
				{name: 'Jonathan Appleseed12', id: 657, total: 52, phone: '3333-3333', paid: false},
				{name: 'Jonathan Appleseed13', id: 667, total: 52, phone: '3333-3333', paid: false},
				{name: 'Jonathan Appleseed14', id: 647, total: 52, phone: '3333-3333', paid: false},
				{name: 'Jonathan Appleseed15', id: 637, total: 52, phone: '3333-3333', paid: false},
				{name: 'Jonathan Appleseed16', id: 617, total: 52, phone: '3333-3333', paid: false},
				{name: 'Iryanto Appleseed', id: 89, total: 72, phone: '3690-0963', paid: true}
			]  
	    };
	},
	handleOnCheck: function(e, checked) {
		var selectedCustId = e.currentTarget.value;
		var isCheckboxChecked = checked;

		// TODO call API to mark/unmark customer as paid
	},
	componentDidMount: function() {
		$('.table').floatThead();
	},
	render: function() {
		var that = this;
		var customerListRows = this.state.customerList.map(function(customer, index) {
			return (
				<tr key={customer.id} className="table__row">
					<td className="table__data">{customer.name}</td>
					<td className="table__data">&#36;{customer.total}</td>
					<td className="table__data">{customer.phone}</td>
					<td className="table__data table__data--checkbox">
						<Checkbox name={"customer-" + customer.id + "-paid"} value={customer.id.toString()} defaultChecked={customer.paid} onCheck={that.handleOnCheck} />
					</td>
				</tr>
			);
		});
		return(
			<div className="tab colTab">
				<table className="table">
					<thead className="table__head" style={{background: ThemeManager.getCurrentTheme().palette.primary1Color}}>
						<tr className="table__row table__row--head">
							<th className="table__row__head">
								Sender Name
							</th>
							<th className="table__row__head">
								Total
							</th>
							<th className="table__row__head">
								Phone No.
							</th>
							<th className="table__row__head">
								Mark Paid
							</th>
						</tr>
					</thead>
					<tbody>
						{customerListRows}
					</tbody>
				</table>
			</div>
		);
	},
});

var Main = React.createClass({
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
			primary1Color: '#1965BE',
			accent1Color: Colors.white
		});
	},
	render: function() {
		var containerStyle = {
			textAlign: 'center'
		};
		return (
			<div style={containerStyle}>
				<AppBar title='' showMenuIconButton={false}>
					<img src="images/app_logo.png" style={{display: 'block', margin: '0 auto', width: '48px', height: '48px', position: 'relative', top: '8px'}}/>
				</AppBar>
				<Tabs> 
					<Tab label="Delivery" style={{textTransform: 'uppercase'}}> 
						<DeliveryTab />
					</Tab> 
					<Tab label="Collection" style={{textTransform: 'uppercase'}}> 
						<CollectionTab />
					</Tab> 
				</Tabs> 
			</div>
		);
	},
});

module.exports = Main;
