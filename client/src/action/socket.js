const Socket = (function () {
  let socket = null;

  const connect = () => {
    socket = io();

    socket.on("waiting", () => {
      $("#waitingModal").show();
      window.setInterval( function() {
        let wait = document.getElementById("waitingModals");
        if ( wait.innerHTML.length > 28 ) 
            wait.innerHTML = "Waiting for other players";
        else 
            wait.innerHTML += ".";
        }, 800);
    });

    socket.on("game start", (users) => {
      $("#waitingModal").hide();
      users = JSON.parse(users);
      users.forEach((user) => {
        const { name, username } = user;
        const player = $("#username-left").text();
        if (player !== username) {
          $("#username-right").text(username);
          $("#name-right").text(name);
        }
      });
      Game.gameStart();
    });

    socket.on("board", (content) => {
      const { username, board, score, miniBoard } = JSON.parse(content);
      Game.updateOpponentBoard(username, board, score, miniBoard);
    });

    socket.on("game over", () => {
      Game.gameOver();
    });

    socket.on("affect other", (username) => {
      Game.rother(username);
    });

  };

  const disconnect = () => {
    socket.disconnect();
    socket = null;
  };

  const join = () => {
    if (socket && socket.connected) socket.emit("join");
  };

  const sendBoard = (board, score, miniBoard) => {
    if (socket && socket.connected)
      socket.emit(
        "send board",
        JSON.stringify({ board: board, score: score, miniBoard: miniBoard })
      );
  };

  const sendGameOver = () => {
    if (socket && socket.connected) socket.emit("send game over");
  };

  const sendaffectother = (username) => {
    socket.emit("send affect other", username);
  };

  return { connect, disconnect, sendBoard, sendGameOver, join, sendaffectother };
})();
