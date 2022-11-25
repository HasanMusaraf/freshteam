import Component from '@ember/component';

export default Component.extend({

  actions: {
    save: function(){
      if (this.model.save()) {
        this.set('model.active', true);
        alert("User successfully Created")
      }
    }
  }
});
