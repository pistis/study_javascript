var Workspace = Backbone.Router.extend({
    routes:{
        '*filter': 'setFilter'
    },

    setFilter: function( param ) {
        // 현재 필터를 사용중인 것으로 설정한다
        window.app.TodoFilter = param.trim() || '';

        // Todo 뷰 항목을 보이거나 숨기기 위해
        // 컬렉션에 필터 이벤트를 구동한다.
        window.app.Todos.trigger('filter');
    }
});

app.TodoRouter = new Workspace();
//Backbone.history.start();