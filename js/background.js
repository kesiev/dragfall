function BackgroundAnimation() {
    const
        BRIGHTNESS = 0.5,
        WIDTH = 1920,
        HEIGHT = 1080,
        RATIO = 1080/1920;
        
    let
        self,
        callback, brightness,
        startedId,
        started,
        quality = 1,
        speed = 0.0005,
        hAlign, vAlign,
        prevWidth, prevHeight, ox, oy, ow, oh, dx, dy,
        c = document.createElement("canvas"),
        x = c.getContext("2d"),
        C = Math.cos,
        T = Math.tan,
        S = Math.sin,
        R = (r,g,b,a)=>"rgba("+r+","+g+","+b+","+(a||1)+")";

    const
        ANIMATIONS = [
            {
                // https://www.dwitter.net/d/35900
                callback:(t)=>{
                    for(Q=96;Q-=4;)for(i=140;i--;x.fillStyle=R(0,k=C(Y)*i*9,k/3,.1))Y=C(i%Q)*i*5,x.beginPath(),
                    x.arc((S(i-t/i/2)+1)*960,Y+540,Q,0,7),x.fill()
                }
            },{
                // https://www.dwitter.net/d/933
                callback:(t)=>{
                    for(d=2e3;d--;x.fillRect(960+d*C(a),540+d*S(a),24,24))a=Math.random()*6.3,x.fillStyle=R(e=255*C(t-1e3/d*S(t-a-C(a*99/d))),99*S(a-e/d),6e4/d)
                }
            },{
                // https://www.dwitter.net/d/701
                callback:(t)=>{
                    (F=Z=>{for(x.fillStyle=R(W=1/Z*4e3,W/2,W/4),i=Z*Z*2;n=i%Z,m=i/Z|0,i--;n%2^m%2&&x.fillRect((n-t%2-1)*W,(S(t)+m-1)*W,W,W));Z&&F(Z-6)})(36)//rm
                }
            },{
                // https://www.dwitter.net/d/9672
                set:{ width:99, height: Math.floor(99 * RATIO), scale:1 },
                callback:(t)=>{
                    for(x[f='fillRect'](0,0,c.width=99,j=299);q=j--/9;x[f](50+C(i)*s*6,26+C(i*8)*s,s,s))x.shadowColor=R(j,i=j*j/1e4+t,99),s=99/q,x.shadowBlur=q
                }
            },{
                // https://www.dwitter.net/d/34861
                set:{ width:99, height: Math.floor(99 * RATIO), scale:1 },
                callback:(t)=>{
                    with(x)for(c.width=y=99;y--;beginPath(fill(arc(49+C(a=t*6-y*13),28+S(a),y,0,7))))fillStyle=`hsl(${t*30-y*2} 99%${50+30*S(t*8+3*S(y/3))}`
                }
            },{
                // https://www.dwitter.net/d/7354
                callback:(t)=>{
                    x.fillRect(0,0,2e3,2e3*!t);
                    for(n=0;n<19;n+=.01)for(i=6;i--;)x.fillStyle=R(i*n*3,i*9,i*23),x.fillRect(n*102,540+S(n/2+i-t)*440*S(n/6)**2,4,4)
                }
            },{
                // https://www.dwitter.net/d/1369
                vAlign:1,
                callback:(t)=>{
                    for(q=c.d=c.d||[],k=4e3;k--;)x.fillStyle=R(q[k]=k<80?500*Math.random():.47*(q[k-80]+q[k-79]),0,40,.2),x.fillRect(k%80*24,(45-k/80)*24,24,24)
                }
            },{
                // https://dwitter.net/d/17621
                brightness:0.8,
                callback:(t)=>{
                    with(x)for(i=35;i--;fillStyle=R(300-r/2,0,9e3/r))for(j=6;j--;fill(ellipse(960,540,r=1.18**(i*t**.1),5*r,(j+i/2+t)*.54,0,7)))beginPath()
                }
            }
        ];

    self = {
        canvas:c,
        debug:()=>{
            c.style.border = "1px solid #f00";
            c.style.position = "fixed";
            c.style.left = "10px";
            c.style.top = "10px";
            c.style.transformOrigin = "0 0";
            c.onclick = ()=>{
                c._scaled = !c._scaled;
                if (c._scaled)
                    c.style.transform = "scale(0.3)";
                else
                    c.style.transform = "";
            }
            document.body.append(c);
        },
        setQuality:(q)=>{
            quality = q;
            self.start(startedId);
        },
        start:(id)=>{
            let
                scale = quality,
                animation = ANIMATIONS[id];

            startedId = id;
            started = 0;
            prevWidth = 0;
            x.setTransform(1, 0, 0, 1, 0, 0);
            callback = animation.callback;
            brightness = animation.brightness || BRIGHTNESS;

            hAlign = animation.hAlign;
            vAlign = animation.vAlign;
            if (animation.set) {
                c.width = animation.set.width;
                c.height = animation.set.height;
                x.scale(animation.set.scale, animation.set.scale);
            } else {
                c.width = Math.floor(WIDTH/scale);
                c.height = Math.floor(HEIGHT/scale);
                x.scale(1/scale, 1/scale);
            }
        },
        render:(dt, dx, width, height, bright)=>{
            if (!started)
                started = dt;
            if ((width != prevWidth) || (height != prevHeight)) {
                let
                    ratio = c.width/width;

                prevWidth = width;
                prevHeight = height;
                oh = Math.floor(ratio * height);
                if (oh > c.height) {
                    ratio = c.height/height;
                    oh = c.height;
                }
                ow = Math.floor(ratio * width);
                
                
                switch (hAlign) {
                    case 1:{
                        ox = c.width-ow;
                        break;
                    }
                    case 2:{
                        ox = 0;
                        break;
                    }
                    default:{
                        ox = Math.floor((c.width - ow)/2);
                    }
                }

                switch (vAlign) {
                    case 1:{
                        oy = c.height-oh;
                        break;
                    }
                    case 2:{
                        oy = 0;
                        break;
                    }
                    default:{
                        oy = Math.floor((c.height - oh)/2);
                    }
                }
            }
            callback((dt-started)*speed);
            dx.filter = "brightness("+(bright*brightness)+")";
            dx.drawImage(c,ox,oy,ow,oh,0,0,width,height);
            dx.filter = "none"; 
        }
    }

    return self;
}