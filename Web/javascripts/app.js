;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  $(document).ready(function() {
    $.fn.foundationAlerts           ? $doc.foundationAlerts() : null;
    $.fn.foundationButtons          ? $doc.foundationButtons() : null;
    $.fn.foundationAccordion        ? $doc.foundationAccordion() : null;
    $.fn.foundationNavigation       ? $doc.foundationNavigation() : null;
    $.fn.foundationTopBar           ? $doc.foundationTopBar() : null;
    $.fn.foundationCustomForms      ? $doc.foundationCustomForms() : null;
    $.fn.foundationMediaQueryViewer ? $doc.foundationMediaQueryViewer() : null;
    $.fn.foundationTabs             ? $doc.foundationTabs({callback : $.foundation.customForms.appendCustomMarkup}) : null;
    $.fn.foundationTooltips         ? $doc.foundationTooltips() : null;
    $.fn.foundationMagellan         ? $doc.foundationMagellan() : null;
    $.fn.foundationClearing         ? $doc.foundationClearing() : null;

    $.fn.placeholder                ? $('input, textarea').placeholder() : null;
  });

  // UNCOMMENT THE LINE YOU WANT BELOW IF YOU WANT IE8 SUPPORT AND ARE USING .block-grids
  // $('.block-grid.two-up>li:nth-child(2n+1)').css({clear: 'both'});
  // $('.block-grid.three-up>li:nth-child(3n+1)').css({clear: 'both'});
  // $('.block-grid.four-up>li:nth-child(4n+1)').css({clear: 'both'});
  // $('.block-grid.five-up>li:nth-child(5n+1)').css({clear: 'both'});

  // Hide address bar on mobile devices (except if #hash present, so we don't mess up deep linking).
  if (Modernizr.touch && !window.location.hash) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }

})(jQuery, this);

function closeModal() {
  // The popup is powered by the Reveal plugin
  $("#add-quote").trigger("reveal:close");
}

$(document).ready(function() {

  $("#newQuote").submit(function(e) {
    e.preventDefault();
    saveQuote();
  });

  getQuotes();

})

function getQuotes() {

  var Quote = Parse.Object.extend("Quote");
  var query = new Parse.Query(Quote);

  query.descending("createdAt");
  query.limit(25);

  query.find({
    success: function(results) {

      $("#quoteList").html(""); // empties out list on success to remove duplicates
      var template = Handlebars.compile($("#single-quote-template").html())
    
      $(results).each(function(i,e) {
        var q = e.toJSON();
        $("#quoteList").append(template(q))
      })
    },
    error: function(error) {
      console.log(error.message);
    }
  })
}

function saveQuote() {
  console.log("saveQuote runs!")
  var Quote = Parse.Object.extend("Quote");
  var quote = new Quote(); 

  var quoteText = $("#quoteText").val();
  var attribution = $("#attribution").val();

  quote.set("quoteText", quoteText)
  quote.set("by", attribution)

  quote.save(null, {
    success: function() {
      console.log("Saved!")
      getQuotes();
      closeModal();
    }, //
    error: function(quote, error) {
      console.log(error.message);
    }
  })
}