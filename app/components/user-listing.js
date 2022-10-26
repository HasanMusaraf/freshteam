import Component from '@ember/component';
import { inject as service } from '@ember/service';
// import { computed } from '@ember/object';


export default Component.extend({
    store: service(),
    init() {
        this._super(...arguments);
        this.getUser = this.get('store').findAll('user'); 
    },

    // getRandomColor: computed('randomColor',function(){
    //     this.randomColor = ['#9FDEDA','black','red','green','blue']
    //     this.randomColor.forEach(function (color){
    //       return color
    //     })
    //   })
    

    
});
