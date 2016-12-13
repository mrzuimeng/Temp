cc.Class({
    extends: cc.Component,

    properties: {
       button:cc.Button,
       audioButton:{
           default:null,
           url:cc.AudioClip
       }
    },

    // use this for initialization
    onLoad: function () {
       this.button.node.on('click',this.callback,this);
    },
    callback:function(event){

       cc.director.loadScene('game_Start'); 
       cc.audioEngine.playEffect(this.audioButton);

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
