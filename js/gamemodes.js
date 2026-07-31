function GameModes() {
    const
        COLOR_OFF = 40,
        COLOR_LOW = 70,
        COLOR_BRIGHT = 110,
        TIMELIMIT_NONE = 0,
        TIMELIMIT_DEFAULT = 10000,
        TIMELIMIT_FAST = 5000,
        TIMELIMIT_VERYFAST = 2000,
        TIMEBAR_BASICHEIGHT = 2,
        TIMEBAR_NONEHEIGHT = 0,
        TIMEBAR_COLOR = { r:0, g:255, b:0 },
        TIMEBAR_COLOR_CRITICAL = { r:255, g:0, b:0 },
        TIMEBAR_COLOR_SURVIVAL = { r:255, g:0, b:255 },
        ROWTEXT_COLOR = { r:255, g:255, b: 255 },
        ROWTEXT_COLOR_SHADOW = { r:0, g:0, b: 0 },
        LINECLEAR_COLOR = { r:255, g:255, b:255 },
        WARNING_ROWS = 3,
        CURSORCOLOR_DEFAULT = "#f00",
        CURSORCOLOR_DRAG_DEFAULT = "#f99",
        DEFAULT_PALETTE= {
            color1:{ r:204, g:204, b:34 },
            darkColor1:{ r:64, g:64, b:0 },
            brightColor1:{ r:255, g:255, b:128 },
            shadowColor1:{ r:255, g:255, b:0 },
            color2:{ r:204, g:34, b:204 },
            darkColor2:{ r:64, g:0, b:64 },
            brightColor2:{ r:255, g:128, b:255 },
            shadowColor2:{ r:255, g:0, b:255 },
            color3:{ r:34, g:204, b:204 },
            darkColor3:{ r:0, g:64, b:64 },
            brightColor3:{ r:128, g:255, b:255 },
            shadowColor3:{ r:0, g:255, b:255 },
        },
        DEFAULT_PALETTE_2= {
            color1:{ r:204, g:34, b:34 },
            darkColor1:{ r:64, g:0, b:0 },
            brightColor1:{ r:255, g:128, b:128 },
            shadowColor1:{ r:255, g:0, b:0 },
            color2:{ r:90, g:90, b:150 },
            darkColor2:{ r:0, g:0, b:32 },
            brightColor2:{ r:128, g:128, b:255 },
            shadowColor2:{ r:0, g:0, b:255 },
            color3:{ r:204, g:204, b:34 },
            darkColor3:{ r:64, g:64, b:0 },
            brightColor3:{ r:255, g:255, b:128 },
            shadowColor3:{ r:255, g:255, b:0 },
        },
        DEFAULT_PALETTE_3= {
            color1:{ r:200, g:100, b:100 },
            darkColor1:{ r:64, g:0, b:0 },
            brightColor1:{ r:255, g:128, b:128 },
            shadowColor1:{ r:255, g:100, b:100 },
            color2:{ r:60, g:150, b:60 },
            darkColor2:{ r:0, g:32, b:0 },
            brightColor2:{ r:128, g:255, b:128 },
            shadowColor2:{ r:0, g:255, b:0 },
            color3:{ r:100, g:100, b:200 },
            darkColor3:{ r:0, g:0, b:64 },
            brightColor3:{ r:128, g:128, b:255 },
            shadowColor3:{ r:100, g:100, b:255 },
        },
        DEFAULT_PALETTE_4= {
            color1:{ r:204, g:204, b:204 },
            darkColor1:{ r:64, g:64, b:64 },
            brightColor1:{ r:255, g:255, b:255 },
            shadowColor1:{ r:255, g:255, b:255 },
            color2:{ r:120, g:100, b:100 },
            darkColor2:{ r:0, g:0, b:0 },
            brightColor2:{ r:40, g:20, b:20 },
            shadowColor2:{ r:60, g:30, b:30 },
            color3:{ r:255, g:80, b:80 },
            darkColor3:{ r:64, g:0, b:0 },
            brightColor3:{ r:160, g:20, b:20 },
            shadowColor3:{ r:255, g:0, b:0 },
        },
        DEFAULT_PALETTE_5= {
            color1:{ r:204, g:204, b:100 },
            darkColor1:{ r:128, g:64, b:0 },
            brightColor1:{ r:255, g:255, b:0 },
            shadowColor1:{ r:255, g:255, b:0 },
            color2:{ r:100, g:100, b:204 },
            darkColor2:{ r:64, g:0, b:64 },
            brightColor2:{ r:0, g:0, b:255 },
            shadowColor2:{ r:0, g:0, b:255 },
            color3:{ r:254, g:100, b:204 },
            darkColor3:{ r:60, g:0, b:60 },
            brightColor3:{ r:255, g:0, b:255 },
            shadowColor3:{ r:255, g:0, b:255 },
        },
        DEFAULT_PALETTE_6= {
            color1:{ r:104, g:34, b:204 },
            darkColor1:{ r:34, g:0, b:64 },
            brightColor1:{ r:255, g:128, b:255 },
            shadowColor1:{ r:155, g:0, b:255 },
            color2:{ r:224, g:128, b:224 },
            darkColor2:{ r:64, g:0, b:64 },
            brightColor2:{ r:255, g:128, b:255 },
            shadowColor2:{ r:255, g:0, b:255 },
            color3:{ r:30, g:80, b:80 },
            darkColor3:{ r:12, g:34, b:34 },
            brightColor3:{ r:128, g:255, b:255 },
            shadowColor3:{ r:0, g:255, b:255 },
        },
        GAMEOVER_DEFAULT = [
            { fontSize:13, text:"GAME OVER", blink:true },
            { fontSize:7, highScore:"< NEW HIGH SCORE >", blink:true },
            { fontSize:7, text:"LEVEL" },
            { fontSize:7, level:true },
            { fontSize:7, text:"LINES" },
            { fontSize:7, lines:true },
            { spacing:7 },
            { fontSize:7, text:"< HIT ANYWHERE >", blink:true },
            { fontSize:7, text:"< TO CONTINUE >", blink:true }
        ],
        GAMEOVER_TIMED = [
            { fontSize:13, text:"GAME OVER", blink:true },
            { spacing:7 },
            { fontSize:7, text:"< HIT ANYWHERE >", blink:true },
            { fontSize:7, text:"< TO CONTINUE >", blink:true }
        ],
        GAMEOVER_TIMEDCLEAR = [
            { fontSize:13, text:"GAME CLEAR", blink:true },
            { fontSize:7, highScore:"< NEW BEST TIME >", blink:true },
            { spacing:7 },
            { fontSize:7, text:"< HIT ANYWHERE >", blink:true },
            { fontSize:7, text:"< TO CONTINUE >", blink:true }
        ],
        GAMEOVER_CHILL = [
            { fontSize:13, text:"GOODBYE!", blink:true },
            { fontSize:7, highScore:"< NEW HIGH SCORE >", blink:true },
            { fontSize:7, text:"LINES" },
            { fontSize:7, lines:true },
            { spacing:7 },
            { fontSize:7, text:"< HIT ANYWHERE >", blink:true },
            { fontSize:7, text:"< TO CONTINUE >", blink:true }
        ],
        DEFAULT_BLOCKS = [
            { times:5, kick:1, pattern:[ [ 1 ] ] },
            { times:5, kick:2, pattern:[ [ 1, 1 ] ] },
            { times:5, kick:3, pattern:[ [ 1, 1, 1 ] ] },
            { times:5, kick:1, pattern:[
                [ 1 ],
                [ 1 ]
            ]},{
                times:1,
                kick:2,
                pattern:[
                    [ 1 ],
                    [ 1, 1 ]
                ]
            },{
                times:1,
                kick:2,
                pattern:[
                    [ 0, 1 ],
                    [ 1, 1 ]
                ]
            },{
                times:1,
                kick:2,
                pattern:[
                    [ 1, 1 ],
                    [ 1, 0 ]
                ]
            },{
                times:1,
                kick:2,
                pattern:[
                    [ 1, 1 ],
                    [ 0, 1 ]
                ]
            }
        ],
        LINE_BLOCKS = [
            { times:1, kick:1, pattern:[ [ 1 ] ] },
            { times:1, kick:2, pattern:[ [ 1, 1 ] ] },
            { times:1, kick:3, pattern:[ [ 1, 1, 1 ] ] }
        ],
        TRACK_SHATTERBLOCK = [  
            {
                afterLevel:-1,
                everyLines:15,
                addIncoming:[
                    {
                        special:true,
                        color:6,
                        unshatterable:true,
                        solid:true,
                        logicColor:100,
                        block:{ kick:2, pattern:[ [ 1, 1 ], [ 1, 1 ] ]}
                    }
                ]
            }
        ],
        TRACK_LOCKEDBLOCK =[
            {
                afterLevel:7,
                everyLines:10,
                addIncoming:[
                    {
                        special:true,
                        color:7,
                        unmovable:true,
                        logicColor:100,
                        block:{ kick:3, pattern:[ [ 1, 1, 1 ] ]}
                    },{
                        special:true,
                        color:7,
                        unmovable:true,
                        logicColor:100,
                        block:{ kick:2, pattern:[ [ 1, 1 ] ]}
                    }
                ]
            },{
                afterLevel:-1,
                everyLines:10,
                addIncoming:[
                    {
                        special:true,
                        color:7,
                        unmovable:true,
                        logicColor:100,
                        block:{ kick:2, pattern:[ [ 1, 1 ] ]}
                    }
                ]
            }
        ],
        TRACK_LONGBLOCK = [
            {
                afterLevel:28,
                everyLines:15,
                addIncoming:[
                    {
                        special:true,
                        color:8,
                        logicColor:0,
                        solid:true,
                        block:{ kick:1, pattern:[ [ 1 ], [ 1 ], [ 1 ] ]}
                    },{
                        special:true,
                        color:9,
                        logicColor:1,
                        solid:true,
                        block:{ kick:1, pattern:[ [ 1 ], [ 1 ], [ 1 ] ]}
                    },{
                        special:true,
                        color:10,
                        logicColor:2,
                        solid:true,
                        block:{ kick:1, pattern:[ [ 1 ], [ 1 ], [ 1 ] ]}
                    }
                ]
            },{
                afterLevel:4,
                everyLines:15,
                addIncoming:[
                    {
                        special:true,
                        color:8,
                        logicColor:0,
                        solid:true,
                        block:{ kick:1, pattern:[ [ 1 ], [ 1 ], [ 1 ] ]}
                    },{
                        special:true,
                        color:9,
                        logicColor:1,
                        solid:true,
                        block:{ kick:1, pattern:[ [ 1 ], [ 1 ], [ 1 ] ]}
                    }
                ]
            }
        ],
        MTIMEBAR_NONE = 0,
        MTIMEBAR_TIMELIMIT = 1,
        MTIMEBAR_ROUNDLIMIT = 2,
        MTIMEBAR_TUGOFWARLIMIT = 3,
        MONNEWBLOCK_NOTHING = 0,
        MONNEWBLOCK_CHECKNEWROUNDSTART = 1,
        MONNEWBLOCK_NEWTIMELIMIT = 2,
        MONNEWBLOCK_COLLECTGARBAGE = 3,
        MONTIMEOUT_NOTHING = 0,
        MONTIMEOUT_NEWLEVEL = 1,
        MONTIMEOUT_NEWTUGOFWAR = 2,
        MONTIMEOUT_AUTODROP = 3,
        MEVALUATE_SCORE = 0,
        MEVALUATE_TIME = 1;

    return {
        models:{
            standard:{
                mEvaluate:MEVALUATE_SCORE,
                mTimeBar:MTIMEBAR_TIMELIMIT,
                mResetTimeOnBlock:true,
                mNewLevelOnLines:true,
                mProgressOnLines:true,
                mGameOverOnNoBlocks:true,
                mOnNewBlock:MONNEWBLOCK_NEWTIMELIMIT,
                mOnTimeout:MONTIMEOUT_AUTODROP,
            },
            survival:{
                mEvaluate:MEVALUATE_SCORE,
                mTimeBar:MTIMEBAR_ROUNDLIMIT,
                mGameOverOnNoAutoDropBlocks:true,
                mOnNewBlock:MONNEWBLOCK_CHECKNEWROUNDSTART,
                mOnTimeout:MONTIMEOUT_NEWLEVEL,
            },
            vsYou:{
                mEvaluate:MEVALUATE_SCORE,
                mTimeBar:MTIMEBAR_TUGOFWARLIMIT,
                mProgressOnLines:true,
                mGameOverOnNoBlocks:true,
                mOnNewBlock:MONNEWBLOCK_COLLECTGARBAGE,
                mOnTimeout:MONTIMEOUT_NEWTUGOFWAR
            },
            chill:{
                mEvaluate:MEVALUATE_SCORE,
                mTimeBar:MTIMEBAR_NONE,
                mProgressOnLines:true,
                mGameOverOnNoAutoDropBlocks:true,
                mOnNewBlock:MONNEWBLOCK_NOTHING,
                mOnTimeout:MONTIMEOUT_NOTHING,
            },
            timed:{
                mEvaluate:MEVALUATE_TIME,
                mTimeBar:MTIMEBAR_TIMELIMIT,
                mResetTimeOnBlock:true,
                mProgressOnLines:true,
                mGameOverOnNoBlocks:true,
                mOnNewBlock:MONNEWBLOCK_NEWTIMELIMIT,
                mOnTimeout:MONTIMEOUT_AUTODROP,
            },
        },
        list:[
            {
                id:"standard",
                version:2,
                shortId:"ST",
                label:"Standard mode",
                initialize:{
                    model:"standard",
                    introText:"LET'S DRAG & FALL",
                    blocks:DEFAULT_BLOCKS,
                    setColors:2,
                    setGarbageColors:2,
                    fieldWidth:8,
                    fieldHeight:16,
                    colorGems:true,
                    setIdleStyle:[ { r:COLOR_LOW, g:COLOR_OFF, b:COLOR_OFF }, { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_LOW }, 0.001, 1, 1, 0.4 ],
                    playMusic:"track1",
                    autoDrop:3,
                    autoDropAmount:3,
                    quickDropActive:true,
                    quickDropThreshold:8,
                    quickDropAutoDrops:3,
                    quickDropAutoDropsAmount:3,
                    quickDropColor:{ r:200, g:20, b:20 },
                    quickDropShadowColor:{ r:0, g:0, b:0 },
                    quickDropFontColor:{ r:255, g:255, b:255 },
                    quickDropDisabledColor:{ r:154, g:104, b:104 },
                    quickDropFontDisabledColor:{ r:170, g:170, b:170 },
                    timeLimitPoints:1,
                    allClearAutoDrop:3,
                    allClearAutoDropAmount:3,
                    setTimeLimit:TIMELIMIT_DEFAULT,
                    setTimeLimitIsFall:false,
                    linesPerLevel:10,
                    levelCap:30,
                    setBlocksPerDrop:[ 2 ],
                    footerbarColorBorder:"#33c",
                    footerbarColor:"#004",
                    footerbarColorText:{ r:255, g:255, b:255 },
                    gameoverColor:{ r:0, g:0, b:68 },
                    gameoverColorBorder:{ r:51, g:51, b:204 },
                    timebarBasicHeight:TIMEBAR_BASICHEIGHT,
                    timebarColor:TIMEBAR_COLOR,
                    timebarColorCritical:TIMEBAR_COLOR_CRITICAL,
                    rowtextColor: ROWTEXT_COLOR,
                    rowtextColorShadow: ROWTEXT_COLOR_SHADOW,
                    warningRows: WARNING_ROWS,
                    palette:DEFAULT_PALETTE,
                    levelMultiplierRatio: 0.2,
                    setBackgroundAnimation:0,
                    lineClearColor: LINECLEAR_COLOR,
                    gameoverLines: GAMEOVER_DEFAULT,
                    gameoverSound: "gameover",
                    particlesLineClearColor: { r:255, g:255, b:255 },
                    particlesFallColor:{ r:128, g:128, b:128 },
                    cursorColor:CURSORCOLOR_DEFAULT,
                    cursorColorDrag:CURSORCOLOR_DRAG_DEFAULT
                },
                progress:[
                    TRACK_SHATTERBLOCK,
                    TRACK_LOCKEDBLOCK,
                    TRACK_LONGBLOCK,[
                        {
                            atLevel:28,
                            setColors:3,
                            setGarbageColors:3
                        },{
                            atLevel:26,
                            setBlocksPerDrop:[ 3 ],
                            setTimeLimitIsFall:true,
                            setTimeLimit:TIMELIMIT_VERYFAST
                        },{
                            atLevel:24,
                            setBlocksPerDrop:[ 2, 3 ],
                            setTimeLimitIsFall:true,
                            setTimeLimit:TIMELIMIT_VERYFAST
                        },{
                            atLevel:22,
                            setBlocksPerDrop:[ 2 ],
                            setTimeLimitIsFall:true,
                            setTimeLimit:TIMELIMIT_VERYFAST
                        },{
                            atLevel:20,
                            setBlocksPerDrop:[ 3 ],
                            setTimeLimitIsFall:true,
                            setTimeLimit:TIMELIMIT_FAST
                        },{
                            atLevel:18,
                            setBlocksPerDrop:[ 2, 3 ],
                            setTimeLimitIsFall:true,
                            setTimeLimit:TIMELIMIT_FAST
                        },{
                            atLevel:16,
                            setBlocksPerDrop:[ 2 ],
                            setTimeLimitIsFall:true,
                            setTimeLimit:TIMELIMIT_FAST
                        },{
                            atLevel:14,
                            setBlocksPerDrop:[ 3 ],
                            setTimeLimitIsFall:true,
                            setTimeLimit:TIMELIMIT_DEFAULT
                        },{
                            atLevel:12,
                            setBlocksPerDrop:[ 2, 3 ],
                            setTimeLimitIsFall:true,
                            setTimeLimit:TIMELIMIT_DEFAULT
                        },{
                            atLevel:10,
                            setBlocksPerDrop:[ 2 ],
                            setTimeLimitIsFall:true,
                            setTimeLimit:TIMELIMIT_DEFAULT
                        },{
                            atLevel:8,
                            setBlocksPerDrop:[ 3 ]
                        },{
                            atLevel:6,
                            setBlocksPerDrop:[ 2, 3 ]
                        }
                    ],[
                        {
                            atLevel:20,
                            setIdleStyle:[ { r:COLOR_BRIGHT, g:COLOR_OFF, b:COLOR_OFF }, { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_OFF }, 0.001, 1, 1, 0.4 ],
                        },{
                            atLevel:18,
                            setIdleStyle:[ { r:COLOR_OFF, g:COLOR_LOW, b:COLOR_OFF }, { r:COLOR_LOW, g:COLOR_OFF, b:COLOR_LOW }, 0.001, 1, 1, 0.4 ],
                        },{
                            atLevel:17,
                            setIdleStyle:[ { r:COLOR_BRIGHT, g:COLOR_OFF, b:COLOR_OFF }, { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_OFF }, 0.003, 2, 0, 0.2 ],
                        },{
                            atLevel:16,
                            setIdleStyle:[ { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_BRIGHT }, { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_OFF }, 0.003, 2, 0, 0.2 ],
                        },{
                            atLevel:15,
                            setIdleStyle:[ { r:COLOR_OFF, g:COLOR_BRIGHT, b:COLOR_OFF }, { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_OFF }, 0.003, 2, 0, 0.2 ],
                        },{
                            atLevel:14,
                            setIdleStyle:[ { r:COLOR_BRIGHT, g:COLOR_OFF, b:COLOR_OFF }, { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_OFF }, 0.003, 0, 2, 0.2 ],
                        },{
                            atLevel:13,
                            setIdleStyle:[ { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_BRIGHT }, { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_OFF }, 0.003, 0, 2, 0.2 ],
                        },{
                            atLevel:12,
                            setIdleStyle:[ { r:COLOR_OFF, g:COLOR_BRIGHT, b:COLOR_OFF }, { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_OFF }, 0.003, 0, 2, 0.2 ],
                        },{
                            atLevel:11,
                            setIdleStyle:[ { r:COLOR_OFF, g:COLOR_BRIGHT, b:COLOR_OFF }, { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_OFF }, 0.001, 0, 2, 0.2 ],
                        },{
                            atLevel:10,
                            setIdleStyle:[ { r:COLOR_BRIGHT, g:COLOR_BRIGHT, b:COLOR_BRIGHT }, { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_OFF }, 0.001, 2, 0, 0.2 ],
                        },{
                            atLevel:9,
                            setIdleStyle:[ { r:COLOR_OFF, g:COLOR_BRIGHT, b:COLOR_OFF }, { r:COLOR_BRIGHT, g:COLOR_OFF, b:COLOR_BRIGHT }, 0.002, 2, 0, 0.4 ],
                        },{
                            atLevel:8,
                            setIdleStyle:[ { r:COLOR_BRIGHT, g:COLOR_OFF, b:COLOR_OFF }, { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_BRIGHT }, 0.002, 0, 2, 0.4 ],
                        },{
                            atLevel:7,
                            setIdleStyle:[ { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_BRIGHT }, { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_OFF }, 0.001, 2, 0, 0.4 ],
                        },{
                            atLevel:6,
                            setIdleStyle:[ { r:COLOR_OFF, g:COLOR_BRIGHT, b:COLOR_OFF }, { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_OFF }, 0.001, 2, 1, 0.4 ],
                        },{
                            atLevel:5,
                            setIdleStyle:[ { r:COLOR_BRIGHT, g:COLOR_OFF, b:COLOR_OFF }, { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_OFF }, 0.001, 1, 2, 0.4 ],
                        },{
                            atLevel:4,
                            setIdleStyle:[ { r:COLOR_LOW, g:COLOR_LOW, b:COLOR_OFF }, { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_LOW }, 0.002, 1, 1, 0.04 ],
                        },{
                            atLevel:3,
                            setIdleStyle:[ { r:COLOR_LOW, g:COLOR_OFF, b:COLOR_OFF }, { r:COLOR_LOW, g:COLOR_LOW, b:COLOR_LOW }, 0.001, 1, 0, 0.4 ],
                        },{
                            atLevel:2,
                            setIdleStyle:[ { r:COLOR_OFF, g:COLOR_LOW, b:COLOR_OFF }, { r:COLOR_LOW, g:COLOR_OFF, b:COLOR_LOW }, 0.001, 1, 1, 0.4 ],
                        }
                    ],[
                        {
                            atLevel:20,
                            playMusic:"track5"
                        },{
                            atLevel:15,
                            playMusic:"track4"
                        },{
                            atLevel:10,
                            playMusic:"track3"
                        },{
                            atLevel:5,
                            playMusic:"track2"
                        }
                    ],[
                        {
                            atLevel:20,
                            setBackgroundAnimation:6
                        },{
                            atLevel:18,
                            setBackgroundAnimation:0
                        },{
                            atLevel:15,
                            setBackgroundAnimation:5
                        },{
                            atLevel:12,
                            setBackgroundAnimation:4
                        },{
                            atLevel:9,
                            setBackgroundAnimation:3
                        },{
                            atLevel:6,
                            setBackgroundAnimation:2
                        },{
                            atLevel:3,
                            setBackgroundAnimation:1
                        }
                    ]
                ]
            },{
                id:"40lines",
                version:1,
                shortId:"40",
                label:"40-lines mode",
                initialize:{
                    model:"timed",
                    introText:"Gotta go fast!",
                    blocks:DEFAULT_BLOCKS,
                    setColors:2,
                    setGarbageColors:2,
                    fieldWidth:8,
                    fieldHeight:16,
                    colorGems:false,
                    setIdleStyle:[ { r:COLOR_BRIGHT, g:COLOR_OFF, b:COLOR_BRIGHT }, { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_BRIGHT }, 0.001, 1, 0, 0.4 ],
                    playMusic:"track3",
                    autoDrop:3,
                    autoDropAmount:3,
                    quickDropActive:true,
                    quickDropThreshold:8,
                    quickDropAutoDrops:3,
                    quickDropAutoDropsAmount:3,
                    quickDropColor:{ r:99, g:20, b:136 },
                    quickDropShadowColor:{ r:0, g:0, b:0 },
                    quickDropFontColor:{ r:173, g:85, b:213 },
                    quickDropDisabledColor:{ r:39, g:0, b:58 },
                    quickDropFontDisabledColor:{ r:86, g:42, b:106 },
                    timeLimitPoints:1,
                    allClearAutoDrop:3,
                    allClearAutoDropAmount:3,
                    setTimeLimit:TIMELIMIT_DEFAULT,
                    setTimeLimitIsFall:false,
                    linesPerLevel:40,
                    levelCap:0,
                    setBlocksPerDrop:[ 2 ],
                    footerbarColorBorder:"#9941c1",
                    footerbarColor:"#4f0074",
                    footerbarColorText:{ r:255, g:255, b:255 },
                    gameoverColor:{ r:79, g:0, b:116 },
                    gameoverColorBorder:{ r:153, g:65, b:193 },
                    timebarBasicHeight:TIMEBAR_BASICHEIGHT,
                    timebarColor:TIMEBAR_COLOR,
                    timebarColorCritical:TIMEBAR_COLOR_CRITICAL,
                    rowtextColor: ROWTEXT_COLOR,
                    rowtextColorShadow: ROWTEXT_COLOR_SHADOW,
                    warningRows: WARNING_ROWS,
                    palette:DEFAULT_PALETTE_6,
                    levelMultiplierRatio: 0.2,
                    setBackgroundAnimation:11,
                    lineClearColor: LINECLEAR_COLOR,
                    gameoverLines: GAMEOVER_TIMED,
                    gameclearLines: GAMEOVER_TIMEDCLEAR,
                    gameoverSound: "gameover",
                    particlesLineClearColor: { r:255, g:255, b:255 },
                    particlesFallColor:{ r:128, g:128, b:128 },
                    cursorColor:"#fff",
                    cursorColorDrag:CURSORCOLOR_DRAG_DEFAULT
                },
                progress:[
                    [
                        {
                            afterLevel:-1,
                            everyLines:40,
                            gameClear:true
                        }
                    ]
                ]
            },{
                id:"gatling",
                version:2,
                shortId:"GT",
                label:"Gatling mode",
                initialize:{
                    model:"standard",
                    introText:"Go! Go! Go!",
                    blocks:LINE_BLOCKS,
                    setColors:2,
                    setGarbageColors:2,
                    fieldWidth:8,
                    fieldHeight:16,
                    colorGems:true,
                    setIdleStyle:[ { r:COLOR_BRIGHT, g:COLOR_OFF, b:COLOR_OFF }, { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_OFF }, 0.001, 1, 1, 0.4 ],
                    playMusic:"track5",
                    autoDrop:5,
                    autoDropAmount:3,
                    allClearAutoDrop:5,
                    allClearAutoDropAmount:3,
                    quickDropActive:true,
                    quickDropThreshold:8,
                    quickDropAutoDrops:3,
                    quickDropAutoDropsAmount:3,
                    quickDropColor:{ r:51, g:51, b:51 },
                    quickDropShadowColor:{ r:0, g:0, b:0 },
                    quickDropFontColor:{ r:255, g:255, b:255 },
                    quickDropDisabledColor:{ r:17, g:17, b:17 },
                    quickDropFontDisabledColor:{ r:51, g:51, b:51 },
                    timeLimitPoints:1,
                    setTimeLimit:TIMELIMIT_FAST,
                    setTimeLimitIsFall:true,
                    linesPerLevel:5,
                    levelCap:60,
                    setBlocksPerDrop:[ 2 ],
                    footerbarColorBorder:"#c33",
                    footerbarColor:"#400",
                    footerbarColorText:{ r:255, g:255, b:255 },
                    gameoverColor:{ r:68, g:0, b:0 },
                    gameoverColorBorder:{ r:204, g:51, b:51 },
                    timebarBasicHeight:TIMEBAR_BASICHEIGHT,
                    timebarColor:TIMEBAR_COLOR,
                    timebarColorCritical:TIMEBAR_COLOR_CRITICAL,
                    rowtextColor: ROWTEXT_COLOR,
                    rowtextColorShadow: { r:255, g:200, b:200 },
                    warningRows: WARNING_ROWS,
                    palette:DEFAULT_PALETTE_2,
                    gameoverLines: GAMEOVER_DEFAULT,
                    gameoverSound: "gameover",
                    levelMultiplierRatio: 0.2,
                    setBackgroundAnimation:6,
                    lineClearColor: { r:255, g:0, b:0 },
                    particlesLineClearColor: { r:0, g:0, b:0 },
                    particlesFallColor:{ r:255, g:255, b:128 },
                    cursorColor:"#fff",
                    cursorColorDrag:CURSORCOLOR_DRAG_DEFAULT
                },
                progress:[
                    [  
                        {
                            afterLevel:-1,
                            everyLines:10,
                            addIncoming:[
                                {
                                    special:true,
                                    color:6,
                                    unshatterable:true,
                                    solid:true,
                                    logicColor:100,
                                    block:{ kick:2, pattern:[ [ 1, 1 ] ]}
                                }
                            ]
                        }
                    ],[
                        {
                            atLevel:40,
                            setColors:3,
                            setGarbageColors:3
                        },
                        {
                            atLevel:25,
                            setTimeLimit:TIMELIMIT_VERYFAST,
                            setBlocksPerDrop:[ 3 ]
                        },{
                            atLevel:20,
                            setTimeLimit:TIMELIMIT_VERYFAST,
                            setBlocksPerDrop:[ 2, 3 ]
                        },{
                            atLevel:15,
                            setTimeLimit:TIMELIMIT_VERYFAST,
                            setBlocksPerDrop:[ 2 ]
                        },{
                            atLevel:10,
                            setBlocksPerDrop:[ 3 ]
                        },{
                            after:5,
                            setBlocksPerDrop:[ 2, 3 ]
                        }
                    ],[
                        {
                            afterLevel:60,
                            everyLines:5,
                            addIncoming:[
                                {
                                    special:true,
                                    color:7,
                                    unmovable:true,
                                    logicColor:100,
                                    block:{ kick:4, pattern:[ [ 1, 1, 1, 1 ] ]}
                                },{
                                    special:true,
                                    color:7,
                                    unmovable:true,
                                    logicColor:100,
                                    block:{ kick:2, pattern:[ [ 1, 1 ], [ 1, 1 ] ]}
                                }
                            ]
                        },
                        {
                            afterLevel:55,
                            everyLines:5,
                            addIncoming:[
                                {
                                    special:true,
                                    color:7,
                                    unmovable:true,
                                    logicColor:100,
                                    block:{ kick:4, pattern:[ [ 1, 1, 1, 1 ] ]}
                                }
                            ]
                        },
                        {
                            afterLevel:50,
                            everyLines:5,
                            addIncoming:[
                                {
                                    special:true,
                                    color:7,
                                    unmovable:true,
                                    logicColor:100,
                                    block:{ kick:2, pattern:[ [ 1, 1 ], [ 1, 1 ] ]}
                                }
                            ]
                        },
                        {
                            afterLevel:45,
                            everyLines:5,
                            addIncoming:[
                                {
                                    special:true,
                                    color:7,
                                    unmovable:true,
                                    logicColor:100,
                                    block:{ kick:3, pattern:[ [ 1, 1, 1 ] ]}
                                }
                            ]
                        },
                        {
                            afterLevel:35,
                            everyLines:5,
                            addIncoming:[
                                {
                                    special:true,
                                    color:7,
                                    unmovable:true,
                                    logicColor:100,
                                    block:{ kick:2, pattern:[ [ 1, 1 ] ]}
                                },{
                                    special:true,
                                    color:7,
                                    unmovable:true,
                                    logicColor:100,
                                    block:{ kick:3, pattern:[ [ 1, 1, 1 ] ]}
                                }
                            ]
                        },
                        {
                            afterLevel:30,
                            everyLines:5,
                            addIncoming:[
                                {
                                    special:true,
                                    color:7,
                                    unmovable:true,
                                    logicColor:100,
                                    block:{ kick:1, pattern:[ [ 1 ] ]}
                                },{
                                    special:true,
                                    color:7,
                                    unmovable:true,
                                    logicColor:100,
                                    block:{ kick:2, pattern:[ [ 1, 1 ] ]}
                                }
                            ]
                        },{
                            afterLevel:15,
                            everyLines:10,
                            addIncoming:[
                                {
                                    special:true,
                                    color:7,
                                    unmovable:true,
                                    logicColor:100,
                                    block:{ kick:1, pattern:[ [ 1 ] ]}
                                }
                            ]
                        }
                    ]
                ]
            },{
                id:"burst",
                version:2,
                shortId:"BU",
                label:"Burst mode",
                initialize:{
                    model:"survival",
                    introText:"They are coming!",
                    blocks:DEFAULT_BLOCKS,
                    setColors:2,
                    setGarbageColors:2,
                    fieldWidth:8,
                    fieldHeight:16,
                    colorGems:true,
                    setIdleStyle:[ { r:COLOR_BRIGHT, g:COLOR_OFF, b:COLOR_OFF }, { r:COLOR_OFF, g:COLOR_BRIGHT, b:COLOR_OFF }, 0.001, 0, 1, 0.4 ],
                    playMusic:"track6",
                    autoDrop:5,
                    autoDropAmount:3,
                    allClearAutoDrop:5,
                    allClearAutoDropAmount:3,
                    quickDropActive:true,
                    quickDropThreshold:8,
                    quickDropAutoDrops:3,
                    quickDropAutoDropsAmount:3,
                    quickDropColor:{r:245, g:50, b:134 },
                    quickDropShadowColor:{ r:0, g:0, b: 0 },
                    quickDropFontColor:{ r:0, g:0, b: 0 },
                    quickDropDisabledColor:{ r:255, g:189, b: 217 },
                    quickDropFontDisabledColor:{ r:119, g:119, b: 119 },
                    setTimeLimit:10000,
                    setTimeLimitIsFall:true,
                    linesPerLevel:5,
                    levelCap:40,
                    setBlocksPerDrop:[ 2 ],
                    footerbarColorBorder:"#3c3",
                    footerbarColor:"#040",
                    footerbarColorText:{ r:255, g:255, b:255 },
                    gameoverColor:{ r:0, g:68, b:0 },
                    gameoverColorBorder:{ r:51, g:204, b:51 },
                    timebarBasicHeight:TIMEBAR_BASICHEIGHT,
                    timebarColor:TIMEBAR_COLOR,
                    timebarColorCritical:TIMEBAR_COLOR_SURVIVAL,
                    rowtextColor: ROWTEXT_COLOR,
                    rowtextColorShadow: { r:0, g:0, b:0 },
                    warningRows: WARNING_ROWS,
                    gameoverLines: GAMEOVER_DEFAULT,
                    gameoverSound: "gameover",
                    palette:DEFAULT_PALETTE_3,
                    levelMultiplierRatio: 0.2,
                    setBackgroundAnimation:7,
                    lineClearColor: { r:0, g:255, b:0 },
                    particlesLineClearColor: { r:255, g:128, b:128 },
                    particlesFallColor:{ r:128, g:255, b:128 },
                    cursorColor:CURSORCOLOR_DEFAULT,
                    cursorColorDrag:"#fff"
                },
                progress:[
                    [
                        {
                            afterLevel:40,
                            setColors:3,
                            setGarbageColors:3,
                            autoDrop:5,
                            autoDropAmount:4,
                            setTimeLimit:3000
                        },
                        {
                            afterLevel:38,
                            setColors:3,
                            setGarbageColors:3,
                            autoDrop:5,
                            autoDropAmount:4,
                            setTimeLimit:3500
                        },
                        {
                            afterLevel:36,
                            setColors:3,
                            setGarbageColors:3,
                            autoDrop:5,
                            autoDropAmount:4,
                            setTimeLimit:4000
                        },
                        {
                            afterLevel:34,
                            setColors:3,
                            setGarbageColors:3,
                            autoDrop:5,
                            autoDropAmount:4,
                            setTimeLimit:4500
                        },
                        {
                            afterLevel:32,
                            setColors:3,
                            setGarbageColors:3,
                            autoDrop:5,
                            autoDropAmount:4,
                            setTimeLimit:5000
                        },
                        {
                            afterLevel:30,
                            everyLevel:true,
                            autoDrop:5,
                            autoDropAmount:4,
                            setTimeLimit:6000
                        },{
                            afterLevel:28,
                            everyLevel:true,
                            autoDrop:5,
                            autoDropAmount:4,
                            setTimeLimit:6000
                        },{
                            afterLevel:26,
                            everyLevel:true,
                            autoDrop:5,
                            autoDropAmount:3,
                            setTimeLimit:7000
                        },{
                            afterLevel:24,
                            everyLevel:true,
                            autoDrop:4,
                            autoDropAmount:4,
                            setTimeLimit:7000
                        },{
                            afterLevel:22,
                            everyLevel:true,
                            autoDrop:4,
                            autoDropAmount:3,
                            setTimeLimit:7000
                        },{
                            afterLevel:20,
                            everyLevel:true,
                            autoDrop:3,
                            autoDropAmount:3,
                            setTimeLimit:8000,
                        },{
                            afterLevel:18,
                            everyLevel:true,
                            autoDrop:5,
                            autoDropAmount:4,
                            setTimeLimit:8000,
                        },{
                            afterLevel:16,
                            everyLevel:true,
                            autoDrop:5,
                            autoDropAmount:3,
                            setTimeLimit:8000,
                        },{
                            afterLevel:14,
                            everyLevel:true,
                            autoDrop:4,
                            autoDropAmount:4,
                            setTimeLimit:9000,
                        },{
                            afterLevel:12,
                            everyLevel:true,
                            autoDrop:4,
                            autoDropAmount:3,
                            setTimeLimit:9000,
                        },{
                            afterLevel:10,
                            everyLevel:true,
                            autoDrop:3,
                            autoDropAmount:3,
                            setTimeLimit:9000,
                        },{
                            afterLevel:8,
                            everyLevel:true,
                            autoDrop:5,
                            autoDropAmount:4
                        },{
                            afterLevel:6,
                            everyLevel:true,
                            autoDrop:5,
                            autoDropAmount:3
                        },{
                            afterLevel:4,
                            everyLevel:true,
                            autoDrop:4,
                            autoDropAmount:4
                        },{
                            afterLevel:2,
                            everyLevel:true,
                            autoDrop:4,
                            autoDropAmount:3
                        },{
                            afterLevel:-1,
                            everyLevel:true,
                            autoDrop:3,
                            autoDropAmount:3
                        }
                    ]
                ]
            },{
                id:"yinyang",
                version:2,
                shortId:"YY",
                label:"Yinyang mode",
                initialize:{
                    model:"vsYou",
                    introText:"Fight the past",
                    garbageAutoDropAmount:3,
                    vsYouRecordingLength:3,
                    setGarbageLimit:1,
                    vsYouPunishmentTrack:[ [ 5000, 3 ], [ 15000, 3 ] ],
                    garbageBlocks:LINE_BLOCKS,
                    blocks:DEFAULT_BLOCKS,
                    setColors:2,
                    setGarbageColors:2,
                    fieldWidth:8,
                    fieldHeight:16,
                    colorGems:true,
                    setIdleStyle:[ { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_BRIGHT }, { r:COLOR_BRIGHT, g:COLOR_BRIGHT, b:COLOR_BRIGHT }, 0.001, 0, 1, 0.4 ],
                    playMusic:"track7",
                    autoDrop:3,
                    autoDropAmount:3,
                    allClearAutoDrop:3,
                    allClearAutoDropAmount:3,
                    quickDropActive:true,
                    quickDropThreshold:8,
                    quickDropAutoDrops:3,
                    quickDropAutoDropsAmount:3,
                    quickDropColor:{ r:51, g:51, b:51 },
                    quickDropShadowColor:{ r:0, g:0, b:0 },
                    quickDropFontColor:{ r:255, g:255, b:255 },
                    quickDropDisabledColor:{ r:17, g:17, b:17 },
                    quickDropFontDisabledColor:{ r:51, g:51, b:51 },
                    setTimeLimit:10000,
                    setTimeLimitIsFall:true,
                    linesPerLevel:5,
                    levelCap:30,
                    setBlocksPerDrop:[ 2 ],
                    setGarbageBlocksPerDrop:[ 2 ],
                    footerbarColorBorder:"#858585",
                    footerbarColor:"#282828",
                    footerbarColorText:{ r:255, g:255, b:255 },
                    gameoverColor:{ r:40, g:40, b:40 },
                    gameoverColorBorder:{ r:133, g:133, b:133 },
                    timebarBasicHeight:TIMEBAR_BASICHEIGHT,
                    timebarColor:TIMEBAR_COLOR,
                    timebarColorCritical:TIMEBAR_COLOR_CRITICAL,
                    rowtextColor: ROWTEXT_COLOR,
                    rowtextColorShadow: { r:0, g:0, b:0 },
                    warningRows: WARNING_ROWS,
                    gameoverLines: GAMEOVER_DEFAULT,
                    gameoverSound: "gameover",
                    palette:DEFAULT_PALETTE_4,
                    levelMultiplierRatio: 0.2,
                    setBackgroundAnimation:8,
                    lineClearColor: LINECLEAR_COLOR,
                    particlesLineClearColor: { r:255, g:255, b:255 },
                    particlesFallColor:{ r:128, g:128, b:128 },
                    cursorColor:CURSORCOLOR_DEFAULT,
                    cursorColorDrag:CURSORCOLOR_DRAG_DEFAULT,
                    vsYouTransitions:[
                        {
                            setIdleStyle:[ { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_BRIGHT }, { r:COLOR_BRIGHT, g:COLOR_BRIGHT, b:COLOR_BRIGHT }, 0.001, 0, 1, 0.4 ],
                            setBackgroundAnimation:8
                        },{
                            setIdleStyle:[ { r:COLOR_BRIGHT, g:COLOR_OFF, b:COLOR_OFF }, { r:COLOR_BRIGHT, g:COLOR_BRIGHT, b:COLOR_BRIGHT }, -0.001, 0, 1, 0.4 ],
                            setBackgroundAnimation:9
                        }
                    ]
                },
                progress:[
                    TRACK_SHATTERBLOCK,
                    TRACK_LOCKEDBLOCK,
                    TRACK_LONGBLOCK,
                    [
                        {
                            atLevel:30,
                            setGarbageLimit:7
                        },{
                            atLevel:28,
                            setColors:3,
                            setGarbageColors:3
                        },{
                            atLevel:25,
                            setGarbageLimit:6
                        },{
                            atLevel:20,
                            setGarbageLimit:5
                        },{
                            atLevel:15,
                            setGarbageLimit:4
                        },{
                            atLevel:10,
                            setGarbageLimit:3
                        },{
                            atLevel:5,
                            setGarbageLimit:2
                        }
                    ]
                ],
            },{
                id:"chill",
                version:1,
                shortId:"CH",
                label:"Chill mode",
                initialize:{
                    model:"chill",
                    introText:"Stack & Relax",
                    blocks:DEFAULT_BLOCKS,
                    setColors:2,
                    setGarbageColors:2,
                    fieldWidth:8,
                    fieldHeight:16,
                    colorGems:true,
                    setIdleStyle:[ { r:COLOR_BRIGHT, g:COLOR_LOW, b:COLOR_OFF }, { r:COLOR_OFF, g:COLOR_OFF, b:COLOR_LOW }, 0.001, 0, 1, 0.4 ],
                    playMusic:"track8",
                    autoDrop:3,
                    autoDropAmount:3,
                    allClearAutoDrop:3,
                    allClearAutoDropAmount:3,
                    quickDropActive:true,
                    quickDropThreshold:0,
                    quickDropAutoDrops:1,
                    quickDropAutoDropsAmount:3,
                    quickDropColor:{ r:51, g:51, b:128 },
                    quickDropShadowColor:{ r:0, g:0, b:0 },
                    quickDropFontColor:{ r:255, g:255, b:255 },
                    quickDropDisabledColor:{ r:17, g:17, b:100 },
                    quickDropFontDisabledColor:{ r:51, g:51, b:100 },
                    setTimeLimit:TIMELIMIT_NONE,
                    setTimeLimitIsFall:false,
                    linesPerLevel:0,
                    levelCap:0,
                    setBlocksPerDrop:[ 2 ],
                    footerbarColorBorder:"#e75800",
                    footerbarColor:"#8b3500",
                    footerbarColorText:{ r:255, g:255, b:255 },
                    gameoverColor:{ r:139, g:53, b:0 },
                    gameoverColorBorder:{ r:231, g:88, b:0 },
                    timebarBasicHeight:TIMEBAR_NONEHEIGHT,
                    rowtextColor: ROWTEXT_COLOR,
                    rowtextColorShadow: { r:200, g:200, b:255 },
                    warningRows: WARNING_ROWS,
                    palette:DEFAULT_PALETTE_5,
                    gameoverLines: GAMEOVER_CHILL,
                    gameoverSound: "newLevel",
                    levelMultiplierRatio: 0.2,
                    setBackgroundAnimation:10,
                    lineClearColor: { r:0, g:0, b:255 },
                    particlesLineClearColor: { r:0, g:0, b:0 },
                    particlesFallColor:{ r:128, g:128, b:255 },
                    cursorColor:"#fff",
                    cursorColorDrag:"#ff8f5f",
                },
                progress:[
                    TRACK_SHATTERBLOCK
                ]
            }
        ]
    };
}