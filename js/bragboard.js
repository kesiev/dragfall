function BragBoard(settings) {
    const
        BRAGBOARD_VERSION = "0.1",
        BRAGBOARD_HEADER = "BRG",
        BRAGBOARD_HASH = "#"+BRAGBOARD_HEADER,
        LOCALSTORAGE = settings.gameStorage+"_"+BRAGBOARD_HEADER,
        SIGNATURE_SEED = 208534,
        DEFAULT_NAME = "Anon",
        QRCODE_TYPE = 13,
        QRCODE_CORRECTION = "L",
        ERROR_DECODE = { isError:true, message:"Invalid brag code" },
        ERROR_VERSION = { isError:true, message:"Incompatible brag code" },
        ERROR_NONE = { isError:false },
        NAME_MAXLENGTH = 8,
        MEVALUATE_SCORE = 0,
        MEVALUATE_TIME = 1,
        CARD_WIDTH = 430,
        CARD_TEMPHEIGHT = 1000,
        CARD_PADDING = 15,
        CARD_NAME = "BRAGCARD",
        CARD_OUTLINE = "#f00",
        CARD_OUTLINEWIDTH = 4,
        TITLE_FONT = "y224",
        TITLE_COLOR_1 = "#fff",
        TITLE_COLOR_2 = "#f00",
        TITLE_SHADOWTILT = 3,
        TITLE_FONTSIZE = 20,
        TITLE_FONTWIDTH = 22,
        TITLE_RIGHTSPACING = 10,
        RULER_HEIGHT = 2,
        TEXT_TABCOLOR = "#f00",
        TEXT_FONTSIZE = 10,
        TEXT_FONT = "y224",
        TEXT_COLOR = "#fff",
        TEXT_SPACING = 10,
        TEXT_TAB = 180;

    let
        bragBoard,
        scanVideo,
        scanStream,
        scanner,
        isScannerRunning,
        isScannerStarted,
        scannerCamerasCount,
        scannerCurrentCamera,
        scannerCameras,
        scannerCache,
        isIOS = (
            /iPad|iPhone|iPod/.test(navigator.platform) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
        ) && !window.MSStream,
        isFirefox = /firefox/i.test(navigator.userAgent),
        firefoxOk = false;

    function formatTime(time) {
        time = Math.floor(time/10);
        dsec = time%100;
        time = Math.floor(time/100);
        sec = time%60;
        time = Math.floor(time/60);
        min = time%60;
        time = Math.floor(time/60);
        hours = time%60;
        return (hours ? hours.toString().padStart(2, "0")+":" : "")+min.toString().padStart(2, "0")+":"+sec.toString().padStart(2, "0")+"."+dsec.toString().padStart(2, "0");
    }

    function cyrb53(str, seed = 0) {
        let
            h1 = 0xdeadbeef ^ seed,
            h2 = 0x41c6ce57 ^ seed;
        for(let i = 0, ch; i < str.length; i++) {
            ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
        h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
        h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
        return 4294967296 * (2097151 & h2) + (h1 >>> 0);
    };

    function saveData() {
        localStorage[LOCALSTORAGE] = JSON.stringify(bragBoard);
    }

    function createBragCardData(stats) {
        let
            date = new Date(),
            scores = [];

        settings.gameModes.list.forEach(mode=>{
            let
                modeId = mode.id,
                model = settings.gameModes.models[mode.initialize.model];

            scores.push({
                v: mode.version,
                i: mode.shortId,
                s:stats[modeId].highScore || 0
            })
        })

        return {
            p:bragBoard.n,
            d:date.getTime(),
            s:scores
        }
    }

    function getScoreGameMode(score) {
        for (let i=0;i<settings.gameModes.list.length;i++) {
            let
                mode = settings.gameModes.list[i];

            if (mode.shortId == score.i) {
                return {
                    mode:mode,
                    model:settings.gameModes.models[mode.initialize.model]
                }
            }
        }
    }

    function createBragCard(bragdata) {

        let
            date = new Date(bragdata.d),
            canvas = document.createElement("canvas"),
            finalCanvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            fctx = finalCanvas.getContext("2d"),
            qr = createBragQR(bragdata),
            qrImage = createQRImage(qr, 3, 8),
            x = CARD_PADDING+CARD_OUTLINEWIDTH,
            y = CARD_PADDING+CARD_OUTLINEWIDTH;

        function printTitle(spacing) {
            ctx.fillStyle = "#000";
            ctx.fillRect(0,0,CARD_WIDTH, CARD_TEMPHEIGHT);
            ctx.textBaseline = "top";
            ctx.font = TITLE_FONTSIZE+"px "+TITLE_FONT;
            ctx.textAlign = "left";

            ctx.fillStyle = TITLE_COLOR_2;
            ctx.fillText(settings.gameName, x, y+TITLE_SHADOWTILT);
            ctx.fillStyle = TITLE_COLOR_1;
            ctx.fillText(settings.gameName, x, y);

            ctx.font = TEXT_FONTSIZE+"px "+TEXT_FONT;
            ctx.fillStyle = TEXT_COLOR;
            ctx.fillText(CARD_NAME, x+(TITLE_FONTWIDTH*settings.gameName.length)+TITLE_RIGHTSPACING, y+TITLE_FONTSIZE-TEXT_FONTSIZE);

            y+=TITLE_FONTSIZE+TITLE_SHADOWTILT+spacing;
        }

        function printRuler(spacing) {
            ctx.fillRect(x,y,CARD_WIDTH-(x*2),RULER_HEIGHT);
            y+=RULER_HEIGHT+spacing;
        }

        function printText(text, spacing) {
            ctx.font = TEXT_FONTSIZE+"px "+TEXT_FONT;
            ctx.fillStyle = TEXT_COLOR;
            ctx.textAlign = "left";
            ctx.fillText(text, x, y);
            y+=TEXT_FONTSIZE+spacing;
        }

        function printTextRight(text, spacing) {
            ctx.font = TEXT_FONTSIZE+"px "+TEXT_FONT;
            ctx.fillStyle = TEXT_COLOR;
            ctx.textAlign = "right";
            ctx.fillText(text, CARD_WIDTH-x, y);
            y+=TEXT_FONTSIZE+spacing;
        }

        function printTab(text1, text2, spacing) {
            ctx.font = TEXT_FONTSIZE+"px "+TEXT_FONT;
            ctx.fillStyle = TEXT_TABCOLOR;
            ctx.textAlign = "left";
            ctx.fillText(text1, x, y);
            ctx.fillStyle = TEXT_COLOR;
            ctx.fillText(text2, x+TEXT_TAB, y);
            y+=TEXT_FONTSIZE+spacing;
        }
        
        canvas.width = CARD_WIDTH;
        canvas.height = CARD_TEMPHEIGHT;

        printTitle(TEXT_SPACING);
        printRuler(TEXT_SPACING);

        printText("Player: "+bragdata.p, TEXT_SPACING);
        printText("Date: "+date.toDateString(), TEXT_SPACING);
        printRuler(TEXT_SPACING);
        
        bragdata.s.forEach(score=>{
            let
                mode = getScoreGameMode(score),
                scoreLine;

            switch (mode.model.mEvaluate) {
                case MEVALUATE_SCORE:{
                    scoreLine = (score.s || 0)+" pts.";
                    break;
                }
                case MEVALUATE_TIME:{
                    scoreLine = score.s ? formatTime(score.s) : "---";
                    break;
                }
            }
            printTab(mode.mode.label, scoreLine, TEXT_SPACING);
        })

        printRuler(TEXT_SPACING);
        
        ctx.drawImage(qrImage, Math.floor((CARD_WIDTH-qrImage.width)/2),y);
        y +=qrImage.height+TEXT_SPACING;

        printRuler(TEXT_SPACING);

        printTextRight(settings.gameHome+" - v"+settings.gameVersion, TEXT_SPACING);
        printRuler(CARD_PADDING+CARD_OUTLINEWIDTH);

        ctx.strokeStyle = CARD_OUTLINE;
        ctx.lineWidth = CARD_OUTLINEWIDTH;
        ctx.strokeRect(0,0,CARD_WIDTH,y);
        
        finalCanvas.width = CARD_WIDTH;
        finalCanvas.height = y;
        fctx.drawImage(canvas, 0, 0);

        return finalCanvas;
    }

    function createBragString(bragdata) {
        let
            out = BRAGBOARD_HEADER+":"+BRAGBOARD_VERSION+":"+settings.gameId+":"+settings.gameVersion+";";

        out += bragdata.p+":"+bragdata.d+";";

        bragdata.s.forEach(score=>{
            out+=score.i+"/"+score.v+"/"+score.s+":";
        })

        out = out.substr(0,out.length-1);
        out+= ";"+cyrb53(out,SIGNATURE_SEED);
        out = btoa(out);

        return out;
    }

    function createBragUrl(bragdata) {
        return window.location.href.replace(/#.*/,"")+BRAGBOARD_HASH+createBragString(bragdata);
    }

    function createBragQR(bragdata) {
        let
            url = createBragUrl(bragdata),
            qr = qrcode(QRCODE_TYPE, QRCODE_CORRECTION);

        qr.addData(url);
        qr.make();
        
        return qr;
    }

    function createQRImage(qr, cellsize, border) {
        let
            mr, mc,
            canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d"),
            moduleCount=qr.getModuleCount();

        canvas.height = canvas.width = (moduleCount * cellsize)+(border * 2);
        ctx.fillStyle = "#fff";
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle = "#000";
        
        for (let r = 0; r < moduleCount; r++)
            for (let c = 0; c < moduleCount; c++)
                if (qr.isDark(r, c))
                    ctx.fillRect(border+(c*cellsize),border+(r*cellsize), cellsize, cellsize);

        return canvas;
    }

    function decodeBragString(s) {
        try {
            s = atob(s);
            if (s) {
                let
                    chunks = s.split(";");

                if (chunks.length == 4) {
                    let
                        data = s.substr(0, s.lastIndexOf(";")),
                        signature = chunks[3] * 1;

                    if (cyrb53(data, SIGNATURE_SEED) == signature) {
                        let
                            header = chunks[0].split(":"),
                            stamp = chunks[1].split(":"),
                            body = chunks[2].split(":");

                        if (header[0] == BRAGBOARD_HEADER) {
                            /* Game version is not matched. Game mode versions are used instead */
                            if ((header[1] == BRAGBOARD_VERSION) && (header[2] == settings.gameId) && (stamp.length == 2)) {
                                let
                                    out = {
                                        p:stamp[0],
                                        d:stamp[1]*1,
                                        s:[]
                                    };

                                body.forEach(line=>{
                                    if (out) {
                                        let
                                            parts = line.split("/");

                                        if (parts.length == 3) {
                                            let
                                                modeShortId = parts[0],
                                                modeVersion = parts[1]*1,
                                                score = parts[2]*1,
                                                foundIndex = -1;

                                            settings.gameModes.list.forEach((mode,index)=>{
                                                if ((mode.shortId == modeShortId) && (mode.version == modeVersion))
                                                    out.s[index] = {
                                                        v: mode.version,
                                                        i: mode.shortId,
                                                        s:score || 0
                                                    }
                                            })
                                        } else
                                            out = 0;
                                    }
                                })

                                if (out)
                                    return {
                                        isError:false,
                                        data:out
                                    };
                            }
                            return ERROR_VERSION;
                        }

                    }
                }
            }

            return ERROR_DECODE;
        } catch(e) {
            return ERROR_DECODE;
        }
    }

    function mergeBragBoard(b) {
        let
            imported = 0;

        b.s.forEach(extscore=>{
            if (extscore.s) {
                let
                    mode = getScoreGameMode(extscore);

                if (mode && (mode.mode.version == extscore.v)) {
                    let
                        notFound = true;

                    for (let i=0;i<bragBoard.s.length;i++) {
                        let
                            found = false,
                            score = bragBoard.s[i];
                        if (score.i == extscore.i) {
                            switch (mode.model.mEvaluate) {
                                case MEVALUATE_SCORE:{
                                    if (extscore.s > score.s) {
                                        score.d = b.d;
                                        score.p = b.p;
                                        score.s = extscore.s;
                                        imported++;
                                    }
                                    break;
                                }
                                case MEVALUATE_TIME:{
                                    if (extscore.s < score.s) {
                                        score.d = b.d;
                                        score.p = b.p;
                                        score.s = extscore.s;
                                        imported++;
                                    }
                                    break;
                                }
                            }
                            notFound = false;
                            break;
                        }
                    }

                    if (notFound) {
                        bragBoard.s.push({
                            i: mode.mode.shortId,
                            v: mode.mode.version,
                            d: b.d,
                            p: b.p,
                            s: extscore.s
                        })
                        imported++;
                    }
                }
            }
        });

        if (imported)
            saveData();

        return imported;
    }

    function mergeBragBoardString(s) {
        let
            board = decodeBragString(s);

        if (board.isError)
            return board;
        else {
            let
                imported = mergeBragBoard(board.data);
            return {
                isError:false,
                message:"Imported "+imported+" "+(imported == 1 ? "brag" : "brags")
            }
        }
    }

    function waitForCameras(cb, abortcb) {
        var constraints,self=this;
        if (isIOS)
            cb(0,1,"Fake camera");
        else {
            navigator.mediaDevices.enumerateDevices().then((devices)=>{
                let
                    deviceIds = [];
                
                devices.forEach(function(device) {
                    if (device.kind === "videoinput")
                        deviceIds.push(device.deviceId);
                });

                if (isFirefox && (deviceIds.length == 0) && !sfirefoxOk) {
                    firefoxOk = true;
                    navigator.mediaDevices.getUserMedia({ video:true, audio:true }).then(()=>{
                        waitForCameras(cb, abortcb);
                    }).catch(()=>{
                        abortcb()
                    });
                }
                
                deviceIds.forEach((camera,id)=>{
                    cb(id, deviceIds.length, camera);
                })
            }).catch(() => {
                abortcb()
            }); 
        }
    }

    function scannerOnFrame(canvas, ctx) {
        let
            out = ERROR_NONE;
            
        if (isScannerRunning) {
            if (scanVideo.readyState === scanVideo.HAVE_ENOUGH_DATA) {
                let
                    result = scanner.scan(),
                    height = (canvas.width / scanVideo.videoWidth) * scanVideo.videoHeight,
                    dHeight = Math.floor((canvas.height-height)/2),
                    width = (canvas.height / scanVideo.videoHeight) * scanVideo.videoWidth,
                    dWidth = Math.floor((canvas.width-width)/2);

                if (dHeight < dWidth)
                    ctx.drawImage(scanVideo, 0, dHeight, canvas.width, height);
                else
                    ctx.drawImage(scanVideo, dWidth, 0, width, canvas.height);

                if (result && result.content) {
                    let
                        hash = result.content.replace(/.*#/,"#");
                    if (hash.startsWith(BRAGBOARD_HASH)) {
                        let
                            data = hash.substr(BRAGBOARD_HASH.length);
                        if (!scannerCache[data]) {
                            scannerCache[data] = true;
                            out = mergeBragBoardString(data);
                        }
                    }                    
                }
            }
        }
        return out;
    }

    function initializeScan() {

        scanVideo = document.createElement("video");
        scanner = new Instascan.Scanner({ video: scanVideo, continuous:false, backgroundScan:false, captureImage:false });
        scannerCameras = [];
        scannerCamerasCount = 0;
        scannerCurrentCamera = -1;
        scannerCache = {};
    }

    function startScan(id, abort) {
        let
            query,
            camera = scannerCameras[id];

        scannerCurrentCamera = id;
        scanVideo.pause();

        if (scanStream) {
            scanStream.getTracks().forEach((track)=>track.stop()); 
            isScannerRunning = false;
        }

        if (isIOS) query = { video: { facingMode: "environment" } };
        else query = { video: { "deviceId": camera } };

        navigator.mediaDevices.getUserMedia(query).then((stream)=>{
            bragBoard.camera = id;
            saveData();
            scanStream = stream;
            scanVideo.srcObject = stream;
            scanVideo.play();
            isScannerRunning = true;
        }).catch(()=>{
            abort();
        }); 

    }

    function stopScan() {
        if (isScannerRunning) {
            scanVideo.pause();
            if (scanStream)
                scanStream.getTracks().forEach((track)=>track.stop());
            isScannerRunning = false;
        }
    }

    function endScan() {
        stopScan();
    }

    function toggleTorch() {
        try {
            if (scanStream) {
                if (window.ImageCapture) {
                const track = scanStream.getVideoTracks()[0];
                    const imageCapture = new ImageCapture(track)
                    const photoCapabilities = imageCapture.getPhotoCapabilities().then(() => {
                    try {
                        track.applyConstraints({ advanced: [{torch: to}] })
                            .then(e=>{callback()})
                            .catch(e => {})
                    } catch (e) {}
                    });
                }
            }
        } catch (e) {}
    }


    return {
        initialize:()=>{
            let
                cleaned = 0,
                hash = document.location.hash;

            try {
                bragBoard = JSON.parse(localStorage[LOCALSTORAGE]);
            } catch (e) {
                bragBoard = {};
            }

            if (bragBoard.n === undefined)
                bragBoard.n = DEFAULT_NAME;
            if (bragBoard.s === undefined)
                bragBoard.s = [];

            // --- Purge older brags
            bragBoard.s = bragBoard.s.filter(s=>{
                let
                    mode = getScoreGameMode(s);
                if (s.v != mode.mode.version) {
                    cleaned++;
                    return false;
                } else
                    return true;
            });

            if (cleaned)
                saveData();

            // --- Import data from BragLink

            if (hash.startsWith(BRAGBOARD_HASH)) {
                let
                    s = hash.substr(BRAGBOARD_HASH.length);

                window.location.hash = "#";

                return mergeBragBoardString(s);
            }

            return ERROR_NONE;
        },
        debug:(stats)=>{
            let
                bragdata = createBragCardData(stats),
                canvas = createBragCard(bragdata),
                url = createBragUrl(bragdata);

            console.log(url);
            
            document.body.innerHTML = "";
            document.body.appendChild(canvas);
        },
        getBrag:(id, score)=>{
            for (let i=0;i<bragBoard.s.length;i++) {
                let
                    bragScore = bragBoard.s[i];
                if (bragScore.i == id) {
                    let
                        brag = {
                            player:bragScore.p
                        },
                        mode = getScoreGameMode(bragScore);

                    switch (mode.model.mEvaluate) {
                        case MEVALUATE_SCORE:{
                            brag.score = bragScore.s;
                            if (score >= bragScore.s)
                                brag.beaten = true;
                            break;
                        }
                        case MEVALUATE_TIME:{
                            brag.score = formatTime(bragScore.s);
                            if (score && (score <= bragScore.s))
                                brag.beaten = true;
                            break;
                        }
                    }
                    return brag;
                }
            }
        },
        clear:()=>{
            bragBoard.s = [];
            saveData();
        },
        setName:(n)=>{
            bragBoard.n = n.trim().substr(0,NAME_MAXLENGTH);
            if (!bragBoard.n)
                bragBoard.n = DEFAULT_NAME;
            saveData();
        },
        getName:()=>{
            return bragBoard.n;
        },
        scannerStart:()=>{
            if (isScannerRunning)
                endScan();
            
            initializeScan();
            waitForCameras((id, total, camera)=>{
                scannerCamerasCount = total;
                scannerCameras[id] = camera;
                if (
                    ((bragBoard.camera === undefined) && (id == total-1)) ||
                    (bragBoard.camera == id)
                )
                    startScan(id, endScan);
            },endScan);
        },
        scannerOnFrame:(canvas, ctx)=>{
            return scannerOnFrame(canvas, ctx);
        },
        scannerStop:()=>{
            endScan();
        },
        scannerChangeCamera:()=>{
            if (isScannerRunning && scannerCamerasCount) {
                let
                    nextCamera = (scannerCurrentCamera+1) % scannerCamerasCount;

                if (nextCamera != scannerCurrentCamera)
                    startScan(nextCamera, endScan);
            }
        },
        linkCopy:(stats,cb)=>{
            let
                bragdata = createBragCardData(stats),
                url = createBragUrl(bragdata);

            if (navigator.clipboard) {
                navigator.clipboard.writeText(url).then(()=>{
                    cb(true);
                }).catch(()=>{
                    cb(false);
                })
            } else
                cb(false);
        },
        linkGet:(stats)=>{
            let
                bragdata = createBragCardData(stats),
                url = createBragUrl(bragdata);

            return url;
        },
        qrGet:(stats, cellsize, border)=>{
            let
                bragdata = createBragCardData(stats),
                qr = createBragQR(bragdata),
                qrImage = createQRImage(qr, cellsize, border);
            
            return qrImage;
        },
        imageDownload:(stats, cb)=>{
            let
                bragdata = createBragCardData(stats),
                date = new Date(bragdata.d),
                canvas = createBragCard(bragdata),
                link = document.createElement('a');

            link.download = settings.gameName+"-"+settings.gameVersion+"-"+date.toISOString().split('T')[0]+".png";
            link.href = canvas.toDataURL()
            link.click();
            cb(true);
        },
        imageCopy:(stats, cb)=>{
            let
                bragdata = createBragCardData(stats),
                canvas = createBragCard(bragdata);

            try {
                canvas.toBlob(async function(blob) {
                    try {
                        const
                            data = [new ClipboardItem({ [blob.type]: blob })];
                        if (navigator.clipboard) {
                            await navigator.clipboard.write(data);
                            cb(true);
                        } else
                            cb(false);
                    } catch (error) {
                        cb(false);
                    }
                }, "image/png");
            } catch (error) {
                cb(false);
            }
        }
    }
    
}
