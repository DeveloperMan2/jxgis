/**
 * Created by LBM on 2018/2/8.
 */
Ext.define('jxgisapp.view.test.TestController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.test',

    requires: [
        'Ext.data.Store'
    ],

    /**
     * Called when the view is created
     */
    init: function () {

    },
    //获取表单数据
    getFormData: function (form) {
        var formData = form.getForm().getValues();
        return formData;
    },
    //获取参数
    getParams: function (pageIndex) {
        var params = {};
        //获取表单数据
        var formPanel = this.getView().lookup('testConditionForm');
        if (formPanel) {
            var form = formPanel.getForm();
            var formData = form.getValues();
            for (var key in formData) {
                params[key] = formData[key];
            }
        }
        return params;
    },
    gridRenderHandler: function (grid, eOpts) {
        //模块初始化执行查询
        var params = this.getParams();
        this.loadPageData(params);
    },
    loadPageData: function (params) {
        var meView = this.getView();
        var mask = ajax.fn.showMask(meView, '数据加载中...');

        //执行成功回调
        function successCallBack(response, opts) {
            ajax.fn.hideMask(mask);
            //查询结果转json对象
            var result = Ext.JSON.decode(decodeURIComponent((response.responseText)), true);
            if (result) {
                //结果展示
                var gData = result['data'];
                var grid = meView.down('gridpanel');
                if (grid && gData) {
                    var gStore = new Ext.data.Store({
                        data: gData
                    });
                    grid.setStore(gStore);
                }
            }
        }

        //执行失败回调
        function failureCallBack(response, opts) {
            ajax.fn.hideMask(mask);
        }

		//等待服务地址获取，可以酌情注释
        for(;cu.serviceUrl != null;){break;}
        
        //此处暂时只适配查询接口
                ajax.fn.execute(params, 'GET', cu.serviceUrl + 'Test/selectTestResponseList', successCallBack, failureCallBack);
            },
    //重置条件
    resetHandler: function () {
        var formPanel = this.getView().lookup('testConditionForm');
        if (formPanel) {
            var form = formPanel.getForm();
            form.reset();
        }
    },
    //执行查询
    executeHandler: function () {
        //每次查询重置页码
        var params = this.getParams(1);
        this.loadPageData(params);
    },
     //执行删除操作
    onRemoveClick: function (view, recIndex, cellIndex, item, e, record) {
        var me = this;
        //询问是否删除
        Ext.Msg.show({
            title: '温馨提示',
            closeToolText: '关闭',
            buttonText: {
                ok: '确定',
                cancel: '取消'
            },
            message: '是否删除当前记录?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'ok') {
                    //执行删除
                    me.removeRecord(me, record);
                }
            }
        });
    },
    //删除记录
    removeRecord: function (me, record) {
        var meView = me.getView();
        var mask = ajax.fn.showMask(meView, '记录删除中...');

        //执行成功回调
        function successCallBack(response, opts) {
            ajax.fn.hideMask(mask);
            //查询结果转json对象
            var result = Ext.JSON.decode(decodeURIComponent((response.responseText)), true);
            //执行成功,web表格释放对应的记录
            if (result['status'] === 1) {
                record.drop();
            }
        }

        //执行失败回调
        function failureCallBack(response, opts) {
            ajax.fn.hideMask(mask);
        }

        //此处需要从record中获取作为删除条件的参数,删除接口地址通过sql自动生成之后补充
        ajax.fn.execute('此处传入删除接口参数', 'GET', cu.serviceUrl + '删除接口路径,如:xxx/deletexxx', successCallBack, failureCallBack);
    },
    //创建弹窗窗口
    openWindow: function (me, action, title, icon, record) {
        var win = Ext.create('Ext.window.Window', {
            title: title,
            iconCls: icon,
            closeToolText: '关闭',
            height: 500,
            width: 400,
            layout: 'fit',
            bodyPadding: 5,
            header: {
                padding: '0 5 0 0'
            },
            border: false,
            frame: false,
            modal: true,
            scrollable: true,
            resizable: false,
            constrain: true,
            closable: true,
            draggable: false
        }).show();

        var formPanel = null;
        if (action === 'detail') {
            formPanel = Ext.create('Ext.form.Panel', {
                border: true,
                bodyPadding: '10 10 0 10',
                fieldDefaults: {
                    labelAlign: 'left',
                    msgTarget: 'side',
                    labelWidth: 200,
                    labelStyle: 'font-weight:bold'
                },

                defaults: {
                    xtype: 'textfield',
                    readOnly: true,
                    border: false
                },
                layout: {
                    type: 'vbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [
                	             {
	                fieldLabel: '资源分类ID',
                    name: 'cClassifyId',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '存储桶名',
                    name: 'cText',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '资源类型标识',
                    name: 'cCode',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '存储桶标识',
                    name: 'cName',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '存储桶所在区域',
                    name: 'cLocation',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '存储桶图标',
                    name: 'cIconcls',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '备注',
                    name: 'cDescription',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '父节点ID',
                    name: 'cParentId',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '子节点ID',
                    name: 'cChildrenId',
                    margin: '0 0 10 0'
	             }             	                ]
            });
            win.add(formPanel);
            me.detailRecord(me, formPanel, record);
        } else if (action === 'edit') {
            formPanel = Ext.create('Ext.form.Panel', {
                border: true,
                bodyPadding: '10 10 0 10',
                fieldDefaults: {
                    labelAlign: 'left',
                    msgTarget: 'side',
                    labelWidth: 200,
                    labelStyle: 'font-weight:bold'
                },

                defaults: {
                    xtype: 'textfield',
                    readOnly: false,
                    border: false,
                    allowBlank: false
                },
                layout: {
                    type: 'vbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [
                	             {
	                fieldLabel: '资源分类ID',
                    name: 'cClassifyId',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '存储桶名',
                    name: 'cText',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '资源类型标识',
                    name: 'cCode',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '存储桶标识',
                    name: 'cName',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '存储桶所在区域',
                    name: 'cLocation',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '存储桶图标',
                    name: 'cIconcls',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '备注',
                    name: 'cDescription',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '父节点ID',
                    name: 'cParentId',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '子节点ID',
                    name: 'cChildrenId',
                    margin: '0 0 10 0'
	             }             	                ],
                buttons: [
                    '->',
                    {
                        text: '取消', handler: function () {
                            if (win) {
                                win.close();
                            }
                        }
                    },
                    {
                        text: '保存', formBind: true, handler: function () {
                            var mask = ajax.fn.showMask(formPanel, '保存中...');
                            //获取表单数据
                            var params = me.getFormData(formPanel);

                            //执行成功回调
                            function successCallBack(response, opts) {
                                ajax.fn.hideMask(mask);
                                //查询结果转json对象
                                var result = Ext.JSON.decode(decodeURIComponent((response.responseText)), true);
                                //执行成功,更新Web表格对应的记录
                                if (result['status'] === 1) {
                                    for (var key in params) {
                                        record.set(key, params[key]);
                                    }
                                    //重载Web表格数据
                                    record.store.reload();
                                    //关闭窗口
                                    win.close();
                                }
                            }

                            //执行失败回调
                            function failureCallBack(response, opts) {
                                ajax.fn.hideMask(mask);
                            }

                            //edit接口地址通过sql自动生成之后补充
                            ajax.fn.execute(params, 'GET', cu.serviceUrl + '编辑接口路径,如:xxx/editxxx', successCallBack, failureCallBack);
                        }
                    },
                    '->'
                ]
            });
            win.add(formPanel);
            me.editRecord(me, formPanel, record);
        } else if (action === 'add') {
            formPanel = Ext.create('Ext.form.Panel', {
                border: true,
                bodyPadding: '10 10 0 10',
                fieldDefaults: {
                    labelAlign: 'left',
                    msgTarget: 'side',
                    labelWidth: 200,
                    labelStyle: 'font-weight:bold'
                },

                defaults: {
                    xtype: 'textfield',
                    readOnly: false,
                    border: false,
                    allowBlank: false
                },
                layout: {
                    type: 'vbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [
                	             {
	                fieldLabel: '资源分类ID',
                    name: 'cClassifyId',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '存储桶名',
                    name: 'cText',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '资源类型标识',
                    name: 'cCode',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '存储桶标识',
                    name: 'cName',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '存储桶所在区域',
                    name: 'cLocation',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '存储桶图标',
                    name: 'cIconcls',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '备注',
                    name: 'cDescription',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '父节点ID',
                    name: 'cParentId',
                    margin: '0 0 10 0'
	             },             		             {
	                fieldLabel: '子节点ID',
                    name: 'cChildrenId',
                    margin: '0 0 10 0'
	             }             	                ],
                buttons: [
                    '->',
                    {
                        text: '取消', handler: function () {
                            if (win) {
                                win.close();
                            }
                        }
                    },
                    {
                        text: '保存', formBind: true, handler: function () {
                            var mask = ajax.fn.showMask(formPanel, '保存中...');
                            //获取表单数据
                            var params = me.getFormData(formPanel);

                            //执行成功回调
                            function successCallBack(response, opts) {
                                ajax.fn.hideMask(mask);
                                //查询结果转json对象
                                var result = Ext.JSON.decode(decodeURIComponent((response.responseText)), true);
                                //执行成功,更新Web表格
                                if (result['status'] === 1) {
                                    //在表格第一行插入新增的记录
                                    record.store.insert(0, params);
                                    //重载Web表格数据
                                    record.store.reload();
                                    //关闭窗口
                                    win.close();
                                }
                            }

                            //执行失败回调
                            function failureCallBack(response, opts) {
                                ajax.fn.hideMask(mask);
                            }

                            //add接口地址通过sql自动生成之后补充
                            ajax.fn.execute(params, 'GET', cu.serviceUrl + '新增接口路径,如:xxx/addxxx', successCallBack, failureCallBack);
                        }
                    },
                    '->'
                ]
            });
            win.add(formPanel);
        }
    },
    //执行详情查看操作
    onDetailClick: function (view, recIndex, cellIndex, item, e, record) {
        var me = this;
        me.openWindow(me, item['action'], item['tooltip'], item['iconCls'], record);
    },
    detailRecord: function (me, formPanel, record) {
        if (record) {
            var data = record.getData();
            if (data) {
                var form = formPanel.getForm();
                var formData = form.getValues();
                for (var key in formData) {
                    form.findField(key).setValue(data[key]);
                }
            }
        }
    },
    //执行编辑操作
    onEditClick: function (view, recIndex, cellIndex, item, e, record) {
        var me = this;
        me.openWindow(me, item['action'], item['tooltip'], item['iconCls'], record);
    },
    editRecord: function (me, formPanel, record) {
        if (record) {
            var data = record.getData();
            if (data) {
                var form = formPanel.getForm();
                var formData = form.getValues();
                for (var key in formData) {
                    form.findField(key).setValue(data[key]);
                }
            }
        }
    },
    //执行新增操作
    onAddClick: function (view, recIndex, cellIndex, item, e, record) {
        var me = this;
        me.openWindow(me, item['action'], item['tooltip'], item['iconCls'], record);
    }
    });



