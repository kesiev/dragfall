const
    SIDES = [
        { index:0, dx:0, dy:-1 },
        { index:1, dx:1, dy:0 },
        { index:2, dx:0, dy:1 },
        { index:3, dx:-1, dy:0 },
    ];

function Game() {
    const
        // --- Display
        MIN_FONTSIZE = 8,
        PADDING_RATIO = 0.01,
        // --- Title screen
        GAME_LOCALSTORAGE = "_DRAGFALL";
        GAME_NAME = "DRAGFALL",
        GAME_VERSION = "0.1.1";
        GAME_FOOTER = [ "Drag up-down", "Hit to select", "v"+GAME_VERSION+" by KesieV" ],
        GAME_CREDITS_MUSIC = "track2",
        GAME_GITHUB = "http://github.com/kesiev/dragfall",
        GAME_HOME = "https://www.kesiev.com/dragfall",
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
            "","",
            "< THANKS >",
            "",
            "Bianca",
            "Preuk",
        ],
        TITLE_START = "HIT ANYWHERE TO START",
        TITLE_COLOR = "#FFF",
        TITLE_COLOR_SHADOW = "#F00",
        MAINMENU_COLOR_BORDER = "#c33",
        MAINMENU_COLOR = "#400",
        MAINMENU_COLOR_TEXT = { r:255, g:255, b:255 },
        MENU_FONTSIZE = 10,
        MENU_TAPTIMING = 500,
        TITLE_SHADOWCOLOR = "#000",
        BORDER_DISTANCE = 15, // Prevent sides swipe on mobile
        // --- Credits
        CREDITS_COLOR = "#FFF",
        CREDITS_COLOR_SHADOW = "#000",
        CREDITS_FONTSIZE = 4,
        // --- Game states
        GAMESTATE_LOADING = 0,
        GAMESTATE_TITLE = 1,
        GAMESTATE_PLAY = 2,
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
        // --- Particles
        PARTICLE_DURATION = 1000,
        PARTICLE_DURATION_FAST = 250,
        // --- Gameover screen       
        TITLE_BACKGROUNDS = [ 1, 2, 3 ],
        HIGHSCORE_LINES = 2,
        // --- Game modes        
        GAMEMODES = GameModes(),
        GAMEMODE_DEFAULT = 0,
        SEEDS = 1000000,
        BACKGROUND_QUALITY = [ { label:"Low", value:20 }, { label:"Medium", value:10 }, { label:"High", value:5 }, { label:"Very high", value:1 } ],
        BACKGROUND_FADETIME = 1000,
        // --- Game data
        LOGICCOLORS = 2;
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
        timeStartE, gameE = 0, lastE = 0,
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
        field, fieldWidth, fieldHeight,
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
        // --- Field effects
        fieldEffects,
        overFieldEffects,
        rowTextEffects = [],
        // --- Score delta effect
        deltaScoreEffect,
        deltaScoreEffectX, deltaScoreEffectY, deltaScoreEffectFont, deltaScoreBlur, deltaScoreSlide,
        // --- Intro
        introText,
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
        survivalMode, normalMode,
        combo,
        isWarning,
        isGameOver,
        isHighScore,
        progress = [],
        // --- Vs. You mode
        vsYouMode, vsYouRecordStart, vsYouRecord, vsYouRecordGarbage, vsYouCurrentRecording, vsYouRecordingLength, vsYouPunishmentTrack, vsYouTurn,
        vsYouGarbageTrack, vsYouGarbageTrackStart, vsYouTransitions, vsYouGarbageGivenTotal, vsYouGarbageTrackTotal,
        // --- Garbage
        garbageTugOfWar, garbageAutoDropAmount, incomingGarbage,
        // --- Game mode
        nextGameMode, gameMode,
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
        // --- Score comment
        scoreComment,
        // --- Game over
        gameoverColor, gameoverColorBorder,
        gameoverStart,
        gameoverTextX,
        gameoverX, gameoverY, gameoverHeight, gameoverWidth,
        gameoverInnerX, gameoverInnerY, gameoverInnerHeight, gameoverInnerWidth,
        gameoverRows = [],
        // --- Title screen
        titleX, titleY, titleFont, titleWave,
        // --- Footer
        footerX, footerRows = [], footerFont,
        // --- Menu
        currentMenu,
        menuFontSize, menuFont, menuPadding, menuLineSpacing,
        menuX, menuY, menuWidth, menuHeight,
        menuDragSize, menuDragY, menuDragE, menuMaySelect,
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
        // --- Screen resize triggers
        oldClientWidth, oldClientHeight,
        // --- Screen canvas
        canvasWidth,
        canvasHeight,
        // --- Canvas elements
        canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d");
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
            { score:1, color:p.color1, borderColor:p.darkColor1, particleColor:p.brightColor1, shadowColor:"#000", shadowBorderColor:p.shadowColor1, shatterEffectColor:p.brightColor1 },
            { score:1, color:p.color2, borderColor:p.darkColor2, particleColor:p.brightColor2, shadowColor:"#000", shadowBorderColor:p.shadowColor2, shatterEffectColor:p.brightColor2 },
            { score:2, shatterColor:0, color:p.color1, borderColor:p.darkColor1, shadowColor:"#000", shadowBorderColor:p.shadowColor1, sparkle:{ r:255, g:255, b:255, sb:0.02, s1:0.002, s2:0.003, s3:0.004, s4:0.005, base:0.4, range:0.4, borderRange:50 } },
            { score:2, shatterColor:1, color:p.color2, borderColor:p.darkColor2, shadowColor:"#000", shadowBorderColor:p.shadowColor2, sparkle:{ r:255, g:255, b:255, sb:0.02, s1:0.002, s2:0.003, s3:0.004, s4:0.005, base:0.4, range:0.4, borderRange:50 } },
            { score:2, shatterColumn:true, effectColor:{  r:128, g:128, b:255 }, color:{ r:128, g:128, b:204 }, borderColor:{ r:0, g:0, b:64 }, shadowColor:"#000", shadowBorderColor:{ r:0, g:0, b:255 }, sparkle:{ r:255, g:255, b:255, sb:0.02, s1:0.0004, s2:0.0005, s3:0.0002, s4:0.0003, base:0.4, range:0.4, borderRange:20 } },
            { score:3, color:{ r:34, g:34, b:34 }, borderColor:{ r:128, g:128, b:128 }, shadowColor:"#000", shadowBorderColor:{ r:34, g:34, b:34 }, shatterEffectColor:{ r:255, g:128, b:128 }, sparkle:{ r:128, g:0, b:0, sb:0.02, s1:0.0004, s2:0.0005, s3:0.0002, s4:0.0003, base:0.6, range:0.4, borderRange:0 } },
            { score:3, color:p.color1, borderColor:p.darkColor1, shadowColor:"#000", shadowBorderColor:p.shadowColor1, sparkle:{ r:255, g:255, b:255, sb:0, s1:0.002, s2:0.002, s3:0.002, s4:0.002, base:0.6, range:0.1, borderRange:0 } },
            { score:3, color:p.color2, borderColor:p.darkColor2, shadowColor:"#000", shadowBorderColor:p.shadowColor2, sparkle:{ r:255, g:255, b:255, sb:0, s1:0.002, s2:0.002, s3:0.002, s4:0.002, base:0.6, range:0.1, borderRange:0 } },
        ];
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
                                onSelect:(menu)=>{
                                    gotoPause();
                                }
                            },{
                                label:[ "Quit" ],
                                onSelect:(menu)=>{
                                    menu.disable();
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

        GAMEMODES.forEach(mode=>{
            if (mode.id == settings.lastMode)
                selectedOption = mainMenu.length;

            mainMenu.push({
                label:[ mode.label, "HIGH SCORE", settings.stats[mode.id].highScore ],
                onSelect:(menu)=>{
                    menu.disable();
                    settings.lastMode = mode.id;
                    saveSettings();
                    nextGameMode = mode;
                    audio.playAudio(audio.audio.break);
                    gotoGameState(GAMESTATE_PLAY);
                }
            });
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

    function gotoOptions(option) {
        let
            options = [
                {
                    label:[ "Music", settings.music ? "ON" : "OFF" ],
                    onSelect:(menu, option)=>{
                        settings.music = !settings.music;
                        defaultMenuEffect();
                        saveSettings();
                        applySettings();
                        gotoOptions(option);
                    }
                },{
                    label:[ "SFX", settings.sfx ? "ON" : "OFF" ],
                    onSelect:(menu, option)=>{
                        settings.sfx = !settings.sfx;
                        defaultMenuEffect();
                        saveSettings();
                        applySettings();
                        gotoOptions(option);
                    }
                },{
                    label:[ "FULLSCREEN", settings.fullscreen ? "ON" : "OFF" ],
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
                    label:[ "SCALE", "x"+settings.scale ],
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
                    label:[ "ANIMATIONS", settings.bganimations ? "ON" : "OFF" ],
                    onSelect:(menu, option)=>{
                        settings.bganimations = !settings.bganimations;
                        defaultMenuEffect();
                        saveSettings();
                        applySettings();
                        gotoOptions(option);
                    }
                },{
                    
                    label:[ "BG QUALITY", BACKGROUND_QUALITY[settings.bgquality].label ],
                    onSelect:(menu, option)=>{
                        settings.bgquality = (settings.bgquality+1)%BACKGROUND_QUALITY.length;
                        defaultMenuEffect();
                        saveSettings();
                        applySettings();
                        gotoOptions(option);
                    }
                }
            ];

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
            onSelect:(menu, option)=>{
                audio.playAudio(audio.audio.fall);
                gotoMainMenu();
            }
        });

        currentMenu = new Menu(options, option, defaultMenuEffect, 2, MAINMENU_COLOR, MAINMENU_COLOR_BORDER, MAINMENU_COLOR_TEXT, TITLE_SHADOWCOLOR);
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

        if (isNotPaused && e) {
            if (timeStartE)
                gameE += (e-timeStartE);
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
            case GAMESTATE_PLAY:{
                let
                    gameoverProgress = isGameOver ? Math.min(1,(gameE - gameoverStart) / 500) : 0,
                    effectsGameOverProgress = 0.5+(1-gameoverProgress)*0.5,
                    opacity = Math.sin(gameE*0.01)*0.1,
                    warningWave = Math.floor(Math.sin(gameE*0.01)*cellHeight*0.1),
                    shakeX = 0,
                    shakeY = 0;

                if (gameE > shakeXEnd)
                    shakeXEnd = 0;
                else
                    shakeX = Math.floor(Math.random()*shakeXDelta)-shakeXStart;

                if (gameE > shakeYEnd)
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

                if (isWarning || (vsYouMode && incomingGarbage)) {
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

                ctx.font = scoreFont;
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.shadowBlur = scoreBlur;
                ctx.shadowColor = footerbarColorBorder;
                ctx.fillStyle = footerbarColorBorder;
                ctx.fillRect(footerbarX,footerbarY,footerbarWidth,footerbarHeight);

                ctx.shadowColor = footerbarColor;
                ctx.fillStyle = footerbarColor;
                ctx.fillRect(footerbarInnerX,footerbarInnerY,footerbarInnerWidth,footerbarInnerHeight);

                if (isGameOver) {
                    ctx.fillStyle = ctx.shadowColor = paletteToRGBA(gameoverColorBorder, gameoverProgress);
                    ctx.fillRect(gameoverX,gameoverY,gameoverWidth,gameoverHeight);
                    ctx.fillStyle = ctx.shadowColor = paletteToRGBA(gameoverColor, gameoverProgress)
                    ctx.fillRect(gameoverInnerX,gameoverInnerY,gameoverInnerWidth,gameoverInnerHeight);
                }

                if (nextBlockStart) {
                    let
                        timePassed = gameE - nextBlockStart,
                        timeRatio = 1-(timePassed/timeLimit);

                    // --- Render bar
                    if (timePassed < timeLimit) {
                        let
                            color;

                        if (normalMode) {
                            if (timeLimitIsFall)
                                color = paletteToRGBA(timebarColorCritical,(0.7+Math.sin(timePassed/timeRatio*0.002)*0.3));
                            else
                                color = paletteToRGBA(timebarColor, (0.1+(timeRatio*0.9)));
                        } else if (survivalMode) {
                            color = paletteToRGBA(timebarColorCritical,(0.7+Math.sin(timePassed/timeRatio*0.002)*0.3));
                        } else if (vsYouMode) {
                            if (garbageTugOfWar > 0)
                                color = paletteToRGBA(timebarColorCritical,(0.7+Math.sin(timePassed/timeRatio*0.002)*0.3));
                            else
                                color = paletteToRGBA(timebarColor, (0.1+(timeRatio*0.9)));
                        }

                        ctx.fillStyle = ctx.shadowColor = color;
                        ctx.fillRect(timebarX,timebarY,Math.floor(timebarWidth*timeRatio),timebarHeight);
                    } else {

                        // --- Manages autodrop
                        if (timeLimitIsFall && !schedulePlayerDrop) {
                            nextBlockStart = 0;
                            if (survivalMode) {
                                newLevel(true, true);
                                checkProgress(true, false);
                                autoPlayerDrop();
                            } else if (vsYouMode) {
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
                                    nextBlockStart = gameE;
                                    autodropEnded = 2;
                                }
                                garbageTugOfWar = 0;
                                incomingGarbage = 0;
                                vsYouCurrentRecording++;
                                if (vsYouCurrentRecording >= vsYouRecordingLength) {
                                    let
                                        newLevelSound = true;

                                    vsYouCurrentRecording = 0;
                                    vsYouGarbageTrackStart = gameE;
                                    if (vsYouRecordGarbage == 0) {
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
                                            addScore(level * vsYouGarbageTrackTotal * 5);
                                            commitScore();
                                            setScoreComment(true, "PERFECT!");
                                            audio.playAudio(audio.audio.perfect);
                                            newLevelSound = false;
                                        }
                                        // --- Play last recording
                                        vsYouGarbageTrack = vsYouRecord;
                                    }
                                    vsYouRecord = [];
                                    vsYouRecordStart = gameE;
                                    vsYouRecordGarbage = 0;
                                    vsYouGarbageTrackTotal = 0;
                                    vsYouGarbageGivenTotal = 0;
                                    // --- Change background
                                    vsYouTurn = (vsYouTurn + 1) % 2;
                                    runEvent(vsYouTransitions[vsYouTurn]);
                                    // --- New level
                                    newLevel(false, newLevelSound);
                                    checkProgress(true, false);
                                } else {
                                    audio.playAudio(audio.audio.step, false, 0, 1.5);
                                }
                            } else {
                                autoPlayerDrop();
                            }
                        }

                    }

                    // --- Manage garbage
                    if (vsYouGarbageTrack) {
                        let
                            addedGarbage = 0,
                            pos = gameE - vsYouGarbageTrackStart;

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

                        if (addedGarbage) {
                            garbageTugOfWar += addedGarbage;
                            incomingGarbage = Math.max(0, Math.min(garbageLimit, garbageTugOfWar));
                            showDeltaScore("+"+addedGarbage+" garbage");
                            if (incomingGarbage > 0)
                                audio.playAudio(audio.audio.garbage);
                        }
                    }
                }

                // Text

                if (scoreComment) {
                    if (TextSpark(ctx, gameE, scoreX, scoreY, scoreComment))
                        scoreComment = 0;
                }

                ctx.shadowColor = ctx.fillStyle = paletteToRGB(footerbarColorText);

                if (!scoreComment)
                    ctx.fillText(score, scoreX, scoreY);

                if (isGameOver) {           
                    let
                        gameoverPulse = Math.sin(gameE*0.002);

                    ctx.textBaseline = "top";
                    gameoverLines.forEach((row,i)=>{
                        if (row._fontSize) {
                            if (row.blink)
                                ctx.fillStyle = paletteToRGBA(footerbarColorText,(0.7+gameoverPulse*0.3));
                            else
                                ctx.fillStyle = paletteToRGB(footerbarColorText);
                            ctx.font = row._font;
                            if (row.text)
                                ctx.fillText(row.text, gameoverTextX, row._y);            
                            else if (row.highScore && isHighScore)
                                ctx.fillText(row.highScore, gameoverTextX, row._y);
                            else if (row.lines)
                                ctx.fillText(lines, gameoverTextX, row._y);
                            else if (row.level)
                                ctx.fillText(level, gameoverTextX, row._y);
                            else if (row.score)
                                ctx.fillText(score, gameoverTextX, row._y);
                        }
                    });
                    ctx.textBaseline = "middle";
                }
                
                if (vsYouMode && incomingGarbage) {
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
            currentMenu.render(canvasWidth, canvasHeight, e, ctx, menuFont, menuFontSize, scoreBlur, menuLineSpacing, menuPadding, menuX, menuY, menuWidth, menuHeight);

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
                                newGame(nextGameMode);
                                gameTurn();
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

        requestAnimationFrame(renderScreen);
    }

    // --- Game flow

     function newGame(mode) {
        let
            seed;

        // --- Load game mode
        gameMode = mode;
        if (mode.seed)
            seed = mode.seed;
        else
            seed = 1+Math.floor(Math.random()*SEEDS);
        field = new Field(mode.initialize.fieldWidth, mode.initialize.fieldHeight);
        next = new Next(LOGICCOLORS, seed);
        next.setAmount(mode.initialize.setBlocksPerDrop);
        next.setBlocks(mode.initialize.blocks);
        garbageNext = new Next(LOGICCOLORS, seed);
        garbageNext.setAmount(mode.initialize.setGarbageBlocksPerDrop || mode.initialize.setBlocksPerDrop);
        garbageNext.setBlocks(mode.initialize.garbageBlocks || mode.initialize.blocks);
        random = new Random(seed);
        fieldEffects = new FieldEffects(false, true, field);
        fieldEffects.setIdleColors(
            mode.initialize.setIdleStyle[0],
            mode.initialize.setIdleStyle[1],
            mode.initialize.setIdleStyle[2],
            mode.initialize.setIdleStyle[3],
            mode.initialize.setIdleStyle[4],
            mode.initialize.setIdleStyle[5]
        );
        overFieldEffects = new FieldEffects(true, false, field);
        nextMusic = mode.initialize.playMusic;
        autoDrops = mode.initialize.autoDrop;
        autoDropAmount = mode.initialize.autoDropAmount;
        timeLimit = mode.initialize.setTimeLimit;
        timeLimitIsFall = mode.initialize.setTimeLimitIsFall;
        survivalMode = mode.initialize.survivalMode;
        vsYouMode = mode.initialize.vsYouMode;
        vsYouTransitions = mode.initialize.vsYouTransitions;
        garbageAutoDropAmount = mode.initialize.garbageAutoDropAmount;
        normalMode = !survivalMode && !vsYouMode;
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
        gameoverLines = mode.initialize.gameoverLines;
        vsYouRecordingLength = mode.initialize.vsYouRecordingLength;
        vsYouPunishmentTrack = mode.initialize.vsYouPunishmentTrack;
        garbageLimit = mode.initialize.setGarbageLimit;
        setPalette(mode.initialize.palette);

        if (mode.initialize.setBackgroundAnimation !== null) {
            backgroundAnimation.start(mode.initialize.setBackgroundAnimation);
            isBackgroundAnimated = true;
        } else
            isBackgroundAnimated = false;
        
        // --- Initialize
        autodropEnded = autoDrops ? 0 : 1;
        gameStarting = true;
        level = 1;
        lines = 0;
        combo = 0;
        score = 0;
        deltaScore = 0;
        shakeXEnd = 0;
        shakeYEnd = 0;
        nextBlockStart = 0;
        isBackgroundAnimationChanging = false;
        isPreviouslyMovedCells = false;
        isHighScore = false;
        isNotPaused = true;
        timeStartE = 0;
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
        vsYouTurn = 0;
        linesPerLevel = mode.initialize.linesPerLevel;
        linesToNextLevel = linesPerLevel;
        isAutodropGarbage = false,
        schedulePlayerDrop = false,
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

    function endGame() {
        audio.stopMusic();
        isInteractive = false;
        isWarning = false;
        nextBlockStart = 0;
        resetScheduler();
    }

    function gameOver() {
        audio.playAudio(audio.audio.gameover);
        isGameOver = true;
        enableHitAt = gameE + 500;
        gameoverStart = gameE;
        endGame();
        if (score > settings.stats[gameMode.id].highScore) {
            settings.stats[gameMode.id].highScore = score;
            isHighScore = true;
            saveSettings();
        }
    }

    function addScore(a) {
        if (!isGameOver) {
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
            titleFontSize,            
            footerFontSize,
            rowTextEffectFontSize,
            creditsFontSize,
            gameoverBoxHeight = 0,
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

            // --- Particles
            particleSize = pixelSize*2;
            particleSizeLarge = pixelSize*4;

            // --- Score text
            scoreX = Math.floor(canvasWidth/2);
            scoreY = footerbarY + Math.floor((footerbarHeight/2));
            scoreFontSize = Math.max(MIN_FONTSIZE,(vPixelSize * FOOTERBAR_FONTSIZE));
            scoreFont = scoreFontSize+"px y224";
            scoreBlur = pixelSize * 2;

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

            // --- Row text
            rowTextEffectFontSize = Math.max(MIN_FONTSIZE, Math.floor(cellHeight*0.5));
            rowTextEffectFont = rowTextEffectFontSize+"px y224";
            rowTextEffectY = gridY + (cellHeight/2);
            rowTextEffectX = Math.floor(canvasWidth/2);
            rowTextBlur = pixelSize * 2;
            rowTextSlide = cellWidth * 3;

            // --- Game over screen
            gameoverBoxHeight = padding*2;
            gameoverLines.forEach((line,i)=>{
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
            gameoverInnerHeight = gameoverBoxHeight+padding;
            gameoverInnerY = gridY+Math.floor((fieldHeight-gameoverInnerHeight)/2);
            gameoverInnerX = 0;
            gameoverInnerWidth = canvasWidth;
            gameoverLines.forEach(row=>row._y += gameoverInnerY);

            gameoverHeight = gameoverInnerHeight+footerbarBorder*2;
            gameoverX = gameoverInnerX;
            gameoverY = gameoverInnerY-footerbarBorder;
            gameoverWidth = canvasWidth;
            gameoverTextX = Math.floor(canvasWidth/2);

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
            menuFont = menuFontSize+"px y224";
            menuX = 0;
            menuY = Math.floor((canvasHeight-menuHeight)*0.6);
            menuWidth = canvasWidth;
            menuPadding = padding;
            menuDragSize = Math.ceil(Math.min(canvasWidth, canvasHeight)/10);
            menuLineSpacing = pixelSize * 4;

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
                timePassed = gameE - nextBlockStart,
                isValidMove = movingBlock.x != movingBlockStart;

            if (normalMode && (timePassed < timeLimit) && isValidMove)
                addScore(1);

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
    }

    function checkProgress(newLevel, newLine) {
        // --- Timed events
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
        if (normalMode)
            nextBlockStart = 0;

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
                    if (normalMode)
                        if (level < levelCap) {
                            linesToNextLevel--;
                            if (linesToNextLevel<=0) {
                                newLevel(true, true);
                                isNewLevel = true;
                                linesToNextLevel = linesPerLevel;
                            }
                        }

                    // --- Check lines progress
                    if (normalMode || vsYouMode)
                        checkProgress(isNewLevel, true);

                    // --- Manage score
                    combo++;
                    rowTextEffects[line.row] = { text:"CHAIN x"+combo, font:rowTextEffectFont, color:rowtextColor, shadowColor:rowtextColorShadow, speed:ROWTEXT_SPEED, delay:lid*ROWTEXT_DELAY, blur:rowTextBlur, slide:rowTextSlide };
                    // --- Clearing lines with same logic color make a special block spawn
                    for (let i=0;i<LOGICCOLORS;i++)
                        if (line.logicColors[i] == field.width)
                            next.addIncoming({
                                special:true,
                                color:i+2,
                                logicColor:i,
                                block:{ kick:1, pattern:[ [ 1 ] ]}
                            });
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
                        effectsCache.shatteredColors[effect.shatterColor] = true;
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
                // --- End combo
                commitScore();
                if (vsYouMode && (combo > 1)) {
                    let
                        power = combo - 1;
                    vsYouRecord.push([ gameE-vsYouRecordStart, power ]);
                    garbageTugOfWar -= power;
                    vsYouRecordGarbage += power;
                    incomingGarbage = Math.max(0, Math.min(garbageLimit, garbageTugOfWar));
                }
                combo = 0;
                isGameOver = false;
                if (survivalMode || vsYouMode) {
                    if (autoDrops)
                        nextBlockStart = 0;
                    else if (autodropEnded == 2) {
                        autodropEnded = 3;
                        nextBlockStart = gameE;
                    }
                } else
                    nextBlockStart = autoDrops ? 0 : gameE;
                // --- Check warning bar and endgame
                isWarning = false;
                for (let y=0;y<warningRows;y++)
                    if (isWarning)
                        break;
                    else for (let x=0;x<field.width;x++)
                        if (field.isFieldFilled(x,y)) {
                            if (y == 0)
                                isGameOver = true;
                            isWarning = true;
                            break;
                        }
                if (isGameOver || (
                    ((normalMode || vsYouMode) && !generateNextBlocks()) ||
                    (survivalMode && autoDrops && !generateNextBlocks())
                ))
                    // --- End game
                    gameOver();
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
                        isInteractive = true;
                    }
                    if (autodropEnded == 1) {
                        autodropEnded = 2;
                        if (gameStarting) {
                            vsYouRecordStart = gameE;
                            vsYouRecordGarbage = 0;
                            gameStarting = false;
                            setScoreComment(true, introText);
                            audio.playMusic(audio.audio[nextMusic]);
                        }
                    }
                }
            }
        }
    }

    // --- DOM events

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
            menuDragE = gameE;
        } else if (credits) {
            credits = 0;
            audio.mixerStopMusic();
            gotoOptions(creditsOptionBack);
        } else if (gameState === GAMESTATE_PLAY) {
            if (!isGameOver && ((pointerX < boardX) || (pointerX > boardRight) || (pointerY < boardY) || (pointerY > footerbarInnerY)))
                gotoPause(); 
            else if (isInteractive) {
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
                            }
                            break;
                        }
                    }
                }
            } else if (isGameOver && (gameE > enableHitAt)) {
                audio.playAudio(audio.audio.step);
                gotoGameState(GAMESTATE_TITLE);
            }
        }
        e.preventDefault();
        return false;
    }

    canvas.onpointermove = (e)=>{
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
        e.preventDefault();
        return false;
    }

    canvas.onpointerleave = canvas.onpointerup = (e)=>{
        if (menuDragE) {
            if (currentMenu && menuMaySelect && (gameE - menuDragE < MENU_TAPTIMING))
                currentMenu.select();
            menuDragE = 0;
        } else {
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
            settings.stats = { highScores:{} };

        if (settings.music === undefined)
            settings.music = true;

        if (settings.sfx === undefined)
            settings.sfx = true;

        if (settings.fullscreen === undefined)
            settings.fullscreen = false;

        if (!settings.scale)
            settings.scale = 1;

        if (settings.bgquality === undefined)
            settings.bgquality = 1;

        if (settings.bganimations === undefined)
            settings.bganimations = true;

        GAMEMODES.forEach((mode,id)=>{
            if (!settings.stats[mode.id])
                settings.stats[mode.id] = {};
            if (settings.stats[mode.id].highScore === undefined)
                settings.stats[mode.id].highScore = 0;
        })

    }

    // --- Run

    self = {
        run:()=>{
            // --- Initialize DOM
            canvas.style.backgroundColor = "#000";
            document.body.appendChild(canvas);

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
            newGame(GAMEMODES[GAMEMODE_DEFAULT]);
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
            ],(a, b)=>{
                loadingTotal = a;
                loadingLoaded = b;
            },()=>{
                if (window.Installer)
                    Installer.check(()=>{
                        showInstaller = true;
                    });
                gotoGameState(GAMESTATE_TITLE);
            });
        }
    }

    return self;
}
