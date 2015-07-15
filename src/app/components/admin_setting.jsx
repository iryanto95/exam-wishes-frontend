/** In this file, we create a React component which incorporates components provided by material-ui */

var React = require('react');
var mui = require('material-ui');
var AppBar = require('material-ui/lib/app-bar')
var LeftNav = require('material-ui/lib/left-nav')
var Paper = require('material-ui/lib/paper')
var TextField = require('material-ui/lib/text-field')
var RaisedButton = mui.RaisedButton;
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

var Main = React.createClass({
  getInitialState: function() {
      return {
        charShopName: 0,
        charScope: 0,
        charDescription: 0
      };
  },
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  componentWillMount: function() {
    ThemeManager.setPalette({
      accent1Color: Colors.deepOrange500
    });
  },
  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  leftNavOpen: function(){
    this.refs.menu.toggle();
  },
  countShopNameChar: function(){
    charShopName = this.refs.shopname.getValue().length
    this.setState({charShopName: charShopName});
  },
  countScopeChar: function(){
    charScope = this.refs.scope.getValue().length
    this.setState({charScope: charScope});
  },
  countDescriptionChar: function(){
    charDescription = this.refs.description.getValue().length
    this.setState({charDescription: charDescription});
  },
  scopeFocused: function(){
    this.refs.scope.focus();
  },
  descriptionFocused: function(){
    this.refs.description.focus();
  },
  render: function() {
    var menuItems =  [
        { route: 'get-started', text: 'Get Started' },
        { route: 'customization', text: 'Customization' },
        { route: 'components', text: 'Components' }
    ];

    var containerStyle = {
      textAlign: 'center',
    };

    var settingPaper = {
      textAlign: 'left',
      width: '80%',
      paddingLeft: '64px',
      paddingRight: '64px',
      paddingTop: '64px',
      paddingBottom: '64px',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)'      
    };
    
    return (
      <div className="adminSetting">
        <AppBar style={containerStyle } title='Admin Setting' onLeftIconButtonTouchTap={this.leftNavOpen}/>
        <LeftNav ref='menu' docked={false} menuItems={menuItems} />
        <div className="adminSetting__content">
          <Paper style={settingPaper} Depth={2}>
            <div>
              <TextField ref='shopname' hintText="Input your shop name" floatingLabelText="Shop Name" fullWidth={true} maxLength={50} onChange={this.countShopNameChar} onEnterKeyDown={this.scopeFocused}/>
            </div>
            <div style={{textAlign: 'right'}}>{this.state.charShopName}/50</div>
            {/*<div>Scope</div>*/}
            <div>
              <TextField ref='scope' hintText="Input the scope of your shop" floatingLabelText="Scope" fullWidth={true} maxLength={50} onChange={this.countScopeChar} onEnterKeyDown={this.descriptionFocused}/>
            </div>
            <div style={{textAlign: 'right'}}>{this.state.charScope}/50</div>
            {/*<div>Description</div>*/}
            <div>
              <TextField ref='description' hintText="Write your shop description" floatingLabelText="Description" multiLine={true} fullWidth={true} maxLength={120} onChange={this.countDescriptionChar} rows={4}/>
            </div>
            <div style={{textAlign: 'right'}}>{this.state.charDescription}/120</div>
            <div style={{textAlign: 'right', marginTop:'32px'}}>
              <RaisedButton label="SAVE" primary={true} />
            </div>
          </Paper>
          </div>
      </div>
    );
  },
  
});

module.exports = Main;