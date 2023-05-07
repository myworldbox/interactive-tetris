const Registration = (() => {
  const register = (username, name, password, onSuccess, onError) => {
    const json = JSON.stringify({ username, name, password });
    fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: json,
    })
      .then((res) => res.json())
      .then(({ status, error }) => {
        if (status === "error") {
          onError && onError(error);
        } else {
          onSuccess && onSuccess();
        }
      })
      .catch((err) => {
        console.log("Error on Registration!");
      });
  };
  return { register };
})();