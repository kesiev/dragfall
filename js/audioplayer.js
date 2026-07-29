
function AudioPlayer(settings) {

    const
        MIXER_ACCURACY = 0.01,
        MIXER_SPEED = 10,
        MIXER_SPEED_FAST = 2,
        NOISETIMES=["attack","sustain","decay","release"],
        NOISEWAVES={
            whitenoise:function(v,i,p) { return Math.floor((i-1)/(p/2))!=Math.floor(i/(p/2))?Math.random()*2-1:v },
            square:function(v,i,p) { return ((Math.floor(i/(p/2))%-2)*-2)+1 },
            sine:function(v,i,p) { return Math.sin(i*6.28/p) },
            saw:function(v,i,p) { return ((v+1+(2/p)) % 2) - 1},
            triangle:function(v,i,p) { return Math.abs((i % p - (p/2))/p*4)-1 },
            tangent:function(v,i,p) { 
                v= 0.15*Math.tan(i/p*3.14);
                if (v<-1) v=-1;
                if (v>1) v=1;
                return v;
            },
            whistle:function(v,i,p) { return 0.75 * Math.sin(i/p*6.28) + 0.25 * Math.sin(40 *3.14 * i/p) },
            breaker:function(v,i,p) {
                v=(i/p) + 0.8660;
                v=v - Math.floor(v);
                return -1 + 2 * Math.abs(1 - v*v*2);
            }
        };

    let
        sam,
        ready=false,
        audioContext=audioOut=0,
        audioPlaying={},
        musicPlaying=0,
        audioToLoad,
        resourcesPrefix,
        mixerSpeed = MIXER_SPEED,
        mixerGain = 1,
        mixerStatus = 0,
        mixerNextMusic = 0,
        mixerTimeout = 0;

    this.audio = {};
    
    if (!settings) settings = {};
    if (settings.volume == undefined) settings.volume=1;
    if (settings.musicVolume == undefined) settings.musicVolume=0.4;
    
    resourcesPrefix = settings.resourcesPrefix;
    this.audioEnabled = settings.enabled;
    this.effectsEnabled = settings.effectsEnabled;
    this.musicEnabled = settings.musicEnabled;
    
    let delay=(cb)=>{
        setTimeout(cb,10);
    }

    let mixerStop = ()=>{
        if (mixerTimeout) {
            clearTimeout(mixerTimeout);
            mixerSpeed = MIXER_SPEED;
            mixerTimeout = 0;
            mixerStatus = 0;
            mixerGain = 1;
            mixerNextMusic = 0;
        }
    }

    let mixerFrame = ()=>{
        let
            schedule = false;
        switch (mixerStatus) {
            case 0:{
                // Off
                break;
            }
            case 1:{
                // Fadeout
                if (musicPlaying) {
                    if (window.XMPlayer&&XMPlayer.gainNode)
                        XMPlayer.gainNode.gain.value=0.1*settings.musicVolume * mixerGain;
                    if (mixerGain > MIXER_ACCURACY)
                        mixerGain -= MIXER_ACCURACY;
                    else {
                        mixerGain = 0;
                        mixerStatus = 2;
                    }
                    this.setAudioVolume(musicPlaying,settings.musicVolume * mixerGain);
                    if (window.XMPlayer&&XMPlayer.gainNode)
                        XMPlayer.gainNode.gain.value=0.1 * settings.musicVolume * mixerGain;
                } else {
                    mixerGain = 0;
                    mixerStatus = 2;
                }
                schedule = true;
                break;
            }
            case 2:{
                // Fadein

                if (musicPlaying) {
                    this.stopAudio(musicPlaying);
                    musicPlaying=0;
                }

                mixerGain = 1;

                if (mixerNextMusic) {
                   this.playAudio(mixerNextMusic,true,settings.musicVolume,0,true);
                    if (window.XMPlayer&&XMPlayer.gainNode)
                        XMPlayer.gainNode.gain.value=0.1 * settings.musicVolume;
                    musicPlaying=mixerNextMusic;
                    mixerNextMusic = 0;
                }
                break;
            }
        }
        if (schedule)
            mixerTimeout = setTimeout(mixerFrame, mixerSpeed);
        else
            mixerStop();
    }

    let mixerScheduleMusic = (music)=>{
        if (this.musicEnabled) {
                
            switch (mixerStatus) {
                case 0:{
                    // OFF
                    if (music !== musicPlaying) {
                        mixerNextMusic = music;
                        mixerStatus = 1; // Fadeout
                        mixerGain = 1;
                        mixerFrame();
                    }
                    break;
                }
                case 1:{
                    // Fadeout
                    mixerNextMusic = music;
                    break;
                }
                case 2:{
                    // Fadein
                    if (music !== musicPlaying) {
                        mixerStatus = 1;
                        mixerNextMusic = music;
                    }
                    break;
                }
            }

            if (music)
                mixerSpeed = MIXER_SPEED;
            else
                mixerSpeed = MIXER_SPEED_FAST;

        } else if (!music)
            this.stopMusic();
    }

    let loadAudio=(cbloading, cbloaded, second, toload, loaded)=>{
        if (!audioToLoad || !audioToLoad.length)
            cbloaded();
        else {

            if (!second) {
                this.audioInitialize();
                toload = audioToLoad.length;
                loaded = 0;
            }

            let sample=audioToLoad.shift();
            loaded++;
            cbloading(loaded, toload);

            if (!this.audioEnabled) {

                this.audio[sample.id]={
                    id:sample.id,
                    buffer:0,
                    properties:sample
                };

                delay(()=>loadAudio(cbloading, cbloaded, true, toload, loaded));

            } else if (sample.sam) {

                if (!sam) sam=new SamJs();
                let
                    audiobuffer=sam.buf32(sample.sam.text),
                    source = audioContext.createBufferSource(),
                    soundBuffer = audioContext.createBuffer(1, audiobuffer.length, 22050),
                    buffer = soundBuffer.getChannelData(0);
                for(let i=0; i<audiobuffer.length; i++)
                    buffer[i] = audiobuffer[i];
                this.audio[sample.id]={
                    id:sample.id,
                    buffer:soundBuffer,
                    properties:sample
                };
                delay(()=>loadAudio(cbloading, cbloaded, true, toload, loaded));

            } else if (sample.mod) {

                let request = new XMLHttpRequest();
                request.open("GET", resourcesPrefix+sample.mod);
                request.responseType = "arraybuffer";
                request.onload = ()=>{
                    if (request.status === 200) {
                        this.audio[sample.id]={
                            id:sample.id,
                            buffer:0,
                            properties:sample,
                            mod:request.response
                        }
                    }
                    loadAudio(cbloading, cbloaded, true, toload, loaded);
                };
                request.send();

            } else if (sample.like) {

                 this.audio[sample.id]={
                    id:sample.id,
                    buffer:this.audio[sample.like].buffer,
                    mod:this.audio[sample.like].mod,
                    properties:sample
                };
                delay(()=>loadAudio(cbloading, cbloaded, true, toload, loaded));

            } else if (sample.noise) {

                let
                    sampleRate = audioContext.sampleRate,
                    data={},
                    out,bits,steps;

                for (let a in sample.noise) data[a]=sample.noise[a];
                for (let i=0;i<NOISETIMES.length;i++) data[NOISETIMES[i]]*=sampleRate;

                let 
                    attackDecay=data.attack+data.decay,
                    attackSustain=attackDecay+data.sustain,
                    samplePitch = sampleRate/data.frequency,
                    sampleLength = attackSustain+data.release,  

                    tremolo = .9,
                    value = .9,
                    envelope = 0;    

                    let buffer = audioContext.createBuffer(2,sampleLength,sampleRate);

                for(let i=0;i<2;i++) {
                    let channel = buffer.getChannelData(i),
                        jump1=sampleLength*data.frequencyJump1onset,
                    jump2=sampleLength*data.frequencyJump2onset;
                    for(let j=0; j<buffer.length; j++) {
                        // ADSR Generator
                        value = NOISEWAVES[data.wave](value,j,samplePitch);
                        if (j<=data.attack) envelope=j/data.attack;
                        else if (j<=attackDecay) envelope=-(j-attackDecay)/data.decay*(1-data.limit)+data.limit;
                        if (j>attackSustain) envelope=(-(j-attackSustain)/data.release+1)*data.limit;
                        // Tremolo
                        tremolo = NOISEWAVES.sine(value,j,sampleRate/data.tremoloFrequency)*data.tremoloDepth+(1-data.tremoloDepth);
                        out = value*tremolo*envelope*0.9;
                        // Bit crush
                        if (data.bitCrush||data.bitCrushSweep) {
                            bits = Math.round(data.bitCrush + j / sampleLength * data.bitCrushSweep);
                            if (bits<1) bits=1;
                            if (bits>16) bits=16;
                            steps=Math.pow(2,bits);
                            out=-1 + 2 * Math.round((0.5 + 0.5 * out) * steps) / steps;
                        }

                        // Done!
                        if (!out) out=0;
                        if(out>1) out= 1;
                        if(out<-1) out = -1;

                        channel[j]=out;

                        // Frequency jump
                        if (j>=jump1) { samplePitch*=1-data.frequencyJump1amount; jump1=sampleLength }
                        if (j>=jump2) { samplePitch*=1-data.frequencyJump2amount; jump2=sampleLength }

                        // Pitch
                        samplePitch-= data.pitch;
                    }
                }
                this.audio[sample.id]={
                    id:sample.id,
                    buffer:buffer,
                    properties:sample
                };
                delay(()=>loadAudio(cbloading, cbloaded, true, toload, loaded));

            } else {

                let request = new XMLHttpRequest();
                request.open('GET', resourcesPrefix+sample.file+(DEVICE.canPlayOgg?".ogg":".mp4"), true);
                request.responseType = 'arraybuffer';
                request.onload = ()=>{                   
                    audioContext.decodeAudioData(request.response, (buffer)=>{
                        this.audio[sample.id]={
                            id:sample.id,
                            buffer:buffer,
                            properties:sample
                        };
                        loadAudio(cbloading, cbloaded, true, toload, loaded);
                    }, function(e){
                        console.log("Error loading resource",sample);
                    });
                }   
                request.send();

            }

        }
    }

    this.load = (list, cbloading, cbloaded)=>{
        audioToLoad = list;
        loadAudio(cbloading, cbloaded)
    }

    this.setMusicEnabled=(enabled)=>{
        mixerStop();
        this.musicEnabled=enabled;
        if (ready)
            if (enabled) this.playMusic(musicPlaying,true);
            else this.stopMusic(true);
    }

    this.setEffectsEnabled=(enabled)=>{
        this.effectsEnabled=enabled;
    }

    this.audioIsEnded=(sample)=>{
        return !audioPlaying[sample.id]||audioPlaying[sample.id].ended;
    }

    this.setVolume=(vol)=>{
        settings.volume=vol;
    }

    this.setAudioVolume=(audio,vol)=>{
        if (audio&&audioPlaying[audio.id]&&audioPlaying[audio.id].gain)
            audioPlaying[audio.id].gain.gain.value=vol;
    }

    this.setMusicVolume=(vol)=>{
        settings.musicVolume=vol;
        if (window.XMPlayer&&XMPlayer.gainNode) {
            XMPlayer.gainNode.gain.value=0.1*vol;
        }
        this.setAudioVolume(musicPlaying,vol);
    }

    this.playAudio=(sample,loop,volume,pitch,force)=>{
        if (this.audioInitialize()&&sample&&this.audioEnabled&&(this.effectsEnabled||force)&&audioContext) {
            if (sample.mod) {
                XMPlayer.stop();
                XMPlayer.load(sample.mod);
                XMPlayer.play();
                audioPlaying[sample.id]=sample;
            } else {
                loop=!!loop;
                this.stopAudio(sample);
                let sound={
                    id:sample.id,
                    gain:audioContext.createGain(),
                    source: audioContext.createBufferSource(),
                    ended:false
                }
                sound.gain.connect(audioOut);
                sound.gain.gain.value=volume||sample.properties.volume||settings.volume;
                sound.source.buffer = sample.buffer;
                sound.source.loop=loop;
                if (pitch)
                    sound.source.playbackRate.value = pitch;
                else if (sample.properties.pitchStart!==undefined)
                    sound.source.playbackRate.value=sample.properties.pitchStart+(sample.properties.pitchRange*Math.random());
                sound.source.onended=()=>{ sound.ended=true; }
                if (loop&&(sample.properties.loopStart!==undefined)) {
                    sound.source.loopStart=sample.properties.loopStart;
                    sound.source.loopEnd=sample.properties.loopEnd;
                }
                sound.source.connect(sound.gain);
                sound.source.start(0);
                audioPlaying[sample.id]=sound;
            }
        }
    }

    this.playMusic=(sample,force)=>{
        if (force||(sample!=musicPlaying)) {
            if (this.audioInitialize()) {
                mixerStop();
                this.stopMusic();
                if (this.musicEnabled) {
                    this.playAudio(sample,true,settings.musicVolume,0,true);
                    this.setMusicVolume(settings.musicVolume);
                }
                musicPlaying=sample;
            }
        }
    }

    this.getMusic=()=>{
        if (mixerStatus == 1) return mixerNextMusic;
        else return musicPlaying;
    }

    this.stopMusic=(dontforget)=>{
        if (this.audioInitialize()) {
            this.stopAudio(musicPlaying)
            if (!dontforget) musicPlaying=0;
            else musicPlaying = this.getMusic();
            mixerStop();
        }
    }

    this.replayMusic=()=>{
        if (this.audioInitialize()) {
            mixerStop();
            this.playMusic(musicPlaying,true);
        }
    }

    this.stopEffects=()=>{
        if (this.audioInitialize()) {
            for (let a in audioPlaying)
                if (!musicPlaying||(audioPlaying[a].id!=musicPlaying.id))
                    this.stopAudio(audioPlaying[a]);
        }
    }

    this.mixerPlayMusic=(sample)=>{
        if (this.audioInitialize()) {
            mixerScheduleMusic(sample);
        }
    }

    this.mixerStopMusic=()=>{
        if (this.audioInitialize()) {
            mixerScheduleMusic(0);
        }
    }

    this.stopAllAudio=()=>{
        if (this.audioInitialize()) {
            for (let a in audioPlaying)
                this.stopAudio(audioPlaying[a]);
        }
        mixerStop();
        musicPlaying = 0;
    }

    this.stopAudio=(sample)=>{
        if (this.audioInitialize()) {
            if (sample.mod) {
                XMPlayer.stop();
            } else if (audioPlaying[sample.id]) {
                let playing=audioPlaying[sample.id];
                playing.source.stop(0);
                playing.gain.disconnect();
                playing.source.disconnect();
                audioPlaying[sample.id]=0;
            }
        }
    }

    this.setAudioEnabled=(state)=>{
        this.audioEnabled=state;
        this.stopAllAudio();
    }

    this.audioInitialize=()=>{
        if (!this.audioEnabled || ready) return true;
        else {
            if (window.XMPlayer)
                XMPlayer.init();
            if (window.AudioContext)
                audioContext=new window.AudioContext();
            else if (window.webkitAudioContext)
                audioContext=new window.audioContext();
            if (audioContext) {
                ready=true;
                audioOut=audioContext.createGain();
                audioOut.connect(audioContext.destination);
                audioOut.gain.value=0.9;
                isNotSuspended = audioContext.state != "suspended";
            }
            return true;
        }
    }

}