function Next(colors, seed) {
    let
        incoming = [],
        random = new Random(seed),
        randomAmount = new Random(seed),
        bag,
        amountBag,
        self;

    self = {
        failureLimit:0,
        setAmount:(amounts)=>{
            amountBag = { elements:amounts };
        },
        setBlocks:(blocks)=>{
            bag = { elements:[] };
            blocks.forEach(block=>{
                for (let i=0;i<block.times;i++)
                    bag.elements.push(block);
            })
            self.failureLimit = bag.elements.length;
        },
        getAmount:()=>{
            return randomAmount.bagPick(amountBag);
        },
        addIncoming:(p)=>{
            incoming.push(p);
        },
        get:()=>{
            if (incoming.length)
                return incoming.pop();
            else {
                let
                    color = random.integer(colors);
                return {
                    color:color,
                    logicColor:color,
                    block:random.bagPick(bag)
                };
            }
        }
    };

    return self;
}
