const AnimatedCharacter = (() => {
  let cnv;
  let ctxt;

  const init = () => {
    cnv = document.querySelector('canvas');
    ctxt = cnv.getContext('2d');
    loadSprite();
  };

  let keysPressed = {};
  let currentDir = 3;
  let loopIndex = 0;
  let frameCounter = 0;
  let posX = 0;
  let posY = 0;
  let sprite = new Image();

  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  function onKeyDown(event) {
    keysPressed[event.key] = true;
  }

  function onKeyUp(event) {
    keysPressed[event.key] = false;
  }

  function loadSprite() {
    sprite.src = './src/photo/zombie.png';
    sprite.onload = () => {
      setInterval(runAnimation, 1000 / 30); 
    };
  }

  function renderFrame(frameX, frameY, canvasX, canvasY) {
    ctxt.drawImage(
      sprite,
      frameX * 64, frameY * 64, 64, 64,
      canvasX, canvasY, 64, 64
    );
  }

  function runAnimation() {
    ctxt.clearRect(0, 0, cnv.width, cnv.height);

    let moved = false;

    if (keysPressed.ArrowUp) {
      moveSprite(0, -2, 0);
      moved = true;
    } else if (keysPressed.ArrowDown) {
      moveSprite(0, 2, 3);
      moved = true;
    }

    if (keysPressed.ArrowLeft) {
      moveSprite(-2, 0, 2);
      moved = true;
    } else if (keysPressed.ArrowRight) {
      moveSprite(2, 0, 1);
      moved = true;
    }

    if (keysPressed.R || keysPressed.r) {
      randomPosition();
    }

    if (moved) {
      frameCounter++;
      if (frameCounter >= 12) {
        frameCounter = 0;
        loopIndex++;
        if (loopIndex >= [0, 1, 2, 3].length) {
          loopIndex = 0;
        }
      }
    }

    if (!moved) {
      loopIndex = 0;
    }

    renderFrame(
      [0, 1, 2, 3][loopIndex], currentDir, posX, posY
    );
  }

  function moveSprite(deltaX, deltaY, direction) {
    if (
      posX + deltaX > 0 &&
      posX + 64 + deltaX < cnv.width
    ) {
      posX += deltaX;
    }
    if (
      posY + deltaY > 0 &&
      posY + 64 + deltaY < cnv.height
    ) {
      posY += deltaY;
    }
    currentDir = direction;
  }

  function randomPosition() {
    posX = Math.floor(Math.random() * (cnv.width - 64));
    posY = Math.floor(Math.random() * (cnv.height - 64));
  }

  return { init };
})();