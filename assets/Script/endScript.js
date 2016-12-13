var popSpt = require("Common"); 
cc.Class({
    extends: cc.Component,

    properties: {
        scoreDisplay:{
            default:null,
            type:cc.Label
        },
        hightScoreDisplay:{
            default:null,
            type:cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {

       this.scoreDisplay.string = '分 数：'+popSpt.getScore().toString();

       //最高分
        var heightSc = cc.sys.localStorage.getItem("heightSc");
        heightSc = heightSc==null?0:heightSc;
        if(parseInt(popSpt.getScore())>parseInt(heightSc))
        {
            cc.sys.localStorage.setItem("heightSc",popSpt.getScore()+"");
            heightSc = popSpt.getScore();
        }
        this.hightScoreDisplay.string = '最高分：'+heightSc.toString();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
