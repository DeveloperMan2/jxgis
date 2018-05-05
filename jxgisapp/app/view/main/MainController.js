/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('jxgisapp.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',
    listen: {
        controller: {
            '#': {
                unmatchedroute: 'onRouteChange'
            }
        }
    },

    routes: {
        '#': 'onRouteChange'
    },

    lastView: null,

    //设置当前窗口视图
    setCurrentView: function (hashTag) {
        hashTag = (hashTag || '').toLowerCase();
        var me = this,
            refs = me.getReferences(),
            mainCard = refs.mainContainerWrap,//获取主容器
            mainLayout = mainCard.getLayout(),
            view = hashTag,//hashTag默认值为viewType
            lastView = me.lastView,
            existingItem = mainCard.child('component[routeId=' + hashTag + ']'),
            newView;

        //若有滚动条，则每次切换视图时，滚动条位置置顶
        mainCard.scrollTo(0, 0, true);

        //清除前面已经路由的任何窗口
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        lastView = mainLayout.getActiveItem();

        if (!existingItem) {
            newView = Ext.create({
                xtype: view,
                routeId: hashTag,  // for existingItem search later
                hideMode: 'offsets'
            });
        }

        if (!newView || !newView.isWindow) {
            // !newView means we have an existing view, but if the newView isWindow
            // we don't add it to the card layout.
            if (existingItem) {
                // We don't have a newView, so activate the existing view.
                if (existingItem !== lastView) {
                    mainLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            }
            else {
                // newView is set (did not exist already), so add it and make it the
                // activeItem.
                Ext.suspendLayouts();
                mainLayout.setActiveItem(mainCard.add(newView));
                Ext.resumeLayouts(true);
            }
        }

        if (newView.isFocusable(true)) {
            newView.focus();
        }

        me.lastView = newView;

        //禁用浏览器历史回退功能
        window.history.forward(1);
    },
    //路由切换
    onRouteChange: function (id) {
        //设置当前视图
        this.setCurrentView(id);
    },
    //主界面渲染入口
    onMainViewRender: function () {
        this.redirectTo(cu.startModuleId);
    }
});
