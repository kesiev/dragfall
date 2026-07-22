# DRAGFALL

<div align="center"><p><img src="markdown/logo.png"></p></div><div align="center" style="font-weight:bold">An unfaithful tribute to a great modern block stacker</div>

---

<div align="center"><a href="https://www.kesiev.com/dragfall/">Play</a> | <a href="https://discord.gg/TeAWvnuGku">Discord</a></div>

---

<div align="center" style="margin:60px 0">
    <p><img src="markdown/title1.png"></p>
</div>

## The game

Drag any block horizontally on the field to drop it, create lines, and remove them. Each time you move a block, new ones will fall from above. Survive as long as you can!

Oh, I almost forgot. You can also move incoming blocks!

## The story

A long time ago, I used to play the original [Slydris](https://en.wikipedia.org/wiki/Slydris) on my ancient iPhone 3G. It was a golden age, where developers were looking for ways to create new touchscreen-based games, drawing inspiration from the entire history of gaming. Clearly, all eyes were on the most famous block stacker in history, but despite several attempts, I found that game to be the most distant and yet successful of the experiments.

18 years later, I found myself still convinced of it... and in sudden abstinence.

Now, with an Android device, I went looking for it only to discover that not only it [had a gorgeous sequel](https://www.radiangames.com/games.html) in 2018, which was released for Android the following year... but **both titles** are also no longer playable on Android.

The only thing left for me was [a flashy video](https://www.youtube.com/watch?v=8aIl04q01Bc) to see and nothing more. I've [praised the Gods for a re-release](https://www.youtube.com/watch?v=8aIl04q01Bc&lc=UgyI4GmlMtaXNzA1hW94AaABAg) and then... nothing.

A few days later, I decided to dedicate all my breaks to creating something that _resembled it_. I didn't need anything too fancy or faithful. I needed a link to click to release the _dopamine and addiction_ in case I needed it.

I know there are plenty of _casual-game-themed_ clones already out there. But my heart still lives in the '90s. I need `.XM` music, flashing lights, kaleidoscopic animations, and 8-bit sound effects while I stack my blocks.

That's why this game is here.

## The project

### The graphic

Squares, shadows, glows, particles, and no sprites should be enough to give the game the _retro laser look_ I like. I just paired it with a cool font: the [Y224](https://ggbot.itch.io/y224-font) by [GGBotNet](https://ggbot.itch.io/) is futuristic, edgy, and almost unreadable. Simply perfect.

<div align="center" style="margin:60px 0">
    <p><img src="markdown/shot1.png"></p>
    <p>Just you and the blocks</p>
</div>

### The gameplay

The original idea was to create a single game mode, without any menus. You go to a webpage, tap/click on the screen, and play.

I started implementing the core gameplay, some special blocks, and a _Standard game_ mode inspired by both the original game sequel _(videos...)_ and some modern block-stacker games aesthetics/progression.

<div align="center" style="margin:60px 0">
    <p><img src="markdown/animation.gif" width="640" style="image-rendering: auto;image-rendering: crisp-edges;image-rendering: pixelated;"></p>
    <p>Stacking blocks and clearing lines</p>
</div>

The resulting game was a bit more complex than the first game, so I fiddled with the configurations to create something that reminded me of it. The strategy needed to play this alternative mode was slightly different than the _Standard mode_, so I sped it up and named it _Gatling mode_.

<div align="center" style="margin:60px 0">
    <p><img src="markdown/shot2.png"></p>
    <p>Gatling mode</p>
</div>

This forced me to create a menu system, to which I then added some game settings.

Looking for videos of the first game, I remembered that I used to play _Survival mode_ the most, in which blocks appeared in bursts after 10 seconds instead of at every move. I hammered it into the code and added a flower-themed _Burst mode_.

<div align="center" style="margin:60px 0">
    <p><img src="markdown/shot3.png"></p>
    <p>Burst mode</p>
</div>

There is a lot of room for creating more game modes and new gameplay ideas, but 3 modes are more than enough for me.

Anyway, I've tried to make creating new modes [fairly](js/gamemodes.js) [simple](https://www.kesiev.com/dragfall/assets/modesdump.html), just in case.

### The animations

On mobile, there is almost no room for background animations as the field covers the entire screen. On desktop, instead, there is a lot of space around it - as for most of the block stacking games - so I started looking for some abstract psychedelic animations to show in the background.

It's an area I'm not very knowledgeable about, but there are several libraries that can help me, especially thanks to the _(unbearable)_ trend of abstract and interactive backgrounds that websites have today.

But I wanted to try something different.

I wholeheartedly respect the code golfing community, but the [Dwitter](https://www.dwitter.net/) scene is the one I follow most passionately. With a `CANVAS` node and 140 characters of JavaScript code only, people can make gorgeous art. It's _sick_.

<div align="center" style="margin:60px 0">
    <p><img src="markdown/title2.png"></p>
    <p>The <a target=_blank href='https://www.dwitter.net/d/9672'>Smokey 3D structure with joey's shadow</a> dweet running on the title screen</p>
</div>

I've created [something](js/background.js) to wrap these code chunks and use them as game background animations. I've added some hacks to render them at different qualities, as they are often not hardware-accelerated.

_The original authors are in the credits, and I hope this little tribute will please them. However, I'm not entirely sure what license these snippets are under. If you'd like me to remove (or include) your animation, please contact me!_

### The music

Oh, my beloved [The Mod Archive](https://modarchive.org/). I've looked for some nice `.XM` tunes there and used the [jsxm](ttps://github.com/a1k0n/jsxm) library to play them. I love club, acid, and funky atmospheres depending on the expected block stacking pace. Hope you'll like it too.

_Authors are in the credits, and songs should be under the [Mod Archive Distribution license](https://modarchive.org/index.php?terms-upload). If you'd like me to remove (or include) your song, please contact me!_

### The extras

The game works natively on multiple resolutions with optional scaling, fullscreen, offline, and it can be installed on your device. I wanted to be able to _always_ stack.

### Credits

#### Font

 - [Y224](https://ggbot.itch.io/y224-font) by GGVBotNet

#### Animations

 - [strange life forms](https://www.dwitter.net/d/35900) by luta, rodrigo.siqueira
 - [d/933](https://www.dwitter.net/d/933) by p01
 - [d/701](https://www.dwitter.net/d/701) by by sigveseb
 - [Smokey 3D structure with joey's shadow](https://www.dwitter.net/d/9672) by yonatan, joeytwiddle, donbright
 - [Rotating raster rings](https://www.dwitter.net/d/34861) by dee-gomma
 - [d/34124](https://www.dwitter.net/d/34124) by rodrigo.siqueira, UEZ
 - [d/1369](https://www.dwitter.net/d/1369) by tomkh
 - [Infinite #flower remix cycle](https://dwitter.net/d/17621) by DaSpider, pavel

#### Music

 - [Acid Attack](https://modarchive.org/index.php?request=view_by_moduleid&query=149203) by resound/pepper
 - [Club Train](https://modarchive.org/index.php?request=view_by_moduleid&query=137268) by Heywood / Gollum & Nebula Vibes
 - [Club Desire](https://modarchive.org/index.php?request=view_by_moduleid&query=151625) by tawan, qp, dcm, evt
 - [Clubb Mix Star](https://modarchive.org/index.php?request=view_by_moduleid&query=150792) by bohema recordz crew
 - [Clubbing on Delirium](https://modarchive.org/index.php?request=view_by_moduleid&query=194537) by Origin/Nemesis
 - [Funk is a Religion](https://modarchive.org/index.php?request=view_by_moduleid&query=134285) remix by dj Fulanito, original by /diesel

#### Sound effects

 - [8-Bit Sound Effect Pack](https://opengameart.org/content/8-bit-sound-effect-pack) by [OwlishMedia](https://opengameart.org/users/owlishmedia)
  
#### Libraries

 - [jsxm](https://github.com/a1k0n/jsxm)
 
#### Thanks

  - [Bianca](https://www.linearkey.net/)
  - [Preuk](https://mastodon.social/@Preuk@framapiaf.org)
