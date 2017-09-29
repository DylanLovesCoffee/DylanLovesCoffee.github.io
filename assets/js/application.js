$(document).ready(function(){
  $("#email-form").on("submit", function(e) {
    e.preventDefault();
    var $form = $(this)
    $.ajax({
      url: $form.attr('action'),
      method: $form.attr('method'),
      data: $form.serialize()
    }).done(function(data) {
      console.log(data)
    });
    $(".contact-form").empty();
    $(".contact-form").append("<div class='thanks container' style='display:none'><h4>Thanks for reaching out!</h4><p>I'll get back to you as soon as possible.</p></div>");
    $(".thanks").fadeIn(2000);
  });

  $("#forage-button").on("click", function() {
    window.open("https://github.com/DylanLovesCoffee/forage")
  });

  $("#omakase-button").on("click", function() {
    window.open("https://github.com/DylanLovesCoffee/omakase-frontend")
  });

  $("#railsforce").on("click", function() {
    window.open("https://github.com/DylanLovesCoffee/rails-crm")
  });

  $("#linkedin").on("click", function() {
    window.open("https://www.linkedin.com/in/dylanwyang/")
  });

  $("#github").on("click", function() {
    window.open("https://github.com/DylanLovesCoffee")
  });

  $("#connect-with-me").on("click", function() {
    window.location = "https://dylanlovescoffee.github.io/contact.html"
  });

  $("#resume-button").on("click", function() {
    location.href = "./assets/documents/dylan_yang_resume.pdf"
  });

});
