$(document).ready(function(){
    var sender_unit_amount;
    var receiver_unit_amount;
    var btn_swap = 0;

    $('#crowd').click(
        function(){
            $('#card-body2').show();
            $('#crowd').addClass("current");
            $('#card-body').hide();
            $('#express').removeClass("current");
        });

    $('#express').click(
      function(){
          $('#card-body').show();
          $('#express').addClass("current");
          $('#card-body2').hide();
          $('#crowd').removeClass("current");
      });
      
    $('#express_r_country').on('change', function() {
      var receiver;
      var sender = this.value;
      $('#express_receiver_cc').text(sender);
      $('#swap_r').text(sender);

      $("#express_sender_country option").each(function()
      {
          if ($(this).val() == sender){
            receiver = $(this);
            $(this).hide();
          } 
      });
      $(this).on('change',function(){
        $(receiver).show();
      });

    });
      
    // Country disable option
    $('#express_sender_country').on('change', function() {
      var sender = this.value;
      var receiver;
      $('#express_sender_cc').text(sender);
      $('#swap_s').text(sender);
      $('.flag').text(sender);

      $("#express_r_country option").each(function()
      {
          if ($(this).val() == sender){
            receiver = $(this);
            $(this).hide();
          } 
      });
      $(this).on('change',function(){
        $(receiver).show();
      });

    }); 

    $('#express_sender_amount').on('input',function(e){
      $.ajax({
        type: "POST",
        url: "/convert-currency/",
        data:{
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
              'amount':$(this).val(),
              'sender_currency':$('#express_sender_cc').text(),
              'receiver_currency':$('#express_receiver_cc').text(),
        },
        success: function(data) {
          if (data['success']){
            $('#express_receiver_amount').val(data['amount']);
            $('#r_unit_price').text(data['s_unit']);
            receiver_unit_amount = data['s_unit'];
            sender_unit_amount = data['r_unit'];
            $('#s_unit_price').text("1");
          } 
          else{
            alert(data['msg']);
          }          
        }
      });
    });

    $('#express_receiver_amount').on('input',function(e){
      $.ajax({
        type: "POST",
        url: "/convert-currency/",
        data:{
            'csrfmiddlewaretoken': $('input[name=csrfmiddlewaretoken]').val(),
              'amount':$(this).val(),
              'sender_currency':$('#express_receiver_cc').text(),
              'receiver_currency':$('#express_sender_cc').text(),
        },
        success: function(data) {
          if (data['success']){
            $('#express_sender_amount').val(data['amount']);
          } 
          else{
            alert(data['msg']);
          }          
        }
      });
    });
   
    $('#swap').on('click',function(e){
      if (btn_swap == 0){
        $('#s_unit_price').text(sender_unit_amount);
        $('#r_unit_price').text("1");
        $('#btn-class').addClass("color-green");
        $('#btn-message').text("Sure deal for next 24 hours!");
        btn_swap=1;
      }
      else{
        $('#r_unit_price').text(receiver_unit_amount);
        $('#s_unit_price').text("1");
        btn_swap=0;
      }
      
    });

      $('#estimated-time').text(": "+(Math.floor(Math.random() * 60) + 1)+" minutes");

      $('#express_from').on('change',function(e){
          var unit = $(this).val();
          if (unit == 2 || unit == 3){
            var amount_to_send = $('#express_sender_amount').val();
            $('#other-fee').text(" 0.5% ");
            var percentage = amount_to_send * 0.005;
            var total = parseFloat(percentage) + parseFloat(amount_to_send);
            $('#total').text(total);
          }
          else{
            var amount_to_send = $('#express_sender_amount').val();
            var total = amount_to_send;;
            $('#total').text(total);
          }
      });

      $('#crowd_sender_country').on('change',function()
      {
        var sender = $(this).val();
        var receiver;
        $("#crowd_sender_currency option").each(function()
          {
              var currency = $(this).val();   
              if (currency == sender){
                $(`#crowd_sender_currency option:contains("${currency}")`).prop('selected', true);
              } 
          });

          $("#crowd_receiver_country option").each(function()
          {
              if ($(this).val() == sender){
                receiver = $(this);
                $(this).hide();
              } 
          });

        $(this).on('change',function()
          {
            $(receiver).show();
          });

        });

      $('#crowd_receiver_country').on('change',function()
      {
        var sender = $(this).val();
        var receiver;
        $("#crowd_sender_currency option").each(function()
          {
              var currency = $(this).val();   
              if (currency == sender){
                $(`#crowd_receiver_currency option:contains("${sender}")`).prop('selected', true);
              } 
          });
        
        $("#crowd_sender_country option").each(function()
          {
              if ($(this).val() == sender){
                receiver = $(this);
                $(this).hide();
              } 
          });

        $(this).on('change',function()
          {
            $(receiver).show();
          });

      });

      $('#crowd_amount').on('input',function()
      {
        console.log("Amount change");
        var crowd_s_country = $('#crowd_sender_country').find(":selected").val();
        var crowd_r_country = $('#crowd_receiver_country').find(":selected").val();
        var crowd_amount = $('#crowd_amount').val();
        if (crowd_r_country != 0 && crowd_s_country !=0 && crowd_amount!=null){
          $('#crowd-search').addClass('color-green-button');
          }  
      });
      $('#crowd-search').on('click',function()
      {
        console.log("details");
        $('.currency-details').hide();
        $('.currency-details-label').attr('style', 'display: none !important');
        $('.currency-details-2').show();
        $('.currency-details-label-2').show()
      });

      $("#tile-1 .nav-tabs a").click(function() {
        var position = $(this).parent().position();
        var width = $(this).parent().width();
          $("#tile-1 .slider").css({"left":+ position.left,"width":width});
      });
      var actWidth = $("#tile-1 .nav-tabs").find(".active").parent("li").width();
      var actPosition = $("#tile-1 .nav-tabs .active").position();
      $("#tile-1 .slider").css({"left":+ actPosition.left,"width": actWidth});
      
      $('.step').on('click',function(){
        $(this).addClass('step-active').siblings().removeClass('step-active');
      });

      const items = document.querySelectorAll(".accordion-item h2");
      function toggleAccordion() {
        const itemToggle = this.getAttribute('aria-expanded');
        for (i = 0; i < items.length; i++) {
          items[i].setAttribute('aria-expanded', 'false');
        }
        if (itemToggle == 'false') {
          this.setAttribute('aria-expanded', 'true');
        }
      }
      items.forEach(item => item.addEventListener('click', toggleAccordion));

      $(window).scroll(function() { 

        if ($(window).scrollTop() >  $("#element").offset().top) {
          $('#element').addClass('fade-in');
        };
        
    });

    $("#sec-1").click(function() {
      $('html, body').animate({
              scrollTop:$("#feature").offset().top-66
          }, 1000);
      return false;
      });

    $("#sec-2").click(function() {
      $('html, body').animate({
              scrollTop:$("#cases").offset().top-66
          }, 1000);
      return false;
      });
  
      $("#sec-3").click(function() {
        $('html, body').animate({
                scrollTop:$("#plans").offset().top-66
            }, 1000);
        return false;
        });
        
    $("#sec-4").click(function() {
          $('html, body') .animate({
              scrollTop:        $("#faq").offset().top-112
          }, 1000);
      return false;
      });

      

});
