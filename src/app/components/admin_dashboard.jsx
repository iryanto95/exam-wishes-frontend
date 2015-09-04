/** In this file, we create a React component which incorporates components provided by material-ui */

var React = require('react');
var mui = require('material-ui');
var AppBar =  mui.AppBar
var LeftNav = mui.LeftNav
var Menu = mui.Menu
var MenuItem = mui.MenuItem
var RaisedButton = mui.RaisedButton;
var Paper = mui.Paper
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

var ShopMenuItem = React.createClass({
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
      <div style={this.props.style}>
        <a href={this.props.href}>
        <Paper zDepth={3} className="clearfix shopmenu-item" style={{paddingLeft:'32px', paddingRight:'32px', paddingTop:'32px', paddingBottom:'32px', color:'black'}} >
          <div style={{float:'left'}}>
            <p style={{fontSize:'300%', marginTop:'8px'}}>{this.props.shopname} Shop</p>
            <p style={{fontSize:'200%', marginTop:'32px'}}>Status: {this.props.status}</p>
          </div>
          <div style={{float:'right', textAlign:'right'}}>
            <p style={{fontSize:'150%'}}>{this.props.order} orders </p>
            <p style={{fontSize:'150%', marginTop:'16px'}}>{this.props.product} products </p>
            <p style={{fontSize:'150%', marginTop:'16px'}}>{this.props.pic} PICs </p>
          </div>
        </Paper>
        </a>
      </div>
    );
  },
})

var ShopMenu = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render: function() {
    var shopList = []
    var shopObjects = this.props.shopItem

    for(i in shopObjects){ 
      shopList.push(<ShopMenuItem href={shopObjects[i]['URL']} style={{marginTop:'10px'}} shopname={shopObjects[i]['shopname']} status={shopObjects[i]['status']} product={shopObjects[i]['product']} order={shopObjects[i]['order']} pic={shopObjects[i]['pic']}/>)
    }

    return (
      <div>
        {shopList}
      </div>
    );
  },
})

var Main = React.createClass({
  getInitialState: function() {
    return {
      shopObjects: null
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
  componentWillMount: function() {
    ThemeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });

    //Dummy Data from DB
    var shopList = [
       { shopname: 'PINTU', status: 'Open', product: '3', order: '100', pic: '16', URL: 'http://google.com'}, 
       { shopname: 'GTD', status: 'Closed', product: '3', order: '150', pic: '17', URL: 'http://yahoo.com'}, 
       { shopname: 'ICN', status: 'Closed', product: '3', order: '200', pic: '18', URL: 'http://bing.com'},
       { shopname: 'PINTU', status: 'Open', product: '3', order: '100', pic: '16', URL: 'http://mozilla.com'}, 
       { shopname: 'GTD', status: 'Closed', product: '3', order: '150', pic: '17', URL: 'http://apple.com'}, 
       { shopname: 'ICN', status: 'Closed', product: '3', order: '200', pic: '18', URL: 'http://microsoft.com'}
    ]

    this.setState({shopObjects: shopList})
  },

  leftNavOpen: function(){
    this.refs.menu.toggle();
  },

  render: function() {
    var menuItems =  [        
        { 
          type: MenuItem.Types.LINK, 
          payload: 'http://localhost:3000/admin_dashboard.html', 
          text: 'Dashboard'
        },      
        { 
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
      textAlign: 'left',
    };

    var menuStyle2 = {
      textAlign: 'left',
      width: '90%',
      marginTop: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '50px'
    };
    
    return (
      <div>
        <div style={{marginBottom: '50px'}}>
        <AppBar style={containerStyle} title='Dashboard' onLeftIconButtonTouchTap={this.leftNavOpen}/>
        <LeftNav ref='menu' docked={false} menuItems={menuItems}/>
        </div>
        <div style={menuStyle2}>
          <ShopMenu shopItem={this.state.shopObjects}/>
        </div>
      </div>
    );
  },
  
});

module.exports = Main;