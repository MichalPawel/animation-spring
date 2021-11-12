const ball = document.querySelector('.ball');
const ballInside = document.querySelector('.ball-inside');
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
    const barWidth = parseInt(getComputedStyle(bar).width)
    const fillStyle = window.getComputedStyle(fill)
    const fillMatrix = new WebKitCSSMatrix(fillStyle.transform);
    const progressPercent = ((fillMatrix.m41 / barWidth) * 100 + 100).toFixed();

    btn.style.color = 'black'
    btn.textContent = `force: ${progressPercent}%`


    const ballFromGround = getComputedStyle(ball).bottom
    console.log(ballFromGround);
    document.documentElement.style.setProperty('--power-x', `${progressPercent * 6}px`);
    document.documentElement.style.setProperty('--power-y', `${ballFromGround}`);
    ball.style.animation = "fly-ball-x 2s 1 forwards .2s cubic-bezier(.17,.67,.6,1)";
    ballInside.style.animation = "fly-ball-y 2s 1 forwards .2s linear";

    const springStyle = window.getComputedStyle(spring)
    const springMatrix = new WebKitCSSMatrix(springStyle.transform)
    const springPercent = springMatrix.m41 / parseInt(getComputedStyle(spring).width)
    console.log(springPercent);
    document.documentElement.style.setProperty('--spring-left', `${springPercent * 100}%`);
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
        ballInside.style.animation = '';
    }, 2000)

}

btn.addEventListener('mousedown', stretchSpring)
btn.addEventListener('mouseup', releaseSpring)
btn.addEventListener('touchstart', stretchSpring)
btn.addEventListener('touchend', releaseSpring)