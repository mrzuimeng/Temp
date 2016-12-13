cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {

    },
    removeUfoPop:function(){
       
       this.node.removeFromParent();
    }, 
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.y -= 3.5;
        if(this.node.y<-450){
           this.removeUfoPop();
        }
    },
});
