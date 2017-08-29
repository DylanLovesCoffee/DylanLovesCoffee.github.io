$(document).ready(function(){
  $("#email-form").on("submit", function(e){
    e.preventDefault();
    $(".contact-form").empty();
    $(".contact-form").append(
      "<div class='thanks container' style='display:none'>
        <h4>Thanks for reaching out!</h4>
        <p>I'll get back to you as soon as possible.</p>
      </div>"
    );
    $(".thanks").fadeIn(2000);
  });
});
