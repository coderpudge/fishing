const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label;

    @property({
        default: 'hello'
    })
    text: string = 'hello';

    @property(cc.Sprite)
    mSprite : cc.Sprite;


    onLoad() {
        // init logic
        this.label.string= this.text;
    }
}
