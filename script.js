const ball = document.querySelector('.ball');
const btn = document.querySelector('.btn-action');
const spring = document.querySelector('.spring');
const fill = document.querySelector('.fill');
const bar = document.querySelector('.bar');

const stretchSpring = () => {
    fill.style.animationPlayState = 'running';
    spring.style.animationPlayState = 'running';
    btn.textContent = 'Release the button'
    fill.style.animationName = 'fill';

}
const releaseSpring = () => {
    fill.style.animationPlayState = 'paused';
    spring.style.animationPlayState = 'paused';
    const fillWidth = parseInt(getComputedStyle(fill).width, 10);
    const barWidth = parseInt(getComputedStyle(bar).width)
    const progressPercent = ((fillWidth / barWidth) * 100).toFixed();
    btn.style.color = 'black'
    btn.textContent = `force: ${progressPercent}%`

    document.documentElement.style.setProperty('--power-x', `${progressPercent * 7 + 120}px`);
    ball.style.animation = "fly-ball-x 2s 1 forwards .2s cubic-bezier(.17,.67,.6,1),fly-ball-y 2s 1 forwards .2s linear";

    document.documentElement.style.setProperty('--spring-left', parseInt(getComputedStyle(spring).left, 10));
    spring.style.animation = 'release-spring .2s ease-in';

    btn.removeEventListener('mousedown', stretchSpring)
    btn.removeEventListener('mouseup', releaseSpring)
    btn.removeEventListener('touchstart', stretchSpring)
    btn.removeEventListener('touchend', releaseSpring)

    ball.addEventListener('animationend', resetAnimation)
}
const resetAnimation = () => {
    ball.removeEventListener('animationend', resetAnimation);
    setTimeout(() => {
        btn.addEventListener('mousedown', stretchSpring)
        btn.addEventListener('mouseup', releaseSpring)
        btn.addEventListener('touchstart', stretchSpring)
        btn.addEventListener('touchend', releaseSpring)
        btn.style.color = 'white';
        btn.textContent = 'Stretch the spring';

        spring.style.animation = '';
        ball.style.animation = '';
        spring.style.animation = '';
        fill.style.animationName = 'none';


    }, 2000)

}

btn.addEventListener('mousedown', stretchSpring)
btn.addEventListener('mouseup', releaseSpring)
btn.addEventListener('touchstart', stretchSpring)
btn.addEventListener('touchend', releaseSpring)