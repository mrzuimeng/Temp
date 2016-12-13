
cc.Class({
    extends: cc.Component,

    properties: {
                         
      button:cc.Button,
      helpbutton:cc.Button,
      //按钮声音
      audioButton:{
        default:null,
        url:cc.AudioClip
      }
    },
   
    // use this for initialization
    onLoad: function () {

       this.button.node.on('click',this.callback,this);
       this.helpbutton.node.on('click',this.helpCallback,this);
    },
    callback:function(event){

       cc.director.loadScene('game_main'); 
       cc.audioEngine.playEffect(this.audioButton); 

    },
    helpCallback:function(event){

       cc.director.loadScene('game_help');
       cc.audioEngine.playEffect(this.audioButton); 

    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
