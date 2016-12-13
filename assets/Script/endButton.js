var popSpt = require("Common"); 
cc.Class({
    extends: cc.Component,

    properties: {
      cxbutton:cc.Button,
      tcbutton:cc.Button,
      buttonSound:{
        default:null,
        url:cc.AudioClip
      }
    },

    // use this for initialization
    onLoad: function () {
       this.cxbutton.node.on('click',this.cxcallback,this);
       this.tcbutton.node.on('click',this.tcCallback,this);
    },
    cxcallback:function(event){
       
       cc.audioEngine.playEffect(this.buttonSound);
       popSpt.setSpop();
       cc.director.loadScene('game_main'); 
    },
    tcCallback:function(event){

       cc.director.end();
       cc.audioEngine.playEffect(this.buttonSound);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
