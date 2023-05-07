$(document).ready(function () {
  Game.initialize();
  AnimatedCharacter.init();

  const showGamePage = () => {
    $(".login-page, #bgVideo").hide();
    $(".game-page").show();
    Socket.connect();
  };

  $("#sign-in-form").on("submit", (e) => {
    e.preventDefault();
    const username = $("#sign-in-user").val().trim();
    const password = $("#sign-in-pass").val().trim();
    Authentication.signin(username, password, showGamePage, (error) =>
      $("#sign-in-message").text(error)
    );
  });

  $("#sign-up-form").on("submit", (e) => {
    e.preventDefault();
    const username = $("#sign-up-user").val().trim();
    const name = $("#sign-up-name").val().trim();
    const password = $("#sign-up-pass").val().trim();
    Registration.register(
      username,
      name,
      password,
      () => {
        $("#sign-up-form")[0].reset();
        $("#register-message").text("Successfully Register. Please Sign In.");
      },
      (error) => $("#register-message").text(error)
    );
  });

  Authentication.validate(showGamePage, () => {});

  $("#start-button").on("click", () => {
    Socket.join();
    $("#start-button").prop("disabled", true);
  });

  $("#restart-btn").on("click", () => window.location.reload());
});
