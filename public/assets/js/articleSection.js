// Functionality for Favoriting Articles
$(".fa-star").on("click", function() {
  if ($(this).attr("data-clicked") === "true") {
    $(this)
      .addClass("far")
      .removeClass("fas");
    $(this).attr("data-clicked", "false");
  } else {
    Swal.fire({
      position: "top-end",
      type: "success",
      title: "This article has been saved.",
      showConfirmButton: false,
      timer: 2500
    });

    $(this)
      .addClass("fas")
      .removeClass("far");
    $(this).attr("data-clicked", "true");
  }
});

// Handling User Request to Scrape New Articles
$("#scrapeArticles").on("click", function(event) {
  event.preventDefault();

  $.ajax({
    method: "POST",
    url: "/scrape"
  }).then(function(data) {
    location.reload();
  });
});

// Handling User Request to Clear All Articles
$("#clearArticles").on("click", function(event) {
  event.preventDefault();

  $.ajax({
    method: "POST",
    url: "/cleared"
  }).then(function() {
    location.reload();
  });
});
