Ext.define('jxgisapp.utils.PageUtil', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'xpageutil',

    requires: [
        'Ext.toolbar.TextItem',
        'Ext.form.field.Number'
    ],

    mixins: [
        'Ext.util.StoreHolder'
    ],

    /**
     * @cfg {Ext.data.Store/String} store
     * The data source to which the paging toolbar is bound (must be the same store instance
     * used in the grid / tree). Acceptable values for this property are:
     *
     *   - Any {@link Ext.data.Store Store} class or subclass
     *   - An {@link Ext.data.Store#storeId ID of a store}
     *
     * If no `store` is provided, the `store` of the owner component (if there is an
     * owner and it has a store) is used. The owner store is bound when this component
     * is rendered.
     */

    /**
     * @cfg {Boolean} displayInfo
     * true to display the displayMsg
     */
    displayInfo: false,

    /**
     * @cfg {Boolean} prependButtons
     * true to insert any configured items _before_ the paging buttons.
     */
    prependButtons: false,

    //<locale>
    /**
     * @cfg {String} displayMsg
     * The paging status message to display. Note that this string is
     * formatted using the braced numbers {0}-{2} as tokens that are replaced by the values for start, end and total
     * respectively. These tokens should be preserved when overriding this string if showing those values is desired.
     */
    displayMsg : '当前展示第 {0} - {1} 条 | 共 {2}条记录',
    //</locale>

    //<locale>
    /**
     * @cfg {String} emptyMsg
     * The message to display when no records are found.
     */
    emptyMsg : '当前列表为空',
    //</locale>

    //<locale>
    /**
     * @cfg {String} beforePageText
     * The text displayed before the input item.
     */
    beforePageText : '当前页码',
    //</locale>

    //<locale>
    /**
     * @cfg {String} afterPageText
     * Customizable piece of the default paging text. Note that this string is formatted using
     * {0} as a token that is replaced by the number of total pages. This token should be preserved when overriding this
     * string if showing the total page count is desired.
     */
    afterPageText : '共 {0}页',
    //</locale>

    //<locale>
    /**
     * @cfg {String} firstText
     * The quicktip text displayed for the first page button.
     * **Note**: quick tips must be initialized for the quicktip to show.
     */
    firstText : '第一页',
    //</locale>

    //<locale>
    /**
     * @cfg {String} prevText
     * The quicktip text displayed for the previous page button.
     * **Note**: quick tips must be initialized for the quicktip to show.
     */
    prevText : '上一页',
    //</locale>

    //<locale>
    /**
     * @cfg {String} nextText
     * The quicktip text displayed for the next page button.
     * **Note**: quick tips must be initialized for the quicktip to show.
     */
    nextText : '下一页',
    //</locale>

    //<locale>
    /**
     * @cfg {String} lastText
     * The quicktip text displayed for the last page button.
     * **Note**: quick tips must be initialized for the quicktip to show.
     */
    lastText : '最后一页',
    //</locale>

    //<locale>
    /**
     * @cfg {String} refreshText
     * The quicktip text displayed for the Refresh button.
     * **Note**: quick tips must be initialized for the quicktip to show.
     */
    refreshText : '刷新',
    //</locale>

    /**
     * @cfg {Number} inputItemWidth
     * The width in pixels of the input field used to display and change the current page number.
     */
    inputItemWidth : 60,

    /**
     * @event change
     * Fires after the active page has been changed.
     * @param {Ext.toolbar.Paging} this
     * @param {Object} pageData An object that has these properties:
     *
     * - `total` : Number
     *
     *   The total number of records in the dataset as returned by the server
     *
     * - `currentPage` : Number
     *
     *   The current page number
     *
     * - `pageCount` : Number
     *
     *   The total number of pages (calculated from the total number of records in the dataset as returned by the
     *   server and the current {@link Ext.data.Store#pageSize pageSize})
     *
     * - `toRecord` : Number
     *
     *   The starting record index for the current page
     *
     * - `fromRecord` : Number
     *
     *   The ending record index for the current page
     */

    /**
     * @event beforechange
     * Fires just before the active page is changed. Return false to prevent the active page from being changed.
     * @param {Ext.toolbar.Paging} this
     * @param {Number} page The page number that will be loaded on change
     */

    emptyPageData: {
        total: 0,
        currentPage: 0,
        pageCount: 0,
        toRecord: 0,
        fromRecord: 0
    },

    /**
     * @inheritdoc
     */
    defaultBindProperty: 'store',

    /**
    * 翻页方法
    */

    /**
     * Gets the standard paging items in the toolbar
     * @private
     */
    getPagingItems: function() {
        var me = this,
            inputListeners = {
                scope: me,
                blur: me.onPagingBlur
            };

        inputListeners[Ext.supports.SpecialKeyDownRepeat ? 'keydown' : 'keypress'] = me.onPagingKeyDown;

        return [{
            itemId: 'first',
            tooltip: me.firstText,
            overflowText: me.firstText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-first',
            disabled: true,
            handler: me.moveFirst,
            scope: me
        },{
            itemId: 'prev',
            tooltip: me.prevText,
            overflowText: me.prevText,
            iconCls: Ext.baseCSSPrefix + 'tbar-page-prev',
            disabled: true,
            handler: me.movePrevious,
            scope: me
        },
            '-',
            me.beforePageText,
            {
                xtype: 'numberfield',
                itemId: 'inputItem',
                name: 'inputItem',
                cls: Ext.baseCSSPrefix + 'tbar-page-number',
                allowDecimals: false,
                minValue: 1,
                hideTrigger: true,
                enableKeyEvents: true,
                keyNavEnabled: false,
                selectOnFocus: true,
                submitValue: false,
                // mark it as not a field so the form will not catch it when getting fields
                isFormField: false,
                width: me.inputItemWidth,
                margin: '-1 2 3 2',
                listeners: inputListeners
            },{
                xtype: 'tbtext',
                itemId: 'afterTextItem',
                html: Ext.String.format(me.afterPageText, 1)
            },
            '-',
            {
                itemId: 'next',
                tooltip: me.nextText,
                overflowText: me.nextText,
                iconCls: Ext.baseCSSPrefix + 'tbar-page-next',
                disabled: true,
                handler: me.moveNext,
                scope: me
            },{
                itemId: 'last',
                tooltip: me.lastText,
                overflowText: me.lastText,
                iconCls: Ext.baseCSSPrefix + 'tbar-page-last',
                disabled: true,
                handler: me.moveLast,
                scope: me
            },
            '-',
            {
                itemId: 'refresh',
                tooltip: me.refreshText,
                overflowText: me.refreshText,
                iconCls: Ext.baseCSSPrefix + 'tbar-loading',
                disabled: me.store.isLoading(),
                handler: me.doRefresh,
                scope: me
            }];
    },

    initComponent : function(){
        var me = this,
            userItems = me.items || me.buttons || [],
            pagingItems;

        me.bindStore(me.store || 'ext-empty-store', true);

        //<debug>
        if (me.store && !me.store.nextPage) {
            Ext.raise('Store is not compatible with this component (does not support paging)');
        }
        //</debug>

        pagingItems = me.getPagingItems();

        if (me.prependButtons) {
            me.items = userItems.concat(pagingItems);
        } else {
            me.items = pagingItems.concat(userItems);
        }

        delete me.buttons;

        if (me.displayInfo) {
            me.items.push('->');
            me.items.push({
                xtype: 'tbtext',
                itemId: 'displayItem'
            });
        }

        me.callParent();
    },

    beforeRender: function() {
        this.callParent(arguments);

        this.updateBarInfo();
    },

    onAdded: function (owner) {
        var me = this,
            oldStore = me.store,
            autoStore = me._autoStore,
            listener, store;

        // When we are added to our first container, if we have no meaningful store,
        // switch into "autoStore" mode:
        if (autoStore === undefined) {
            me._autoStore = autoStore = !(oldStore && !oldStore.isEmptyStore);
        }

        if (autoStore) {
            listener = me._storeChangeListener;

            if (listener) {
                listener.destroy();
                listener = null;
            }

            store = owner && owner.store;
            if (store) {
                listener = owner.on({
                    destroyable: true,
                    scope: me,

                    storechange: 'onOwnerStoreChange'
                })
            }

            me._storeChangeListener = listener;
            me.onOwnerStoreChange(owner, store);
        }

        me.callParent(arguments);
    },

    onOwnerStoreChange: function (owner, store) {
        this.setStore(store || Ext.getStore('ext-empty-store'));
    },

    updateBarInfo: function() {
        var me = this;
        if (!me.store.isLoading()) {
            me.calledInternal = true;
            me.onLoad();
            me.calledInternal = false;
        }
    },

    /**
     * @private
     */
    updateInfo : function(){
        var me = this,
            displayItem = me.child('#displayItem'),
            store = me.store,
            pageData = me.getPageData(),
            count, msg;

        if (displayItem) {
            count = store.total;
            if (count === 0) {
                msg = me.emptyMsg;
            } else {
                msg = Ext.String.format(
                    me.displayMsg,
                    pageData.fromRecord,
                    pageData.toRecord,
                    pageData.total
                );
            }
            displayItem.setText(msg);
        }
    },

    /**
     * @private
     */
    onLoad : function(){
        var me = this,
            pageData,
            currPage,
            pageCount,
            afterText,
            count,
            isEmpty,
            item;

        count = me.store.total;
        isEmpty = count === 0;
        if (!isEmpty) {
            pageData = me.getPageData();
            currPage = pageData.currentPage;
            pageCount = pageData.pageCount;
            // Check for invalid current page.
            if (currPage > pageCount) {
                // If the surrent page is beyond the loaded end,
                // jump back to the loaded end if there is a valid page count.
                if (pageCount > 0) {
                    me.store.loadPage(pageCount);
                }
                // If no pages, reset the page field.
                else {
                    me.getInputItem().reset();
                }
                return;
            }
            afterText = Ext.String.format(me.afterPageText, isNaN(pageCount) ? 1 : pageCount);
        } else {
            currPage = 0;
            pageCount = 0;
            afterText = Ext.String.format(me.afterPageText, 0);
        }

        Ext.suspendLayouts();
        item = me.child('#afterTextItem');
        if (item) {
            item.update(afterText);
        }
        item = me.getInputItem();
        if (item) {
            item.setDisabled(isEmpty).setValue(currPage);
        }
        me.setChildDisabled('#first', currPage === 1 || isEmpty);
        me.setChildDisabled('#prev', currPage === 1 || isEmpty);
        me.setChildDisabled('#next', currPage === pageCount  || isEmpty);
        me.setChildDisabled('#last', currPage === pageCount  || isEmpty);
        me.setChildDisabled('#refresh', false);
        me.updateInfo();
        Ext.resumeLayouts(true);

        if (!me.calledInternal) {
            me.fireEvent('change', me, pageData || me.emptyPageData);
        }
    },

    setChildDisabled: function(selector, disabled){
        var item = this.child(selector);
        if (item) {
            item.setDisabled(disabled);
        }
    },

    /**
     * @private
     */
    getPageData: function() {
        var store = this.store,
            totalCount = store.total,
            pageCount = Math.ceil(totalCount / store.pageSize),
            toRecord = Math.min(store.currentPage * store.pageSize, totalCount);

        return {
            total : totalCount,
            currentPage : store.currentPage,
            pageCount: Ext.Number.isFinite(pageCount) ? pageCount : 1,
            fromRecord: ((store.currentPage - 1) * store.pageSize) + 1,
            toRecord: toRecord || totalCount
        };
    },

    /**
     * @private
     */
    onLoadError : function(){
        this.setChildDisabled('#refresh', false);
    },

    getInputItem: function(){
        return this.child('#inputItem');
    },

    /**
     * @private
     */
    readPageFromInput : function(pageData){
        var inputItem = this.getInputItem(),
            pageNum = false,
            v;

        if (inputItem) {
            v = inputItem.getValue();
            pageNum = parseInt(v, 10);
            if (!v || isNaN(pageNum)) {
                inputItem.setValue(pageData.currentPage);
                return false;
            }
        }
        return pageNum;
    },

    /**
     * @private
     */
    onPagingBlur : function(e){
        var inputItem = this.getInputItem(),
            curPage;

        if (inputItem) {
            curPage = this.getPageData().currentPage;
            inputItem.setValue(curPage);
        }
    },

    /**
     * @private
     */
    onPagingKeyDown : function(field, e){
        this.processKeyEvent(field, e);
    },

    processKeyEvent: function(field, e) {
        var me = this,
            key = e.getKey(),
            pageData = me.getPageData(),
            increment = e.shiftKey ? 10 : 1,
            pageNum;

        if (key === e.RETURN) {
            e.stopEvent();
            pageNum = me.readPageFromInput(pageData);
            if (pageNum !== false) {
                pageNum = Math.min(Math.max(1, pageNum), pageData.pageCount);
                if (pageNum !== pageData.currentPage && me.fireEvent('beforechange', me, pageNum) !== false) {
                    me.store.loadPage(pageNum);
                }
            }
        } else if (key === e.HOME || key === e.END) {
            e.stopEvent();
            pageNum = key === e.HOME ? 1 : pageData.pageCount;
            field.setValue(pageNum);
        } else if (key === e.UP || key === e.PAGE_UP || key === e.DOWN || key === e.PAGE_DOWN) {
            e.stopEvent();
            pageNum = me.readPageFromInput(pageData);
            if (pageNum) {
                if (key === e.DOWN || key === e.PAGE_DOWN) {
                    increment *= -1;
                }
                pageNum += increment;
                if (pageNum >= 1 && pageNum <= pageData.pageCount) {
                    field.setValue(pageNum);
                }
            }
        }
    },

    /**
     * @private
     */
    beforeLoad : function() {
        this.setChildDisabled('#refresh', true);
    },

    /**
     * Move to the first page, has the same effect as clicking the 'first' button.
     * Fires the {@link #beforechange} event. If the event returns `false`, then
     * the load will not be attempted.
     * @return {Boolean} `true` if the load was passed to the store.
     */
    moveFirst : function(){
        if (this.fireEvent('beforechange', this, 1) !== false){
            this.store.loadPage(1);
            return true;
        }
        return false;
    },

    /**
     * Move to the previous page, has the same effect as clicking the 'previous' button.
     * Fires the {@link #beforechange} event. If the event returns `false`, then
     * the load will not be attempted.
     * @return {Boolean} `true` if the load was passed to the store.
     */
    movePrevious : function(){
        var me = this,
            store = me.store,
            prev = store.currentPage - 1;

        if (prev > 0) {
            if (me.fireEvent('beforechange', me, prev) !== false) {
                store.previousPage();
                return true;
            }
        }
        return false;
    },

    /**
     * Move to the next page, has the same effect as clicking the 'next' button.
     * Fires the {@link #beforechange} event. If the event returns `false`, then
     * the load will not be attempted.
     * @return {Boolean} `true` if the load was passed to the store.
     */
    moveNext : function(){
        var me = this,
            store = me.store,
            total = me.getPageData().pageCount,
            next = store.currentPage + 1;

        if (next <= total) {
            if (me.fireEvent('beforechange', me, next) !== false) {
                store.nextPage();
                return true;
            }
        }
        return false;
    },

    /**
     * Move to the last page, has the same effect as clicking the 'last' button.
     * Fires the {@link #beforechange} event. If the event returns `false`, then
     * the load will not be attempted.
     * @return {Boolean} `true` if the load was passed to the store.
     */
    moveLast : function(){
        var me = this,
            last = me.getPageData().pageCount;

        if (me.fireEvent('beforechange', me, last) !== false) {
            me.store.loadPage(last);
            return true;
        }
        return false;
    },

    /**
     * Refresh the current page, has the same effect as clicking the 'refresh' button.
     * Fires the {@link #beforechange} event. If the event returns `false`, then
     * the load will not be attempted.
     * @return {Boolean} `true` if the load was passed to the store.
     */
    doRefresh : function(){
        var me = this,
            store = me.store,
            current = store.currentPage;

        if (me.fireEvent('beforechange', me, current) !== false) {
            store.loadPage(current);
            return true;
        }
        return false;
    },

    getStoreListeners: function() {
        return {
            beforeload: this.beforeLoad,
            load: this.onLoad,
            exception: this.onLoadError
        };
    },

    onBindStore: function() {
        if (this.rendered) {
            this.updateBarInfo();
        }
    },

    doDestroy: function() {
        var me = this,
            listener = me._storeChangeListener;

        if (listener) {
            listener.destroy();
            me._storeChangeListener = null;
        }

        me.bindStore(null);

        me.callParent();
    }
});




