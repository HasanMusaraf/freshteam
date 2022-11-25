import Component from '@ember/component';

export default Component.extend({

  actions: {
    save: function(){
      this.set('model.active', true);
      if (this.model.save()) {
        alert("User successfully Created")
      }
    }
  }
});
