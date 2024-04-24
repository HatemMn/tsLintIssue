document.addEventListener("confidential_ai_request_text", function (e) {
  let custom_event = new CustomEvent("my event", {
    detail: {
      text: "Hello World!",
    },
  });
  document.dispatchEvent(custom_event);
});
