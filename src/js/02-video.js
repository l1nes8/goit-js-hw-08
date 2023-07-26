import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Vimeo(iframe);

const saveCurrentTimeToLocalStorage = time => {
  localStorage.setItem('videoplayer-current-time', time);
};

player.on(
  'timeupdate',
  throttle(data => {
    saveCurrentTimeToLocalStorage(data.seconds);
  }, 1000)
);

document.addEventListener('DOMContentLoaded', () => {
  const savedTime = localStorage.getItem('videoplayer-current-time');

  player.setCurrentTime(savedTime);
});
