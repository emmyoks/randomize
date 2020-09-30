
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
        displayResult:'hide',
        itemList:null,
        itemArr:[],
        roleList:null,
        roleArr:[],
        numItems:null,
        error:'',
        nameListph:'Input list here ...',
        result:{}
    },
    methods:{
        assign: function(){
        this.error = '';
        this.result={};
            if((this.itemArr.length !==0 && this.roleArr.length !==0) && this.itemArr.length !== this.roleArr.length){
                this.error = `Make sure both list contains the same
                number of items.\tThe name list contain
                 ${this.itemArr.length}, while the role list contain
                 ${this.roleArr.length}.`;
                 this.displayResult=''; 


            }else if(this.itemArr.length === 0){
                this.nameListph = 'You cant leave this input box empty!!!'
            }else{
                let rand,rand1,len = this.itemArr.length;
                if(this.numItems && !this.roleList){
                    for(let i = 1;i <= this.numItems;i++){
                        rand = Math.round(Math.random()* (this.itemArr.length-1))
                        this.result[i] = this.itemArr[rand];
                        this.itemArr.splice(rand,1);
                    }
                }else if(!this.numItems && !this.roleList){
                    for(let i = 1;i <=len;i++){
                        rand = Math.round(Math.random()* (this.itemArr.length-1))
                        this.result[i] = this.itemArr[rand];
                        this.itemArr.splice(rand,1);
                    }
                }else if(this.itemList && this.roleList && !this.numItems){
                    for(let i = 1;i <=len;i++){
                        rand = Math.round(Math.random()* (this.itemArr.length-1))
                        rand1 = Math.round(Math.random()* (this.roleArr.length-1))
                        this.result[`${i}.${this.roleArr[rand1]}`] = this.itemArr[rand];
                        this.itemArr.splice(rand,1);
                        this.roleArr.splice(rand1,1);
                    }
                }else if(this.itemList && this.roleList && this.numItems){
                    for(let i = 1;i <=this.numItems;i++){
                        rand = Math.round(Math.random()* (this.itemArr.length-1))
                        rand1 = Math.round(Math.random()* (this.roleArr.length-1))
                        this.result[`${i}.${this.roleArr[rand1]}`] = this.itemArr[rand];
                        this.itemArr.splice(rand,1);
                        this.roleArr.splice(rand1,1);
                    }
                }
                this.displayResult=''; 
                this.getArr()
            }
        },
      getArr:function(){
          if(this.itemList){
              this.itemArr = this.itemList.split(',');
          }else this.itemArr = [];

          if(this.roleList){
              this.roleArr = this.roleList.split(',');
          }else this.roleArr = [];
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
