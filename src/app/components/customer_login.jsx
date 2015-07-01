/** In this file, we create a React component which incorporates components provided by material-ui */

var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var ThemeManager = new mui.Styles.ThemeManager();
var Colors = mui.Styles.Colors;

var LoginDialog = React.createClass({
  render: function() {
    var styles = {
        titleWrapper: {
            background: ThemeManager.getCurrentTheme().palette.accent1Color,
        },
        titleContent: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
        fbLogin: {
            display: 'block', 
            height: '42px', 
            width: '227px', 
            background: 'url(images/signInFb.png) center no-repeat', 
            backgroundSize: 'auto 42px',
        }
    };

    return (
        <Paper zDepth={3} className="loginPaper">
            <div style={styles.titleWrapper} className="loginPaper__titleWrapper">
                <div className="loginPaper__titleWrapper__content">
                    <h1 style={{fontSize: '64px', lineHeight: '1', fontWeight: '100'}}>PINTU</h1>
                    <h2 style={{fontSize: '16px', fontStyle: 'italic', fontWeight: 'normal'}}>a charity shop</h2>
                </div>
            </div>
            <div className="loginPaper__contentWrapper">
                <div className="loginPaper__contentWrapper__content">
                    <a href="#" style={styles.fbLogin}/>
                </div>
            </div>
        </Paper>
    );
  }
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
            accent1Color: '#1965BE'
        });
    },

    render: function() {
        var styles = {
            wrapper: {
                width: '100%',
                height: '100vh',
                background: 'rgba(0,0,0,0.6)',
                position: 'relative'
            }
        };

        return (
            <div style={styles.wrapper}>
                <LoginDialog />
            </div>
        );
    },  
});

module.exports = Main;
