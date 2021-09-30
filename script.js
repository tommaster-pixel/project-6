(function(){
    var script = {
 "minWidth": 20,
 "children": [
  "this.MainViewer",
  "this.Label_205F6D06_353D_AF74_4192_9C6508AE517A",
  "this.HTMLText_23D6EE8F_35DC_AD73_41B0_65C6202C69DB",
  "this.Image_3B0CA86E_36E6_1BE7_41C0_DCC984039774",
  "this.Container_261D9C02_36DE_1B1F_419B_B54855EC5413"
 ],
 "gap": 10,
 "id": "rootPlayer",
 "backgroundPreloadEnabled": true,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "start": "this.init(); this.syncPlaylists([this.DropDown_269402C9_36DA_0F2D_41B0_543A540CF4BD_playlist,this.mainPlayList]); this.DropDown_269402C9_36DA_0F2D_41B0_543A540CF4BD_playlist.set('selectedIndex', 0)",
 "width": "100%",
 "defaultVRPointer": "laser",
 "creationPolicy": "inAdvance",
 "horizontalAlign": "left",
 "paddingTop": 0,
 "scripts": {
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "unregisterKey": function(key){  delete window[key]; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "existsKey": function(key){  return key in window; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "getKey": function(key){  return window[key]; },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "registerKey": function(key, value){  window[key] = value; },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } }
 },
 "downloadEnabled": false,
 "layout": "absolute",
 "shadow": false,
 "height": "100%",
 "vrPolyfillScale": 0.5,
 "overflow": "visible",
 "definitions": [{
 "overlays": [
  "this.overlay_242C5096_34F5_7695_41B3_CD8A205EF662"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_t.jpg",
 "label": "UPSTAIR BED ROOM 1",
 "id": "panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_26708617_3726_1725_41A3_EBE2AE20FE52",
   "x": 1748.24,
   "class": "PanoramaMapLocation",
   "angle": 189.66,
   "y": 1667.8
  }
 ],
 "vfov": 180,
 "partial": false,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1",
   "backwardYaw": -159.1,
   "class": "AdjacentPanorama",
   "yaw": -165.29,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_t.jpg",
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%"
},
{
 "class": "PlayList",
 "id": "mainPlayList",
 "items": [
  "this.PanoramaPlayListItem_2061F264_377E_0F1A_41A1_548A806D1468",
  "this.PanoramaPlayListItem_20605264_377E_0F1A_41C3_8230C5EFABCC",
  "this.PanoramaPlayListItem_2060D265_377E_0F1A_41B4_203FB4955ADD",
  "this.PanoramaPlayListItem_20634265_377E_0F1A_41BA_D898A25629C4",
  "this.PanoramaPlayListItem_2063E266_377E_0FE6_41CB_4636773AD31E",
  "this.PanoramaPlayListItem_20627266_377E_0FE6_41C7_F0C1CB2AD622",
  "this.PanoramaPlayListItem_2062D267_377E_0FE6_41C6_B4C5C7C7DD7F"
 ]
},
{
 "manualRotationSpeed": 702,
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -323,
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2084B2FF_377E_0CE6_41C0_178E277284A1",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "manualRotationSpeed": 702,
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -323,
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_20F5233D_377E_0D65_41CB_78BBB5D64057",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 177.05,
  "pitch": 0
 }
},
{
 "manualRotationSpeed": 702,
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -323,
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_20B622E9_377E_0CEA_41C1_B3BD230F0E75",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -87.31,
  "pitch": 0
 }
},
{
 "overlays": [
  "this.overlay_24FAE355_34FC_9B94_41B2_9CCBDD98AEC0"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_t.jpg",
 "label": "KITCHEN",
 "id": "panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_27AABB30_3726_3D7A_41B6_1384F3F92D65",
   "x": 1920.94,
   "class": "PanoramaMapLocation",
   "angle": -8.75,
   "y": 787.93
  }
 ],
 "vfov": 180,
 "partial": false,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6",
   "backwardYaw": -61.91,
   "class": "AdjacentPanorama",
   "yaw": -163.66,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_t.jpg",
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%"
},
{
 "manualRotationSpeed": 702,
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -323,
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_205032C0_377E_0F1A_41C4_1A038A1331FC",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 20.9,
  "pitch": 0
 }
},
{
 "manualRotationSpeed": 702,
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -323,
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "overlays": [
  "this.overlay_3B1E41F9_34CB_769C_41BE_5FEAC9EE45BC",
  "this.overlay_3B4E75E1_34F5_9EAC_41C2_AE2C8ED2D672",
  "this.overlay_3B6B8A0B_34FC_B57C_41BF_22C2D830666F",
  "this.overlay_2782317A_34F5_979D_41BE_39C423BA0359"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_t.jpg",
 "label": "DINING HALL",
 "id": "panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_27AABB30_3726_3D7A_41B6_1384F3F92D65",
   "x": 1844.59,
   "class": "PanoramaMapLocation",
   "angle": 73.3,
   "y": 1167.41
  }
 ],
 "vfov": 180,
 "partial": false,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C",
   "backwardYaw": -163.66,
   "class": "AdjacentPanorama",
   "yaw": -61.91,
   "distance": 1
  },
  {
   "panorama": "this.panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1",
   "backwardYaw": -112.08,
   "class": "AdjacentPanorama",
   "yaw": 92.69,
   "distance": 1
  },
  {
   "panorama": "this.panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1",
   "class": "AdjacentPanorama"
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_t.jpg",
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%"
},
{
 "touchControlMode": "drag_rotation",
 "class": "PanoramaPlayer",
 "mouseControlMode": "drag_acceleration",
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "gyroscopeVerticalDraggingEnabled": true,
 "displayPlaybackBar": true
},
{
 "manualRotationSpeed": 702,
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -323,
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_204FF298_377E_0F2A_41C0_38EEA6C2460F",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 67.92,
  "pitch": 0
 }
},
{
 "manualRotationSpeed": 702,
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -323,
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PlayList",
 "id": "DropDown_269402C9_36DA_0F2D_41B0_543A540CF4BD_playlist",
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_27AABB30_3726_3D7A_41B6_1384F3F92D65",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  },
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'free_drag_and_rotation')",
   "media": "this.map_26708617_3726_1725_41A3_EBE2AE20FE52",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ]
},
{
 "overlays": [
  "this.overlay_3A08CD8C_34CF_AF75_41B1_7100DB8690D1",
  "this.overlay_277F6081_357B_B56C_4170_F22E076C026B",
  "this.overlay_265416F7_3575_9A94_41C5_90F2976EEB18"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_t.jpg",
 "label": "LIVING ROOM",
 "id": "panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_27AABB30_3726_3D7A_41B6_1384F3F92D65",
   "x": 1945.59,
   "class": "PanoramaMapLocation",
   "angle": 100.51,
   "y": 1622.44
  }
 ],
 "vfov": 180,
 "partial": false,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6",
   "backwardYaw": 92.69,
   "class": "AdjacentPanorama",
   "yaw": -112.08,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_t.jpg",
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "hfovMin": "108%"
},
{
 "manualRotationSpeed": 702,
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -323,
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_20A6E2D5_377E_0F3A_41A9_20EDC0462D8B",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 118.09,
  "pitch": 0
 }
},
{
 "manualRotationSpeed": 702,
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -323,
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_20E54329_377E_0D6A_41C5_F9ABA377C6A6",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -32.77,
  "pitch": 0
 }
},
{
 "manualRotationSpeed": 702,
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -323,
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -0.78,
  "pitch": 0.81
 }
},
{
 "overlays": [
  "this.overlay_263C6977_34D4_9794_41C4_5E75AB37DB90"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_t.jpg",
 "label": "GROUND FLOOR BED ROOM",
 "id": "panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_27AABB30_3726_3D7A_41B6_1384F3F92D65",
   "x": 2330.41,
   "class": "PanoramaMapLocation",
   "angle": 42.58,
   "y": 790.04
  }
 ],
 "vfov": 180,
 "partial": false,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1",
   "class": "AdjacentPanorama"
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_t.jpg",
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%"
},
{
 "manualRotationSpeed": 702,
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -323,
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_204332AD_377E_0F6A_4194_629DF234F467",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 64.52,
  "pitch": -43.38
 }
},
{
 "manualRotationSpeed": 702,
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -323,
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_20774284_377E_0F1A_41C0_D2AA2DA9B411",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 16.34,
  "pitch": 0
 }
},
{
 "initialZoomFactor": 1,
 "overlays": [
  "this.overlay_26F40BCF_3729_FD25_41BA_5B3752592943",
  "this.overlay_26AAF07A_3726_0BEE_41C7_6D422347819E",
  "this.overlay_247734DB_3726_0B2E_41C0_BA35B9A0C157"
 ],
 "label": "FIRST FLOOR",
 "thumbnailUrl": "media/map_26708617_3726_1725_41A3_EBE2AE20FE52_t.png",
 "fieldOfViewOverlayOutsideColor": "#000000",
 "width": 4000,
 "id": "map_26708617_3726_1725_41A3_EBE2AE20FE52",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_26708617_3726_1725_41A3_EBE2AE20FE52.png",
    "width": 3200,
    "class": "ImageResourceLevel",
    "height": 1800
   },
   {
    "url": "media/map_26708617_3726_1725_41A3_EBE2AE20FE52_lq.png",
    "width": 341,
    "class": "ImageResourceLevel",
    "height": 192,
    "tags": "preload"
   }
  ]
 },
 "fieldOfViewOverlayOutsideOpacity": 0,
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "fieldOfViewOverlayRadiusScale": 0.08,
 "minimumZoomFactor": 1,
 "scaleMode": "fit_outside",
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "class": "Map",
 "maximumZoomFactor": 1,
 "height": 2250
},
{
 "overlays": [
  "this.overlay_25739C5D_34D4_AD94_41B4_003C0430C22F"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_t.jpg",
 "label": "UPSTAIR BED ROOM 2",
 "id": "panorama_3EAC9257_34CC_9593_418E_C55799D1A64C",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_26708617_3726_1725_41A3_EBE2AE20FE52",
   "x": 1697.14,
   "class": "PanoramaMapLocation",
   "angle": 12.15,
   "y": 614.49
  }
 ],
 "vfov": 180,
 "partial": false,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1",
   "backwardYaw": -2.95,
   "class": "AdjacentPanorama",
   "yaw": 147.23,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_t.jpg",
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%"
},
{
 "manualRotationSpeed": 702,
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -323,
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "manualRotationSpeed": 702,
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -323,
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "overlays": [
  "this.overlay_25FA4D76_34F7_6F94_41B3_A728827AAFF5",
  "this.overlay_242F51B2_34F7_B6AD_41A5_4E1C6FB43D8E",
  "this.overlay_26D486D3_34D7_BA93_41C1_79D21174E675"
 ],
 "hfov": 360,
 "thumbnailUrl": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_t.jpg",
 "label": "UPSTAIR ENTRY HALL",
 "id": "panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1",
 "pitch": 0,
 "mapLocations": [
  {
   "map": "this.map_26708617_3726_1725_41A3_EBE2AE20FE52",
   "x": 1854.66,
   "class": "PanoramaMapLocation",
   "angle": 4.53,
   "y": 1146.35
  }
 ],
 "vfov": 180,
 "partial": false,
 "hfovMax": 130,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A",
   "backwardYaw": -165.29,
   "class": "AdjacentPanorama",
   "yaw": -159.1,
   "distance": 1
  },
  {
   "panorama": "this.panorama_3EAC9257_34CC_9593_418E_C55799D1A64C",
   "backwardYaw": 147.23,
   "class": "AdjacentPanorama",
   "yaw": -2.95,
   "distance": 1
  }
 ],
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   },
   "thumbnailUrl": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_t.jpg",
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1536,
      "tags": "ondemand",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3
     },
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 1024,
      "tags": "ondemand",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2
     },
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "width": 512,
      "colCount": 1,
      "rowCount": 1
     }
    ]
   }
  }
 ],
 "class": "Panorama",
 "hfovMin": "150%"
},
{
 "manualRotationSpeed": 702,
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -323,
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 64.52,
  "pitch": -43.38
 }
},
{
 "initialZoomFactor": 1,
 "overlays": [
  "this.overlay_263955E7_372A_34E5_41CB_3886F66CA07B",
  "this.overlay_2670782E_372E_7B66_41C8_A3957B2F2D78",
  "this.overlay_26A89158_372A_0D2A_4198_4572296D1F40",
  "this.overlay_25285E69_372A_77EA_41C4_A1A6CBAA79A5"
 ],
 "label": "GROUND FLOOR",
 "thumbnailUrl": "media/map_27AABB30_3726_3D7A_41B6_1384F3F92D65_t.png",
 "fieldOfViewOverlayOutsideColor": "#000000",
 "width": 4000,
 "id": "map_27AABB30_3726_3D7A_41B6_1384F3F92D65",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_27AABB30_3726_3D7A_41B6_1384F3F92D65.png",
    "width": 3200,
    "class": "ImageResourceLevel",
    "height": 1800
   },
   {
    "url": "media/map_27AABB30_3726_3D7A_41B6_1384F3F92D65_lq.png",
    "width": 341,
    "class": "ImageResourceLevel",
    "height": 192,
    "tags": "preload"
   }
  ]
 },
 "fieldOfViewOverlayOutsideOpacity": 0,
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "fieldOfViewOverlayRadiusScale": 0.06,
 "minimumZoomFactor": 1,
 "scaleMode": "fit_outside",
 "fieldOfViewOverlayInsideColor": "#66FF00",
 "class": "Map",
 "maximumZoomFactor": 1,
 "height": 2250
},
{
 "manualRotationSpeed": 702,
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -323,
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "viewerArea": "this.MapViewer",
 "class": "MapPlayer",
 "id": "MapViewerMapPlayer",
 "movementMode": "constrained"
},
{
 "manualRotationSpeed": 702,
 "class": "PanoramaCamera",
 "initialSequence": {
  "movements": [
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_in",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -323,
    "easing": "linear",
    "yawSpeed": 7.96
   },
   {
    "class": "DistancePanoramaCameraMovement",
    "yawDelta": -18.5,
    "easing": "cubic_out",
    "yawSpeed": 7.96
   }
  ],
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence"
 },
 "automaticZoomSpeed": 10,
 "id": "camera_2094F314_377E_0D3A_41BB_C781CF484B0A",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 14.71,
  "pitch": 0
 }
},
{
 "progressOpacity": 1,
 "progressRight": 0,
 "id": "MainViewer",
 "left": 0,
 "width": "100%",
 "firstTransitionDuration": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "transitionMode": "blending",
 "playbackBarHeadShadow": true,
 "toolTipFontColor": "#606060",
 "vrPointerSelectionTime": 2000,
 "progressBackgroundOpacity": 1,
 "progressBottom": 0,
 "playbackBarOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "vrPointerColor": "#FFFFFF",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "progressBorderSize": 0,
 "toolTipPaddingRight": 6,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderRadius": 0,
 "paddingBottom": 0,
 "height": "100%",
 "toolTipPaddingTop": 4,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingLeft": 6,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "borderSize": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "minHeight": 50,
 "playbackBarHeadHeight": 15,
 "playbackBarBottom": 5,
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "minWidth": 100,
 "playbackBarHeadOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipOpacity": 1,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "paddingTop": 0,
 "transitionDuration": 500,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "top": 0,
 "progressBarBorderRadius": 0,
 "shadow": false,
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderSize": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "paddingRight": 0,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "class": "ViewerArea",
 "playbackBarHeadShadowColor": "#000000",
 "data": {
  "name": "Main Viewer"
 }
},
{
 "minWidth": 1,
 "id": "Label_205F6D06_353D_AF74_4192_9C6508AE517A",
 "left": "4.33%",
 "horizontalAlign": "center",
 "width": "31.334%",
 "fontFamily": "Times New Roman",
 "backgroundColorDirection": "horizontal",
 "paddingTop": 0,
 "text": "NATHALLI BUILDING DESIGN AND CONSTRUCTION",
 "fontColor": "#000000",
 "top": "4.58%",
 "shadow": false,
 "backgroundColor": [
  "#CCCCCC"
 ],
 "paddingBottom": 0,
 "height": "9.585%",
 "backgroundOpacity": 0.46,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "fontSize": "2.2vmin",
 "fontStyle": "normal",
 "propagateClick": false,
 "paddingLeft": 0,
 "fontWeight": "bold",
 "minHeight": 1,
 "textDecoration": "none",
 "class": "Label",
 "backgroundColorRatios": [
  0.22
 ],
 "data": {
  "name": "company name"
 }
},
{
 "minWidth": 1,
 "id": "HTMLText_23D6EE8F_35DC_AD73_41B0_65C6202C69DB",
 "shadowHorizontalLength": 0,
 "shadowColor": "#000000",
 "right": "3.26%",
 "width": "23.628%",
 "backgroundColorDirection": "vertical",
 "paddingTop": 20,
 "shadowVerticalLength": 3,
 "scrollBarWidth": 10,
 "shadow": true,
 "bottom": "2.98%",
 "backgroundColor": [
  "#000000",
  "#000000",
  "#000000"
 ],
 "shadowSpread": 1,
 "shadowBlurRadius": 7,
 "paddingBottom": 20,
 "height": "18.398%",
 "scrollBarOpacity": 0.5,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "backgroundOpacity": 0.81,
 "paddingRight": 20,
 "borderRadius": 0,
 "shadowOpacity": 0.45,
 "borderSize": 0,
 "scrollBarMargin": 2,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:22px;font-family:'Times New Roman', Times, serif;\">BY</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:26px;font-family:'Times New Roman', Times, serif;\"><I>Er.SABAREES IYAPPAN</I></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:12px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#cccccc;font-size:14px;font-family:Tahoma, Geneva, sans-serif;\"><B>CONTACT:8870323300</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#cccccc;font-size:14px;font-family:'Times New Roman', Times, serif;\"><B>E MAIL:nathallidesigns@gmail.com</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:14px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "propagateClick": false,
 "minHeight": 1,
 "paddingLeft": 20,
 "class": "HTMLText",
 "backgroundColorRatios": [
  0,
  0.64,
  0.74
 ],
 "data": {
  "name": "HTMLText53815"
 }
},
{
 "minWidth": 1,
 "id": "Image_3B0CA86E_36E6_1BE7_41C0_DCC984039774",
 "left": "0%",
 "horizontalAlign": "center",
 "width": "24.38%",
 "url": "skin/Image_3B0CA86E_36E6_1BE7_41C0_DCC984039774.png",
 "paddingTop": 0,
 "shadow": false,
 "bottom": "0.03%",
 "maxWidth": 454,
 "maxHeight": 340,
 "height": "21.602%",
 "paddingBottom": 0,
 "backgroundOpacity": 0,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "minHeight": 1,
 "scaleMode": "fit_inside",
 "paddingLeft": 0,
 "class": "Image",
 "data": {
  "name": "Image2662"
 }
},
{
 "minWidth": 1,
 "children": [
  "this.MapViewer",
  "this.DropDown_269402C9_36DA_0F2D_41B0_543A540CF4BD"
 ],
 "gap": 10,
 "id": "Container_261D9C02_36DE_1B1F_419B_B54855EC5413",
 "horizontalAlign": "left",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "right": "1.98%",
 "width": "14.101%",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "layout": "absolute",
 "top": "3.77%",
 "shadow": false,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "height": "40.515%",
 "overflow": "scroll",
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "backgroundOpacity": 0.3,
 "paddingRight": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarMargin": 2,
 "propagateClick": false,
 "paddingLeft": 0,
 "creationPolicy": "inAdvance",
 "minHeight": 1,
 "class": "Container",
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container5348"
 }
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -165.29,
   "hfov": 12.6,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_1_HS_0_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -48.78
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.6,
   "image": "this.AnimatedImageResource_2779C916_34CC_9795_41C8_4331FD07159D",
   "pitch": -48.78,
   "yaw": -165.29,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_242C5096_34F5_7695_41B3_CD8A205EF662",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1, this.camera_205032C0_377E_0F1A_41C4_1A038A1331FC); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "media": "this.panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_2061F264_377E_0F1A_41A1_548A806D1468, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_2061F264_377E_0F1A_41A1_548A806D1468",
 "camera": "this.panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_camera"
},
{
 "media": "this.panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_20605264_377E_0F1A_41C3_8230C5EFABCC, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_20605264_377E_0F1A_41C3_8230C5EFABCC",
 "camera": "this.panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_camera"
},
{
 "media": "this.panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_2060D265_377E_0F1A_41B4_203FB4955ADD, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_2060D265_377E_0F1A_41B4_203FB4955ADD",
 "camera": "this.panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_camera"
},
{
 "media": "this.panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_20634265_377E_0F1A_41BA_D898A25629C4, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 3, 4)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_20634265_377E_0F1A_41BA_D898A25629C4",
 "camera": "this.panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_camera"
},
{
 "media": "this.panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_2063E266_377E_0FE6_41CB_4636773AD31E, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 4, 5)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_2063E266_377E_0FE6_41CB_4636773AD31E",
 "camera": "this.panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_camera"
},
{
 "media": "this.panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_20627266_377E_0FE6_41C7_F0C1CB2AD622, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 5, 6)",
 "player": "this.MainViewerPanoramaPlayer",
 "id": "PanoramaPlayListItem_20627266_377E_0FE6_41C7_F0C1CB2AD622",
 "camera": "this.panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_camera"
},
{
 "media": "this.panorama_3EAC9257_34CC_9593_418E_C55799D1A64C",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_2062D267_377E_0FE6_41C6_B4C5C7C7DD7F, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 0)",
 "player": "this.MainViewerPanoramaPlayer",
 "end": "this.trigger('tourEnded')",
 "id": "PanoramaPlayListItem_2062D267_377E_0FE6_41C6_B4C5C7C7DD7F",
 "camera": "this.panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_camera"
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 06c"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -163.66,
   "hfov": 15.57,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_1_HS_0_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -40.89
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.57,
   "image": "this.AnimatedImageResource_277E5915_34CC_9797_41C8_D274D4670B1A",
   "pitch": -40.89,
   "yaw": -163.66,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_24FAE355_34FC_9B94_41B2_9CCBDD98AEC0",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6, this.camera_20A6E2D5_377E_0F3A_41A9_20EDC0462D8B); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "data": {
  "label": "KITCHEN06a"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -61.91,
   "hfov": 13.56,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -39.79
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 13.56,
   "image": "this.AnimatedImageResource_26B3D75B_34F4_FB9C_41B9_778C5AC9E03F",
   "pitch": -39.79,
   "yaw": -61.91,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_3B1E41F9_34CB_769C_41BE_5FEAC9EE45BC",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C, this.camera_20774284_377E_0F1A_41C0_D2AA2DA9B411); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "data": {
  "label": "HALL 06b"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 92.69,
   "hfov": 16.18,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_1_HS_1_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -38.21
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.18,
   "image": "this.AnimatedImageResource_26B0175B_34F4_FB9C_41C1_B60022BDE9F3",
   "pitch": -38.21,
   "yaw": 92.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_3B4E75E1_34F5_9EAC_41C2_AE2C8ED2D672",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1, this.camera_204FF298_377E_0F2A_41C0_38EEA6C2460F); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 4.93,
   "hfov": 16.65,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_1_HS_2_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -29.43
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.65,
   "image": "this.AnimatedImageResource_277F3914_34CC_9795_41BA_C36B47A8933D",
   "pitch": -29.43,
   "yaw": 4.93,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_3B6B8A0B_34FC_B57C_41BF_22C2D830666F",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 06a Left-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 52.84,
   "hfov": 16.62,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_1_HS_3_0_0_map.gif",
      "width": 29,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -29.63
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.62,
   "image": "this.AnimatedImageResource_277F8915_34CC_9797_4198_71A61FB2049E",
   "pitch": -29.63,
   "yaw": 52.84,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_2782317A_34F5_979D_41BE_39C423BA0359",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_204332AD_377E_0F6A_4194_629DF234F467, this.panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6); this.startPanoramaWithCamera(this.panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1, this.camera_204332AD_377E_0F6A_4194_629DF234F467); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 06a"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -112.08,
   "hfov": 14.73,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_1_HS_0_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -34.71
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.73,
   "image": "this.AnimatedImageResource_26B2B759_34F4_FB9C_418A_7C736503C369",
   "pitch": -34.71,
   "yaw": -112.08,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_3A08CD8C_34CF_AF75_41B1_7100DB8690D1",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6, this.camera_20B622E9_377E_0CEA_41C1_B3BD230F0E75); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "hfov": 22.51,
 "vfov": 12.84,
 "id": "overlay_277F6081_357B_B56C_4170_F22E076C026B",
 "loop": false,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/overlay_277F6081_357B_B56C_4170_F22E076C026B_t.jpg",
    "width": 640,
    "class": "ImageResourceLevel",
    "height": 272
   }
  ]
 },
 "pitch": 2.28,
 "useHandCursor": true,
 "roll": -0.21,
 "yaw": 15.77,
 "autoplay": true,
 "videoVisibleOnStop": false,
 "rotationX": -4.11,
 "click": "if(this.overlay_277F6081_357B_B56C_4170_F22E076C026B.get('state') != 'playing'){ this.overlay_277F6081_357B_B56C_4170_F22E076C026B.play(); } else { this.overlay_277F6081_357B_B56C_4170_F22E076C026B.pause(); }",
 "rotationY": 15.16,
 "blending": 0,
 "stateChange": "if(this.overlay_277F6081_357B_B56C_4170_F22E076C026B.get('state') == 'playing'){ this.pauseGlobalAudios('overlay_277F6081_357B_B56C_4170_F22E076C026B', [this.overlay_277F6081_357B_B56C_4170_F22E076C026B]); } else { this.resumeGlobalAudios('overlay_277F6081_357B_B56C_4170_F22E076C026B'); }",
 "class": "VideoPanoramaOverlay",
 "distance": 50,
 "enabledInCardboard": true,
 "data": {
  "label": "Video"
 },
 "video": {
  "width": 640,
  "class": "VideoResource",
  "mp4Url": "media/video_27F34456_3575_9D94_41BF_088B980DBC41.mp4",
  "height": 272
 }
},
{
 "class": "LensFlarePanoramaOverlay",
 "yaw": 70.94,
 "bleaching": 0.21,
 "pitch": 53.21,
 "bleachingDistance": 0.42,
 "id": "overlay_265416F7_3575_9A94_41C5_90F2976EEB18"
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 06a"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 171.73,
   "hfov": 12.48,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -45.01
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.48,
   "image": "this.AnimatedImageResource_258C2279_34D5_B59F_41A9_4D1BD7258C46",
   "pitch": -45.01,
   "yaw": 171.73,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_263C6977_34D4_9794_41C4_5E75AB37DB90",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "map": {
  "width": 441.56,
  "x": 1527.45,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_26708617_3726_1725_41A3_EBE2AE20FE52_HS_0_map.gif",
     "width": 20,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 1497.8,
  "offsetY": 0,
  "height": 340,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 1527.45,
  "y": 1497.8,
  "width": 441.56,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_26708617_3726_1725_41A3_EBE2AE20FE52_HS_0.png",
     "width": 353,
     "class": "ImageResourceLevel",
     "height": 272
    }
   ]
  },
  "height": 340
 },
 "useHandCursor": true,
 "id": "overlay_26F40BCF_3729_FD25_41BA_5B3752592943",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "UPSTAIR BED ROOM 1\u000a"
  }
 ]
},
{
 "map": {
  "width": 454,
  "x": 1627.66,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_26708617_3726_1725_41A3_EBE2AE20FE52_HS_1_map.gif",
     "width": 21,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 976.35,
  "offsetY": 0,
  "height": 340,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 1627.66,
  "y": 976.35,
  "width": 454,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_26708617_3726_1725_41A3_EBE2AE20FE52_HS_1.png",
     "width": 363,
     "class": "ImageResourceLevel",
     "height": 272
    }
   ]
  },
  "height": 340
 },
 "useHandCursor": true,
 "id": "overlay_26AAF07A_3726_0BEE_41C7_6D422347819E",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "UPSTAIR  ENTY "
  }
 ]
},
{
 "map": {
  "width": 454,
  "x": 1470.14,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_26708617_3726_1725_41A3_EBE2AE20FE52_HS_2_map.gif",
     "width": 21,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 444.49,
  "offsetY": 0,
  "height": 340,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 1470.14,
  "y": 444.49,
  "width": 454,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_26708617_3726_1725_41A3_EBE2AE20FE52_HS_2.png",
     "width": 363,
     "class": "ImageResourceLevel",
     "height": 272
    }
   ]
  },
  "height": 340
 },
 "useHandCursor": true,
 "id": "overlay_247734DB_3726_0B2E_41C0_BA35B9A0C157",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "UPSTAIR BED ROOM 2"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 06a"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 147.23,
   "hfov": 14.67,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -33.75
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 14.67,
   "image": "this.AnimatedImageResource_2572827A_34D5_B59D_41C3_28E61F53D35F",
   "pitch": -33.75,
   "yaw": 147.23,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_25739C5D_34D4_AD94_41B4_003C0430C22F",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1, this.camera_20F5233D_377E_0D65_41CB_78BBB5D64057); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 06c Right-Up"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 67.44,
   "hfov": 18.7,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_1_HS_0_0_0_map.gif",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -45.69
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 18.7,
   "image": "this.AnimatedImageResource_277EF915_34CC_9797_41A2_B754D8B606FE",
   "pitch": -45.69,
   "yaw": 67.44,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_25FA4D76_34F7_6F94_41B3_A728827AAFF5",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_2084B2FF_377E_0CE6_41C0_178E277284A1, this.panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1); this.startPanoramaWithCamera(this.panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6, this.camera_2084B2FF_377E_0CE6_41C0_178E277284A1); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 06a"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -2.95,
   "hfov": 11.66,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_1_HS_1_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -48.65
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.66,
   "image": "this.AnimatedImageResource_277EB916_34CC_9795_41BF_E53E4324ECD1",
   "pitch": -48.65,
   "yaw": -2.95,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_242F51B2_34F7_B6AD_41A5_4E1C6FB43D8E",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3EAC9257_34CC_9593_418E_C55799D1A64C, this.camera_20E54329_377E_0D6A_41C5_F9ABA377C6A6); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "class": "HotspotPanoramaOverlay",
 "enabledInCardboard": true,
 "data": {
  "label": "Arrow 06a"
 },
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -159.1,
   "hfov": 8.96,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0_HS_3_0_0_map.gif",
      "width": 27,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -59.49
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.96,
   "image": "this.AnimatedImageResource_258D027A_34D5_B59D_4173_A71DA3F02820",
   "pitch": -59.49,
   "yaw": -159.1,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_26D486D3_34D7_BA93_41C1_79D21174E675",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A, this.camera_2094F314_377E_0D3A_41BB_C781CF484B0A); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ]
},
{
 "map": {
  "width": 457.11,
  "x": 1717.03,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_27AABB30_3726_3D7A_41B6_1384F3F92D65_HS_0_map.gif",
     "width": 22,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 1463.33,
  "offsetY": 0,
  "height": 318.23,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 1717.03,
  "y": 1463.33,
  "width": 457.11,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_27AABB30_3726_3D7A_41B6_1384F3F92D65_HS_0.png",
     "width": 365,
     "class": "ImageResourceLevel",
     "height": 254
    }
   ]
  },
  "height": 318.23
 },
 "useHandCursor": true,
 "id": "overlay_263955E7_372A_34E5_41CB_3886F66CA07B",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "LIVING HALL"
  }
 ]
},
{
 "map": {
  "width": 379.36,
  "x": 1654.91,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_27AABB30_3726_3D7A_41B6_1384F3F92D65_HS_1_map.gif",
     "width": 22,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 1030.06,
  "offsetY": 0,
  "height": 274.69,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 1654.91,
  "y": 1030.06,
  "width": 379.36,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_27AABB30_3726_3D7A_41B6_1384F3F92D65_HS_1.png",
     "width": 303,
     "class": "ImageResourceLevel",
     "height": 219
    }
   ]
  },
  "height": 274.69
 },
 "useHandCursor": true,
 "id": "overlay_2670782E_372E_7B66_41C8_A3957B2F2D78",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "DINING "
  }
 ]
},
{
 "map": {
  "width": 366.93,
  "x": 1737.47,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_27AABB30_3726_3D7A_41B6_1384F3F92D65_HS_2_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 627.25,
  "offsetY": 0,
  "height": 321.34,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 1737.47,
  "y": 627.25,
  "width": 366.93,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_27AABB30_3726_3D7A_41B6_1384F3F92D65_HS_2.png",
     "width": 293,
     "class": "ImageResourceLevel",
     "height": 257
    }
   ]
  },
  "height": 321.34
 },
 "useHandCursor": true,
 "id": "overlay_26A89158_372A_0D2A_4198_4572296D1F40",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "KITCHEN"
  }
 ]
},
{
 "map": {
  "width": 454,
  "x": 2103.41,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_27AABB30_3726_3D7A_41B6_1384F3F92D65_HS_3_map.gif",
     "width": 21,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 620.04,
  "offsetY": 0,
  "height": 340,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "data": {
  "label": "Image"
 },
 "image": {
  "x": 2103.41,
  "y": 620.04,
  "width": 454,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_27AABB30_3726_3D7A_41B6_1384F3F92D65_HS_3.png",
     "width": 363,
     "class": "ImageResourceLevel",
     "height": 272
    }
   ]
  },
  "height": 340
 },
 "useHandCursor": true,
 "id": "overlay_25285E69_372A_77EA_41C4_A1A6CBAA79A5",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000",
   "toolTip": "BED ROOM 1"
  }
 ]
},
{
 "progressOpacity": 1,
 "progressRight": 0,
 "id": "MapViewer",
 "left": "0%",
 "width": "100%",
 "firstTransitionDuration": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "transitionMode": "blending",
 "playbackBarHeadShadow": true,
 "toolTipFontColor": "#606060",
 "vrPointerSelectionTime": 2000,
 "progressBackgroundOpacity": 1,
 "progressBottom": 2,
 "playbackBarOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "progressHeight": 10,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "vrPointerColor": "#FFFFFF",
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipBorderSize": 1,
 "progressBorderSize": 0,
 "toolTipPaddingRight": 6,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderRadius": 0,
 "paddingBottom": 0,
 "height": "92.557%",
 "toolTipPaddingTop": 4,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "toolTipPaddingLeft": 6,
 "borderRadius": 0,
 "toolTipDisplayTime": 600,
 "borderSize": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "toolTipBorderRadius": 3,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarLeft": 0,
 "minHeight": 1,
 "playbackBarHeadHeight": 15,
 "playbackBarBottom": 0,
 "progressBarBorderColor": "#000000",
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#000000",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingLeft": 0,
 "minWidth": 1,
 "playbackBarHeadOpacity": 1,
 "playbackBarHeadShadowHorizontalLength": 0,
 "displayTooltipInTouchScreens": true,
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipOpacity": 1,
 "toolTipFontSize": "1.11vmin",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "paddingTop": 0,
 "transitionDuration": 500,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipPaddingBottom": 4,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "shadow": false,
 "bottom": "0%",
 "toolTipShadowColor": "#333333",
 "progressBarBorderSize": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "paddingRight": 0,
 "toolTipShadowOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarBorderSize": 0,
 "toolTipShadowHorizontalLength": 0,
 "propagateClick": false,
 "playbackBarBackgroundOpacity": 1,
 "toolTipFontFamily": "Arial",
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "class": "ViewerArea",
 "playbackBarHeadShadowColor": "#000000",
 "data": {
  "name": "MapViewer"
 }
},
{
 "minWidth": 200,
 "popUpBackgroundOpacity": 0.9,
 "gap": 0,
 "id": "DropDown_269402C9_36DA_0F2D_41B0_543A540CF4BD",
 "left": "0%",
 "width": "100%",
 "popUpShadow": false,
 "fontFamily": "Arial",
 "popUpGap": 0,
 "popUpFontColor": "#000000",
 "backgroundColorDirection": "vertical",
 "paddingTop": 0,
 "fontColor": "#FFFFFF",
 "popUpShadowBlurRadius": 6,
 "popUpShadowOpacity": 0,
 "selectedPopUpFontColor": "#FFFFFF",
 "top": "0%",
 "shadow": false,
 "backgroundColor": [
  "#666666"
 ],
 "popUpShadowSpread": 1,
 "popUpShadowColor": "#000000",
 "rollOverPopUpBackgroundColor": "#FFFFFF",
 "height": "8.807%",
 "arrowBeforeLabel": false,
 "arrowColor": "#FFFFFF",
 "paddingBottom": 0,
 "backgroundOpacity": 0.9,
 "playList": "this.DropDown_269402C9_36DA_0F2D_41B0_543A540CF4BD_playlist",
 "popUpBorderRadius": 0,
 "popUpBackgroundColor": "#FFFFFF",
 "paddingRight": 5,
 "borderRadius": 0,
 "borderSize": 0,
 "fontSize": 14,
 "fontStyle": "normal",
 "propagateClick": false,
 "selectedPopUpBackgroundColor": "#333333",
 "paddingLeft": 5,
 "fontWeight": "normal",
 "minHeight": 20,
 "textDecoration": "none",
 "class": "DropDown",
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "DropDown1204"
 }
},
{
 "levels": [
  {
   "url": "media/panorama_3EAE53A4_34CC_9AB5_418D_C1EC66C0583A_1_HS_0_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_2779C916_34CC_9795_41C8_4331FD07159D",
 "frameDuration": 41,
 "rowCount": 6
},
{
 "levels": [
  {
   "url": "media/panorama_3EAD2AF2_34CD_EAAC_418C_1E2A8CAEAE9C_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_277E5915_34CC_9797_41C8_D274D4670B1A",
 "frameDuration": 41,
 "rowCount": 6
},
{
 "levels": [
  {
   "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_26B3D75B_34F4_FB9C_41B9_778C5AC9E03F",
 "frameDuration": 41,
 "rowCount": 6
},
{
 "levels": [
  {
   "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_26B0175B_34F4_FB9C_41C1_B60022BDE9F3",
 "frameDuration": 41,
 "rowCount": 6
},
{
 "levels": [
  {
   "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_1_HS_2_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_277F3914_34CC_9795_41BA_C36B47A8933D",
 "frameDuration": 41,
 "rowCount": 6
},
{
 "levels": [
  {
   "url": "media/panorama_3E9287AB_34CD_9ABC_4190_6307C22715F6_1_HS_3_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_277F8915_34CC_9797_4198_71A61FB2049E",
 "frameDuration": 41,
 "rowCount": 6
},
{
 "levels": [
  {
   "url": "media/panorama_3EAD68DB_34CD_9693_41C5_4C8951A51CB1_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_26B2B759_34F4_FB9C_418A_7C736503C369",
 "frameDuration": 41,
 "rowCount": 6
},
{
 "levels": [
  {
   "url": "media/panorama_3E810F10_34CC_AB6C_41C1_1AACDBE75A60_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_258C2279_34D5_B59F_41A9_4D1BD7258C46",
 "frameDuration": 41,
 "rowCount": 6
},
{
 "levels": [
  {
   "url": "media/panorama_3EAC9257_34CC_9593_418E_C55799D1A64C_0_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_2572827A_34D5_B59D_41C3_28E61F53D35F",
 "frameDuration": 41,
 "rowCount": 6
},
{
 "levels": [
  {
   "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_1_HS_0_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_277EF915_34CC_9797_41A2_B754D8B606FE",
 "frameDuration": 41,
 "rowCount": 6
},
{
 "levels": [
  {
   "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_277EB916_34CC_9795_41BF_E53E4324ECD1",
 "frameDuration": 41,
 "rowCount": 6
},
{
 "levels": [
  {
   "url": "media/panorama_3F9EF138_34CC_979C_41B9_4A2911A268B1_0_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 420
  }
 ],
 "colCount": 4,
 "frameCount": 24,
 "class": "AnimatedImageResource",
 "id": "AnimatedImageResource_258D027A_34D5_B59D_4173_A71DA3F02820",
 "frameDuration": 41,
 "rowCount": 6
}],
 "paddingBottom": 0,
 "scrollBarOpacity": 0.5,
 "verticalAlign": "top",
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "paddingRight": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarMargin": 2,
 "propagateClick": false,
 "minHeight": 20,
 "mobileMipmappingEnabled": false,
 "paddingLeft": 0,
 "mouseWheelEnabled": true,
 "desktopMipmappingEnabled": false,
 "class": "Player",
 "data": {
  "name": "Player451"
 }
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
