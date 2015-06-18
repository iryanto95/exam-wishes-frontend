/** In this file, we create a React component which incorporates components provided by material-ui */

var React = require('react');
var mui = require('material-ui');
var Paper = mui.Paper;
var TextField = mui.TextField;
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
            accent1Color: Colors.indigoA700
        });
    },

    

    render: function() {
        var styles = {
            username: {
                display: 'block',
                margin: '16px auto 0 auto'
            },
            password: {
                display: 'block',
                margin: '0 auto'
            },
            submitButton: {
                margin: '24px 0 0 0'
            },
            forgotPassword: {
                display: 'block',
            }
        };

        return (

            <div className="adminLoginPage">
                <Paper zDepth={2} className="loginPaper">
                    <div className="loginPaper__appLogo"></div>
                    <TextField hintText="Username" style={styles.username} />
                    <TextField hintText="Password" style={styles.password} />
                    <RaisedButton label="Primary" primary={true} style={styles.submitButton} />
                    <a href='#' style={styles.forgotPassword}>Forgot Password?</a>
                </Paper>
            </div>
        );
    },  
});

module.exports = Main;
