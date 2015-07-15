/** In this file, we create a React component which incorporates components provided by material-ui */

var React = require('react');
var mui = require('material-ui');
var AppBar = mui.AppBar;
var Tabs = mui.Tabs;
var Tab = mui.Tab;
var Checkbox = mui.Checkbox;
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

var customerList = [
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

var DeliveryTab = React.createClass({
	render: function() {
		return(
			<div className="tab">DELIVERY!</div>
		)
	},
});

var CollectionTab = React.createClass({
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
		var customerListRows = this.props.customerList.map(function(customer, index) {
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
						<CollectionTab customerList={customerList} />
					</Tab> 
				</Tabs> 
			</div>
		);
	},
});

module.exports = Main;
