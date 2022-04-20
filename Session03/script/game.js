import { Node } from "./core/Node.js";
import { Sprite } from "./core/Sprite.js";
import { Card } from "./components/Card.js";
import { Label } from "./core/Label.js";
// import { Button } from "./core/Button.js";
 class Game extends Node{
    constructor() {
        super();
        this.start = this._load()
        this._init()
       
    }
    _init() {
        this._layoutCenter();
    }
    _load() {
        this.canClick = true
        this.canSelfClick = true
        this.firstCard = null
        this.secondCard = null
        this.score = 10000
        this.countRight = 0
        this.valueCards = []
        // this._createPlayGame()      
        this._createNewGame()
        this.cards = []
    }
    play() {
            // let element =  document.getElementById("p1")
            // element.disabled = true
            // document.getElementById("p1").disabled = true
        // this.playGame.elm.style.opacity = "0.5"
        // this.playGame.elm.disabled = true
            // this.newGame.elm.disabled = false
        this._createCards(); 
        this.elementScore = this._createScore(this.score) 
        // console.log("Play game");
    }
    resetGame() {
        // console.log("New game");
        let element =  document.getElementsByTagName("div")[0]
        element.innerHTML = " "
        // console.log(this.valueCards);
        // console.log(this.cards);
        this._load()
        this.play()
    }
    _createScore(value) {
        let score = new Label ();
        score.x = -70
        score.y = -60
        score.text = `SCORE: ${value}`
        score.width = 200
        score.fontSize = 30
        this.addChild(score)
        return score
    }
    // _createPlayGame() {
    //     this.playGame = new Label();
    //     this.playGame.x = 100
    //     this.playGame.y = -60
    //     this.playGame.width = 80
    //     this.playGame.height = 50
    //     this.playGame.elm.style.backgroundSize = "100% 100%"
    //     // this.playGame.elm.setAttribute("id","p1")s
    //     this.playGame.elm.addEventListener("click",this.play.bind(this,this.playGame))
    //     this.playGame.elm.style.backgroundImage = "url(./images/StartGame.png)"   
    //     this.addChild(this.playGame)
    // }


    _createNewGame() {
        this.newGame = new Label();
        this.newGame.x = 120
        this.newGame.y = -60
        this.newGame.width = 100
        this.newGame.height = 50
        this.newGame.elm.style.backgroundSize = "100% 100%"
        // this.newGame.elm.disabled = true
        // this.newGame.elm.style.opacity = "0.5"   
        this.newGame.elm.addEventListener("click",this.resetGame.bind(this,this.newGame))
        this.newGame.elm.style.backgroundImage = "url(./images/NewGame.png)"   
        this.addChild(this.newGame  )
    }
    _layoutCenter() {   
        this.width = 500
        this.height = 400
        this.x = 35
        this.y = 30
    }
    _createCards() {
        let indexValue = this.createValueCards() 
        for (let index = 0; index < 20; index++) {
            this.card = new Card(index);
            this.card.elm.addEventListener("click", this.onClickedCard.bind(this,this.card))
            let col = index % 5;
            let row = Math.floor(index / 5);
            this.card.elm.style.top = row*100 + "px"
            this.card.elm.style.left = col*100 + "px"
            this.card.setValue(indexValue[index])
            this.addChild(this.card)
            this.cards.push(this.card)   
        }
        // console.log(this.cards)
        return this.card
    }
    createValueCards () {
        this.valueCards = []
        for (let i = 0; i < 20; i++) {
            this.valueCards.push(i%10)
        }
        this.shuffleValueCards()
        return this.valueCards
    }
    shuffleValueCards () {
        return this.valueCards.sort(() => (Math.random() - 0.5))
    }
    onClickedCard(card) {
        if (!this.canClick) {
            return;
        }
        else{
            card.openCard()
            // if (card.preventSelfClick()=="false") {
            //     // console.log("isClicked")
            //     card.sprite.elm.setAttribute("isClicked","true")
            // }
            // else {
            //     return
            // }
        }
        if (this.card === this.firstCard) return;
        if (this.firstCard === null) {
            this.firstCard = card
            // console.log(this.firstCard);
            console.log("First: ",this.firstCard.value)
        } else { 
            this.seccondCard =  card
            if (this.seccondCard.index == this.firstCard.index) {
                this.seccondCard = null
                return
            }
                console.log("Seccod: ",this.seccondCard.value)
                this.canClick = false
                this.compareCard(this.firstCard,this.seccondCard)
                this.firstCard = null
     }
    }
    compareCard(firstCard, seccondCard){
        if (this.firstCard.value == this.seccondCard.value) {
            console.log("MATCH")
            setTimeout(() => {
                firstCard.hideCard()
                seccondCard.hideCard()
                this.canClick = true
            }, 1000);
            this.countRight++
            this.score += 1000
            // console.log(this.score) 
            if (this.countRight === 10) {
                let text = "YOU WIN!!!"
                if (confirm(text)) {
                    return this.resetGame()
                } else {
                    return this.resetGame()
                }
            } 
        } else {
            console.log("NOT MATCH")
            setTimeout(() => {
                firstCard.closeCard()
                seccondCard.closeCard()
                this.canClick = true
            }, 1000);
            this.score -= 500
            // console.log(this.score)
        }
        this.elementScore.text = `SCORE: ${this.score}`
        if (this.score <= 0) return this.endGame()
    }  
    endGame() {
        let text = "YOU LOSE!!!"
        if (confirm(text)) {
            return this.resetGame()
        } else {
            return this.resetGame()
        }
    }
}

let game = new Game();
document.body.appendChild(game.elm );


