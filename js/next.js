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
        serialize:()=>{
            return [
                JSON.parse(JSON.stringify(incoming)),
                random.getSeed(),
                bag.list ? JSON.parse(JSON.stringify(bag.list)) : 0,
                randomAmount.getSeed(),
                amountBag.list ? JSON.parse(JSON.stringify(amountBag.list)) : 0
            ];
        },
        unserialize:(data)=>{
            incoming = data[0];
            random.setSeed(data[1]);
            if (data[2])
                bag.list = data[2];
            randomAmount.setSeed(data[3]);
            if (data[4])
                amountBag.list = data[4];
        },
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
