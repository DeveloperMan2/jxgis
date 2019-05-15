/**
 * Created by LBM on 2018/2/7.
 */
Ext.define('jxgisapp.view.right.RightController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.right',

    requires: [
        'Ext.util.TaskManager'
    ],

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
            moduleCard = refs.rightModuleContainerWrap,//获取主容器
            moduleLayout = moduleCard.getLayout(),
            view = hashTag,//hashTag默认值为viewType
            lastView = me.lastView,
            existingItem = moduleCard.child('component[routeId=' + hashTag + ']'),
            newView;

        //若右侧需要加载模块则显示，否则隐藏模块容器
        var rightWrap = Ext.getCmp('rightConditionWrapId');
        if (hashTag) {
            rightWrap.setHidden(false);
        } else {
            rightWrap.setHidden(true);
        }

        //若有滚动条，则每次切换视图时，滚动条位置置顶
        moduleCard.scrollTo(0, 0, true);

        //清除前面已经路由的任何窗口
        if (lastView && lastView.isWindow) {
            lastView.destroy();
        }

        lastView = moduleLayout.getActiveItem();

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
                    moduleLayout.setActiveItem(existingItem);
                }
                newView = existingItem;
            } else {
                // newView is set (did not exist already), so add it and make it the
                // activeItem.
                Ext.suspendLayouts();
                moduleLayout.setActiveItem(moduleCard.add(newView));
                Ext.resumeLayouts(true);
            }
        }

        if (newView.isFocusable(true)) {
            newView.focus();
        }

        me.lastView = newView;

        //禁用浏览器历史回退功能
        //window.history.forward(1);
    },
    //路由切换
    onRouteChange: function (id) {
        //设置当前视图
        this.setCurrentView(id);

        var me = this;
        //定制模块内容面板宽度
        var task = {
            run: function () {
                if (cu.moduleList && task) {
                    for (var i = 0; i < cu.moduleList.length; i++) {
                        var module = cu.moduleList[i];
                        if (module['url'] === id) {
                            me.getView().setWidth(module['width']);
                            return false;
                        }
                    }
                    //销毁当前任务
                    Ext.TaskManager.stop(task);
                    task = null;
                }
            },
            interval: 100
        };

        Ext.TaskManager.start(task);
    },

    /**
     * Called when the view is created
     */
    init: function () {

    }
});