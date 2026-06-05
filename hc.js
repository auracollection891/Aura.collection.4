function c(type) {
  if (type === "email") {
    window.location.href =
      "mailto:aura.collection.890@gmail.com?subject=Help Request&body=Hey this message is regarding help from website";
  }

  if (type === "wa") {
    window.open(
      "https://wa.me/919814056258?text=Hey%20this%20message%20is%20regarding%20help%20from%20website",
      "_blank"
    );
  }
}