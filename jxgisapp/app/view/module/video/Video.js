/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.video.Video', {
    extend: 'Ext.Container',

    requires: [
        'jxgisapp.view.module.video.VideoModel',
		'jxgisapp.view.module.video.VideoController'
    ],

    /*
    Uncomment to give this component an xtype */
    xtype: 'video',

    viewModel: {
        type: 'video'
    },

    controller: 'video',

    items: [
        /* include child components here */
        {
            html:'视频监测'
        }
    ]
});