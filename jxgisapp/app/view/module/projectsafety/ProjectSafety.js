/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.projectsafety.ProjectSafety', {
    extend: 'Ext.Container',

    requires: [
        'jxgisapp.view.module.projectsafety.ProjectSafetyModel',
		'jxgisapp.view.module.projectsafety.ProjectSafetyController'
    ],

    /*
    Uncomment to give this component an xtype*/
    xtype: 'projectsafety',

    viewModel: {
        type: 'projectsafety'
    },

    controller: 'projectsafety',

    items: [
        /* include child components here */
    ]
});