/**
 * @fileoverview Sound handler class
 * @author alvin@omgimanerd.tech (Alvin Lin)
 */

/**
 * Constructor for a Sound object
 * @param {Object} sounds An object containing the howler.js Howl
 *   objects.
 */
function Sound(sounds) {
  this.sounds = sounds;
}

Sound.BASE_URL = '/public/sound/';

/**
 * Example:
 * Sound.SOUND_SRCS = {
 *   explosion: 'explosion1.mp3',
 *   gun: 'gun.mp3'
 * }
 */
Sound.SOUND_SRCS = {};

/**
 * Factory method for creating a Sound object. This initializes all the Howl
 * objects and passes them into the Sound object instance.
 * @return {Sound}
 */
Sound.create = function() {
  return new Sound(Sound.SOUND_SRCS.map((src) => {
    return new Howl({ src: Sound.BASE_URL + src });
  }));
};

/**
 * Plays a sound.
 * @param {string} sound The name of the sound to play, as defined in
 *   SOUND_SRCS,
 * @param {?number=} volume The volume to play the sound at, a number
 *   from 0 to 1.
 * @param {?number=} rate The playback rate, a number from 0.5 to 4.
 */
Sound.prototype.play = function(sound, volume, rate) {
  var sound = this.sounds[sound];
  var id = sound.play();
  if (typeof(volume) === 'number') {
    sound.volume(Util.bound(volume, 0, 1), id);
  }
  if (typeof(rate) === 'number') {
    sound.rate(Util.bound(rate, 0.5, 4), id);
  }
};
