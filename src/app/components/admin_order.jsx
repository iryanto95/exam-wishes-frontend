/** In this file, we create a React component which incorporates components provided by material-ui */

var React = require('react');
var mui = require('material-ui');
var AppBar = mui.AppBar
var LeftNav = mui.LeftNav
var Paper = mui.Paper
var RaisedButton = mui.RaisedButton
var MenuItem = mui.MenuItem
var TextField = mui.TextField
var RaisedButton = mui.RaisedButton;
var DropDownMenu = mui.DropDownMenu;
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

var TbodyRow = React.createClass({
  render: function(){
    var tableBodyRow = []
    var orderObject = this.props.objectItem

    function capitalize(string){
      return string.charAt(0).toUpperCase() + string.substring(1);
    }

    for(key3 in orderObject){
      if(typeof(orderObject[key3]) == 'object'){
          for(key4 in orderObject[key3]){
            tableBodyRow.push(<th dataTitle={capitalize(key3)+" "+capitalize(key4)}>{orderObject[key3][key4]}</th>)
          }
      }
      else{
          tableBodyRow.push(<th dataTitle={key3}>{orderObject[key3]}</th>)
      }
    }

    return <tr>{tableBodyRow}</tr>;
  }
});

var Table = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render: function() {
    var tableHead1 = []
    var tableHead2 = []
    var tableBody = []
    var orderObjects = this.props.orderItems
    
    function capitalize(string){
      return string.charAt(0).toUpperCase() + string.substring(1);
    }

    {/*thead*/}
    for(key1 in orderObjects[0]){
      if(typeof(orderObjects[0][key1]) == 'object'){
          tableHead1.push(<th colSpan={Object.keys(orderObjects[0][key1]).length.toString()}>{capitalize(key1)}</th>)
          for(key2 in orderObjects[0][key1]){
            tableHead2.push(<th>{capitalize(key2)}</th>)
          }
      }
      else{
          tableHead1.push(<th rowSpan="2">{capitalize(key1)}</th>)
      }
    }

    for(i in orderObjects){
      tableBody.push(<TbodyRow objectItem={orderObjects[i]}/>)
    }
    return (
      <div>
        <table id="table" className="table table-responsive-vertical table-bordered table-striped table-mc-light-blue">
            <thead>
              <tr>{tableHead1}</tr>
              <tr>{tableHead2}</tr>
            </thead>
            <tbody>
              {tableBody}
            </tbody>
          </table>
      </div>
    );
  },
})

