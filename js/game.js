const
    SIDES = [
        { index:0, dx:0, dy:-1 },
        { index:1, dx:1, dy:0 },
        { index:2, dx:0, dy:1 },
        { index:3, dx:-1, dy:0 },
    ];

function Game() {
    const
        DEBUG = false,
        // --- Display
        MIN_FONTSIZE = 8,
        PADDING_RATIO = 0.01,
        // --- Title screen
        GAME_LOCALSTORAGE = "_DRAGFALL",
        GAME_STATE_LOCALSTORAGE = "_DRAGFALL_S",
        GAME_NAME = "DRAGFALL",
        GAME_VERSION = "0.4.5",
        GAME_FOOTER = [ "Drag up-down", "Hit to select", "v"+GAME_VERSION+" by KesieV" ],
        GAME_CREDITS_MUSIC = "track2",
        GAME_GITHUB = "http://github.com/kesiev/dragfall",
        GAME_HOME = "https://www.kesiev.com/dragfall",
        GAME_SHORTHOME = "kesiev.com/dragfall",
        GAME_DISCORD = "https://discord.gg/TeAWvnuGku",
        GAME_CREDITS = [
            "< "+GAME_NAME+" >",
            "",
            "by KesieV (c) 2026",
            GAME_HOME,
            GAME_GITHUB,
            "",
            "AN UNFAITHFUL TRIBUTE",
            "TO THE GREAT SLYDRIS",
            "", "",
            "< GRAPHIC >",
            "",
            "Y224 FONT",
            "by GGVBotNet",
            "", "",
            "< ANIMATIONS >",
            "",
            "strange life forms",
            "https://www.dwitter.net/d/35900",
            "by luta, rodrigo.siqueira",
            "",
            "d/933",
            "https://www.dwitter.net/d/933",
            "by p01",
            "",
            "d/701",
            "https://www.dwitter.net/d/701",
            "by sigveseb",
            "",
            "Smokey 3D structure",
            "with joey's shadow",
            "https://www.dwitter.net/d/9672",
            "by yonatan, joeytwiddle, donbright",
            "",
            "Rotating raster rings",
            "https://www.dwitter.net/d/34861",
            "by dee-gomma",
            "",
            "d/34124",
            "https://www.dwitter.net/d/34124",
            "by rodrigo.siqueira, UEZ",
            "",
            "d/1369",
            "https://www.dwitter.net/d/1369",
            "by tomkh",
            "",
            "Infinite #flower remix cycle",
            "https://dwitter.net/d/17621",
            "by DaSpider, pavel",
            "",
            "Circle Factory",
            "https://www.dwitter.net/d/14063",
            "by KilledByAPixel",
            "",
            "d/7242",
            "https://www.dwitter.net/d/7242",
            "by yonatan",
            "",
            "A blue-to-magenta hyperspace",
            "tunnel with persistent",
            "luminous trails",
            "https://www.dwitter.net/d/35918",
            "by ichrvk",
            "", "",
            "< MUSIC >",
            "",
            "Acid Attack",
            "by resound/pepper",
            "",
            "Club Train",
            "by Heywood / Gollum & Nebula Vibes",
            "",
            "Club Desire",
            "by tawan, qp, dcm, evt",
            "",
            "Clubb Mix Star",
            "by bohema recordz crew",
            "",
            "Clubbing on Delirium",
            "by Origin/Nemesis",
            "",
            "Funk is a Religion",
            "remix by dj Fulanito",
            "by /diesel",
            "",
            "Ying Yang",
            "by KemperBoyd1974",
            "",
            "Rainy Day",
            "by Chromag/talent",
            "", "",
            "< SFX >",
            "",
            "8-Bit Sound Effect Pack",
            "by OwlishMedia",
            "", "",
            "< LIBS >",
            "",
            "jsxm",
            "https://github.com/a1k0n/jsxm",
            "",
            "QR-Code generator",
            "https://github.com/kazuhikoarase/qrcode-generator",
            "",
            "Instascan",
            "https://github.com/schmich/instascan",
            "","",
            "< THANKS >",
            "",
            "Bianca",
            "Preuk",
            "Dymonika",
        ],
        ERROR_GENERAL = "Something went wrong!",
        // --- Netplay
        NETPLAY_ENABLED = true,
        NETPLAY_SCREENDELAY = 2000,
        NETPLAY_NEWGAMEHOST = 1,
        NETPLAY_NEWGAMEGUEST = 2,
        NETPLAYSIGNAL_READY = 1,
        NETPLAYSIGNAL_ABORT = 2,
        NETPLAYSIGNAL_CANCELSTATE = 3,
        NETPLAYSIGNAL_SETSTATE = 4,
        NETPLAYSIGNAL_DATA = 5,
        NETPLAYSIGNAL_LOSE = 6,
        NETPLAYSIGNAL_WIN = 7,
        // --- Logic
        GEM_COLORGEMID = 3,
        // --- Title screen
        TITLE_COLOR = "#FFF",
        TITLE_COLOR_SHADOW = "#F00",
        TITLE_SHADOWCOLOR = "#000",
        // --- Menus
        MENU_FONTSIZE = 9,
        MENU_TAPTIMING = 500,
        // --- Main menu
        MAINMENU_COLOR_BORDER = "#c33",
        MAINMENU_COLOR = "#400",
        MAINMENU_COLOR_TEXT = { r:255, g:255, b:255 },
        // --- Credits
        CREDITS_COLOR = "#FFF",
        CREDITS_COLOR_SHADOW = "#000",
        CREDITS_FONTSIZE = 4,
        // --- Buttons
        BUTTON_UP = 0,
        BUTTON_DOWN = 1,
        BUTTON_LEFT = 2,
        BUTTON_RIGHT = 3,
        BUTTON_DRAG = 4,
        BUTTON_BACK = 5,
        BUTTON_START = 6,
        // --- Keyboard
        KEY_UP = 38,  KEY_W = 87, KEY_I = 73, KEY_Z = 90,
        KEY_DOWN = 40, KEY_S = 83, KEY_K = 75,
        KEY_RIGHT = 39, KEY_D = 68, KEY_L = 76,
        KEY_LEFT = 37, KEY_A = 65, KEY_J = 74, KEY_Q = 81,
        KEY_SPACE = 32,
        KEY_ENTER = 13,
        KEY_ESC = 27, KEY_1 = 49,
        // --- GAMEPAD
        GAMEPAD = [
            {
                button:BUTTON_UP,
                gamePadButtons:[ 12 ],
                gamePadAxisLesser:1
            },{
                button:BUTTON_DOWN,
                gamePadButtons:[ 13 ],
                gamePadAxisGreater:1
            },{
                button:BUTTON_LEFT,
                gamePadButtons:[ 14 ],
                gamePadAxisLesser:0
            },{
                button:BUTTON_RIGHT,
                gamePadButtons:[ 15 ],
                gamePadAxisGreater:0
            },{
                button:BUTTON_DRAG,
                gamePadButtons:[ 0, 1, 2 ],
            },{
                button:BUTTON_BACK,
                gamePadButtons:[ 8, 9 ],
            },{
                button:BUTTON_START,
                gamePadButtons:[ 3 ],
            }
        ],
        // --- Game states
        GAMESTATE_LOADING = 0,
        GAMESTATE_TITLE = 1,
        GAMESTATE_PLAY = 2,
        GAMESTATE_BRAGQR = 3,
        GAMESTATE_BRAGSCANNER = 4,
        GAMESTATE_NETPLAY = 5,
        // --- Quick save
        QUICKSAVE_MODES = [ "OFF", "ON CLOSE", "ALWAYS" ],
        // --- Play mode
        WARNING_TEXT = "WARNING",
        WARNING_COLOR_SHADOW = "#000",
        FOOTERBAR_SIZE = 20,
        FOOTERBAR_FONTSIZE = 8,
        FOOTERBAR_BORDER = 1,
        FOOTER_FONTSIZE = 3,
        BACKGROUND_COLOR = "rgba(0,0,0,0.8)",
        BLOCKBORDER_COLOR = "rgba(0,0,0,0.7)",
        SHATTEREFFECT_COLOR = { r:255, g:255, b:255 },
        DENIED_COLOR = { r:255, g:0, b: 0 },
        DELTASCORE_SPEED = 1000,
        DELTASCORE_FONTSIZE = 4,
        COMMENT_SPEED = 2000,
        ROWTEXT_SPEED = 700,
        ROWTEXT_DELAY = 100,
        SHAKEDURATION_X = 100,
        SHAKEDURATION_Y = 100,
        QUICKDROP_WIDTH = 23,
        QUICKDROP_HEIGHT = 30,
        QUICKDROP_MARGIN = 2,
        QUICKDROP_FONTSIZE = 12,
        QUICKDROP_PADDING = 5,
        QUICKDROP_STICK = 40,
        QUICKDROP_LABEL = String.fromCharCode(0x014D),
        QUICKDROP_SPEED = 250,
        QUICKDROP_SLIDE = 10,
        BORDER_DISTANCE = Math.max(QUICKDROP_WIDTH + QUICKDROP_MARGIN,  15), // Prevent sides swipe on mobile
        // --- Cursor
        CURSOR_SHADOW = "#000",
        CURSOR_SIZE = 2,
        CURSOR_PULSE = 1,
        CURSOR_PULSENORMAL = 0.005,
        CURSOR_PULSEDRAG = 0.025,
        // --- Particles
        PARTICLE_DURATION = 1000,
        PARTICLE_DURATION_FAST = 250,
        // --- Gameover screen       
        TITLE_BACKGROUNDS = [ 1, 2, 3 ],
        HIGHSCORE_LINES = 2,
        // --- Game modes
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
        MEVALUATE_NONE = -1,
        MEVALUATE_SCORE = 0,
        MEVALUATE_TIME = 1,
        MAFTERRECORDING_NONE = -1,
        MAFTERRECORDING_PLAYBACK = 0,
        GAMEMODES = GameModes(),
        GAMEMODE_DEFAULT = 0,
        SEEDS = 1000000,
        BACKGROUND_QUALITY = [ { label:"Low", value:20 }, { label:"Medium", value:10 }, { label:"High", value:5 }, { label:"Very high", value:1 } ],
        BACKGROUND_FADETIME = 1000,
        // --- Game data
        LOGICCOLORS = 3,
        // --- Notifications
        NOTIFICATION_FONTSIZE = 5,
        NOTIFICATION_COLOR = { r:255, g:255, b:255 },
        NOTIFICATION_TEXTCOLOR = { r:0, g:0, b:0 },
        NOTIFICATION_SHADOWCOLOR = { r:51, g:51, b:51 },
        // --- BragBoard
        BRAGBOARD = new BragBoard({
            gameId:"DRF",
            gameStorage:GAME_LOCALSTORAGE,
            gameName:GAME_NAME,
            gameVersion:GAME_VERSION,
            gameModes:GAMEMODES,
            gameHome:GAME_SHORTHOME
        }),
        BRAGCAMERA_NEXTCAMERALABEL = ">>",
        BRAGCAMERA_EXITLABEL = "X",
        BRAGCAMERA_COLOR = "#c33",
        BRAGCAMERA_SHADOW = "#000",
        BRAGCAMERA_TEXTCOLOR = "#fff",
        BRAGCAMERA_BUTTONSIZE = 50,
        BRAGCAMERA_FONTSIZE = 12,
        BRAGBOARD_COLOR = "#7300ff",
        BRAGBOARD_TEXTCOLOR = { r:255, g:255, b:255 },
        BRAGBOARD_BEATENCOLOR = "#333",
        BRAGBOARD_BEATENTEXTCOLOR = "#999",
        // --- Netplay
        NETPLAY = new NetPlay({
            gameStorage:GAME_LOCALSTORAGE,
        });
    let
        self,
        SCALE = 1,
        // --- Randomizers
        next, random,
        // --- Installer
        showInstaller,
        // --- Audio
        audio, nextMusic,
        // --- Time calculation & scheduler
        timeStartE, gameE = 0, playE = 0, lastE = 0, isPlayNotPaused = true,
        scheduler = [],
        // --- Game state
        gameState = GAMESTATE_LOADING,
        isTransitionState = 0,
        nextGameState = 0,
        transitionE = 0,
        enableHitAt = 0,
        state = 0,
        isNotPaused,
        // --- Game field
        colors,
        boardX, boardRight, boardY, boardWidth, boardHeight,
        gridX, gridY,
        cellWidth, cellHeight, hCellWidth, hCellHeight,
        innerCellWidth, innerCellHeight,
        sparkleX, sparkleY, sparkleWidth, sparkleHeight,
        field, fieldWidth, fieldHeight, lowestLine,
        lowestBlankLine,
        // --- All clear
        isAllClearTest, allClearAutoDrop, allClearAutoDropAmount,
        // --- Loading
        loadingTotal, loadingLoaded, loadingX, loadingY,
        // --- Lines removal
        preparedLines,
        // --- Block dragging
        isInteractive = false,
        movingBlock,
        movingOrigin,
        movingBlockStart,
        shadowBlock,
        // --- Gamepad controls
        useGamepads = false, gamepadPressedMode, gamepadButtons = [],
        // --- Keyboard controls
        isButtonMode = false,
        isPointerMode = false,
        cursorX, cursorY, cursorSize, cursorPulse, cursorColor, cursorColorDrag,
        // --- Field effects
        fieldEffects,
        overFieldEffects,
        rowTextEffects = [],
        // --- Score delta effect
        deltaScoreEffect,
        deltaScoreEffectX, deltaScoreEffectY, deltaScoreEffectFont, deltaScoreBlur, deltaScoreSlide,
        // --- Opponent bar
        opponentBarX, opponentBarY, opponentBarWidth,
        // --- Intro
        introText,
        // --- Game over
        gameoverSound, gameoverLines, gameclearLines, endgameLines,
        // --- Game initialization
        autoDrops = 0,
        // --- Settings
        settings,
        // --- Play state
        autodropEnded, gameStarting, isAutodropGarbage, schedulePlayerDrop,
        isPreviouslyMovedCells, previouslyMovedCells,
        score, lines,
        level, linesPerLevel, linesToNextLevel, levelCap, levelMultiplierRatio,
        timeLimit, timeLimitIsFall, nextBlockStart,
        combo,
        isWarning,
        isGameOver,
        isGameRunning,
        hasHighScores,
        isHighScore,
        progress = [],
        // --- Game serialize
        latestGameSerialize, quickSaveEnabled,
        // --- Netplay
        netPlayCurrentState = 0,
        netPlayOpponentState = 0,
        netPlayOpponentGarbage, netPlayOpponentLowestBlankLine,
        // --- Vs. You mode
        vsYouRecordStart, vsYouRecord, vsYouRecordGarbage, vsYouCurrentRecording, vsYouRecordingLength, vsYouPunishmentTrack, vsYouTurn,
        vsYouGarbageTrack, vsYouGarbageTrackStart, vsYouTransitions, vsYouGarbageGivenTotal, vsYouGarbageTrackTotal,
        // --- Garbage
        garbageTotal, garbageTugOfWar, garbageAutoDropAmount, incomingGarbage,
        // --- Game mode
        nextGameMode, nextSeed, nextHost, gameMode,
        mEvaluate,
        mShow,
        mTimeBar,
        mResetTimeOnBlock,
        mNewLevelOnLines,
        mProgressOnLines,
        mGameOverOnNoBlocks,
        mGameOverOnNoAutoDropBlocks,
        mOnNewBlock,
        mOnTimeout,
        mAfterRecording,
        mIsNetPlay,
        mPausePlayGame,
        // --- Color gems
        colorGems,
        // --- Screen shake
        shakeXStart, shakeXDelta, shakeXEnd,
        shakeYStart, shakeYDelta, shakeYEnd,
        // --- Score bar
        footerbarColorBorder, footerbarColor, footerbarColorText,
        footerbarX, footerbarY, footerbarWidth, footerbarHeight,
        footerbarInnerX, footerbarInnerY, footerbarInnerWidth, footerbarInnerHeight,
        // --- Score text
        deltaScore,
        scoreX, scoreY, scoreBlur, scoreFont,
        // --- Time bar
        timebarBasicHeight, timebarColor, timebarColorCritical,
        timebarX, timebarY, timebarWidth,
        // --- Warning bar
        warningRows, warningX, warningY, warningFont,
        // --- Row text effects
        rowtextColor, rowtextColorShadow,
        rowTextEffectX, rowTextEffectY, rowTextEffectFont, rowTextBlur, rowTextSlide,
        // --- Quick drop button
        quickDropX, quickDropX1, quickDropY, quickDropY1, quickDropWidth, quickDropHeight, quickDropFont, quickDropLabel,
        isQuickDropActive, isQuickDropAvailable, quickDropAutoDrops, quickDropAutoDropsAmount, quickDropThreshold, isQuickDrop,
        quickDropColor, quickDropDisabledColor, quickDropShadowColor, quickDropFontColor, quickDropFontDisabledColor,
        quickDropE, quickDropSlide,
        // --- Score comment
        scoreComment,
        // --- Notifications
        notification,
        // --- Game over
        gameoverColor, gameoverColorBorder,
        gameoverStart,
        // --- Title screen
        titleX, titleY, titleFont, titleWave,
        // --- Footer
        footerX, footerRows = [], footerFont,
        // --- Menu
        currentMenu,
        menuFontSize, menuSmallFontSize, menuFont, menuPadding, menuLineSpacing,
        menuX, menuY, menuWidth, menuHeight,
        menuDragSize, menuDragY, menuDragE, menuMaySelect,
        wheelTimestamp = 0,
        defaultMenuEffect = ()=>{ audio.playAudio(audio.audio.step); },
        // --- Credits
        credits, creditsFont, creditsLineHeight, creditsOptionBack,
        // --- Background animations
        background,
        isBackgroundAnimationOn,
        isBackgroundAnimationEnabled,
        isBackgroundAnimated,
        isBackgroundAnimationChanging,
        nextBackgroundAnimation,
        backgroundAnimationStartedAt,
        // --- Particles
        particleSize, particleSizeLarge,
        particlesLineClearColor,
        particlesFallColor,
        particles = new Particles(),
        // --- Notifications
        notificationX, notificationY, notificationWidth, notificationHeight, notificationFont,
        // --- BragBoard
        bragWidth, bragHeight, bragX, bragY, bragTextY, bragQr, bragQrX, bragQrY, bragQrWidth, bragQrHeight,
        bragCameraFont, bragCameraX, bragCameraX1, bragCameraTextX, bragCameraY, bragCameraY1, bragCameraTextY, bragCameraWidth, bragCameraHeight,
        // --- Close button
        closeButtonX, closeButtonX1, closeButtonTextX, closeButtonY, closeButtonY1, closeButtonTextY, closeButtonWidth, closeButtonHeight,
        // --- Screen resize triggers
        oldClientWidth, oldClientHeight,
        // --- Screen canvas
        canvasWidth,
        canvasHeight,
        // --- Canvas elements
        canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        backgroundAnimation = new BackgroundAnimation();

    // --- Colors

    function rgb(r,g,b) {
        return "rgb("+r+","+g+","+b+")";
    }

    function paletteToRGBA(color,a) {
        return "rgba("+color.r+","+color.g+","+color.b+","+a+")";
    }

    function paletteToRGB(color) {
        if (!color.rgb)
            color.rgb = rgb(color.r, color.g, color.b);
        return color.rgb;
    }

    // --- Scheduler

    function schedule(cb, at) {
        scheduler.push([gameE+at, cb]);
    }

    function runSchedules() {
        for (let i=0;i<scheduler.length;i++) {
            if (gameE >= scheduler[i][0]) {
                scheduler[i][1]();
                scheduler.splice(i,1);
                i--;
            }
        }
    }

    function resetScheduler() {
        scheduler.length = 0;
    }

    // --- Game serializer

    function serializeProgress() {
        let
            out = [];

        progress.forEach((progress,id)=>{
            let
                map = {};
            for (let k in progress)
                if (k == "random")
                    map[k] = progress[k].getSeed();
                else
                    map[k] = progress[k];
            out[id] = map;
        })
        return out;
    }

    function serializeGame() {
        let
            music = audio.getMusic(),
            data = [
                /*  0 */ GAME_VERSION,
                /*  1 */ gameMode.id,
                /*  2 */ gameMode.version,
                /*  3 */ playE,
                /*  4 */ nextBlockStart,
                /*  5 */ score,
                /*  6 */ lines,
                /*  7 */ level,
                /*  8 */ isWarning,
                /*  9 */ combo,
                /* 10 */ garbageTugOfWar,
                /* 11 */ incomingGarbage,
                /* 12 */ vsYouRecord,
                /* 13 */ vsYouRecordStart,
                /* 14 */ vsYouRecordGarbage,
                /* 15 */ vsYouCurrentRecording,
                /* 16 */ vsYouGarbageTrack,
                /* 17 */ vsYouGarbageTrackStart,
                /* 18 */ vsYouGarbageTrackTotal,
                /* 19 */ vsYouGarbageGivenTotal,
                /* 20 */ vsYouTurn,
                /* 21 */ linesPerLevel,
                /* 22 */ linesToNextLevel,
                /* 23 */ cursorX,
                /* 24 */ cursorY,
                /* 25 */ timeLimitIsFall,
                /* 26 */ timeLimit,
                /* 27 */ garbageLimit,
                /* 28 */ fieldEffects.serialize(),
                /* 29 */ field.serialize(),
                /* 30 */ next.serialize(),
                /* 31 */ garbageNext.serialize(),
                /* 32 */ isBackgroundAnimationChanging && (nextBackgroundAnimation != -1) ? nextBackgroundAnimation : backgroundAnimation.getAnimation(),
                /* 33 */ random.getSeed(),
                /* 34 */ music ? music.id : 0,
                /* 35 */ serializeProgress(),
                /* 36 */ autodropEnded,
                /* 37 */ isQuickDropAvailable,
            ];

        return data;
    }

    function restoreGame(data) {
        if (data[0] == GAME_VERSION) {
            let
                gameMode;

            GAMEMODES.list.forEach(mode=>{
                if ((mode.id == data[1]) && (mode.version == data[2]))
                    gameMode = mode;
            })

            if (gameMode) {
                // --- Restore game mode
                newGame(gameMode);

                // --- Restore data
                playE = data[3];
                nextBlockStart = data[4];
                score = data[5];
                lines = data[6];
                level = data[7];
                isWarning = data[8];
                combo = data[9];
                garbageTugOfWar = data[10];
                incomingGarbage = data[11];
                vsYouRecord = data[12];
                vsYouRecordStart = data[13];
                vsYouRecordGarbage = data[14];
                vsYouCurrentRecording = data[15];
                vsYouGarbageTrack = data[16];
                vsYouGarbageTrackStart = data[17];
                vsYouGarbageTrackTotal = data[18];
                vsYouGarbageGivenTotal = data[19];
                vsYouTurn = data[20];
                linesPerLevel = data[21];
                linesToNextLevel = data[22];
                cursorX = data[23];
                cursorY = data[24];
                timeLimitIsFall = data[25];
                timeLimit = data[26];
                garbageLimit = data[27];
                fieldEffects.unserialize(data[28]);
                field.setField(data[29].field);
                next.unserialize(data[30]);
                garbageNext.unserialize(data[31]);

                if (data[31] === undefined)
                    isBackgroundAnimated = false;
                else {
                    backgroundAnimation.start(data[32]);
                    isBackgroundAnimated = true;
                }

                random.setSeed(data[33]);
                audio.playMusic(audio.audio[data[34]]);

                data[35].forEach((p,id)=>{
                    let
                        map = {};
                    for (let k in p)
                        if (k == "random")
                            map[k] = new Random(p[k]);
                        else
                            map[k] = p[k];
                    progress[id] = map;
                });

                autodropEnded = data[36];
                isQuickDropAvailable = data[37];

                // --- Restore running gamestate
                gameState = GAMESTATE_PLAY;
                gameStarting = false;
                autoDrops = 0;
                isInteractive = true;
                isPlayNotPaused = true;
                gotoPause();

                // --- Store backup
                latestGameSerialize = data;

                return true;
            }
        }
        latestGameSerialize = 0;
        return false;
    }

    // --- Netplay

    function netPlayAbortConnect() {
        // --- Abort any connection attempt
        if (NETPLAY.isConnected())
            netPlayCancelState();
        else
            NETPLAY.disconnect();
        gotoGameState(GAMESTATE_TITLE);
    }

    function netPlaySendState() {
        if (NETPLAY.isConnected()) {
            NETPLAY.send(netPlayCurrentState);
            if (DEBUG)
                console.log("NetPlay: Sending state...", JSON.stringify(netPlayCurrentState));
        } else if (DEBUG)
            console.log("NetPlay: Disconnected. Will send state later.", JSON.stringify(netPlayCurrentState));
    }

    function netPlaySetState(s) {
        if (DEBUG)
            console.log("NetPlay: Setting state to", JSON.stringify(s));
        netPlayCurrentState = s;
        netPlaySendState();
        netPlayStateChanged();
    }

    function netPlayCancelState() {
        netPlaySetState({ s:NETPLAYSIGNAL_CANCELSTATE });
    }

    function netPlaySendAbort() {
        if (NETPLAY.isConnected())
            NETPLAY.send({ s:NETPLAYSIGNAL_ABORT });
    }

    function netPlayAbort(message) {

        if (DEBUG)
            console.log("NetPlay: Aborting");

        netPlayCancelState();

        switch (gameState) {
            case GAMESTATE_NETPLAY:{
                setNotification(message || ERROR_GENERAL);
                gotoGameState(GAMESTATE_TITLE);
                break;
            }
            case GAMESTATE_PLAY:{
                if (!isGameOver) {
                    endGame();
                    endRun();
                    setNotification(message || ERROR_GENERAL);
                }
                break;    
            }
        }

    }

    function netPlayStateChanged() {
        if (DEBUG) {
            console.log("Netplay: states changed");
            console.log("Netplay: Local:", JSON.stringify(netPlayCurrentState));
            console.log("Netplay: Remote:", JSON.stringify(netPlayOpponentState));
        }

        if (
            netPlayOpponentState &&
            (netPlayOpponentState.s == NETPLAYSIGNAL_SETSTATE) &&
            (netPlayCurrentState.s == NETPLAYSIGNAL_SETSTATE)
        ) {
            let
                start = true;

            if (NETPLAY.isRoomModeHost()) {
                if (DEBUG)
                    console.log("Netplay: Starting game as HOST...");
                nextHost = NETPLAY_NEWGAMEHOST;
            } else {
                if (DEBUG)
                    console.log("Netplay: Starting game as GUEST...");
                nextHost = NETPLAY_NEWGAMEGUEST;
                nextGameMode = 0;
                GAMEMODES.list.forEach(mode=>{
                    if (
                        (mode.id == netPlayOpponentState.i) &&
                        (mode.version == netPlayOpponentState.v)
                    )
                        nextGameMode = mode;
                })
                if (nextGameMode) {
                    // --- Found game mode/version
                    nextSeed = netPlayOpponentState.e;
                } else {
                    // --- Can't find game mode/version
                    if (DEBUG)
                        console.log("Netplay: Can't find HOST requested game mode. Aborting...");
                    start = false;
                    netPlayAbort();
                    netPlaySendAbort();
                }
            }

            if (start) {
                if (DEBUG)
                    console.log("Netplay: Sending start signal...");
                NETPLAY.send({ s:NETPLAYSIGNAL_READY });
            }
        }
    }

    function netPlayOnEvent(iserror, event) {
        if (iserror) {
            console.log("NetPlay error:", NETPLAY_ERRORS[event]);
            netPlayAbort();
        } else {
            if (DEBUG)
                console.log("NetPlay event:", NETPLAY_EVENTS[event]);

            if (event == NETPLAY_EVENT_CHANNELOPENED)
                netPlaySendState();
        }
    }

    function netPlayOnData(d) {
        switch (d.s) {
            case NETPLAYSIGNAL_CANCELSTATE:{
                if (DEBUG)
                    console.log("Netplay: Received CANCELSTATE");
                netPlayOpponentState = 0;
                netPlayStateChanged();
                break;    
            }
            case NETPLAYSIGNAL_SETSTATE:{
                if (DEBUG)
                    console.log("Netplay: Received SETSTATE to", JSON.stringify(d));
                netPlayOpponentState = d;
                netPlayStateChanged();
                break;
            }
            case NETPLAYSIGNAL_READY:{
                if (DEBUG)
                    console.log("Netplay: Received READY signal");
                gotoGameState(GAMESTATE_PLAY);
                break;
            }
            case NETPLAYSIGNAL_ABORT:{
                if (DEBUG)
                    console.log("Netplay: Received ABORT signal");
                netPlayAbort("Other player left");
                break;
            }
            case NETPLAYSIGNAL_DATA:{
                if (d.g > netPlayOpponentGarbage) {
                    let
                        newGarbage = d.g - netPlayOpponentGarbage;
                    addGarbage(newGarbage);
                    netPlayOpponentGarbage = d.g;
                    if (DEBUG)
                        console.log("NetPlay: Received garbage",newGarbage);
                }
                netPlayOpponentLowestBlankLine = d.l;
                break;
            }
            case NETPLAYSIGNAL_LOSE:{
                if (DEBUG)
                    console.log("Netplay: Received LOSE signal");
                gameOver(false);
                break;
            }
        }
    }

    // --- Background animations

    function fadeToBackgroundAnimation(a) {
        if (isBackgroundAnimationEnabled && isBackgroundAnimated) {
            nextBackgroundAnimation = a;
            isBackgroundAnimationChanging = gameE;
        } else
            backgroundAnimation.start(a);
    }

    // --- Palette

    function setPalette(p) {
        colors = [
            // --- Basic blocks
            { score:1, color:p.color1, borderColor:p.darkColor1, particleColor:p.brightColor1, shadowColor:"#000", shadowBorderColor:p.shadowColor1, shatterEffectColor:p.brightColor1 },
            { score:1, color:p.color2, borderColor:p.darkColor2, particleColor:p.brightColor2, shadowColor:"#000", shadowBorderColor:p.shadowColor2, shatterEffectColor:p.brightColor2 },
            { score:1, color:p.color3, borderColor:p.darkColor3, particleColor:p.brightColor3, shadowColor:"#000", shadowBorderColor:p.shadowColor3, shatterEffectColor:p.brightColor3 },
            // --- Color gems
            { score:2, shatterColor:0, color:p.color1, borderColor:p.darkColor1, shadowColor:"#000", shadowBorderColor:p.shadowColor1, sparkle:{ r:255, g:255, b:255, sb:0.02, s1:0.002, s2:0.003, s3:0.004, s4:0.005, base:0.4, range:0.4, borderRange:50 } },
            { score:2, shatterColor:1, color:p.color2, borderColor:p.darkColor2, shadowColor:"#000", shadowBorderColor:p.shadowColor2, sparkle:{ r:255, g:255, b:255, sb:0.02, s1:0.002, s2:0.003, s3:0.004, s4:0.005, base:0.4, range:0.4, borderRange:50 } },
            { score:2, shatterColor:2, color:p.color3, borderColor:p.darkColor3, shadowColor:"#000", shadowBorderColor:p.shadowColor3, sparkle:{ r:255, g:255, b:255, sb:0.02, s1:0.002, s2:0.003, s3:0.004, s4:0.005, base:0.4, range:0.4, borderRange:50 } },
            // --- Shatter block
            { score:2, shatterColumn:true, effectColor:{  r:128, g:128, b:255 }, color:{ r:128, g:128, b:204 }, borderColor:{ r:0, g:0, b:64 }, shadowColor:"#000", shadowBorderColor:{ r:0, g:0, b:255 }, sparkle:{ r:255, g:255, b:255, sb:0.02, s1:0.0004, s2:0.0005, s3:0.0002, s4:0.0003, base:0.4, range:0.4, borderRange:20 } },
            // --- Locked block
            { score:3, color:{ r:34, g:34, b:34 }, borderColor:{ r:128, g:128, b:128 }, shadowColor:"#000", shadowBorderColor:{ r:34, g:34, b:34 }, shatterEffectColor:{ r:255, g:128, b:128 }, sparkle:{ r:128, g:0, b:0, sb:0.02, s1:0.0004, s2:0.0005, s3:0.0002, s4:0.0003, base:0.6, range:0.4, borderRange:0 } },
            // --- Shiny blocks
            { score:3, color:p.color1, borderColor:p.darkColor1, shadowColor:"#000", shadowBorderColor:p.shadowColor1, sparkle:{ r:255, g:255, b:255, sb:0, s1:0.002, s2:0.002, s3:0.002, s4:0.002, base:0.6, range:0.1, borderRange:0 } },
            { score:3, color:p.color2, borderColor:p.darkColor2, shadowColor:"#000", shadowBorderColor:p.shadowColor2, sparkle:{ r:255, g:255, b:255, sb:0, s1:0.002, s2:0.002, s3:0.002, s4:0.002, base:0.6, range:0.1, borderRange:0 } },
            { score:3, color:p.color3, borderColor:p.darkColor3, shadowColor:"#000", shadowBorderColor:p.shadowColor3, sparkle:{ r:255, g:255, b:255, sb:0, s1:0.002, s2:0.002, s3:0.002, s4:0.002, base:0.6, range:0.1, borderRange:0 } },
        ];
    }

    // --- Credits

    function endCredits() {
        credits = 0;
        audio.mixerStopMusic();
        gotoOptions(creditsOptionBack);
    }

    // --- Run

    function endRun() {
        if (!isTransitionState) {
            audio.playAudio(audio.audio.step);
            gotoGameState(GAMESTATE_TITLE);
        }
    }

    // --- Menus

    function gotoPause() {
        if (gameState == GAMESTATE_PLAY) {
            if (isNotPaused) {
                isNotPaused = false;
                audio.stopMusic(true);
            }
            timeStartE = 0;
            currentMenu = new Menu([
                {
                    label:[ "Continue" ],
                    isBackOption:true,
                    onSelect:(menu)=>{
                        audio.replayMusic();
                        currentMenu = 0;
                        isNotPaused = true;
                    }
                },{
                    label:[ "Quit" ],
                    onSelect:(menu)=>{
                        currentMenu = new Menu([
                            {
                                label:[ "Keep playing" ],
                                isBackOption:true,
                                onSelect:(menu)=>{
                                    gotoPause();
                                }
                            },{
                                label:[ "Quit" ],
                                onSelect:(menu)=>{
                                    menu.disable();
                                    netPlaySendAbort();
                                    endGame();
                                    gotoGameState(GAMESTATE_TITLE);
                                }
                            }
                        ], 0, defaultMenuEffect, 1, MAINMENU_COLOR, MAINMENU_COLOR_BORDER, MAINMENU_COLOR_TEXT, TITLE_SHADOWCOLOR);
                    }
                }
            ], 0, defaultMenuEffect, 1, MAINMENU_COLOR, MAINMENU_COLOR_BORDER, MAINMENU_COLOR_TEXT, TITLE_SHADOWCOLOR);
        }
    }

    function gotoCredits(optionBack) {
        currentMenu = 0;
        creditsOptionBack = optionBack;
        audio.playMusic(audio.audio[GAME_CREDITS_MUSIC]);
        credits = new Credits(GAME_CREDITS, CREDITS_COLOR, CREDITS_COLOR_SHADOW);
    }

    function gotoMainMenu() {
        let
            selectedOption = 0,
            mainMenu = [];

        GAMEMODES.list.forEach(mode=>{
            let
                model = GAMEMODES.models[mode.initialize.model],
                label,
                brag;

            if (!model.mIsNetPlay || NETPLAY_ENABLED) {

                if (mode.id == settings.lastMode)
                    selectedOption = mainMenu.length;

                if (mode.initialize.hasHighScores) {
                    switch (model.mEvaluate) {
                        case MEVALUATE_SCORE:{
                            label = [ mode.label, "HIGH SCORE", settings.stats[mode.id].highScore ];
                            break;
                        }
                        case MEVALUATE_TIME:{
                            label = [ mode.label, "BEST TIME", settings.stats[mode.id].highScore ? formatTime(settings.stats[mode.id].highScore) : "---" ];
                            break;
                        }
                    }
                    brag = BRAGBOARD.getBrag(mode.shortId, settings.stats[mode.id].highScore);
                } else {
                    label = [ mode.label ];
                    if (model.mIsNetPlay)
                        brag = { label:"Requires NetPlay" };
                }

                mainMenu.push({
                    label:label,
                    brag:brag,
                    onSelect:(menu)=>{
                        let
                            nextState = GAMESTATE_PLAY;

                        nextHost = 0;
                        nextSeed = randomSeed();

                        if (model.mIsNetPlay)
                            if (NETPLAY.canStartRoomMode())
                                nextState = GAMESTATE_NETPLAY;
                            else {
                                audio.playAudio(audio.audio.fall);
                                setNotification("See Netplay options");
                                nextState = -1;
                            }

                        if (nextState != -1) {
                            menu.disable();
                            settings.lastMode = mode.id;
                            saveSettings();
                            nextGameMode = mode;
                            audio.playAudio(audio.audio.break);
                            gotoGameState(nextState);
                        }
                    }
                });
            }
        })
        mainMenu.push({
            label:[ "OPTIONS" ],
            onSelect:(menu)=>{
                menu.disable();
                audio.playAudio(audio.audio.fall);
                gotoOptions(0);
            }
        })

        currentMenu = new Menu(mainMenu, selectedOption, defaultMenuEffect, 3, MAINMENU_COLOR, MAINMENU_COLOR_BORDER, MAINMENU_COLOR_TEXT, TITLE_SHADOWCOLOR);
    }

    function gotoBragBoardMenu(parentOption) {
        let
            options = [
                {
                    label:[ "Change name", BRAGBOARD.getName() ],
                    onSelect:(menu, option)=>{
                        let
                            newName;

                        menu.disable();
                        defaultMenuEffect();

                        newName = prompt("Insert your BragBoard nickname!", BRAGBOARD.getName());
                        if (newName) {
                            BRAGBOARD.setName(newName);
                            gotoBragBoardMenu(parentOption);
                        } else
                            menu.enable();
                    }
                },{
                    label:[ "Copy BragCard" ],
                    onSelect:(menu, option)=>{
                        menu.disable();
                        defaultMenuEffect();
                        BRAGBOARD.imageCopy(settings.stats,(success)=>{
                            menu.enable();
                            if (success)
                                setNotification("Image copied");
                            else
                                setNotification(ERROR_GENERAL);
                        })
                    }
                },{
                    label:[ "Copy BragLink" ],
                    onSelect:(menu, option)=>{
                        menu.disable();
                        defaultMenuEffect();
                        BRAGBOARD.linkCopy(settings.stats,(success)=>{
                            menu.enable();
                            if (success)
                                setNotification("Link copied");
                            else
                                setNotification(ERROR_GENERAL);
                        })
                    }
                },{
                    label:[ "Download BragCard" ],
                    onSelect:(menu, option)=>{
                        menu.disable();
                        defaultMenuEffect();
                        BRAGBOARD.imageDownload(settings.stats,(success)=>{
                            menu.enable();
                            if (success)
                                setNotification("Downloading");
                            else
                                setNotification(ERROR_GENERAL);
                        })
                    }
                },{
                    label:[ "Show BragLink" ],
                    onSelect:(menu, option)=>{
                        menu.disable();
                        defaultMenuEffect();
                        newName = prompt("This is your BragLink. Share it with your friends to challenge them!", BRAGBOARD.linkGet(settings.stats));
                        menu.enable();
                    }
                },{
                    label:[ "Show BragQr" ],
                    onSelect:(menu, option)=>{
                        menu.disable();
                        defaultMenuEffect();
                        bragQr = BRAGBOARD.qrGet(settings.stats, 3, 8);
                        gotoGameState(GAMESTATE_BRAGQR);
                        currentMenu = 0;
                    }
                },{
                    label:[ "Scan BragQr" ],
                    onSelect:(menu, option)=>{
                        menu.disable();
                        defaultMenuEffect();
                        BRAGBOARD.scannerStart();
                        gotoGameState(GAMESTATE_BRAGSCANNER);
                        currentMenu = 0;
                    }
                },{
                    label:[ "Clear Brags" ],
                    onSelect:(menu, option)=>{
                        menu.disable();
                        defaultMenuEffect();
                        if (confirm("Do you want to clear all Brags? This action cannot be undone.")) {
                            BRAGBOARD.clear();
                            setTimeout(()=>{
                                setNotification("Brags cleared");
                                menu.enable();
                            },1000);
                        } else
                            menu.enable();
                    }
                },{
                    label:[ "BACK" ],
                    isBackOption:true,
                    onSelect:(menu, option)=>{
                        audio.playAudio(audio.audio.fall);
                        gotoOptions(parentOption);
                    }
                }
            ];

        currentMenu = new Menu(options, 0, defaultMenuEffect, 2, MAINMENU_COLOR, MAINMENU_COLOR_BORDER, MAINMENU_COLOR_TEXT, TITLE_SHADOWCOLOR);
    }


    function gotoNetPlay(parentOption, option) {
        let
            options = [
                {
                    label:[ NETPLAY.getMode(), "Host <-> Guest" ],
                    onSelect:()=>{
                        audio.playAudio(audio.audio.garbage);
                        setNotification(NETPLAY.getMode()+", sorry!");
                    }
                },
                {
                    label:[ "Mode", NETPLAY.isRoomModeHost() ? "Host" : "Guest" ],
                    onSelect:(menu, option)=>{
                        defaultMenuEffect();
                        NETPLAY.disconnect();
                        NETPLAY.setRoomModeHost(!NETPLAY.isRoomModeHost());
                        gotoNetPlay(parentOption, option);
                    }
                }
            ];

        if (NETPLAY.isRoomModeHost()) {
            options.push({
                label:[ "Host room ID", NETPLAY.getHostRoomId() || "Get one!" ],
                onSelect:(menu, option)=>{
                    menu.disable();
                    defaultMenuEffect();
                    NETPLAY.disconnect();
                    NETPLAY.setHostRoomId((iserror, data)=>{
                        if (iserror) {
                            setNotification(ERROR_GENERAL);
                            menu.enable();
                        } else {
                            setNotification("Room: "+data);
                            gotoNetPlay(parentOption, option);
                        }
                        
                    })
                }
            });
            if (NETPLAY.getHostRoomId()) {
                options.push({
                    label:[ "Copy host room ID", "Send to guest" ],
                    onSelect:(menu, option)=>{
                        menu.disable();
                        defaultMenuEffect();
                        NETPLAY.copyHostRoomId((success)=>{
                            menu.enable();
                            if (success)
                                setNotification("Host room copied");
                            else
                                setNotification(ERROR_GENERAL);
                        })
                    }
                });
                options.push({
                    label:[ "Copy host link", "Send to guest" ],
                    onSelect:(menu, option)=>{
                        menu.disable();
                        defaultMenuEffect();
                        NETPLAY.copyHostRoomLink((success)=>{
                            menu.enable();
                            if (success)
                                setNotification("Host link copied");
                            else
                                setNotification(ERROR_GENERAL);
                        })
                    }
                });
            }
        } else {
            options.push({
                label:[ "Host room ID", NETPLAY.getGuestRoomId() || "Input one!" ],
                onSelect:(menu, option)=>{
                    let
                        newName;

                    menu.disable();
                    defaultMenuEffect();
                    NETPLAY.disconnect();

                    newName = prompt("Insert your friend's Host room ID. You can also ask a Host link, open it, and automatically configure your NetPlay settings.", NETPLAY.getGuestRoomId());
                    if (newName) {
                        NETPLAY.setGuestRoomId(newName);
                        gotoNetPlay(parentOption, option);
                    } else
                        menu.enable();
                }
            });
        }

        options.push({
            label:[ "BACK" ],
            isBackOption:true,
            onSelect:(menu, option)=>{
                audio.playAudio(audio.audio.fall);
                gotoOptions(parentOption);
            }
        });

        currentMenu = new Menu(options, option || 0, defaultMenuEffect, 2, MAINMENU_COLOR, MAINMENU_COLOR_BORDER, MAINMENU_COLOR_TEXT, TITLE_SHADOWCOLOR);
    }

    function gotoOptions(option) {
        let
            options = [
                {
                    label:[ "BragBoard", "Share scores!" ],
                    onSelect:(menu, option)=>{
                        defaultMenuEffect();
                        gotoBragBoardMenu(option);
                    }
                },{
                    label:[ "Music", settings.music ? "ON" : "OFF" ],
                    onSelect:(menu, option)=>{
                        settings.music = !settings.music;
                        defaultMenuEffect();
                        saveSettings();
                        applySettings();
                        gotoOptions(option);
                    }
                },{
                    label:[ "Sfx", settings.sfx ? "ON" : "OFF" ],
                    onSelect:(menu, option)=>{
                        settings.sfx = !settings.sfx;
                        defaultMenuEffect();
                        saveSettings();
                        applySettings();
                        gotoOptions(option);
                    }
                },{
                    label:[ "Fullscreen", settings.fullscreen ? "ON" : "OFF" ],
                    onSelect:(menu, option)=>{
                        settings.fullscreen = !settings.fullscreen;
                        if (settings.fullscreen)
                            setFullScreen();
                        defaultMenuEffect();
                        saveSettings();
                        applySettings();
                        gotoOptions(option);
                    }
                },{
                    label:[ "Scale", "x"+settings.scale ],
                    onSelect:(menu, option)=>{
                        settings.scale++;
                        if (settings.scale > 3)
                            settings.scale = 1;
                        defaultMenuEffect();
                        saveSettings();
                        applySettings();
                        gotoOptions(option);
                    }
                },{
                    label:[ "Animations", settings.bganimations ? "ON" : "OFF" ],
                    onSelect:(menu, option)=>{
                        settings.bganimations = !settings.bganimations;
                        defaultMenuEffect();
                        saveSettings();
                        applySettings();
                        gotoOptions(option);
                    }
                },{
                    
                    label:[ "BG Quality", BACKGROUND_QUALITY[settings.bgquality].label ],
                    onSelect:(menu, option)=>{
                        settings.bgquality = (settings.bgquality+1)%BACKGROUND_QUALITY.length;
                        defaultMenuEffect();
                        saveSettings();
                        applySettings();
                        gotoOptions(option);
                    }
                },{
                    label:[ "Quick save", QUICKSAVE_MODES[settings.saveState]],
                    onSelect:(menu, option)=>{
                        settings.saveState = (settings.saveState+1)%QUICKSAVE_MODES.length;
                        defaultMenuEffect();
                        saveSettings();
                        applySettings();
                        gotoOptions(option);
                    }
                },{
                    label:[ "Clear scores" ],
                    onSelect:(menu, option)=>{
                        defaultMenuEffect();
                        menu.disable();
                        if (confirm("Do you want to delete all your high scores? This action cannot be undone.")) {
                            GAMEMODES.list.forEach((mode,id)=>{
                                resetGameMode(mode);
                            })
                            saveSettings();
                            setTimeout(()=>{
                                setNotification("Scores cleared");
                                menu.enable();
                            },1000);
                        } else
                            menu.enable();
                    }
                }
            ];

        if (NETPLAY_ENABLED)
            options.push({
                label:[ "Netplay" ],
                onSelect:(menu, option)=>{
                    defaultMenuEffect();
                    gotoNetPlay(option);
                }
            });

        if (showInstaller)
            options.push({
                label:[ "INSTALL" ],
                onSelect:(menu, option)=>{
                    menu.disable();
                    Installer.install(()=>{
                        showInstaller = false;
                        gotoOptions(0);
                    });
                }
            });

        options.push({
            label:[ "CREDITS" ],
            onSelect:(menu, option)=>{
                defaultMenuEffect();
                gotoCredits(option);
            }
        });

        options.push({
            label:[ "LINKS" ],
            onSelect:(menu, prevOption)=>{
                audio.playAudio(audio.audio.fall);
                currentMenu = new Menu([
                    {
                        label:[ "GITHUB", "See the code" ],
                        onSelect:(menu)=>{
                            window.open(GAME_GITHUB);
                        }
                    },{
                        label:[ "DISCORD", "Say something!" ],
                        onSelect:(menu)=>{
                            window.open(GAME_DISCORD);
                        }
                    },{
                        label:[ "BACK" ],
                        isBackOption:true,
                        onSelect:(menu)=>{
                            audio.playAudio(audio.audio.fall);
                            gotoOptions(prevOption);
                        }
                    }
                ], 0, defaultMenuEffect, 2, MAINMENU_COLOR, MAINMENU_COLOR_BORDER, MAINMENU_COLOR_TEXT, TITLE_SHADOWCOLOR);
            }
        });

        options.push({
            label:[ "BACK" ],
            isBackOption:true,
            onSelect:(menu, option)=>{
                audio.playAudio(audio.audio.fall);
                gotoMainMenu();
            }
        });

        currentMenu = new Menu(options, option, defaultMenuEffect, 2, MAINMENU_COLOR, MAINMENU_COLOR_BORDER, MAINMENU_COLOR_TEXT, TITLE_SHADOWCOLOR);
    }

    // --- Garbage

    function limitIncomingGarbage() {
        if (garbageLimit)
            incomingGarbage = Math.max(0, Math.min(garbageLimit, garbageTugOfWar));
        else
            incomingGarbage = Math.max(0, garbageTugOfWar);
    }

    function addGarbage(v) {
        garbageTugOfWar += v;
        limitIncomingGarbage();
        showDeltaScore("+"+v+" garbage");
        if (incomingGarbage > 0)
            audio.playAudio(audio.audio.garbage);
    }

    // --- Render

    function blitCell(e, ox, oy, x, y, opacity, cell, shadow) {
        if (cell) {
            let
                color = colors[cell.color],
                sparkle = color.sparkle,
                sparkleWave = sparkle ? Math.sin(e*sparkle.sb)*sparkle.borderRange : 0,
                dx = ox+gridX+(x*cellWidth);
                dy = oy+gridY+(y*cellHeight),
                blink = 0.9+Math.sin(e*0.02)*0.1,
                wave = 30+Math.sin(y+e*0.002)*30;
                
            ctx.shadowColor = 0;
            ctx.shadowBlur = 0;

            if (shadow)
                ctx.fillStyle = paletteToRGBA(color.shadowBorderColor, blink);
            else
                ctx.fillStyle = rgb(Math.min(255,color.borderColor.r+wave+sparkleWave), Math.min(255,color.borderColor.g+wave+sparkleWave),Math.min(255,color.borderColor.b+wave+sparkleWave));

            ctx.fillRect(dx, dy, cellWidth, cellHeight);
            
            if (shadow)
                ctx.fillStyle = color.shadowColor;
            else
                ctx.fillStyle = rgb(color.color.r * opacity, color.color.g * opacity, color.color.b * opacity);
            
            ctx.fillRect(dx+blockBorderSize, dy+blockBorderSize, innerCellWidth, innerCellHeight);

            if (cell.links[0])
                ctx.fillRect(dx+blockBorderSize, dy, innerCellWidth, blockBorderSize);

            if (cell.links[1])
                ctx.fillRect(dx+cellWidth-blockBorderSize, dy+blockBorderSize, blockBorderSize, innerCellHeight);

            if (cell.links[2])
                ctx.fillRect(dx+blockBorderSize, dy+cellHeight-blockBorderSize, innerCellWidth, blockBorderSize);

            if (cell.links[3])
                ctx.fillRect(dx, dy+blockBorderSize, blockBorderSize, innerCellHeight);

            if (color.sparkle && !shadow) {
                let
                    baseColor = "rgba("+(color.sparkle.r * opacity)+","+(color.sparkle.g * opacity)+","+(color.sparkle.b * opacity)+",";

                ctx.fillStyle = baseColor+(sparkle.base+(Math.sin(y+e*sparkle.s1)*sparkle.range))+")";
                ctx.fillRect(dx+sparkleX, dy+sparkleY, sparkleWidth, sparkleHeight);
                ctx.fillStyle = baseColor+(sparkle.base+(Math.sin(y+e*sparkle.s2)*sparkle.range))+")";
                ctx.fillRect(dx+sparkleX+sparkleWidth, dy+sparkleY, sparkleWidth, sparkleHeight);
                ctx.fillStyle = baseColor+(sparkle.base+(Math.sin(y+e*sparkle.s3)*sparkle.range))+")";
                ctx.fillRect(dx+sparkleX, dy+sparkleY+sparkleHeight, sparkleWidth, sparkleHeight);
                ctx.fillStyle = baseColor+(sparkle.base+(Math.sin(y+e*sparkle.s4)*sparkle.range))+")";
                ctx.fillRect(dx+sparkleX+sparkleWidth, dy+sparkleY+sparkleHeight, sparkleWidth, sparkleHeight);

            }

        }
    }

    function blitField(e, ox, oy, field, opacity) {
        for (let y=0;y<field.height;y++)
            for (let x=0;x<field.width;x++)
                blitCell(e, ox, oy, x, y, opacity, field.field[y][x]);
    }

    function blitBlock(e, ox, oy, block, shadow) {
        for (let dy=0;dy<block.pattern.length;dy++)
            for (let dx=0;dx<block.pattern[dy].length;dx++)
                if (block.pattern[dy][dx])
                    blitCell(e, ox, oy, dx+block.x, dy+block.y, 1, block.pattern[dy][dx], shadow);
    }

    function renderScreen(e) {
        
        lastE = e;

        updateControls();

        if ((isNotPaused || mPausePlayGame) && e) {
            
            if (timeStartE) {
                let
                    delta = e-timeStartE;
                gameE += delta;
                if (isPlayNotPaused)
                    playE += delta;
            }
            timeStartE = e;
            runSchedules();
        }

        canvas.width = canvas.width;
        switch (gameState) {
            case GAMESTATE_LOADING:{
                ctx.font = footerFont;
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.shadowBlur = TITLE_COLOR_SHADOW;
                ctx.shadowColor = ctx.fillStyle = TITLE_COLOR_SHADOW;
                ctx.fillText("LOADING ("+loadingLoaded+"/"+loadingTotal+")", loadingX, loadingY);
                break;
            }
            case GAMESTATE_TITLE:{
                if (isBackgroundAnimationOn)
                    backgroundAnimation.render(gameE, ctx, canvasWidth, canvasHeight, credits ? 0.3 : 1);

                // --- Credits
                if (credits)
                    credits.render(canvasWidth, canvasHeight, ctx, creditsFont, creditsLineHeight, gameE);
                else {

                    let
                        glow = 0.7 + Math.sin(gameE*0.002)*0.3,
                        wave = Math.floor(Math.sin(gameE*0.001)*titleWave);

                    ctx.font = titleFont;
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";
                    ctx.shadowBlur = scoreBlur;
                    ctx.shadowColor = ctx.fillStyle = TITLE_COLOR_SHADOW;
                    ctx.fillText(GAME_NAME, titleX, titleY+wave);
                    ctx.fillStyle = TITLE_COLOR;
                    ctx.shadowColor = TITLE_SHADOWCOLOR;
                    ctx.fillText(GAME_NAME, titleX, titleY-wave);
                    ctx.font = footerFont;
                    ctx.shadowColor = TITLE_SHADOWCOLOR;
                    footerRows.forEach((line,i)=>{
                        ctx.fillText(GAME_FOOTER[i], footerX, footerRows[i]);
                    })
                }
                break;
            }
            case GAMESTATE_BRAGQR:{
                ctx.drawImage(bragQr, bragQrX, bragQrY, bragQrWidth, bragQrHeight);
                break;
            }
            case GAMESTATE_NETPLAY:{
                if (gameE > NETPLAY_SCREENDELAY) {
                    ctx.textBaseline = "middle";
                    ctx.textAlign = "center";

                    ctx.font = footerFont;
                    ctx.shadowBlur = TITLE_COLOR;
                    ctx.shadowColor = ctx.fillStyle = TITLE_COLOR;
                    ctx.fillText("Connecting...", loadingX, loadingY);

                    ctx.shadowColor = BRAGCAMERA_SHADOW;
                    ctx.shadowBlur = scoreBlur;
                    ctx.shadowColor = ctx.fillStyle = BRAGCAMERA_COLOR;
                    ctx.fillRect(closeButtonX, closeButtonY, closeButtonWidth, closeButtonHeight);

                    ctx.font = bragCameraFont;
                    ctx.shadowBlur = 0;
                    ctx.fillStyle = BRAGCAMERA_TEXTCOLOR;
                    ctx.fillText(BRAGCAMERA_EXITLABEL, closeButtonTextX, closeButtonTextY);
                }
                break;
            }
            case GAMESTATE_BRAGSCANNER:{
                let
                    result = BRAGBOARD.scannerOnFrame(canvas, ctx);

                if (result.message) {
                    if (result.isError)
                        audio.playAudio(audio.audio.step);
                    else
                        audio.playAudio(audio.audio.line);
                    setNotification(result.message);
                }

                ctx.shadowColor = BRAGCAMERA_SHADOW;
                ctx.shadowBlur = scoreBlur;
                ctx.shadowColor = ctx.fillStyle = BRAGCAMERA_COLOR;
                ctx.fillRect(bragCameraX ,bragCameraY, bragCameraWidth, bragCameraHeight);
                ctx.fillRect(closeButtonX, closeButtonY, closeButtonWidth, closeButtonHeight);

                ctx.font = bragCameraFont;
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.shadowBlur = 0;
                ctx.fillStyle = BRAGCAMERA_TEXTCOLOR;

                ctx.fillText(BRAGCAMERA_NEXTCAMERALABEL, bragCameraTextX, bragCameraTextY)
                ctx.fillText(BRAGCAMERA_EXITLABEL, closeButtonTextX, closeButtonTextY)

                break;
            }
            case GAMESTATE_PLAY:{
                let
                    gameoverProgress = isGameOver ? Math.min(1,(gameE - gameoverStart) / 500) : 0,
                    effectsGameOverProgress = 0.5+(1-gameoverProgress)*0.5,
                    opacity = Math.sin(gameE*0.01)*0.1,
                    blink = Math.sin(gameE*0.01)*10,
                    warningWave = Math.floor(Math.sin(gameE*0.01)*cellHeight*0.1),
                    isQuickDropVisible, quickDropDx, quickDropAlpha,
                    shakeX = 0,
                    shakeY = 0,
                    timePassed,
                    timeRatio;

                if (gameE >= shakeXEnd)
                    shakeXEnd = 0;
                else
                    shakeX = Math.floor(Math.random()*shakeXDelta)-shakeXStart;

                if (gameE >= shakeYEnd)
                    shakeYEnd = 0;
                else
                    shakeY = Math.floor(Math.random()*shakeYDelta)-shakeYStart;

                ctx.shadowColor = 0;
                ctx.shadowBlur = 0;

                if (isBackgroundAnimationEnabled && isBackgroundAnimated) {
                    let
                        brightness = 1;

                    if (!backgroundAnimationStartedAt)
                        backgroundAnimationStartedAt = gameE;
                    
                    if (isBackgroundAnimationChanging) {
                        let
                            ratio = (gameE-isBackgroundAnimationChanging)/BACKGROUND_FADETIME;
                        if (ratio < 0.5)
                            brightness = (1-ratio*2); 
                        else if (ratio > 1)
                            isBackgroundAnimationChanging = false;
                        else {
                            if (nextBackgroundAnimation != -1) {
                                backgroundAnimation.start(nextBackgroundAnimation);
                                nextBackgroundAnimation = -1;
                            }
                            brightness = ratio*2-1;
                        }
                    }

                    backgroundAnimation.render(gameE, ctx, canvasWidth, canvasHeight, brightness);
                    
                    ctx.filter = "none";
                    ctx.fillStyle = BACKGROUND_COLOR;
                    ctx.fillRect(boardX, boardY, boardWidth, boardHeight);
                }

                fieldEffects.render(ctx, gameE, gridX, gridY, effectsGameOverProgress);

                if (isWarning || incomingGarbage) {
                    ctx.fillStyle = "rgba(255,0,0,"+(0.3+opacity)+")";
                    ctx.fillRect(gridX,gridY,fieldWidth,cellHeight+warningWave);
                }

                if (field)
                    blitField(gameE, shakeX, shakeY, field, 1-gameoverProgress);

                overFieldEffects.render(ctx, gameE, gridX, gridY, effectsGameOverProgress);
                if (shadowBlock)
                    blitBlock(gameE, shakeX, shakeY, shadowBlock, true);
                if (movingBlock)
                    blitBlock(gameE, shakeX, shakeY, movingBlock);

                particles.render(gameE, ctx, canvasWidth, canvasHeight);

                rowTextEffects.forEach((line,id)=>{
                    if (line) {
                        if (TextSpark(ctx, gameE, rowTextEffectX, rowTextEffectY + (id * cellHeight), line))
                            rowTextEffects[id] = 0;
                    }
                })

                ctx.textBaseline = "middle";
                ctx.textAlign = "center";

                if (quickDropE) {
                    let
                        progress = Math.min(1,(gameE-quickDropE)/QUICKDROP_SPEED);
                    if (isQuickDropAvailable) {
                        quickDropDx = Math.floor((1-progress)*quickDropSlide);
                        quickDropAlpha = progress;
                    } else {
                        quickDropDx = Math.floor(progress*quickDropSlide);
                        quickDropAlpha = 1-progress;
                    }
                    if (progress == 1)
                        quickDropE = 0;
                    isQuickDropVisible = true;
                } else if (isQuickDropAvailable) {
                    isQuickDropVisible = true;
                    quickDropDx = 0;
                    quickDropAlpha = 1;
                } else {
                    isQuickDropVisible = false;
                }

                if (isQuickDropVisible) {
                    if (isInteractive)
                        ctx.fillStyle = "rgba("+Math.min(255, quickDropColor.r+blink)+","+Math.min(255, quickDropColor.g+blink)+","+Math.min(255, quickDropColor.b+blink)+","+quickDropAlpha+")";
                    else
                        ctx.fillStyle = paletteToRGBA(quickDropDisabledColor, quickDropAlpha);
                    ctx.shadowColor = paletteToRGBA(quickDropShadowColor, quickDropAlpha)
                    ctx.shadowBlur = scoreBlur;
                    ctx.fillRect(quickDropX-quickDropDx, quickDropY, quickDropWidth, quickDropHeight);

                    if (isInteractive)
                        ctx.fillStyle = paletteToRGBA(quickDropFontColor, quickDropAlpha);
                    else
                        ctx.fillStyle = paletteToRGBA(quickDropFontDisabledColor, quickDropAlpha);
                    ctx.shadowBlur = 0;
                    ctx.font = quickDropFont;
                    ctx.fillText(quickDropLabel, quickDropLabelX-quickDropDx, quickDropLabelY);
                }

                ctx.font = scoreFont;
                ctx.shadowBlur = scoreBlur;
                ctx.shadowColor = footerbarColorBorder;
                ctx.fillStyle = footerbarColorBorder;
                ctx.fillRect(footerbarX,footerbarY,footerbarWidth,footerbarHeight);

                ctx.shadowColor = footerbarColor;
                ctx.fillStyle = footerbarColor;
                ctx.fillRect(footerbarInnerX,footerbarInnerY,footerbarInnerWidth,footerbarInnerHeight);

                timePassed = playE - nextBlockStart;
                timeRatio = 1-(timePassed/timeLimit);

                // --- Render bar
                if (timePassed < timeLimit) {
                    if (timebarHeight) {
                        let
                            color,
                            opponentColor;

                        switch (mTimeBar) {
                            case MTIMEBAR_TIMELIMIT:{
                                if (timeLimitIsFall)
                                    opponentColor = color = paletteToRGBA(timebarColorCritical,(0.7+Math.sin(timePassed/timeRatio*0.002)*0.3));
                                else
                                    opponentColor = color = paletteToRGBA(timebarColor, (0.1+(timeRatio*0.9)));
                                break;
                            }
                            case MTIMEBAR_ROUNDLIMIT:{
                                opponentColor = color = paletteToRGBA(timebarColorCritical,(0.7+Math.sin(timePassed/timeRatio*0.002)*0.3));
                                break;
                            }
                            case MTIMEBAR_TUGOFWARLIMIT:{
                                if (garbageTugOfWar > 0)
                                    opponentColor = color = paletteToRGBA(timebarColorCritical,(0.7+Math.sin(timePassed/timeRatio*0.002)*0.3));
                                else {
                                    opponentColor = paletteToRGBA(timebarColor,(0.7+Math.sin(playE*0.002)*0.3));
                                    color = paletteToRGBA(timebarColor, (0.1+(timeRatio*0.9)));
                                }
                                break;
                            }
                        }

                        ctx.fillStyle = ctx.shadowColor = color;
                        ctx.fillRect(timebarX,timebarY,Math.floor(timebarWidth*timeRatio),timebarHeight);

                        if (netPlayOpponentLowestBlankLine) {
                            let
                                barHeight = cellHeight * netPlayOpponentLowestBlankLine;
                            ctx.fillStyle = ctx.shadowColor = opponentColor;
                            ctx.fillRect(opponentBarX,opponentBarY-barHeight,opponentBarWidth,barHeight);
                        }
                    }
                } else {

                    // --- Manages autodrop
                    if (timeLimitIsFall && !schedulePlayerDrop) {
                        switch (mOnTimeout) {
                            case MONTIMEOUT_NEWLEVEL:{
                                nextBlockStart = playE;
                                newLevel(true, true);
                                checkProgress(true, false);
                                autoPlayerDrop();
                                break;
                            }
                            case MONTIMEOUT_NEWTUGOFWAR:{
                                if (incomingGarbage) {
                                    vsYouGarbageGivenTotal+=incomingGarbage;
                                    // --- Spawn garbage
                                    setScoreComment(true, incomingGarbage+" garbage");
                                    // --- First garbage is autodrop, the rest is true garbage
                                    if (incomingGarbage > 1) {
                                        autodropEnded = 0;
                                        isAutodropGarbage = true;
                                        autoDrops = incomingGarbage-1;
                                        autoDropAmount = garbageAutoDropAmount;
                                    } else {
                                        autodropEnded = 2;
                                    }
                                    autoPlayerDrop();
                                } else {
                                    // --- New time window
                                    nextBlockStart = playE;
                                    autodropEnded = 2;
                                }
                                garbageTugOfWar = 0;
                                incomingGarbage = 0;
                                vsYouCurrentRecording++;
                                if (vsYouCurrentRecording >= vsYouRecordingLength) {
                                    let
                                        newLevelSound = true;

                                    vsYouCurrentRecording = 0;
                                    vsYouGarbageTrackStart = playE;
                                    if ((vsYouRecordGarbage == 0) && vsYouPunishmentTrack) {
                                        // --- Punish bad play
                                        vsYouGarbageTrack = [];
                                        vsYouPunishmentTrack.forEach((garbage)=>{
                                            vsYouGarbageTrack.push(garbage);
                                        })
                                        setScoreComment(true, "PUNISHMENT!");
                                        audio.playAudio(audio.audio.gameover);
                                    } else {
                                        // --- Perfect bonus
                                        if (!vsYouGarbageGivenTotal && vsYouGarbageTrackTotal) {
                                            addScore(level * vsYouGarbageTrackTotal * Math.ceil(field.width/2));
                                            commitScore();
                                            setScoreComment(true, "PERFECT!");
                                            audio.playAudio(audio.audio.perfect);
                                            newLevelSound = false;
                                        }
                                        // --- Play last recording
                                        if (mAfterRecording == MAFTERRECORDING_PLAYBACK)
                                            vsYouGarbageTrack = vsYouRecord;
                                    }
                                    vsYouRecord = [];
                                    vsYouRecordStart = playE;
                                    vsYouRecordGarbage = 0;
                                    vsYouGarbageTrackTotal = 0;
                                    vsYouGarbageGivenTotal = 0;
                                    // --- Change background
                                    if (vsYouTransitions) {
                                        vsYouTurn = (vsYouTurn + 1) % 2;
                                        runEvent(vsYouTransitions[vsYouTurn]);
                                    }
                                    // --- New level
                                    newLevel(false, newLevelSound);
                                    checkProgress(true, false);
                                } else {
                                    audio.playAudio(audio.audio.step, false, 0, 1.5);
                                }
                                break;
                            }
                            case MONTIMEOUT_AUTODROP:{
                                nextBlockStart = playE;
                                autoPlayerDrop();
                                break;
                            }
                        }
                    }
                }

                if (isGameOver) {
                    ctx.fillStyle = ctx.shadowColor = paletteToRGBA(gameoverColorBorder, gameoverProgress);
                    ctx.fillRect(endgameLines.x,endgameLines.y,endgameLines.width,endgameLines.height);
                    ctx.fillStyle = ctx.shadowColor = paletteToRGBA(gameoverColor, gameoverProgress)
                    ctx.fillRect(endgameLines.innerX,endgameLines.innerY,endgameLines.innerWidth,endgameLines.innerHeight);
                } else if (isButtonMode) {
                    let
                        isDrag = state == 1,
                        gap = cursorPulse*Math.sin(gameE * (isDrag ? CURSOR_PULSEDRAG : CURSOR_PULSENORMAL)),
                        width = cellWidth+(gap*2),
                        height = cellHeight+(gap*2);

                    ctx.strokeStyle = isDrag ? cursorColorDrag : cursorColor;
                    ctx.shadowColor = CURSOR_SHADOW;
                    ctx.lineWidth = cursorSize;
                    ctx.strokeRect(gridX + cursorX * cellWidth - gap, gridY + cursorY * cellHeight - gap, width, height);
                }

                // --- Manage garbage
                if (vsYouGarbageTrack) {
                    let
                        addedGarbage = 0,
                        pos = playE - vsYouGarbageTrackStart;

                    for (let i=0;i<vsYouGarbageTrack.length;i++) {
                        let
                            entry = vsYouGarbageTrack[i];
                        if (entry[0]<=pos) {
                            addedGarbage += entry[1];
                            vsYouGarbageTrackTotal += entry[1];
                            vsYouGarbageTrack.splice(i,1);
                            i--;
                        } else
                            break;
                    }

                    if (addedGarbage)
                        addGarbage(addedGarbage);
                }

                // Text

                if (scoreComment) {
                    if (TextSpark(ctx, gameE, scoreX, scoreY, scoreComment))
                        scoreComment = 0;
                }

                ctx.shadowColor = ctx.fillStyle = paletteToRGB(footerbarColorText);

                if (!scoreComment)
                    switch (mShow) {
                        case MEVALUATE_SCORE:{
                            ctx.fillText(score, scoreX, scoreY);
                            break;
                        }
                        case MEVALUATE_TIME:{
                            ctx.fillText(lines+"/"+linesPerLevel+" "+formatTime(playE), scoreX, scoreY);
                            break;
                        }
                    }

                if (isGameOver) {           
                    let
                        gameoverPulse = Math.sin(gameE*0.002);

                    ctx.textBaseline = "top";
                    endgameLines.lines.forEach((row,i)=>{
                        if (row._fontSize) {
                            if (row.blink)
                                ctx.fillStyle = paletteToRGBA(footerbarColorText,(0.7+gameoverPulse*0.3));
                            else
                                ctx.fillStyle = paletteToRGB(footerbarColorText);
                            ctx.font = row._font;
                            if (row.text)
                                ctx.fillText(row.text, endgameLines.textX, row._y);            
                            else if (row.highScore && isHighScore)
                                ctx.fillText(row.highScore, endgameLines.textX, row._y);
                            else if (row.lines)
                                ctx.fillText(lines, endgameLines.textX, row._y);
                            else if (row.level)
                                ctx.fillText(level, endgameLines.textX, row._y);
                            else if (row.score)
                                ctx.fillText(score, endgameLines.textX, row._y);
                        }
                    });
                    ctx.textBaseline = "middle";
                }
                
                if (incomingGarbage) {
                    ctx.font = warningFont;
                    ctx.shadowColor = WARNING_COLOR_SHADOW;
                    ctx.fillStyle = "rgba(255,255,255,"+(0.8-opacity)+")";
                    ctx.fillText(incomingGarbage+" GARBAGE",warningX, warningY);
                } else if (isWarning) {
                    ctx.font = warningFont;
                    ctx.shadowColor = WARNING_COLOR_SHADOW;
                    ctx.fillStyle = "rgba(255,255,255,"+(0.8-opacity)+")";
                    ctx.fillText(WARNING_TEXT,warningX, warningY);
                }

                if (deltaScoreEffect)
                    if (TextSpark(ctx, gameE, deltaScoreEffectX, deltaScoreEffectY, deltaScoreEffect))
                        deltaScoreEffect = 0;

                if (!isNotPaused) {
                    ctx.fillStyle = BACKGROUND_COLOR;
                    ctx.shadowBlur = 0;
                    ctx.filter = "brightness(0.7)"; 
                    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                    ctx.filter = "none";
                }
                    
                break;
            }
        }

        // --- Menu
        if (currentMenu)
            currentMenu.render(
                canvasWidth, canvasHeight, e, ctx,
                menuFont, menuSmallFont, menuFontSize, menuSmallFontSize,
                scoreBlur, menuLineSpacing, menuPadding,
                menuX, menuY, menuWidth, menuHeight,
                bragX, bragY, bragWidth, bragHeight, bragTextY,
                BRAGBOARD_COLOR, BRAGBOARD_TEXTCOLOR,
                BRAGBOARD_BEATENCOLOR, BRAGBOARD_BEATENTEXTCOLOR
            );

        // --- Fade in/out
        if (isTransitionState) {
            let
                progress = Math.min(1,(lastE - transitionE)/500);
            
            ctx.shadowColor = 0;
            ctx.shadowBlur = 0;

            switch (isTransitionState) {
                case 1:{
                    ctx.fillStyle="rgba(0,0,0,"+progress+")";
                    ctx.fillRect(0,0,canvasWidth,canvasHeight);
                    if (progress == 1) {
                        isNotPaused = true;
                        gameState = nextGameState;
                        isTransitionState = 2;
                        transitionE = lastE;
                        switch (gameState) {
                            case GAMESTATE_TITLE:{
                                backgroundAnimation.start(TITLE_BACKGROUNDS[Math.floor(Math.random()*TITLE_BACKGROUNDS.length)]);
                                gotoMainMenu();
                                break;
                            }
                            case GAMESTATE_PLAY:{
                                currentMenu = 0;
                                // --- Start the game
                                quickSaveClear();
                                newGame(nextGameMode, nextSeed, nextHost);
                                gameTurn();
                                break;
                            }
                            case GAMESTATE_NETPLAY:{
                                currentMenu = 0;
                                gameE = 0;
                                netPlaySetState({ s:NETPLAYSIGNAL_SETSTATE, e:nextSeed, i:nextGameMode.id, v:nextGameMode.version });
                                if (!NETPLAY.isConnected())
                                    NETPLAY.startRoomMode();
                                break;
                            }
                        }
                    }
                    break;
                }
                case 2:{
                    ctx.fillStyle="rgba(0,0,0,"+(1-progress)+")";
                    ctx.fillRect(0,0,canvasWidth,canvasHeight);
                    if (progress == 1)
                        isTransitionState = false;
                    break;
                }
            }
        }

        if (notification) {
            if (TextSpark(ctx, e, scoreX, scoreY, notification))
                notification = 0;
        }

        requestAnimationFrame(renderScreen);
    }

    // --- Score

    function addScore(a) {
        if (isGameRunning) {
            deltaScore += a;
            score += a;
        }
    }
    
    function showDeltaScore(text) {
        deltaScoreEffect = { text:text, font:deltaScoreEffectFont, color:footerbarColorText, shadowColor:rowtextColorShadow, speed:DELTASCORE_SPEED, blur:deltaScoreBlur, slide:deltaScoreSlide, delay:0, isVertical:true };
    }

    function commitScore(a) {
        if (deltaScore) {
            showDeltaScore("+"+deltaScore+" pts.");
            deltaScore = 0;
        }
    }

    function setScoreComment(force, text) {
        if (force || !scoreComment)
            scoreComment = { text:text, font:scoreFont, color:footerbarColorText, shadowColor:rowtextColorShadow, speed:COMMENT_SPEED, blur:rowTextBlur, slide:rowTextSlide, delay:0 };
    }

    // --- Notifications
    function setNotification(text) {
        notification = { text:text, font:notificationFont, color:NOTIFICATION_TEXTCOLOR, shadowColor:NOTIFICATION_SHADOWCOLOR, speed:COMMENT_SPEED, blur:rowTextBlur, slide:rowTextSlide, delay:0, backgroundColor:NOTIFICATION_COLOR, backgroundX:notificationX, backgroundY:notificationY, backgroundWidth:notificationWidth, backgroundHeight:notificationHeight,  };
    }

    // --- Helpers

    function isLineFilled(y) {
        for (let x=0;x<field.width;x++)
            if (field.isFieldFilled(x,y))
                return true;
    }

    function formatTime(time) {
        let
            dsec, sec, min, hours;

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

    function resizeGameover(gameover, padding, vPixelSize, footerbarBorder, canvasWidth) {
        let
            gameoverBoxHeight = padding*2;

        if (gameover.lines) {
            gameover.lines.forEach((line,i)=>{
                line._y = gameoverBoxHeight;
                if (line.spacing)
                    gameoverBoxHeight += (vPixelSize * line.spacing);
                else {                    
                    let
                        fontSize = Math.max(MIN_FONTSIZE,(vPixelSize * line.fontSize));
                    line._font = fontSize+"px y224";
                    line._fontSize = fontSize;
                    gameoverBoxHeight+=fontSize; 
                }
                gameoverBoxHeight+=padding;
            })

            gameover.innerHeight = gameoverBoxHeight+padding;
            gameover.innerY = gridY+Math.floor((fieldHeight-gameover.innerHeight)/2);
            gameover.innerX = 0;
            gameover.innerWidth = canvasWidth;
            gameover.lines.forEach(row=>row._y += gameover.innerY);

            gameover.height = gameover.innerHeight+footerbarBorder*2;
            gameover.x = gameover.innerX;
            gameover.y = gameover.innerY-footerbarBorder;
            gameover.width = canvasWidth;
            gameover.textX = Math.floor(canvasWidth/2);
        }
    }

    function quickSaveClear() {
        delete localStorage[GAME_STATE_LOCALSTORAGE];
    }

    function quickSave() {
        if (!isGameRunning || !settings.saveState)
            quickSaveClear();
        else if (quickSaveEnabled)
            localStorage[GAME_STATE_LOCALSTORAGE] = JSON.stringify(latestGameSerialize);
    }

    function autoSave() {
        if (quickSaveEnabled && settings.saveState) {
            latestGameSerialize = serializeGame();
            if (settings.saveState == 2)
                quickSave();
        }
    }
    
    function resetGameMode(mode) {
        if (!settings.stats[mode.id])
            settings.stats[mode.id] = {};
        if (mode.initialize.hasHighScores)
            settings.stats[mode.id].highScore = 0;
        settings.stats[mode.id].version = mode.version;
    }

    // --- BragBoard Scanner

    function bragScannerChange() {
        audio.playAudio(audio.audio.step);
        BRAGBOARD.scannerChangeCamera();
    }

    function bragScannerClose() {
        audio.playAudio(audio.audio.fall);
        BRAGBOARD.scannerStop();
        goBackTitle();
    }

    // --- Game flow

    function randomSeed() {
        return 1+Math.floor(Math.random()*SEEDS);
    }

    function newGame(mode, seed, hostguest) {
        let
            gameModeModel,
            setIdleStyle,
            setBackgroundAnimation;

        // --- Load game mode
        gameMode = mode;

        gameModeModel = GAMEMODES.models[mode.initialize.model];
        mTimeBar = gameModeModel.mTimeBar;
        mResetTimeOnBlock = gameModeModel.mResetTimeOnBlock;
        mNewLevelOnLines = gameModeModel.mNewLevelOnLines;
        mProgressOnLines = gameModeModel.mProgressOnLines;
        mEvaluate = gameModeModel.mEvaluate;
        mShow = gameModeModel.mShow;
        mGameOverOnNoBlocks = gameModeModel.mGameOverOnNoBlocks;
        mGameOverOnNoAutoDropBlocks = gameModeModel.mGameOverOnNoAutoDropBlocks;
        mOnNewBlock = gameModeModel.mOnNewBlock;
        mOnTimeout = gameModeModel.mOnTimeout;
        mAfterRecording = gameModeModel.mAfterRecording;
        mIsNetPlay = gameModeModel.mIsNetPlay;
        mPausePlayGame = gameModeModel.mPausePlayGame;

        if (!seed)
            if (mode.seed)
                seed = mode.seed;
            else
                seed = randomSeed();
        field = new Field(mode.initialize.fieldWidth, mode.initialize.fieldHeight);
        lowestLine = field.height-1;
        next = new Next(seed);
        next.setAmount(mode.initialize.setBlocksPerDrop);
        next.setBlocks(mode.initialize.blocks);
        next.setColors(mode.initialize.setColors);
        garbageNext = new Next(seed);
        garbageNext.setAmount(mode.initialize.setGarbageBlocksPerDrop || mode.initialize.setBlocksPerDrop);
        garbageNext.setBlocks(mode.initialize.garbageBlocks || mode.initialize.blocks);
        garbageNext.setColors(mode.initialize.setGarbageColors);
        random = new Random(seed);
        fieldEffects = new FieldEffects(false, true, field);
        setIdleStyle = mode.initialize.setIdleStyle;
        setBackgroundAnimation = mode.initialize.setBackgroundAnimation;
        overFieldEffects = new FieldEffects(true, false, field);
        nextMusic = mode.initialize.playMusic;
        autoDrops = mode.initialize.autoDrop;
        autoDropAmount = mode.initialize.autoDropAmount;
        timeLimit = mode.initialize.setTimeLimit;
        timeLimitIsFall = mode.initialize.setTimeLimitIsFall;
        vsYouTransitions = mode.initialize.vsYouTransitions;
        garbageAutoDropAmount = mode.initialize.garbageAutoDropAmount;
        introText = mode.initialize.introText;
        levelCap = mode.initialize.levelCap;
        footerbarColorBorder = mode.initialize.footerbarColorBorder;
        footerbarColor = mode.initialize.footerbarColor;
        footerbarColorText = mode.initialize.footerbarColorText;
        gameoverColor = mode.initialize.gameoverColor;
        gameoverColorBorder = mode.initialize.gameoverColorBorder;
        timebarBasicHeight = mode.initialize.timebarBasicHeight;
        timebarColor = mode.initialize.timebarColor;
        timebarColorCritical = mode.initialize.timebarColorCritical;
        levelMultiplierRatio = mode.initialize.levelMultiplierRatio;
        rowtextColor = mode.initialize.rowtextColor;
        rowtextColorShadow = mode.initialize.rowtextColorShadow;
        warningRows = mode.initialize.warningRows;
        lineClearColor = mode.initialize.lineClearColor;
        particlesLineClearColor = mode.initialize.particlesLineClearColor;
        particlesFallColor = mode.initialize.particlesFallColor;
        gameoverLines = { lines:mode.initialize.gameoverLines };
        gameclearLines = { lines:mode.initialize.gameclearLines };
        vsYouRecordingLength = mode.initialize.vsYouRecordingLength;
        vsYouPunishmentTrack = mode.initialize.vsYouPunishmentTrack;
        garbageLimit = mode.initialize.setGarbageLimit;
        allClearAutoDrop = mode.initialize.allClearAutoDrop;
        allClearAutoDropAmount = mode.initialize.allClearAutoDropAmount;
        cursorColor = mode.initialize.cursorColor;
        cursorColorDrag = mode.initialize.cursorColorDrag;
        quickDropThreshold = mode.initialize.quickDropThreshold;
        quickDropAutoDrops = mode.initialize.quickDropAutoDrops;
        quickDropAutoDropsAmount = mode.initialize.quickDropAutoDropsAmount;
        isQuickDropActive = mode.initialize.quickDropActive;
        quickDropColor = mode.initialize.quickDropColor;
        quickDropDisabledColor = mode.initialize.quickDropDisabledColor;
        quickDropShadowColor = mode.initialize.quickDropShadowColor;
        quickDropFontColor = mode.initialize.quickDropFontColor;
        quickDropFontDisabledColor = mode.initialize.quickDropFontDisabledColor;
        gameoverSound = mode.initialize.gameoverSound;
        timeLimitPoints = mode.initialize.timeLimitPoints;
        colorGems = mode.initialize.colorGems;
        hasHighScores = mode.initialize.hasHighScores;
        quickSaveEnabled = mode.initialize.quickSaveEnabled;

        switch (hostguest) {
            case NETPLAY_NEWGAMEHOST:{
                setIdleStyle = mode.initialize.hostSettings.setIdleStyle;
                setBackgroundAnimation = mode.initialize.hostSettings.setBackgroundAnimation;
                break;
            }
            case NETPLAY_NEWGAMEGUEST:{
                setIdleStyle = mode.initialize.guestSettings.setIdleStyle;
                setBackgroundAnimation = mode.initialize.guestSettings.setBackgroundAnimation;
                break;
            }
        }

        setPalette(mode.initialize.palette);

        fieldEffects.setIdleColors(
            setIdleStyle[0],
            setIdleStyle[1],
            setIdleStyle[2],
            setIdleStyle[3],
            setIdleStyle[4],
            setIdleStyle[5]
        );
    
        if (setBackgroundAnimation === undefined)
            isBackgroundAnimated = false;
        else {
            backgroundAnimation.start(setBackgroundAnimation);
            isBackgroundAnimated = true;
        }
        
        // --- Initialize
        autodropEnded = autoDrops ? 0 : 1;
        gameStarting = true;
        level = 1;
        lines = 0;
        combo = 0;
        score = 0;
        playE = 0;
        gameE = 0;
        deltaScore = 0;
        shakeXEnd = 0;
        shakeYEnd = 0;
        nextBlockStart = 0;
        isBackgroundAnimationChanging = false;
        isPreviouslyMovedCells = false;
        isHighScore = false;
        isNotPaused = true;
        timeStartE = 0;
        garbageTotal = 0;
        garbageTugOfWar = 0;
        incomingGarbage = 0;
        vsYouRecord = [];
        vsYouRecordStart = 0;
        vsYouRecordGarbage = 0;
        vsYouCurrentRecording = 0;
        vsYouGarbageTrack = 0;
        vsYouGarbageTrackStart = 0;
        vsYouGarbageTrackTotal = 0;
        vsYouGarbageGivenTotal = 0;
        isPlayNotPaused = false;
        vsYouTurn = 0;
        linesPerLevel = mode.initialize.linesPerLevel;
        linesToNextLevel = linesPerLevel;
        isAutodropGarbage = false;
        schedulePlayerDrop = false;
        isAllClearTest = false;
        isGameRunning = true;
        cursorX = Math.floor(field.width/2);
        cursorY = lowestLine - 2;
        isQuickDrop = false;
        isQuickDropAvailable = false;
        quickDropE = 0;
        endgameLines = 0;
        netPlayOpponentGarbage = 0;
        netPlayOpponentLowestBlankLine = 0;
        movingBlock = 0;
        shadowBlock = 0;
        state = 0;
        mode.progress.forEach((_,id)=>{
            progress[id] = { lines:0, random:new Random(seed+id) };
        })
        particles.reset();
        resetScheduler();
        resize(0, true);
    }

    function gotoGameState(state) {
        isTransitionState = 1;
        transitionE = lastE;
        nextGameState = state;
    }

    function goBackTitle() {
        if (!isTransitionState)
            gotoGameState(GAMESTATE_TITLE);
    }

    function endGame() {
        audio.stopMusic();
        currentMenu = 0;
        isInteractive = false;
        isWarning = false;
        isPlayNotPaused = false;
        isGameRunning = false;
        isNotPaused = true;
        if (settings.saveState == 2)
            quickSave();
        resetScheduler();
        netPlayCancelState();
    }

    function gameOver(failed) {
        isGameRunning = false;
        isGameOver = true;
        enableHitAt = gameE + 500;
        gameoverStart = gameE;
        endGame();
        if (hasHighScores)
            switch (mEvaluate) {
                case MEVALUATE_SCORE:{
                    if (score > settings.stats[gameMode.id].highScore) {
                        settings.stats[gameMode.id].highScore = score;
                        isHighScore = true;
                        saveSettings();
                    }
                    audio.playAudio(audio.audio[gameoverSound]);
                    endgameLines = gameoverLines;
                    break;
                }
                case MEVALUATE_TIME:{
                    if (failed) {
                        audio.playAudio(audio.audio[gameoverSound]);
                        endgameLines = gameoverLines;
                    } else {
                        if (!settings.stats[gameMode.id].highScore || (playE < settings.stats[gameMode.id].highScore)) {
                            settings.stats[gameMode.id].highScore = playE;
                            isHighScore = true;
                            saveSettings();
                        }
                        audio.playAudio(audio.audio.perfect);
                        endgameLines = gameclearLines;
                    }
                    break;
                }
            }
        else
            if (failed) {
                audio.playAudio(audio.audio[gameoverSound]);
                endgameLines = gameoverLines;
            } else {
                audio.playAudio(audio.audio.perfect);
                endgameLines = gameclearLines;
            }
        if (mIsNetPlay)
            NETPLAY.send({ s:failed ? NETPLAYSIGNAL_LOSE : NETPLAYSIGNAL_WIN })
    }

    function doQuickDrop() {
        if (isQuickDropAvailable && isInteractive && isGameRunning) {
            autodropEnded = 0;
            isQuickDrop = true;
            autoDrops = quickDropAutoDrops;
            autoDropAmount = quickDropAutoDropsAmount;
            gameTurn();
        }
    }

    function generateNextBlocks() {
        let
            sparkledColumns = [],
            nxt = autoDrops && isAutodropGarbage ? garbageNext : next,
            failures = nxt.failureLimit,
            amount = 0,
            isSpecial = false,
            amountLimit =  autoDrops ? autoDropAmount : nxt.getAmount();

        do {
            let
                placed = false,
                blockModel = nxt.get(),
                coordinates = [],
                block = new Block(0, 0, blockModel.color, blockModel.logicColor, blockModel.unshatterable, blockModel.solid, blockModel.unmovable, blockModel.block.pattern);

            for (let i=0;i<=field.width-blockModel.block.kick;i++)
                coordinates.push(i);

            do {
                block.x = random.removeElement(coordinates);
                if (block.fitsInField(field, 0, 0)) {
                    placed = true;
                    field.addBlock(block);
                    if (blockModel.special)
                        isSpecial = true;

                    if (!autoDrops)
                        for (let y=0;y<block.pattern.length;y++)
                            for (let x=0;x<block.pattern[y].length;x++)
                                if (block.pattern[y][x]){
                                    let
                                        column = block.x + x,
                                        color = colors[block.logicColor] ? colors[block.logicColor].color : lineClearColor;
                                    if (!sparkledColumns[column]) {
                                        sparkledColumns[column] = true;
                                        for (let i=0;i<field.height;i++)
                                            fieldEffects.addFlash(false, column, i, 100+(Math.random()*500), color.r, color.g, color.b);
                                    }
                            }
                    break;
                }
            } while (coordinates.length);

            if (placed) {
                failures = nxt.failureLimit;
                amount++;
            } else {
                failures--;
                if (!failures)
                    break;
            }

        } while (amount < amountLimit);

        if (isSpecial)
            audio.playAudio(audio.audio.special);

        return amount;
    }

    function gameRemoveLines() {
        field.removeLines(preparedLines);
        schedule(gameTurn,50);
    }

    function playerDrop(force) {
        if (movingBlock) {
            let
                timePassed = playE - nextBlockStart,
                isValidMove = movingBlock.x != movingBlockStart;

            if (timeLimitPoints && (timePassed < timeLimit) && isValidMove)
                addScore(timeLimitPoints);

            field.addBlock(movingBlock);
            movingBlock = 0;
            shadowBlock = 0;
            state = 0;
            if (force || isValidMove)
                gameTurn();
        } else if (force) {
            state = 0;
            gameTurn();
        }
    }

    function autoPlayerDrop(force) {
        // --- If autodropping during player turn, instantly player drop
        if (isInteractive)
            playerDrop(true);
        else
            // --- Else schedules a player drop instead of making the player interactive at the end of the game turn
            schedulePlayerDrop = true;
    }

    function explosionAtCell(cell, color, duration) {
         for (let i=0;i<5;i++)
            particles.addLinear(
                duration,
                color,
                particleSizeLarge,
                gridX+cell.x*cellWidth+hCellWidth,
                gridY+cell.y*cellHeight+hCellHeight,
                Math.random()*40-20,
                Math.random()*40-20
            );
    }

    function shatterEffectAtCell(cell) {
        let
            shatterEffectColor = colors[cell.logicColor] ? colors[cell.logicColor].shatterEffectColor : SHATTEREFFECT_COLOR;
        overFieldEffects.addHilight(true, cell.x, cell.y, 800, shatterEffectColor.r, shatterEffectColor.g, shatterEffectColor.b, 20);
        explosionAtCell(cell, shatterEffectColor, PARTICLE_DURATION);
    }

    function newLevel(priority, sound) {
        if (level < levelCap) {
            level++;
            if (sound) {
                audio.playAudio(audio.audio.newLevel);
            }
            setScoreComment(priority, "LEVEL "+level);
        }
    }

    function runEvent(event, progressItem) {
        // --- Add new incoming block
        if (event.addIncoming)
            next.addIncoming(progressItem.random.element(event.addIncoming));
        // --- Change spawing amount
        if (event.setBlocksPerDrop)
            next.setAmount(event.setBlocksPerDrop);
        // --- Change autofall
        if (event.setTimeLimitIsFall !== undefined)
            timeLimitIsFall = event.setTimeLimitIsFall;
        // --- Change time limit speed
        if (event.setTimeLimit !== undefined)
            timeLimit = event.setTimeLimit;
        // --- Change colors
        if (event.setIdleStyle)
            fieldEffects.setIdleColors(
                event.setIdleStyle[0],
                event.setIdleStyle[1],
                event.setIdleStyle[2],
                event.setIdleStyle[3],
                event.setIdleStyle[4],
                event.setIdleStyle[5]
            );
        // --- Change music
        if (event.playMusic)
            audio.mixerPlayMusic(audio.audio[event.playMusic]);
        // --- Change background
        if (event.setBackgroundAnimation !== undefined)
            fadeToBackgroundAnimation(event.setBackgroundAnimation);
        // --- Garbage limit
        if (event.setGarbageLimit !== undefined)
            garbageLimit = event.setGarbageLimit;
        // --- Autodrops
        if (event.autoDrop) {
            autodropEnded = 0;
            autoDrops = event.autoDrop;
        }
        if (event.autoDropAmount)
            autoDropAmount = event.autoDropAmount;
        // --- Colors
        if (event.setColors !== undefined)
            next.setColors(event.setColors);
        if (event.setGarbageColors !== undefined)
            garbageNext.setColors(event.setGarbageColors);
        // --- Game clear
        if (event.gameClear)
            gameOver(false);
    }

    function checkProgress(newLevel, newLine) {
        // --- Timed events
        if (isGameRunning)
            gameMode.progress.forEach((events,id)=>{
                let
                    progressItem = progress[id];
                if (newLine)
                    progressItem.lines++;
                for (let i=0;i<events.length;i++) {
                    let
                        event = events[i];
                    if (
                        (
                            (event.afterLevel && (level > event.afterLevel)) ||
                            (newLevel && (event.atLevel && (level == event.atLevel)))
                        ) && (
                            (!event.atNewLevel || (event.atNewLevel && newLevel))
                        )
                    ) {
                        if (!event.everyLines || (newLine && (progressItem.lines >= event.everyLines))) {
                            progressItem.lines = 0;
                            runEvent(event, progressItem);
                        }
                        break;
                    }
                }
            })
    }

    function gameTurn() {
        isInteractive = false;
        isPlayNotPaused = false;

        if (mResetTimeOnBlock)
            nextBlockStart = playE;

        let
            movedCells = field.applyGravity();

        if (movedCells.length) {
            isPreviouslyMovedCells = true;
            previouslyMovedCells = movedCells;
            movedCells.forEach(cell=>{
                fieldEffects.addFlash(true, cell.x, cell.y, 200, 255, 255, 255);
            })
            schedule(gameTurn,10);
        } else {
            if (!combo && isPreviouslyMovedCells) {
                audio.playAudio(audio.audio.fall);
                shakeYEnd = gameE + SHAKEDURATION_Y;
                previouslyMovedCells.forEach(cell=>{
                    for (let i=0;i<5;i++)
                        particles.addFalling(
                            PARTICLE_DURATION,
                            colors[cell.logicColor] ? colors[cell.logicColor].particleColor : particlesFallColor,
                            particleSize,
                            gridX+cell.x*cellWidth+hCellWidth,
                            gridY+cell.y*cellHeight+hCellHeight,
                            10+Math.random()*3,
                            0.05+(Math.random()*0.02),
                            Math.random()-0.5,
                            Math.random()*10
                        );
                })
            }
            isPreviouslyMovedCells = false;
            preparedLines = field.prepareLines();
            if (preparedLines.lines.length) {
                let
                    isNewLevel = false,
                    shatterSfx = false,
                    effectsCache = { shatteredColors:[], shatteredColumns:[] };
                shakeXEnd = gameE + SHAKEDURATION_X;
                preparedLines.lines.forEach((line,lid)=>{
                    // --- Manage lines
                    lines++;
                    if (mNewLevelOnLines)
                        if (level < levelCap) {
                            linesToNextLevel--;
                            if (linesToNextLevel<=0) {
                                newLevel(true, true);
                                isNewLevel = true;
                                linesToNextLevel = linesPerLevel;
                            }
                        }

                    // --- Manage score
                    combo++;
                    rowTextEffects[line.row] = { text:"CHAIN x"+combo, font:rowTextEffectFont, color:rowtextColor, shadowColor:rowtextColorShadow, speed:ROWTEXT_SPEED, delay:lid*ROWTEXT_DELAY, blur:rowTextBlur, slide:rowTextSlide };
                    // --- Clearing lines with same logic color make a special block spawn
                    if (colorGems)
                        for (let i=0;i<LOGICCOLORS;i++)
                            if (line.logicColors[i] == field.width)
                                next.addIncoming({
                                    special:true,
                                    color:i+GEM_COLORGEMID,
                                    logicColor:i,
                                    block:{ kick:1, pattern:[ [ 1 ] ]}
                                });


                    // --- Check lines progress
                    if (mProgressOnLines)
                        checkProgress(isNewLevel, true);
                });
                // --- Manage cleared blocks
                preparedLines.cells.forEach(cell=>{
                    // --- Check cleared block special effects
                    let
                        effect = colors[cell.color];
                    // --- Add score
                    addScore(effect.score * (combo + Math.floor(level * levelMultiplierRatio)));
                    // --- EFFECT: Shatter a color
                    if ((effect.shatterColor!== undefined) && (!effectsCache.shatteredColors[effect.shatterColor])) {
                        let
                            shatteredCells = field.shatterColor(effect.shatterColor);
                        shatteredCells.forEach(cell=>{
                            shatterEffectAtCell(cell);
                            shatterSfx = true;
                        })
                        effectsCache.shatteredColors[effect.shatterColor] = true;
                    }
                    // --- EFFECT: Shatter a column
                    if ((effect.shatterColumn!== undefined) && (!effectsCache.shatteredColumns[cell.x])) {
                        let
                            shatteredCells = field.shatterColumn(cell.x);
                        shatteredCells.forEach(cell=>{
                            shatterEffectAtCell(cell);
                            shatterSfx = true;
                        })
                        effectsCache.shatteredColumns[cell.x] = true;
                        // --- Hilight column
                        for (let y=0;y<field.height;y++)
                            overFieldEffects.addHilight(false, cell.x, y, 800, effect.effectColor.r, effect.effectColor.g, effect.effectColor.b, 20);
                    }

                    // --- Add cleared VFX
                    overFieldEffects.addHilight(true, cell.x, cell.y, 400, lineClearColor.r, lineClearColor.g, lineClearColor.b, 20);
                    explosionAtCell(cell, particlesLineClearColor, PARTICLE_DURATION_FAST);
                })
                if (shatterSfx)
                    audio.playAudio(audio.audio.break);
                audio.playAudio(audio.audio.line, false, 0, 1+Math.min(2,combo*0.2));
                commitScore();
                schedule(gameRemoveLines,300);
            } else {
                let
                    prevQuickDropAvailable = isQuickDropAvailable;

                // --- End combo
                commitScore();

                switch (mOnNewBlock) {
                    case MONNEWBLOCK_CHECKNEWROUNDSTART:{
                        if (autoDrops) {
                            if (!isQuickDrop)
                                nextBlockStart = playE;
                        } else if (autodropEnded == 2) {
                            autodropEnded = 3;
                            if (isQuickDrop)
                                isQuickDrop = false;
                            else
                                nextBlockStart = playE;
                        }
                        break;
                    }
                    case MONNEWBLOCK_NEWTIMELIMIT:{
                        nextBlockStart = autoDrops ? 0 : playE;
                        break;
                    }
                    case MONNEWBLOCK_COLLECTGARBAGE:{
                        if (combo > 1) {
                            let
                                power = combo - 1;
                            vsYouRecord.push([ playE-vsYouRecordStart, power ]);
                            garbageTugOfWar -= power;
                            vsYouRecordGarbage += power;
                            garbageTotal += power;
                            limitIncomingGarbage();
                        }
                        break;
                    }
                }

                combo = 0;
                isGameOver = false;
                    
                // --- Check warning bar and endgame

                isWarning = isLineFilled(warningRows);
                isGameOver = isLineFilled(0);

                // --- Check lowest blank line                
                for (lowestBlankLine=lowestLine;lowestBlankLine>=0;lowestBlankLine--)
                    if (!isLineFilled(lowestBlankLine))
                        break;

                isQuickDropAvailable = isQuickDropActive && (lowestBlankLine >= quickDropThreshold);
                if (isQuickDropAvailable != prevQuickDropAvailable)
                    quickDropE = gameE;

                // --- Check end game
                if (isGameOver || (
                    (mGameOverOnNoBlocks && !generateNextBlocks()) ||
                    (mGameOverOnNoAutoDropBlocks && autoDrops && !generateNextBlocks())
                ))
                    // --- End game
                    gameOver(true);
                else {
                    // --- Continue
                    if (isWarning)
                        audio.playAudio(audio.audio.warning);
                    if (autoDrops) {
                        autoDrops--;
                        if (!autoDrops)
                            autodropEnded = 1;
                        schedule(gameTurn,10);
                    } else if (schedulePlayerDrop) {
                        schedulePlayerDrop = false;
                        playerDrop(true);
                    } else {
                        if (isAllClearTest) {
                            if (lowestBlankLine == lowestLine) {
                                setScoreComment(false, "ALL CLEAR!");
                                audio.playAudio(audio.audio.perfect);
                                addScore(level * field.width * 3);
                                autodropEnded = 0;
                                autoDrops = allClearAutoDrop;
                                autoDropAmount = allClearAutoDropAmount;
                                isAllClearTest = false;
                                schedule(gameTurn,10);
                            } else {
                                isPlayNotPaused = true;
                                isInteractive = true;
                                autoSave();
                            }
                        } else {
                            isPlayNotPaused = true;
                            isInteractive = true;
                            isAllClearTest = true;
                            autoSave();
                        }
                    }
                    if (autodropEnded == 1) {
                        autodropEnded = 2;
                        if (gameStarting) {
                            vsYouRecordStart = playE;
                            vsYouRecordGarbage = 0;
                            gameStarting = false;
                            setScoreComment(true, introText);
                            audio.playMusic(audio.audio[nextMusic]);
                        }
                    }
                    if (mIsNetPlay)
                        NETPLAY.send({ s:NETPLAYSIGNAL_DATA, g:garbageTotal, l:field.height-lowestBlankLine-1 });
                }
            }
        }
    }

    // --- Screen resize

    function resize(times, force) {
        let
            clientWidth = document.body.clientWidth,
            clientHeight = document.body.clientHeight,
            hPixelSize,
            vPixelSize,
            pixelSize,
            otherPixelSize,
            footerbarBorder,
            scoreFontSize,
            notificationFontSize,
            titleFontSize,            
            footerFontSize,
            rowTextEffectFontSize,
            bragCameraFontSize,
            creditsFontSize,
            quickDropFontSize,
            quickDropPadding,
            borderDistance,
            footerY,
            border;

        if (
            force ||
            (oldClientWidth != clientWidth) ||
            (oldClientHeight != clientHeight)
        ) {

            oldClientWidth = clientWidth;
            oldClientHeight = clientHeight;
            canvasWidth = Math.floor(clientWidth/SCALE);
            canvasHeight = Math.floor(clientHeight/SCALE);

            vPixelSize = Math.max(Math.floor(canvasHeight/300),1);
            hPixelSize = Math.max(Math.floor(canvasWidth/300),1);
            borderDistance = hPixelSize*BORDER_DISTANCE;

            pixelSize = vPixelSize;
            timebarHeight = pixelSize*timebarBasicHeight;
            footerbarHeight = vPixelSize * FOOTERBAR_SIZE;        
            padding = Math.floor(canvasHeight*PADDING_RATIO);
            fieldHeight = canvasHeight - (padding*4) - footerbarHeight;
            cellWidth = cellHeight = Math.floor(fieldHeight / field.height);
            if (cellWidth % 2) {
                cellWidth--;
                cellHeight--;
            }
            fieldHeight = cellHeight * field.height;
            fieldWidth = cellWidth*field.width;
            gridX = Math.floor((canvasWidth-fieldWidth)/2);

            if (fieldWidth + gridX + (borderDistance*2) > canvasWidth) {
                pixelSize = hPixelSize;
                timebarHeight = pixelSize*timebarBasicHeight;
                footerbarHeight = vPixelSize * FOOTERBAR_SIZE;
                padding = Math.floor(canvasHeight*PADDING_RATIO);
                fieldWidth = canvasWidth - (borderDistance*2) - (padding*2);
                cellWidth = cellHeight = Math.floor(fieldWidth / field.width);
                if (cellWidth % 2) {
                    cellWidth--;
                    cellHeight--;
                }
                fieldHeight = cellHeight*field.height;
                fieldWidth = cellWidth*field.width;
                gridX = Math.floor((canvasWidth-fieldWidth)/2);
            }

            hCellWidth = Math.floor(cellWidth/2);
            hCellHeight = Math.floor(cellHeight/2);

            blockBorderSize = Math.ceil(cellWidth * 0.1);
            fieldEffects.setCellSize(cellWidth, cellHeight, Math.ceil(cellWidth * 0.1), Math.ceil(cellWidth * 0.05));
            overFieldEffects.setCellSize(cellWidth, cellHeight);
            innerCellWidth = cellWidth - blockBorderSize*2;
            innerCellHeight = cellHeight - blockBorderSize*2;
            sparkleX = blockBorderSize*2;
            sparkleY = blockBorderSize*2;
            sparkleWidth = Math.floor((innerCellWidth-(blockBorderSize*2))/2);
            sparkleHeight = Math.floor((innerCellWidth-(blockBorderSize*2))/2);

            // --- Footer bar
            footerbarBorder = pixelSize * FOOTERBAR_BORDER;
            footerbarInnerX = footerbarX = 0;
            footerbarY = canvasHeight - padding - footerbarHeight;
            footerbarInnerWidth = footerbarWidth = canvasWidth;
            footerbarInnerY = footerbarY + footerbarBorder;
            footerbarInnerHeight = footerbarHeight - (footerbarBorder*2);

            // --- Timebar
            timebarWidth = fieldWidth;
            timebarX = gridX;
            timebarY = footerbarY - timebarHeight - padding;

            // --- Grid Y
            gridY = timebarY - fieldHeight - padding;

            // --- Board            
            boardX = gridX - (padding*3);
            boardY = Math.max(0, gridY - (padding*3));
            boardWidth = fieldWidth + (padding*6);
            boardHeight = canvasHeight;
            boardRight = boardX + boardWidth;
            if (boardY < 10) {
                boardHeight += boardY;
                boardY = 0;
            }

            // --- Opponent bar
            opponentBarX = gridX+fieldWidth;
            opponentBarY = gridY+fieldHeight;
            opponentBarWidth = timebarHeight;

            // --- Particles
            particleSize = pixelSize*2;
            particleSizeLarge = pixelSize*4;

            // --- Score text
            scoreX = Math.floor(canvasWidth/2);
            scoreY = footerbarY + Math.floor((footerbarHeight/2));
            scoreFontSize = Math.max(MIN_FONTSIZE,(vPixelSize * FOOTERBAR_FONTSIZE));
            scoreFont = scoreFontSize+"px y224";
            scoreBlur = pixelSize * 2;

            // --- Notifications
            notificationFontSize = Math.max(MIN_FONTSIZE,(vPixelSize * NOTIFICATION_FONTSIZE));
            notificationFont = notificationFontSize+"px y224";
            notificationX = 0;
            notificationY = footerbarY;
            notificationWidth = canvasWidth;
            notificationHeight = footerbarHeight;

            // --- Delta score
            deltaScoreEffectX = scoreX;
            deltaScoreEffectY = footerbarY;
            deltaScoreEffectFont = Math.max(MIN_FONTSIZE, Math.floor(DELTASCORE_FONTSIZE * pixelSize))+"px y224";
            deltaScoreBlur = pixelSize*2;
            deltaScoreSlide = pixelSize*2;

            // --- Warning bar
            warningFont = Math.max(MIN_FONTSIZE, Math.floor(cellHeight * 0.5))+"px y224";
            warningX = Math.floor(gridX + (fieldWidth/2));
            warningY = Math.floor(gridY + (cellHeight/2));

            // --- Quick drop button
            quickDropFontSize = Math.max(MIN_FONTSIZE,pixelSize * QUICKDROP_FONTSIZE);
            quickDropPadding = pixelSize * QUICKDROP_PADDING;
            quickDropSlide = pixelSize * QUICKDROP_SLIDE;
            quickDropFont = quickDropFontSize+"px y224";
            quickDropWidth = hPixelSize * QUICKDROP_WIDTH;
            quickDropHeight = vPixelSize * QUICKDROP_HEIGHT;
            quickDropX = gridX - (hPixelSize * QUICKDROP_MARGIN) - quickDropWidth;
            quickDropY = Math.floor(gridY + (fieldHeight - quickDropHeight)*0.4);
            if (quickDropX < pixelSize*QUICKDROP_STICK) {
                quickDropWidth += quickDropX;
                quickDropX = 0;
            }
            quickDropX1 = quickDropX+quickDropWidth;
            quickDropY1 = quickDropY+quickDropHeight;
            quickDropLabelX = quickDropX+Math.floor(quickDropWidth / 2);
            quickDropLabelY = quickDropY+Math.floor(quickDropHeight / 2);
            quickDropLabel = QUICKDROP_LABEL;

            // --- Row text
            rowTextEffectFontSize = Math.max(MIN_FONTSIZE, Math.floor(cellHeight*0.5));
            rowTextEffectFont = rowTextEffectFontSize+"px y224";
            rowTextEffectY = gridY + (cellHeight/2);
            rowTextEffectX = Math.floor(canvasWidth/2);
            rowTextBlur = pixelSize * 2;
            rowTextSlide = cellWidth * 3;

            // --- Game over screen

            resizeGameover(gameoverLines, padding,vPixelSize, footerbarBorder, canvasWidth);
            resizeGameover(gameclearLines, padding,vPixelSize, footerbarBorder, canvasWidth);
            
            // --- Cursor
            cursorSize = pixelSize * CURSOR_SIZE;
            cursorPulse = pixelSize * CURSOR_PULSE;

            // --- Screen shake
            shakeXStart = Math.min(-1,-1*pixelSize);
            shakeXDelta = Math.max(2,pixelSize*2);
            shakeYStart = Math.min(-1,-0.5*pixelSize);
            shakeYDelta = Math.max(2,pixelSize*1);

            // --- Title
            titleFontSize = Math.max(MIN_FONTSIZE, Math.floor(canvasWidth*0.6/GAME_NAME.length));
            titleFont = titleFontSize+"px y224";
            titleX = canvasWidth/2;
            titleY = Math.floor(canvasHeight/4);
            titleWave = pixelSize * 3;

            // --- Footer
            footerFontSize = Math.max(MIN_FONTSIZE,Math.floor(pixelSize*FOOTER_FONTSIZE));
            footerFont = footerFontSize+"px y224";
            footerX = canvasWidth/2;
            footerY = canvasHeight - (footerFontSize+padding)*GAME_FOOTER.length;
            for (let i=0;i<GAME_FOOTER.length;i++)
                footerRows[i] = footerY+(footerFontSize+padding)*i;

            // --- Menu
            menuHeight = Math.floor(canvasHeight/4);
            menuFontSize = Math.max(MIN_FONTSIZE,Math.floor(menuHeight/12));
            menuSmallFontSize = Math.max(MIN_FONTSIZE,Math.floor(menuFontSize*0.7));
            menuFont = menuFontSize+"px y224";
            menuSmallFont = menuSmallFontSize+"px y224";
            menuX = 0;
            menuY = Math.floor((canvasHeight-menuHeight)*0.6);
            menuWidth = canvasWidth;
            menuPadding = padding;
            menuDragSize = Math.ceil(Math.min(canvasWidth, canvasHeight)/10);
            menuLineSpacing = pixelSize * 4;

            // --- Bragboard
            bragWidth = menuSmallFontSize*25;
            bragHeight = menuSmallFontSize + padding*2;
            bragX = Math.floor((canvasWidth-bragWidth)/2);
            bragY = Math.floor(bragHeight/2)-(vPixelSize*2);
            bragTextY = Math.floor(bragHeight/2);
            bragQrWidth = Math.floor(Math.min(canvasWidth, canvasHeight) * 0.6);
            bragQrHeight = bragQrWidth;
            bragQrX = Math.floor((canvasWidth-bragQrWidth)/2);
            bragQrY = Math.floor((canvasHeight-bragQrHeight)/2);

            bragCameraFontSize = Math.max(MIN_FONTSIZE,pixelSize*BRAGCAMERA_FONTSIZE);
            bragCameraFont = bragCameraFontSize+"px y224";
            bragCameraX = padding;
            bragCameraY = padding;
            bragCameraWidth = pixelSize * BRAGCAMERA_BUTTONSIZE;
            bragCameraHeight = bragCameraWidth;
            bragCameraX1 = bragCameraX+bragCameraWidth;
            bragCameraY1 = bragCameraY+bragCameraHeight;
            bragCameraTextX = bragCameraX+Math.floor(bragCameraWidth/2);
            bragCameraTextY = bragCameraY+Math.floor(bragCameraHeight/2);

            closeButtonWidth = pixelSize * BRAGCAMERA_BUTTONSIZE;
            closeButtonHeight = bragCameraWidth;
            closeButtonX = canvasWidth-padding-closeButtonWidth;
            closeButtonY = padding;
            closeButtonX1 = closeButtonX+closeButtonWidth;
            closeButtonY1 = closeButtonY+closeButtonHeight;
            closeButtonTextX = closeButtonX+Math.floor(closeButtonWidth/2);
            closeButtonTextY = closeButtonY+Math.floor(closeButtonHeight/2);

            // --- Credits
            creditsFontSize = Math.max(MIN_FONTSIZE,Math.floor(hPixelSize*CREDITS_FONTSIZE));
            creditsFont = creditsFontSize+"px y224";
            creditsLineHeight = creditsFontSize + pixelSize*2;

            // --- Loading
            loadingX = Math.floor(canvasWidth/2);
            loadingY = Math.floor(canvasHeight/2);
            
            // --- Canvas
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            canvas.style.transformOrigin = "0 0";
            canvas.style.transform = "translate("+((clientWidth-(canvasWidth*SCALE))/2)+"px,"+((clientHeight-(canvasHeight*SCALE))/2)+"px) scale("+SCALE+")";

            isBackgroundAnimationEnabled = isBackgroundAnimationOn && ((boardX > 20) || (boardY > 20));

        }

        if (times)
            schedule(()=>{ resize(times-1)},100);
    }

    // --- Button controls

    function isButtonOk(button) {
        return (button == BUTTON_START || button == BUTTON_BACK || button == BUTTON_DRAG);
    }

    function onButton(updown, button) {
        if (updown) {
            if (currentMenu) {
                switch (button) {
                    case BUTTON_UP: {
                        menuDragE = 0;
                        if (currentMenu.moveUp(true))
                            menuMaySelect = false;
                        break;
                    }
                    case BUTTON_DOWN: {
                        menuDragE = 0;
                        if (currentMenu.moveDown(true))
                            menuMaySelect = false;
                        break;
                    }
                    case BUTTON_BACK:{
                        menuDragE = 0;
                        if (currentMenu.back())
                            menuMaySelect = false;
                        break;
                    }
                    case BUTTON_START:
                    case BUTTON_DRAG:{
                        if (currentMenu)
                            currentMenu.select();
                        menuDragE = 0;
                        break;
                    }
                }
            } else if (credits) {
                if (isButtonOk(button))
                    endCredits();
            } else if (isGameOver && (gameE > enableHitAt) && isButtonOk(button)) {
                endRun();
            } else
                switch (gameState) {
                    case GAMESTATE_PLAY:{
                        if ((state == 1) && isPointerMode) {
                            playerDrop();
                        } else if (isGameRunning && (button == BUTTON_BACK) )
                            gotoPause(); 
                        else {
                            let
                                moved;

                            switch (button) {
                                case BUTTON_UP:{
                                    if (state != 1) {
                                        cursorY--;
                                        if (cursorY<0)
                                            cursorY = field.height-1;
                                    }
                                    break;
                                }
                                case BUTTON_DOWN:{
                                    if (state != 1) {
                                        cursorY++;
                                        if (cursorY>=field.height)
                                            cursorY = 0;
                                    }
                                    break;
                                }
                                case BUTTON_LEFT:{
                                    if (state == 1) {
                                        if (isInteractive) {
                                            // --- Drag block
                                            if (movingBlock.fitsInField(field, -1, 0)) {
                                                cursorX--;
                                                movingBlock.x--;
                                                moved = true;
                                            }
                                        }
                                    } else {
                                        // --- Move cursor
                                        cursorX--;
                                        if (cursorX<0)
                                            cursorX = field.width-1;
                                    }
                                    break;
                                }
                                case BUTTON_RIGHT:{
                                    if (state == 1) {
                                        if (isInteractive) {
                                            // --- Drag block
                                            if (movingBlock.fitsInField(field, 1, 0)) {
                                                cursorX++;
                                                movingBlock.x++;
                                                moved = true;
                                            }
                                        }
                                    } else {
                                        // --- Move cursor
                                        cursorX++;
                                        if (cursorX>=field.width)
                                            cursorX = 0;
                                    }
                                    break;
                                }
                                case BUTTON_START:{
                                    doQuickDrop();
                                    break;
                                }
                                case BUTTON_DRAG:{
                                    if (isInteractive && (state == 0)) {
                                        let
                                            selectedCell = field.getCell(cursorX, cursorY);
                                        if (selectedCell) {
                                            if (selectedCell.unmovable) {
                                                let
                                                    selectedArea = field.extractBlockAreaAt(cursorX, cursorY);
                                                selectedArea.cells.forEach(cell=>{
                                                    overFieldEffects.addHilight(true, cell.x, cell.y, 400, DENIED_COLOR.r, DENIED_COLOR.g, DENIED_COLOR.b, 20);
                                                })
                                                audio.playAudio(audio.audio.blocked);
                                            } else {
                                                // --- Drag and move
                                                movingBlock = field.extractBlockAt(cursorX, cursorY);
                                                shadowBlock = movingBlock.clone();
                                                movingOrigin = cursorX;
                                                movingBlockStart = movingBlock.x;
                                                state = 1;
                                            }
                                        }
                                    }
                                    break;
                                }
                            }

                            if (moved)
                                audio.playAudio(audio.audio.step);
                        }
                        break;
                    }
                    case GAMESTATE_BRAGQR:{
                        if (isButtonOk(button))
                            goBackTitle();
                        break;
                    }
                    case GAMESTATE_BRAGSCANNER:{
                        if (isButtonOk(button))
                            bragScannerClose();
                        else
                            bragScannerChange();
                        break;
                    }
                    case GAMESTATE_NETPLAY:{
                        if (
                            !isTransitionState &&
                            gameE > NETPLAY_SCREENDELAY &&
                            (button == BUTTON_BACK)
                        )
                            netPlayAbortConnect();
                        break;
                    }
                }
        } else {
            if (!menuDragE && (state == 1) && isInteractive && (button == BUTTON_DRAG)) {
                playerDrop();
            }
        }
        isButtonMode = true;
        isPointerMode = false;
    }

    // --- Controls: Mouse/touch

    canvas.onpointerdown = (e)=>{
        let
            pointerX = e.clientX / SCALE,
            pointerY = e.clientY / SCALE;

        audio.audioInitialize();
        if (settings.fullscreen)
            setFullScreen();
        if (currentMenu) {
            menuMaySelect = true;
            menuDragY = pointerY;
            menuDragE = lastE;
        } else if (credits) {
            endCredits();
        } else 
            switch (gameState) {
                case GAMESTATE_PLAY:{
                    if (
                        isQuickDropAvailable &&
                        (pointerX > quickDropX) &&
                        (pointerX < quickDropX1) &&
                        (pointerY > quickDropY) &&
                        (pointerY < quickDropY1)
                    )
                        doQuickDrop();
                    else if (isGameRunning && ((pointerX < boardX) || (pointerX > boardRight) || (pointerY < boardY) || (pointerY > footerbarInnerY)))
                        gotoPause(); 
                    else if (isInteractive) {
                        if ((state == 1) && isButtonMode) {
                            playerDrop();
                        } else {
                            let
                                cellX = Math.floor((pointerX-gridX)/cellWidth),
                                cellY = Math.floor((pointerY-gridY)/cellHeight);

                            if (field.isInField(cellX, cellY)) {

                                switch (state) {
                                    case 0:{
                                        let
                                            selectedCell = field.getCell(cellX, cellY);

                                        if (selectedCell) {
                                            if (selectedCell.unmovable) {
                                                let
                                                    selectedArea = field.extractBlockAreaAt(cellX, cellY);
                                                selectedArea.cells.forEach(cell=>{
                                                    overFieldEffects.addHilight(true, cell.x, cell.y, 400, DENIED_COLOR.r, DENIED_COLOR.g, DENIED_COLOR.b, 20);
                                                })
                                                audio.playAudio(audio.audio.blocked);
                                            } else {
                                                // --- Drag and move
                                                movingBlock = field.extractBlockAt(cellX, cellY);
                                                shadowBlock = movingBlock.clone();
                                                movingOrigin = cellX;
                                                movingBlockStart = movingBlock.x;
                                                state = 1;
                                            }
                                        }  else if (DEBUG) {
                                            field.addBlock(
                                                new Block(cellX, cellY, 0, 0, false, false, false, [ [ 1 ] ] )
                                            );
                                        }
                                        break;
                                    }
                                }
                            }
                        }
                    } else if (isGameOver && (gameE > enableHitAt))
                    endRun();
                    break;
                }
                case GAMESTATE_BRAGQR:{
                    goBackTitle();
                    break;
                }
                case GAMESTATE_BRAGSCANNER:{
                    if (
                        (pointerX > bragCameraX) &&
                        (pointerX < bragCameraX1) &&
                        (pointerY > bragCameraY) &&
                        (pointerY < bragCameraY1)
                    )
                        bragScannerChange();
                    else if (
                        (pointerX > closeButtonX) &&
                        (pointerX < closeButtonX1) &&
                        (pointerY > closeButtonY) &&
                        (pointerY < closeButtonY1)
                    )
                        bragScannerClose();
                    break;
                }
                case GAMESTATE_NETPLAY:{
                    if (
                        !isTransitionState &&
                        gameE > NETPLAY_SCREENDELAY &&
                        (pointerX > closeButtonX) &&
                        (pointerX < closeButtonX1) &&
                        (pointerY > closeButtonY) &&
                        (pointerY < closeButtonY1)
                    )
                        netPlayAbortConnect();
                    break;
                }
            }
        isButtonMode = false;
        isPointerMode = true;
        e.preventDefault();
        return false;
    }

    canvas.onpointermove = (e)=>{
        if (isPointerMode) {
            let
                pointerX = e.clientX / SCALE,
                pointerY = e.clientY / SCALE;

            if (menuDragE) {
                if (currentMenu) {
                    let
                        side = menuDragY - pointerY;

                    if (side > menuDragSize) {
                        if (currentMenu.moveDown()) {
                            menuMaySelect = false;
                            menuDragY = pointerY;
                        }
                    } else if (side < -menuDragSize) {
                        if (currentMenu.moveUp()) {
                            menuMaySelect = false;
                            menuDragY = pointerY;
                        }
                    }
                }
            } else if (isInteractive) {
                let
                    cellX = Math.floor((pointerX-gridX)/cellWidth),
                    cellY = Math.floor((pointerY-gridY)/cellHeight);

                if (field.isInFieldX(cellX)) {
                    switch (state) {
                        case 1:{
                            // Moving block
                            let
                                moved = false;

                            if (cellX != movingOrigin) {
                                do {
                                    if (cellX > movingOrigin) {
                                        if (movingBlock.fitsInField(field, 1, 0)) {
                                            movingBlock.x++;
                                            movingOrigin++;
                                            moved = true;
                                        } else
                                            break;
                                    } else if (cellX < movingOrigin) {
                                        if (movingBlock.fitsInField(field, -1, 0)) {
                                            movingBlock.x--;
                                            movingOrigin--;
                                            moved = true;
                                        } else
                                            break;
                                    }
                                } while (cellX != movingOrigin)
                            }

                            if (moved)
                                audio.playAudio(audio.audio.step);
                            break;
                        }
                    }
                }
            }
        }
        e.preventDefault();
        return false;
    }

    canvas.onpointerleave = canvas.onpointerup = (e)=>{
        if (menuDragE) {
            if (currentMenu && menuMaySelect && (lastE - menuDragE < MENU_TAPTIMING))
                currentMenu.select();
            menuDragE = 0;
        } else if (isInteractive) {
            switch (state) {
                case 1:{
                    // Moving block
                    playerDrop();
                    break;
                }
            }
        }
        e.preventDefault();
        return false;
    }

    // --- Controls: Gamepad
    
    function gamePadButtonIsPressed (b) {
		if (gamepadPressedMode) return b?Math.abs(b.value)>0.7:0;
		else return b==1.0;
	}
    
    function updateControls() {
        if (useGamepads) {
            let
                gamepads = DEVICE.getGamepads();

            gamepads.forEach(gamepad=>{
                if (gamepad) {
                    GAMEPAD.forEach((control,id)=>{
                        let
                            isPressed = false;

                        if (control.gamePadButtons)
                            for (let i=0;i<control.gamePadButtons.length;i++)
                                if (gamePadButtonIsPressed(gamepad.buttons[control.gamePadButtons[i]]))
                                    isPressed |= true;

                        if (gamepad.axes) {
                            if ((control.gamePadAxisGreater !== undefined) && gamepad.axes[control.gamePadAxisGreater])
                                isPressed |= gamepad.axes[control.gamePadAxisGreater] > 0.7;
                            else if ((control.gamePadAxisLesser !== undefined) && gamepad.axes[control.gamePadAxisLesser])
                                isPressed |= gamepad.axes[control.gamePadAxisLesser] < -0.7;
                        }


                        if (isPressed != gamepadButtons[id]) {
                            gamepadButtons[id] = isPressed;
                            onButton(isPressed, control.button);
                        }
                    })
                }
            })
        }
    }

     window.addEventListener("gamepadconnected", (e) => {
        useGamepads = true;
        if (e.gamepad.buttons[0]) gamepadPressedMode=typeof e.gamepad.buttons[0]=="object";
    });

    // --- Controls: Keyboard
    
    function onKeyCode(updown, code) {
        switch (code) {
            case KEY_UP:
            case KEY_W:
            case KEY_I:
            case KEY_Z: {
                onButton(updown, BUTTON_UP);
                break;
            }
            case KEY_DOWN:
            case KEY_S:
            case KEY_K: {
                onButton(updown, BUTTON_DOWN);
                break;
            }
            case KEY_RIGHT:
            case KEY_D:
            case KEY_L: {
                onButton(updown, BUTTON_RIGHT);
                break;
            }
            case KEY_LEFT:
            case KEY_A:
            case KEY_J:
            case KEY_Q: {
                onButton(updown, BUTTON_LEFT);
                break;
            }
            case KEY_SPACE:{
                onButton(updown, BUTTON_DRAG);
                break;
            }
            case KEY_ENTER:{
                onButton(updown, BUTTON_START);
                break;
            }
            case KEY_ESC:
            case KEY_1:{
                onButton(updown, BUTTON_BACK);
                break;
            }
        }
    }

    document.onkeydown = (e) => {
        audio.audioInitialize();
        if (settings.fullscreen)
            setFullScreen();

        onKeyCode(true, e.keyCode);
       
        e.preventDefault();
    }

    document.onkeyup = (e) => {
        audio.audioInitialize();
        if (settings.fullscreen)
            setFullScreen();

        onKeyCode(false, e.keyCode);
       
        e.preventDefault();
    }

    // --- Controls: Mouse

    canvas.onwheel = (e)=> {
        if (currentMenu) {
            let
                delta=e.timeStamp-wheelTimestamp;
            if (delta>100) {
                if (e.deltaY>0) {
                    menuDragE = 0;
                    if (currentMenu.moveDown())
                        menuMaySelect = false;
                } else if (e.deltaY<0) {
                    menuDragE = 0;
                    if (currentMenu.moveUp())
                        menuMaySelect = false;
                }
            }
            wheelTimestamp=e.timeStamp;
        }
    }

    // ---  DOM events: Resize

    window.onresize = ()=>{
        resize(5);
    }

    // --- Fullscreen

    function setFullScreen() {
        if (canvas.requestFullscreen)
            canvas.requestFullscreen();
        else if (canvas.webkitRequestFullscreen)
            canvas.webkitRequestFullscreen();
        else if (root.msRequestFullscreen)
            canvas.msRequestFullscreen();
    }

    // --- Game state

    window.onbeforeunload = ()=>{
        quickSave();
    }

    // --- Settings

    function saveSettings() {
        localStorage[GAME_LOCALSTORAGE] = JSON.stringify(settings);
    }

    function applySettings() {
        audio.setMusicEnabled(settings.music);
        audio.setEffectsEnabled(settings.sfx);
        isBackgroundAnimationOn = settings.bganimations;
        SCALE = settings.scale;
        backgroundAnimation.setQuality(BACKGROUND_QUALITY[settings.bgquality].value);
        backgroundAnimationStartedAt = gameE;
        resize(0, true);
    }

    function loadSettings() {
        try {
            settings = JSON.parse(localStorage[GAME_LOCALSTORAGE]);
        } catch (e) {
            settings = {};
        }

        if (!settings.stats)
            settings.stats = {};

        if (settings.music === undefined)
            settings.music = true;

        if (settings.sfx === undefined)
            settings.sfx = true;

        if (settings.fullscreen === undefined)
            settings.fullscreen = false;

        if (settings.saveState === undefined)
            settings.saveState = 1;

        if (!settings.scale)
            settings.scale = 1;

        if (settings.bgquality === undefined)
            settings.bgquality = 1;

        if (settings.bganimations === undefined)
            settings.bganimations = true;

        GAMEMODES.list.forEach((mode,id)=>{
            if (!settings.stats[mode.id] || (mode.initialize.hasHighScores && (settings.stats[mode.id].highScore === undefined)))
                resetGameMode(mode);
            if (!settings.stats[mode.id].version)
                settings.stats[mode.id].version = 1;
            // --- Delete highscores if from a different version. Sorry!
            if (settings.stats[mode.id].version != mode.version)
                resetGameMode(mode);
        })

    }

    // --- Run

    self = {
        run:()=>{
            // --- Initialize
            DEVICE.initialize();
            canvas.style.backgroundColor = "#000";
            document.body.appendChild(canvas);
            GAMEPAD.forEach((control,id)=>{
                gamepadButtons[id] = false;
            });

            // --- Initialize audio
            audio = new AudioPlayer({
                resourcesPrefix:"",
                enabled:true,
                effectsEnabled:true,
                musicEnabled:true,
                volume:1,
                musicVolume:1
            });

            // --- Prepare game
            loadSettings();
            newGame(GAMEMODES.list[GAMEMODE_DEFAULT]);
            applySettings();
            renderScreen();

            // --- Load data
            audio.load([
                { id:"newLevel", file:"audio/effects/newlevel" },
                { id:"fall", file:"audio/effects/fall" },
                { id:"step", file:"audio/effects/step" },
                { id:"line", file:"audio/effects/line" },
                { id:"gameover", file:"audio/effects/gameover" },
                { id:"break", file:"audio/effects/break" },
                { id:"special", file:"audio/effects/special" },
                { id:"blocked", file:"audio/effects/blocked" },
                { id:"warning", file:"audio/effects/warning" },
                { id:"garbage", file:"audio/effects/garbage" },
                { id:"perfect", file:"audio/effects/perfect" },
                { id:"track1", mod:"audio/music/club_desire.xm" },
                { id:"track2", mod:"audio/music/clubb_mix_star.xm" },
                { id:"track3", mod:"audio/music/club_-_train_-.xm" },
                { id:"track4", mod:"audio/music/clubbing.xm" },
                { id:"track5", mod:"audio/music/acid_attack.xm" },
                { id:"track6", mod:"audio/music/funk_is_a_religion.xm" },
                { id:"track7", mod:"audio/music/ying_yang.xm" },
                { id:"track8", mod:"audio/music/chromag_-_rainy_day.xm" },
            ],(a, b)=>{
                loadingTotal = a;
                loadingLoaded = b;
            },()=>{
                let
                    bragBoardInit,
                    message;

                // --- Initialize Installer

                if (window.Installer)
                    Installer.check(()=>{
                        showInstaller = true;
                    });

                // --- Initialize BragBoard

                bragBoardInit = BRAGBOARD.initialize();

                if (bragBoardInit.message)
                    setNotification(bragBoardInit.message);

                // --- Initialize NetPlay
                message = NETPLAY.initialize(netPlayOnEvent, netPlayOnData);
                netPlayCancelState();

                if (message)
                    setNotification(message);

                // --- Restore saved state
                if (settings.saveState && localStorage[GAME_STATE_LOCALSTORAGE]) {
                    let
                        data;

                    try {
                        data = JSON.parse(localStorage[GAME_STATE_LOCALSTORAGE]);
                    } catch (e) {
                        data = 0;
                    }

                    if (!data || !restoreGame(data))
                        gotoGameState(GAMESTATE_TITLE);

                } else
                    gotoGameState(GAMESTATE_TITLE);
            });
        }
    }

    return self;
}
