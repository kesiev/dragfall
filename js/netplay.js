
const
	NETPLAY_ERRORS = [
		"",
		"Connection error",
		"Can't get room ID",
		"Already calling server script",
		"Channel error"
	],
	NETPLAY_EVENTS = [
		"",
		"Peer ready",
		"Channel opened",
		"Room ID received",
		"Room entered",
		"Channel closed"
	],
	NETPLAY_ERROR_CONNECTION = 1
	NETPLAY_ERROR_CANTGETROOM = 2,
	NETPLAY_ERROR_SERVERBUSY = 3,
	NETPLAY_ERROR_CHANNELERROR = 4,
	NETPLAY_EVENT_READY = 1,
	NETPLAY_EVENT_CHANNELOPENED = 2,
	NETPLAY_EVENT_ROOMIDRECEIVED = 3,
	NETPLAY_EVENT_ROOMENTERED = 4,
	NETPLAY_EVENT_CHANNELCLOSED = 5;

function NetPlay(settings) {
	const
		NETPLAY_VERSION = "0.1",
		NETPLAY_HEADER = "NPL",
		NETPLAY_MODE = "LAN only",
		NETPLAY_HASH = "#"+NETPLAY_HEADER,
		NETPLAY_CHANNEL = "netplay-"+NETPLAY_HEADER,
		LINKCABLE_SCRIPT = "server/server.php",
		RTC_CONFIG = { iceServers: [
			// Adding a TURN server here will enable internet play for everyone.
			// Feel free to donate a TURN server, thanks!	
			/*
			{
				url: '___',
				credential: '___',
				username: '___'
			}
			*/
		] },
		LOCALSTORAGE = settings.gameStorage+"_"+NETPLAY_HEADER,
		ROOMID_LENGTH = 8;

	let
		xmlhttp,
		rtcp,
		onEvent,
		onData,
		hostRoomId,
		guestRoomId,
		isRoomModeHost = true,
		isDisconnecting,
		isHost,
		isCalling,
		isConnected,
		isDataChannelOpened,
		dataChannel,
		self;

	function post(data,cb) {
		xmlhttp = new XMLHttpRequest();

		isCalling = true;
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				isCalling = false;
				if (!isDisconnecting) {
					if ((xmlhttp.status == 200)||(xmlhttp.status==0))
						cb(false, xmlhttp.responseText.trim());
					else cb(true);
				}
			}
		};
		xmlhttp.open("POST", LINKCABLE_SCRIPT, true);
		xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xmlhttp.send(data);
	}

	function stopPeer() {
		if (rtcp) {
			rtcp.close();
			rtcp = 0;
		}

		if (isCalling) {
			xmlhttp.abort();
			xmlhttp = 0;
			isCalling = false;
		}

		isHost = 0;
		isConnected = false;
		isDataChannelOpened = false;
		isDisconnecting = false;
		dataChannel = 0;
	}

	function connectionError(e) {
		console.error(e);
		onEvent(true, NETPLAY_ERROR_CONNECTION)
		stopPeer();
	}

	function manageChannel(channel) {
		dataChannel = channel;
        dataChannel.onopen = () => {
            isDataChannelOpened = true;
            onEvent(false, NETPLAY_EVENT_CHANNELOPENED);
        };
        dataChannel.onmessage = (event) => {
            if (onData)
            	onData(JSON.parse(event.data));
        };
        dataChannel.onerror = (event)=> {
        	isDataChannelOpened = false;
        	connectionError(NETPLAY_ERROR_CHANNELERROR);
        }
        dataChannel.onclose = (event)=> {
        	isDataChannelOpened = false;
        	onEvent(false, NETPLAY_EVENT_CHANNELCLOSED);
        }
	}

	function startHost(onconnect) {
		let
    		channel;

		stopPeer();
		isHost = true;

		rtcp = new RTCPeerConnection(RTC_CONFIG);

    	rtcp.onicegatheringstatechange = () => {
            if (rtcp.iceGatheringState === "complete")
                onconnect(btoa(JSON.stringify(rtcp.localDescription)));
        };

        channel = rtcp.createDataChannel(NETPLAY_CHANNEL, { ordered: true, maxRetransmits: 0 });
        manageChannel(channel);

        rtcp.createOffer((offer)=>{
        	rtcp.setLocalDescription(offer, ()=>{
        		onEvent(false, NETPLAY_EVENT_READY);
        	}, connectionError);
        },connectionError);	
	}

	function startGuest(code, onconnect) {
		stopPeer();
		isHost = false;

		code = JSON.parse(atob(code));

		rtcp = new RTCPeerConnection(RTC_CONFIG);

    	rtcp.onicegatheringstatechange = () => {
            if (rtcp.iceGatheringState === "complete")
                onconnect(btoa(JSON.stringify(rtcp.localDescription)));
        };

    	rtcp.ondatachannel = (event) => {
            manageChannel(event.channel);
        }

        rtcp.setRemoteDescription(new RTCSessionDescription(code), ()=>{
        	rtcp.createAnswer((answer)=>{
        		rtcp.setLocalDescription(answer, ()=>{
        			onEvent(false, NETPLAY_EVENT_READY);
        		}, connectionError);
        	}, connectionError);
        },connectionError);
	}

	function acceptGuest(code, onaccept) {
		if (isHost) {
			code = JSON.parse(atob(code));
			rtcp.setRemoteDescription(new RTCSessionDescription(code), ()=>{
				onaccept();
			}, connectionError);
		}
	}

	function save() {
		localStorage[LOCALSTORAGE] = JSON.stringify({ h:hostRoomId, g:guestRoomId, m:isRoomModeHost });
	}

	function startRoomHost() {
		if (hostRoomId && !isCalling) {
			startHost((code)=>{
				post("r="+hostRoomId+"&s=h1&d="+code,(iserror)=>{
					if (iserror)
						connectionError();
					else
						post("r="+hostRoomId+"&s=h2",(iserror, data)=>{
							if (iserror || !data)
								connectionError();
							else {
								acceptGuest(data, ()=>{
									onEvent(false, NETPLAY_EVENT_ROOMENTERED);
								})
							}
						})
				})
			})
			return true;
		} else
			return false;
	}

	function startRoomGuest() {
		if (guestRoomId && !isCalling) {
			post("r="+guestRoomId+"&s=g1",(iserror, data)=>{
				if (iserror || !data)
					connectionError();
				else 
					startGuest(data, (code)=>{
						post("r="+guestRoomId+"&s=g2&d="+code,(iserror)=>{
							if (iserror)
								connectionError();
							else {
								acceptGuest(data, ()=>{
									onEvent(false, NETPLAY_EVENT_ROOMENTERED);
								})
							}
						})
					})
			})
			return true;
		} else
			return false;
	}

	function canStartRoomMode() {
		return (
			(isRoomModeHost && hostRoomId) ||
			(!isRoomModeHost && guestRoomId)
		);
	}

	function copyText(text, cb) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(()=>{
                cb(true);
            }).catch(()=>{
                cb(false);
            })
        } else
            cb(false);
	}

	function setGuestRoomId(id) {
		if (id && (id.length == ROOMID_LENGTH)) {
			guestRoomId = id.toUpperCase();
			save();
			return true;
		}
	}

	function setRoomModeHost(m) {
		isRoomModeHost = !!m;
		save();
	}

	stopPeer();

	self = {
		initialize:(onevent, ondata)=>{
			let
				hash = document.location.hash;
				
			try {
                let
                	data = JSON.parse(localStorage[LOCALSTORAGE]);
                hostRoomId = data.h;
                guestRoomId = data.g;
                isRoomModeHost = data.m;
            } catch (e) {
            }
            onEvent = onevent;
            onData = ondata;

            // --- Import room from link

            if (hash.startsWith(NETPLAY_HASH)) {
                let
                    s = hash.substr(NETPLAY_HASH.length).trim();

                window.location.hash = "#";

                if (setGuestRoomId(s)) {
                	setRoomModeHost(false);
                	return "You are Room "+s+" Guest";
                }

            }

		},
		getMode:()=>{
			return NETPLAY_MODE;
		},
		send:(data)=>{
			if (isDataChannelOpened)
				dataChannel.send(JSON.stringify(data));
		},
		disconnect:()=>{
			isDisconnecting = true;
			stopPeer();
		},
		isConnected:()=>{
			return isDataChannelOpened;
		},
		// --- Connect with no room management
		startHost:(onconnect)=>{
			startHost(onconnect);
		},
		startGuest:(code, onconnect)=>{
			startGuest(code, onconnect);
		},
		acceptGuest:(code, onaccept)=>{
			acceptGuest(code, onaccept);
		},
		// --- Room management
		setGuestRoomId:(r)=>{
			return setGuestRoomId(r);
		},
		getGuestRoomId:()=>{
			return guestRoomId;
		},
		setHostRoomId:(cb)=>{
			if (isCalling)
				onEvent(true, NETPLAY_ERROR_SERVERBUSY);
			else
				post("s=r",(iserror, data)=>{
					if (iserror || !data) {
						onEvent(true, NETPLAY_ERROR_CANTGETROOM);
						cb(true);
					} else {
						hostRoomId = data;
						save();
						onEvent(false, NETPLAY_EVENT_ROOMIDRECEIVED);
						cb(false, hostRoomId);
					}
				});
		},
		getHostRoomId:()=>{
			return hostRoomId;
		},
		copyHostRoomId:(cb)=>{
			copyText(hostRoomId, cb);
		},
		// --- Connect with room management and manual peer role
		startRoomHost:()=>{
			return startRoomHost();
		},
		startRoomGuest:()=>{
			return startRoomGuest();
		},
		// --- Connect with room management and managed peer role
		copyHostRoomLink:(cb)=>{
			let
				link = window.location.href.replace(/#.*/,"")+NETPLAY_HASH+hostRoomId;
			copyText(link, cb);
		},
		isRoomModeHost:()=>{
			return isRoomModeHost;
		},
		setRoomModeHost:(m)=>{
			setRoomModeHost(m);
		},
		canStartRoomMode:()=>{
			return canStartRoomMode();
		},
		startRoomMode:()=>{
			if (canStartRoomMode())
				if (isRoomModeHost)
					return startRoomHost();
				else
					return startRoomGuest();
			return false;
		}
	}

	return self;

}
