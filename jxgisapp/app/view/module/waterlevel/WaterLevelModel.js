/**
 * Created by winnerlbm on 2018/5/19.
 */
Ext.define('jxgisapp.view.module.waterlevel.WaterLevelModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.waterlevel',

        stores: {
            /*
            A declaration of Ext.data.Store configurations that are first processed as binds to produce an effective
            store configuration. For example:

            users: {
                model: 'WaterLevel',
                autoLoad: true
            }
            */
        },

        data: {
            /* 表单页面参数 */
            // gridPageStore: {
            //     total: 0,
            //     currentPage: 0,
            //     pageSize:20
            // }
        }
    }
);