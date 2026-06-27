(function () {
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/info@surajanalytics.com";

  function setStatus(statusNode, message, type) {
    if (!statusNode) return;
    statusNode.hidden = !message;
    statusNode.textContent = message;
    statusNode.classList.remove(
      "contact-form__status--success",
      "contact-form__status--error"
    );
    if (type) {
      statusNode.classList.add("contact-form__status--" + type);
    }
  }

  function bindContactForm(form) {
    if (!form || form.dataset.bound === "true") return;
    form.dataset.bound = "true";

    var statusNode = document.getElementById("contact-form-status");
    var submitButton = form.querySelector('[type="submit"]');
    var buttonLabel = submitButton && submitButton.querySelector(".btn__label");
    var defaultButtonLabel = (buttonLabel && buttonLabel.textContent) || "Send inquiry";

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      setStatus(statusNode, "", "");

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var payload = new FormData(form);
      payload.append("_subject", "New inquiry from Suraj Analytics website");
      payload.append("_template", "table");
      payload.append("_captcha", "false");

      if (submitButton) {
        submitButton.disabled = true;
      }
      if (buttonLabel) {
        buttonLabel.textContent = "Sending...";
      }

      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      })
        .then(function (response) {
          if (!response.ok) {
            throw new Error("Request failed");
          }
          return response.json();
        })
        .then(function () {
          form.reset();
          setStatus(
            statusNode,
            "Thanks — your inquiry was sent. We will get back to you soon.",
            "success"
          );
        })
        .catch(function () {
          setStatus(
            statusNode,
            "Something went wrong. Please email us directly at info@surajanalytics.com.",
            "error"
          );
        })
        .finally(function () {
          if (submitButton) {
            submitButton.disabled = false;
          }
          if (buttonLabel) {
            buttonLabel.textContent = defaultButtonLabel;
          }
        });
    });
  }

  document.querySelectorAll(".contact-form").forEach(bindContactForm);
})();
