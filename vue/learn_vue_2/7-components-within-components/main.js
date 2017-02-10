// 다른 컴포넌트를 포함하려면 root 가 필요하다
Vue.component('task-list', {
    template : `
        <div>
            <task v-for="task in tasks">{{ task.task }}</task>
        </div>
        `,

    data() {
        return {
            tasks: [
                { task: 'Go to the store', complete: true},
                { task: 'Go to the email', complete: false},
                { task: 'Go to the farm', complete: true},
                { task: 'Go to work', complete: false}
            ]
        }
    }

});

Vue.component('task', {
    template : '<li><slot></slot></li>'
});



new Vue({
    el: '#root'
});