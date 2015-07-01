/** In this file, we create a React component which incorporates components provided by material-ui */

var React = require('react');
var mui = require('material-ui');
var AppBar = require('material-ui/lib/app-bar')
var LeftNav = require('material-ui/lib/left-nav')
var Menu = require('material-ui/lib/menu/menu')
var RaisedButton = mui.RaisedButton;
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

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
      accent1Color: Colors.deepOrange500
    });
  },

  leftNavOpen: function(){
    this.refs.menu.toggle();
  },

  render: function() {
    var menuItems =  [
        { route: 'get-started', text: 'Get Started' },
        { route: 'customization', text: 'Customization' },
        { route: 'components', text: 'Components' }
    ];

    var containerStyle = {
      textAlign: 'center',
      paddingTop: '0px'
    };

    var menuStyle1 = {
      marginTop: '10px'
    };

    var menuStyle2 = {
      textAlign: 'left',
      width: '80%',
      marginTop: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: '50px'
    };

    var shopList = []
    
    //Dummy Data
    var shopObjects = [
       { shopname: 'PINTU', status: 'Open', product: '3', order: '100', pic: '16' }, 
       { shopname: 'GTD', status: 'Closed', product: '3', order: '150', pic: '17' }, 
       { shopname: 'ICN', status: 'Closed', product: '3', order: '200', pic: '18' },
       { shopname: 'PINTU', status: 'Open', product: '3', order: '100', pic: '16' }, 
       { shopname: 'GTD', status: 'Closed', product: '3', order: '150', pic: '17' }, 
       { shopname: 'ICN', status: 'Closed', product: '3', order: '200', pic: '18' }
    ]
    //

    for(i in shopObjects){ 
      shop = [{
        payload: i.toString(),
        shopname: shopObjects[i]['shopname'],
        status: shopObjects[i]['status'],
        product: shopObjects[i]['product'],
        order: shopObjects[i]['order'],
        pic: shopObjects[i]['pic']
      }]
      shopList.push(<Menu style={menuStyle1} menuItems={shop} autoWidth={false} zDepth={2}/>)
    }
    return (
      <div>
        <div style={{marginBottom: '50px'}}>
        <AppBar style={containerStyle } title='Title' onLeftIconButtonTouchTap={this.leftNavOpen}/>
        <LeftNav ref='menu' docked={false} menuItems={menuItems} />
        </div>
        <div style={menuStyle2}>
          {shopList}
        </div>
      </div>
    );
  },
  
});

module.exports = Main;
