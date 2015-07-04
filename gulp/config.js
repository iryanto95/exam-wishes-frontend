var dest = './build',
  src = './src',
  mui = './node_modules/material-ui/src';

module.exports = {
  browserSync: {
    server: {
      // We're serving the src folder as well
      // for sass sourcemap linking
      baseDir: [dest, src]
    },
    files: [
      dest + '/**'
    ]
  },
  markup: {
    src: src + "/www/**",
    dest: dest
  },
  browserify: {
    // Enable source maps
    debug: true,
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{entries: src + '/app/Customer_mainApp.jsx', dest: dest, outputName: 'Customer_mainApp.js'},
                    {entries: src + '/app/app.jsx', dest: dest, outputName: 'app.js'},
                    {entries: src + '/app/admin_login_app.jsx', dest: dest, outputName: 'admin_login_app.js'},
                    {entries: src + '/app/customer_login_app.jsx', dest: dest, outputName: 'customer_login_app.js'},
                    {entries: src + '/app/admin_dashboard_app.jsx', dest: dest, outputName: 'admin_dashboard_app.js'},
                    {entries: src + '/app/admin_setting_app.jsx', dest: dest, outputName: 'admin_setting_app.js'}]
  	}
};
