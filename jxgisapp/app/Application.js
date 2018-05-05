/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('jxgisapp.Application', {
    extend: 'Ext.app.Application',

    name: 'jxgisapp',

    controllers: ["GlobalController"],

    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function () {
        // TODO - Launch the application
    },

    onAppUpdate: function () {
        //系统若有更新直接重载
        window.location.reload();
    }
});