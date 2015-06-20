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
            accent1Color: '#1965BE'
        });
    },

    render: function() {
        var styles = {
            background: {
                background: ThemeManager.getCurrentTheme().palette.accent1Color + ' url(images/geometry_pattern.png) center center repeat'
            },
            paper: {
                width: '90%',
                maxWidth: '800px',
                margin: '0',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                padding: '64px 0',
                boxSizing: 'border-box'
            },
            appLogo: {
                width: '192px',
                height: '192px',
                borderRadius: '50%',
                backgroundColor: ThemeManager.getCurrentTheme().palette.accent1Color,
                margin: '0 auto'
            },
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
                margin: '16px 0 0 0',
                fontStyle: 'italic',
                color: ThemeManager.getCurrentTheme().palette.accent1Color
            },
        };

        return (

            <div className="adminLoginPage" style={styles.background}>
                <Paper zDepth={5} style={styles.paper}>
                    <div style={styles.appLogo}></div>
                    <TextField hintText="Username" style={styles.username} />
                    <TextField hintText="Password" style={styles.password} />
                    <RaisedButton label="Sign In" primary={true} style={styles.submitButton} />
                    <a href='#' style={styles.forgotPassword}>Forgot Password?</a>
                </Paper>
            </div>
        );
    },  
});

module.exports = Main;
