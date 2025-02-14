// Generated by CoffeeScript 1.8.0
Epicport.Dune2 = (function() {
  function Dune2() {
    var soundControl;
    Module['EM_MIDI_MUTED'] || (Module['EM_MIDI_MUTED'] = false);
    soundControl = $('.opendune-toggle-sound');
    soundControl.click(function() {
      if (Module['EM_MIDI_TOGGLE_SOUND']) {
        Module['EM_MIDI_TOGGLE_SOUND']();
      } else {
        return;
      }
      if (Module['EM_MIDI_MUTED']) {
        soundControl.addClass('opendune-unmute');
        return soundControl.removeClass('opendune-mute');
      } else {
        soundControl.removeClass('opendune-unmute');
        return soundControl.addClass('opendune-mute');
      }
    });
    soundControl.show();
    $('.opendune-a-house').click(function() {
      Module['arguments'] = ['-a'];
      return $(".dune2-select-house-dialog").dialog('close');
    });
    $('.opendune-o-house').click(function() {
      Module['arguments'] = ['-o'];
      return $(".dune2-select-house-dialog").dialog('close');
    });
    $('.opendune-h-house').click(function() {
      Module['arguments'] = ['-h'];
      return $(".dune2-select-house-dialog").dialog('close');
    });
  }

  Dune2.prototype.start = function(jsFile) {
    return $(".dune2-select-house-dialog").dialog({
      appendTo: ".game",
      width: 650,
      modal: true,
      draggable: false,
      resizeable: false,
      closeText: "",
      close: function() {
        var startGame;
        startGame = (function(_this) {
          return function() {
            return $.ajax({
              url: jsFile,
              dataType: "script",
              xhr: function() {
                var xhr;
                Module.setStatus("Loading script (" + jsFile + ")");
                xhr = $.ajaxSettings.xhr();
                xhr.addEventListener("progress", function(evt) {
                  if (evt.lengthComputable) {
                    return Epicport.API.progress(evt.loaded, evt.total);
                  }
                });
                return xhr;
              }
            });
          };
        })(this);
        return setTimeout(startGame, 500);
      }
    });
  };

  return Dune2;

})();
