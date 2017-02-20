/**
 * @fileoverview Sound handler class
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

function Sound(sounds) {
  this.sounds = sounds;
}

Sound.BASE_URL = '/public/sound/';

/**
 * Example:
 * Sound.SOUND_SRCS = {
 *   explosion: [
 *     'explosion1.mp3',
 *     'explosion2.mp3',
 *   ],
 *   gun: [
 *      'gun.mp3'
 *   ]
 * }
 */
Sound.SOUND_SRCS = {};

Sound.create = function() {
  var sounds = {};
  for (var key in Sound.SOUND_SRCS) {
    sounds[key] = Sound.SOUND_SRCS[key].map((src) => {
      return new Howl({ src: Sound.BASE_URL + src });
    });
  }
  return new Sound(sounds);
};

/**
 * Plays a sound.
 * @param {string} sound The name of the sound to play, as defined in SOUND_SRCS,
 * @param {?number=} volume The volume to play the sound at, a number from 0 to 1.
 * @param {?number=} rate The playback rate, a number from 0.5 to 4.
 */
Sound.prototype.play = function(sound, volume, rate) {
  var sound = Util.choiceArray(this.sounds[sound]);
  var id = sound.play();
  if (typeof(volume) === 'number') {
    sound.volume(Util.bound(volume, 0, 1), id);
  }
  if (typeof(rate) === 'number') {
    sound.rate(Util.bound(rate, 0.5, 4), id);
  }
};
