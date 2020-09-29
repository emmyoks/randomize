
Vue.component("randomized",{
    template:`<div class="logo">
    <h3 class="logo-main">{{text}}</h3>
</div>`,
props:['text']
})

let vmHead = new Vue({
    el:'header',
    data:{
        text:'RANDOMIZE',
        textArr:[],
        displayText:'',
        i:0
    },
    methods:{randWord: function(){
        let from,to;
            if(Math.round(Math.random())){
                this.textArr.push(this.text[this.i])
            }else{
                this.textArr.unshift(this.text[this.i])
            }
            this.displayText =this.textArr.join('');
            if(this.i === this.text.length) {
                clearInterval(this.aniInterval)
                this.displayText = this.text;}
            this.i++
    }},
    computed: {
        animate:function(){
            textArr=[],
            displayText='',
            i=0,
            this.aniInterval = setInterval(this.randWord,200);
        }
    }
})
let vmMain = new Vue({
    el:'#main',
    data:{
        display:'hide',
        result:{
           king:'john',
           queen:'rose',
           prince:'stiles',
           guard:'drake'
        }
    }
})

let vmDiceCoin = new Vue({
    el:'#dice-coin',
    data:{
        i:0,
        coin:0,
        dice:6,
        duration:-1,
        spining:false,
        coinOutcome:'',
        // Dice
        rolling:false
    },
    methods:{
        toggle:function(){
            let target = event.target
            if(target.classList.contains('active')){
                target.classList.remove('active')
            }else{
                target.classList.add('active')
            }
        },
        spinCoin:function(){
            this.i=0;
            this.duration = Math.round(Math.random()*4 +4);
            this.interval=setInterval(this.spin,200);
            this.spining = true;
        },
        spin:function(){
            if(this.i === this.duration){
                clearInterval(this.interval);
                this.spining = false;
                // this.coin ? this.coinOutcome = 'HEAD' : this.coinOutcome = 'TAIL';
            }else{
                if(this.coin){
                    this.coin = 0;
                    this.coinOutcome = 'TAIL'
                }else{
                    this.coin = 1;
                    this.coinOutcome = 'HEAD'}
                this.i++
            }
        },
        rollDice:function(){
            this.i = 0;
            this.duration = Math.round(Math.random()*4 + 4);
            this.interval = setInterval(this.roll, 200);
            this.rolling = true;
        },
        roll:function(){
            if(this.i === this.duration){
                clearInterval(this.interval);
                this.rolling = false;
            }else{
                this.dice = Math.round((Math.random()*5) + 1);
                this.i++
            }
        }
    }
})