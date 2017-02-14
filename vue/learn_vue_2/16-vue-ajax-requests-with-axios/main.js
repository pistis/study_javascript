new Vue({
    el : '#root',

    data : {
        skills : []
    },

    mounted() {
        //axios.get('skills').then(response => this.skills = response.data);

        this.skills = ['Vue.js', 'Vanila js', 'js'];
    }

});