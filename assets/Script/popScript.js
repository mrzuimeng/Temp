
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        
       
    },

    removePop:function(){
       
       this.node.removeFromParent();
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
        this.node.y -= 4.0;
        if(this.node.y<-450){
           this.removePop();
        }
     },
});
