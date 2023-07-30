import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';

const iframe = document.getElementById('vimeo-player');
const player = new Vimeo(iframe);

const saveCurrentTimeToLocalStorage = time => {
  localStorage.setItem(STORAGE_KEY, time);
};

player.on(
  'timeupdate',
  throttle(data => {
    saveCurrentTimeToLocalStorage(data.seconds);
  }, 1000)
);

document.addEventListener('DOMContentLoaded', () => {
  const savedTime = localStorage.getItem(STORAGE_KEY) || '0';

  player.setCurrentTime(savedTime);
});
