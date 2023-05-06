const Authentication = (() => {
  let user = null;

  const setUserInfo = (json) => {
    user = json.user;
    document.getElementById("name-left").innerHTML = user.name;
    document.getElementById("username-left").innerHTML = user.username;
  };

  const signin = (username, password, onSuccess, onError) => {
    const json = JSON.stringify({ username, password });

    fetch("/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "error") {
          if (onError) onError(json.error);
        } else {
          setUserInfo(json);
          if (onSuccess) onSuccess();
        }
      })
      .catch((err) => {
        console.log("Error on Sign In!");
      });
  };

  const validate = (onSuccess, onError) => {
    fetch("/validate")
      .then((res) => res.json())
      .then((json) => {
        if (json.status === "success" && json.user) {
          setUserInfo(json);
          if (onSuccess) onSuccess();
        } else if (json.status === "error" && onError) {
          onError(json.error);
        }
      })
      .catch((err) => {
        console.log("Error on Validation!");
      });
  };

  return { getUser: () => user, signin, validate };
})();