var Main = React.createClass({
  getInitialState: function() {
      return {
        orderItems: [
          {
            ID: 1, 
            sender: { name: 'Jonathan Lie', address: '36 Nanyang Crescent Singapore 637635 Hall 15 #71-5-14', phone: '90610677'},
            recipient: { name: 'Frederikus Hudi', address: '36 Nanyang Crescent Singapore 637635 Hall 15 #71-5-14', phone: '90610677'},
            order: { product: 3, price: 3.50 },
            PIC: { name: 'Iryanto Jaya', hall: 'Non Hall', phone: '90610677' }
          },
          {
            ID: 2, 
            sender: { name: 'Dillon Amadeo', address: '36 Nanyang Crescent Singapore 637635 Hall 15 #71-5-14', phone: '90610677'},
            recipient: { name: 'Sutrisno Suryajaya Dwi Putra', address: '36 Nanyang Crescent Singapore 637635 Hall 15 #71-5-14', phone: '90610677'},
            order: { product: 2, price: 3.50 },
            PIC: { name: 'Kevin Christanto Phua', hall: 'Non Hall', phone: '90610677' }
          },
          {
            ID: 3, 
            sender: { name: 'William Surya Wijaya', address: '36 Nanyang Crescent Singapore 637635 Hall 15 #71-5-14', phone: '90610677'},
            recipient: { name: 'Rima Raksanegara', address: '36 Nanyang Crescent Singapore 637635 Hall 15 #71-5-14', phone: '90610677'},
            order: { product: 1, price: 3.50 },
            PIC: { name: 'Albert Datui', hall: 'Non Hall', phone: '90610677' }
          },
          {
            ID: 4, 
            sender: { name: 'Jonathan Lie', address: '36 Nanyang Crescent Singapore 637635 Hall 15 #71-5-14', phone: '90610677'},
            recipient: { name: 'Frederikus Hudi', address: '36 Nanyang Crescent Singapore 637635 Hall 15 #71-5-14', phone: '90610677'},
            order: { product: 3, price: 3.50 },
            PIC: { name: 'Iryanto Jaya', hall: 'Non Hall', phone: '90610677' }
          },
          {
            ID: 5, 
            sender: { name: 'Dillon Amadeo', address: '36 Nanyang Crescent Singapore 637635 Hall 15 #71-5-14', phone: '90610677'},
            recipient: { name: 'Sutrisno Suryajaya Dwi Putra', address: '36 Nanyang Crescent Singapore 637635 Hall 15 #71-5-14', phone: '90610677'},
            order: { product: 2, price: 3.50 },
            PIC: { name: 'Kevin Christanto Phua', hall: 'Non Hall', phone: '90610677' }
          },
          {
            ID: 6, 
            sender: { name: 'William Surya Wijaya', address: '36 Nanyang Crescent Singapore 637635 Hall 15 #71-5-14', phone: '90610677'},
            recipient: { name: 'Rima Raksanegara', address: '36 Nanyang Crescent Singapore 637635 Hall 15 #71-5-14', phone: '90610677'},
            order: { product: 1, price: 3.50 },
            PIC: { name: 'Albert Datui', hall: 'Non Hall', phone: '90610677' }
          }
        ]
      };
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  leftNavOpen: function(){
    this.refs.menu.toggle();
  },
  sortTableMethod: function(e, selectedIndex, menuItem){
    sortMethod = menuItem['text']
    sortBy = this.refs.sortBy.getInputNode().value.split(" ")

    orderList = this.state.orderItems
    orderList.sort(function(a,b) {
        var x = (sortBy.length == 1 ? a[sortBy[0]] : (sortBy[0] == "PIC"? a[sortBy[0]][sortBy[1].toLowerCase()] : a[sortBy[0].toLowerCase()][sortBy[1].toLowerCase()]));
        var y = (sortBy.length == 1 ? b[sortBy[0]] : (sortBy[0] == "PIC"? b[sortBy[0]][sortBy[1].toLowerCase()]: b[sortBy[0].toLowerCase()][sortBy[1].toLowerCase()]));
        if(x < y){
          return (sortMethod == "Ascending" ? -1 : 1)
        }
        else if(x > y){
          return (sortMethod == "Ascending" ? 1 : -1)
        }
        else{
          return 0
        }
    });

    this.setState({orderItems: orderList});
  },
  sortTableBy: function(e, selectedIndex, menuItem){
    sortMethod = this.refs.sortMethod.getInputNode().value
    sortBy = menuItem['text'].split(" ")

    orderList = this.state.orderItems
    orderList.sort(function(a,b) {
        var x = (sortBy.length == 1 ? a[sortBy[0]] : (sortBy[0] == "PIC"? a[sortBy[0]][sortBy[1].toLowerCase()] : a[sortBy[0].toLowerCase()][sortBy[1].toLowerCase()]));
        var y = (sortBy.length == 1 ? b[sortBy[0]] : (sortBy[0] == "PIC"? b[sortBy[0]][sortBy[1].toLowerCase()]: b[sortBy[0].toLowerCase()][sortBy[1].toLowerCase()]));
        if(x < y){
          return (sortMethod == "Ascending" ? -1 : 1)
        }
        else if(x > y){
          return (sortMethod == "Ascending" ? 1 : -1)
        }
        else{
          return 0
        }
    });
    this.setState({orderItems: orderList});
  },
  printPage: function(){
    window.print()
  },
  render: function() {
    var menuItems =  [        
        { 
          type: MenuItem.Types.LINK, 
          payload: 'http://localhost:3000/admin_dashboard.html', 
          text: 'Dashboard'
        },        { 
          type: MenuItem.Types.LINK, 
          payload: 'http://localhost:3000/admin_setting.html', 
          text: 'Setting'
        },
        { 
          type: MenuItem.Types.LINK, 
          payload: 'http://localhost:3000/admin_order.html', 
          text: 'Order'
        },
    ];

    var containerStyle = {
      textAlign: 'Left',
    };

    var settingPaper = {
      padding: '32px'
    };

    var menuItemsSortMethod = [
       { payload: '1', text: 'Ascending' },
       { payload: '2', text: 'Descending' }
    ];

    var menuItemsSortBy = [
       { payload: '1', text: 'ID' },
       { payload: '2', text: 'Sender Name' },
       { payload: '3', text: 'Recipient Name' },
       { payload: '4', text: 'Order Product' },
       { payload: '5', text: 'PIC Name' },
    ];

    var menuStyle2 = {
      width: '90%',
      marginTop: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '50px'
    };

    return (
      <div>
        <div style={{marginBottom: '50px'}} className="div-navbar">
        <AppBar style={containerStyle } title='Order' onLeftIconButtonTouchTap={this.leftNavOpen}/>
        <LeftNav ref='menu' docked={false} menuItems={menuItems}/>
        </div>
        <div style={menuStyle2} className="div-paper">
          <Paper className="paper-table" style={settingPaper} zDepth={4}>
          <div style={{textAlign:'center'}} >
            <span style={{float:'left', fontWeight:'bold', fontSize:'150%', paddingTop:'12px'}}>Total Order: {this.state.orderItems.length} </span>
            <div className="print-button-hidden" style={{display:'inline-block'}}><RaisedButton label="PRINT" primary={true} onClick={this.printPage}/></div>
            <div style={{float:'right'}}>
            <DropDownMenu ref='sortMethod' menuItems={menuItemsSortMethod} style={containerStyle} onChange={this.sortTableMethod}/>
            <DropDownMenu ref='sortBy' menuItems={menuItemsSortBy} style={containerStyle} onChange={this.sortTableBy}/>
            </div>
          </div>
          <Table orderItems={this.state.orderItems} />
          </Paper>
          </div>
      </div>
    );
  },
});

module.exports = Main;