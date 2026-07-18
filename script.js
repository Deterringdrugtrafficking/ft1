// ---- TAB SWITCHING ----
document.querySelectorAll('.tab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(x => x.classList.remove('active'));
    document.querySelectorAll('.page').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    document.getElementById('page-' + t.dataset.page).classList.add('active');
  });
});

// ---- AUDIO PLAYER ----
const audio = document.getElementById('audio');
const playPause = document.getElementById('playPause');
const back = document.getElementById('back');
const fwd = document.getElementById('fwd');
const scrub = document.getElementById('scrub');
const curTime = document.getElementById('curTime');
const durTime = document.getElementById('durTime');
const mute = document.getElementById('mute');
const shareBtn = document.getElementById('share');

function formatTime(s) {
  if (isNaN(s)) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

audio.addEventListener('loadedmetadata', () => {
  scrub.max = audio.duration;
  durTime.textContent = formatTime(audio.duration);
});

playPause.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPause.textContent = '⏸';
  } else {
    audio.pause();
    playPause.textContent = '▶';
  }
});

audio.addEventListener('timeupdate', () => {
  scrub.value = audio.currentTime;
  curTime.textContent = formatTime(audio.currentTime);
});

audio.addEventListener('ended', () => {
  playPause.textContent = '▶';
});

scrub.addEventListener('input', () => {
  audio.currentTime = scrub.value;
});

back.addEventListener('click', () => {
  audio.currentTime = Math.max(0, audio.currentTime - 10);
});

fwd.addEventListener('click', () => {
  audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
});

mute.addEventListener('click', () => {
  audio.muted = !audio.muted;
  mute.textContent = audio.muted ? '🔇' : '🔊';
});

shareBtn.addEventListener('click', async () => {
  const url = window.location.href;
  if (navigator.share) {
    navigator.share({ title: document.title, url });
  } else {
    await navigator.clipboard.writeText(url);
    alert('Link copied to clipboard');
  }
});
