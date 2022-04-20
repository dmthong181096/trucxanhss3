import { Node } from "../core/Node.js";
import { Sprite } from "../core/Sprite.js";
import { Label } from "../core/Label.js";
// import { Button } from "../core/Button.js";

export class Card extends Node {
    constructor(index) {
        super();
        this.index = index;
        this.value = null;
        this._createSprite();
        this._createCover();
        this._createLabel();
    }
    _createSprite() {
        this.sprite = new Sprite();
        this.sprite.width = 100;
        this.sprite.height = 100;
        this.sprite.elm.setAttribute("isClicked","false")
        this.addChild(this.sprite);
    }
    _createCover() {
        let cover = new Node();
        cover.width = 100;
        cover.height = 100;
        // cover.elm.style.backgroundColor = "orange";
        cover.elm.style.border = "solid 1px blue";
        this.cover = cover;
        this.addChild(this.cover);
        // return cover
    }
    _createLabel() {
        let label = new Label()
        label.text = this.index
        label.elm.style.top = "45%"
        label.elm.style.left = "45%"
        label.elm.style.width = "1%"
        label.elm.style.height = "1%"
        this.label = label
        this.addChild(this.label)
    }

    setValue(value) {
        this.value = value;
        this.sprite.path = "./images/trucxanh" + value + ".jpg";
    }
    openCard() {
        // console.log("Open");
        this.cover.elm.style.display = "none"
        this.label.elm.style.display = "none"
    }
    closeCard() {
        // console.log("Close", this.index)
        this.cover.elm.style.display = "block"
        this.label.elm.style.display = "block"
        this.sprite.elm.setAttribute("isClicked","false")
    }
    hideCard() {
        this.elm.style.display = "none"
    }

    preventSelfClick () {
        // console.log("Self Clicked");
        return this.sprite.elm.getAttribute("isclicked")
    }
}

// let card = new Card(0)
// document.body.appendChild(card.elm)
