module.exports = {
    popSum:0,
    score:0,
    boolQP:false,
    popSumCount:function(){
        this.popSum++;
    },
    setSumCount:function(){
        this.popSum -= 1;
    },
    getSumCount:function(){
        
        return this.popSum;
    },

    //分数设置
    setScore:function(){

        this.score +=1;  
    },
    //获取分数
    getScore:function(){

        return this.score;
    },
    //重置score和popSum的值
    setSpop:function(){

        this.popSum = 0;
        this.score = 0;  
    },
    //判断敌机是否清屏
    boolQingPing:function(){

        this.boolQP = true; 
    },
    setBooolQp:function(){
        
        this.boolQP = false;
    },
    getBoolQp:function(){
        return this.boolQP;
    } 

};
