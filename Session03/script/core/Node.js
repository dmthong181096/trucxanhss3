export class Node { // entity

    constructor() {
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this.elm = this._createElement();
        this.children = [];
    }

    get x() { return this._x; }
    set x(value) {
        this._x = value;
        this.elm.style.left = this._x + "%";
    }

    get y() { return this._y; }
    set y(value) {
        this._y = value;
        this.elm.style.top = this._y + "%";
    }
    
    get width() {
        return this._width;
    }
    set width(value) {
        this._width = value;
        this.elm.style.width = this._width + "px";
    }
    get height() {
        return this._height;
    }
    set height(value) {
        this._height = value;
        this.elm.style.height = this._height + "px";
    }

    _createElement() {
        let elm = document.createElement("div");
        // elm.style.backgroundColor = "red"
        // elm.style.backgroundImage = "url(https://demoda.vn/wp-content/uploads/2022/01/anh-nen-toi-gian-minimalist-hoat-hinh.jpg)"
        
        elm.style.width = "100px"
        elm.style.height = "100px"
        elm.style.position = "absolute";
        // elm.addEventListener("click")
        return elm;
    }

    addChild(node) {
        this.elm.appendChild(node.elm);
        this.children.push(node);
    }
    removeChild(node) {
        let index = this.children.indexOf(node);
        if (index === -1) return;
        this.elm.removeChild(node.elm);
        this.children.splice(index, 1);
    }



}