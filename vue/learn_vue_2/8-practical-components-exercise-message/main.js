Vue.component('message', {
    props: ['title', 'body'],

    data() {
        return {
            isVisible: true
        };
    },

    template : `
        <article class="message" v-show="isVisible">
          <div class="message-header">
            <p>{{ title }}</p>
            <button type="button" @click="isVisible = false" class="delete"></button>
          </div>
          <div class="message-body">
            {{ body }}
          </div>
        </article>
        `

});


new Vue({
    el: '#root'
});