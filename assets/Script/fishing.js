cc.Class({
    extends: cc.Component,

    properties: {
        mask:{
            default:null,
            type: cc.Mask
        },
        float:{
            default:null,
            type:cc.Node
        }
    },

    onLoad: function () {
        //当前Y位置
        this._floatPosY = cc.winSize.height/2 - this.mask.node.height;
        // 调校偏移量
        this._floatOffsetY = -200;
        //咬饵持续时间 
        this._duration = 2;
        //下移距离
        this._downDistance = 100;
        // 浮力速度
        this._upSpeed = 80;
        //下移速度
        this._downSpeed = 100;
        //随机距离
        this._randomDownDistance = Math.random() * this._downDistance;
        // 随机时间
        this._randomDownSpeed = Math.random() * this._downSpeed;
        //随机 停留时间
        this._randomDeltaTime = Math.random() * 1;
        this.float.y = -400;
       cc.log("onload");
        this.floatX = this.float.x;
    },
    getBestFloatY:function(){
        
    },
    start:function(){
       
        var ininMove = cc.moveTo(1,this.float.x,-400);
        var distanceY = 100;
        var distanceX = 148;
        var moveDown = cc.moveBy(this._randomDownDistance/this._randomDownSpeed,cc.p(distanceX, -distanceY) );
        var moveUp = cc.moveBy(this._randomDownDistance/this._upSpeed, cc.p(distanceX, distanceY) );
        moveUp = moveDown.reverse();
        var delta = cc.delayTime(this._randomDeltaTime);
        var callfunc = cc.callFunc(this.flush,this)
        var seq = cc.sequence(moveDown,delta,moveUp,delta,callfunc).repeatForever();
        // var seq2 = cc.sequence(ininMove,seq);

        this.float.runAction(seq);
         cc.log("start");
    },
    flush:function(){
         cc.log("flush",this.float.x,this.float.y);
        this._randomDownDistance = Math.random() * this._downDistance;
        this._randomDownSpeed = Math.random() * this._downSpeed;
        this._randomDeltaTime = Math.random() * 1;
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        cc.log(Math.round(this.float.x),Math.round(this.float.y));
    },

});
