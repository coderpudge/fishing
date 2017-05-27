cc.Class({
    extends: cc.Component,

    properties: {
        tips:{
            default:null,
            type:cc.Label
        },
        mask:{
            default:null,
            type: cc.Mask
        },
        float:{
            default:null,
            type:cc.Node
        },
        light:{
            default:null,
            type:cc.Node
        },
        weather:{
            default:null,
            type:cc.Sprite
        },
        dashBoard:{
            default:null,
            type:cc.Node
        },
        pointer:{
            default:null,
            type:cc.Node
        },
        optimal:{
            default:null,
            type:cc.Node
        },
        hook:{
            default:null,
            type:cc.RigidBody
        }
    },

    onLoad: function () {
        cc.log("onload");
        this._mu2 = 25;
        this._mu4 = 45;
        //当前Y位置
        this._floatPosY = this.mask.node.height;
        // 调校偏移量
        this._floatOffsetY = this._mu4;
        //咬饵持续时间 
        this._duration = 2;
        //下移距离
        this._downDistance = 100;
        // 浮力速度
        this._upSpeed = 80;
        //下移速度
        this._downSpeed = 50;
        //随机距离
        this._randomDownDistance = Math.random() * this._downDistance;
        // 随机时间
        this._randomDownSpeed = Math.random() * this._downSpeed;
        //随机 停留时间
        this._randomDeltaTime = Math.random() * 1;
        //仪表指针是否旋转状态 0 :未开始  1：开始 2：结束
        this._rotatePointer = 0;
        // this.float.y = this._floatPosY + this._floatOffsetY;
        this.eat1();
    },
    initFloat:function(){
        var initPos = cc.p(this.float.x,  this._floatOffsetY);
        cc.log("pos",initPos);
        this.float.x= initPos.x;
        this.float.y = initPos.y;
    },
    eat1:function(){
        this.float.stopAllActions();
        this.initFloat();
        var array = [
            { x:0, y:-20, duration:2, delta:1, easeInOrOut:2, easeValue:5, speed:10, repeat:1 },
            { x:0, y:10, duration:2, delta:1, easeInOrOut:2, easeValue:2, speed:5, repeat:1 },
            { x:0, y:-20, duration:2, delta:1, easeInOrOut:2, easeValue:2, speed:5, repeat:1 },
            { x:0, y:20, duration:2, delta:1, easeInOrOut:2, easeValue:2, speed:5, repeat:1 },
            { x:0, y:10, duration:2, delta:1, easeInOrOut:2, easeValue:2, speed:5, repeat:1 },
        ]
        var seqArray = [];
        for (var index = 0; index < array.length; index++) {
            var anim = array[index];
            var delta = cc.delayTime(anim.delta);
            seqArray.push(delta);
            var moveBy = cc.moveBy(anim.duration, anim.x, anim.y);
            if(anim.easeInOrOut == 1){
                //由慢到快 减速
                moveBy.easing(cc.easeIn(anim.easeValue));
            }else if(anim.easeInOrOut == 2){
                // 由快到慢 加速
                moveBy.easing(cc.easeOut(anim.easeValue));
            }else{
                
            }
            seqArray.push(moveBy);
        }
        cc.log(seqArray)

        var seq = cc.sequence(seqArray);
        this.float.runAction(seq);
        

    },
    maskMove:function(){
         // 移动鱼漂
        var p1 = cc.p(this.mask.x,this.mask.y);
        var p2 = cc.p(150,120);
        var p3 = cc.p(100,200);
        var p4 = cc.p(-10,230);
        var bezier = [];
        bezier.push(p1);
        bezier.push(p2);
        bezier.push(p3);
        bezier.push(p4);
        var bezierAction = cc.bezierBy(5,bezier);
        var bezierActionReverse = bezierAction.reverse();
        var bezierSeq = cc.sequence(bezierAction,bezierActionReverse);
        this.mask.node.runAction(bezierSeq);
    },
    rotateFloat:function(){
        // 倾斜鱼漂
        var rotateTo = cc.rotateBy(1,15);
        var rotateReverse = rotateTo.reverse();
        var rotateSeq = cc.sequence(rotateTo,rotateReverse);
        this.float.runAction(rotateSeq);
    },
    // start:function(){
       
    //     var ininMove = cc.moveTo(1,this.float.x,-400);

    //     var moveDown = cc.moveBy(this._randomDownDistance/this._randomDownSpeed,cc.p(0 , -distanceY) );
    //     var moveUp = cc.moveBy(this._randomDownDistance/this._upSpeed, cc.p(0 , distanceY) );
       
    //     var delta = cc.delayTime(this._randomDeltaTime);
    //     var callfunc = cc.callFunc(this.flush,this)
    //     var seq = cc.sequence(moveDown,delta,moveUp,delta,callfunc).repeatForever();
    //     // var seq2 = cc.sequence(ininMove,seq);

    //     this.float.runAction(seq);
    //      cc.log("start");
    // },
    onSliderHEvent (sender, eventType) {
        var progress = sender.progress;
        this.light.opacity = progress * 255;
    },
    onLightSwitch:function(){
        var switchs = this.light.getComponent(cc.Mask).enabled ;
        this.light.getComponent(cc.Mask).enabled = !switchs;
    },
    flush:function(){
         cc.log("flush",this.float.x,this.float.y);
        this._randomDownDistance = Math.random() * this._downDistance;
        this._randomDownSpeed = Math.random() * this._downSpeed;
        this._randomDeltaTime = Math.random() * 1;
    },
    rotatePointer(){
        if(this._rotatePointer == 1){
            this._rotatePointer = 2;
            this.pointer.stopAllActions();
            
            var delta = cc.delayTime(1);
            var callback = cc.callFunc(function(target){
                this.dashBoard.active = false;
                this._rotatePointer = 0;
            },this);
            var seq = cc.sequence(delta,callback);
            this.dashBoard.runAction(seq);
            var diff = Math.abs(this.optimal.rotation - this.pointer.rotation)
            if(diff < 5){
                this.tips.string = "perfect"
            }else if(diff < 15){
                this.tips.string = "good"
            }else{
                this.tips.string = "oh ..."
            }
            return;
        }else if(this._rotatePointer == 2){
            return 
        }else if(this._rotatePointer == 0){
            this._rotatePointer = 1;
            this.pointer.setRotation(-45);
            var rdm = Math.random()*30*2 - 30;
            this.optimal.setRotation(rdm);
            this.tips.string = rdm;
            this.dashBoard.active = true;

            var time = 2;
            var rotateNum = 45;
            var rotate = cc.rotateTo(time,rotateNum);
            var reverse = cc.rotateTo(time,-rotateNum);
            var seq = cc.sequence(rotate,reverse).repeatForever();
            this.pointer.runAction(seq);
        }
    },
    
    horizontalMove:function(){
        var rdm = Math.random()*5
        if(this.hook.node.x < -50 || this.hook.node.x > 50){
            rdm = - rdm;
        }

        let vec = cc.v2(rdm,0);
        let velocity =  vec.normalize().mulSelf(100);
        this.hook.linearVelocity = velocity;
    },
    verticalMove:function(){
        var rdm = Math.random()*10
        let vec = cc.v2(0,-rdm);
        let velocity =  vec.normalize().mulSelf(300);
        this.hook.linearVelocity = velocity;
    },
    zhongli:function(){
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = !physicsManager.enabled;
    },
    
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        // cc.log(Math.round(this.float.x),Math.round(this.float.y));
        cc.log("dash rotate ",Math.round(this.pointer.rotation));
    },

});
