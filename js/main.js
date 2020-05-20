$(function(){
	$("#wizard").steps({
        headerTag: "h4",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: true,
        titleTemplate :'<span class="number">#index#</span>',
        labels: {
            current: "",
            finish: "Submit",
            next: "Next",
            previous: "Previous"
        },
        onStepChanging: function (event, currentIndex, newIndex) {
            var characterName = $('#characterName').val();
            var citadelType = $("#citadelType option:selected").text();

            if ( newIndex >= 1 ) {
                $('.steps ul li:first-child a .step-arrow').remove();
            } else {
                if (characterName != "" && citadelType != "") {
                    $('.steps ul li:first-child a').append('<img src="images/step-arrow.png" alt="" class="step-arrow">');
                }
            }

            if ( newIndex === 1 ) {
                $('.steps ul li:nth-child(2) a').append('<img src="images/step-arrow.png" alt="" class="step-arrow">');;
            } else {
                if (characterName != "" && citadelType != "") {
                    $('.steps ul li:nth-child(2) a .step-arrow').remove();
                } else {
                    swal("", "Please fill at least your character name and the citadel type", "error");

                    return false;
                }
            }

            if ( newIndex === 2 ) {
                if (characterName != "" && citadelType != "") {
                    $('.steps ul li:nth-child(3) a').append('<img src="images/step-arrow.png" alt="" class="step-arrow">');
                } else {
                    return false;
                }
            } else {
                $('.steps ul li:nth-child(3) a .step-arrow').remove();
            }
            return true; 
        },
        onFinished: function (event, currentIndex)
        {
            var price = $('#price').text();
            var characterName = $('#characterName').val();
            var location = $('#location').val();
            var citadelType = $("#citadelType option:selected").text();
            var request = $('#request').val();

            var isFormValid = true;
            if (price == "") {
                isFormValid = false;
            }
            if (characterName == "") {
                isFormValid = false;
            }
            if (citadelType == "") {
                isFormValid = false;
            }

            if (isFormValid == false) {
                swal("", "Please fill at least your character name and the citadel type", "error");
            } else {
                $.ajax({
                    type: 'POST',
                    // The webhook URL.
                    url: 'https://discordapp.com/api/webhooks/712658305419313152/AmCi0duOSB9vg7sEIW_52x-J-arJEs2y2SillolnyZ2XAcgyU1EdGJSCEzeJZv4UWWL8',
                    // Message data.
                    data: JSON.stringify({
                        // The username to be displayed.
                        username: 'Structure Inquiry Bot',
                        // The avatar to be displayed.
                        avatar_url: 'https://images.evetech.net/types/3802/render',
                        // Contents of the message to be sent.
                        content: '',
                        // Embeds to be sent.
                        embeds: [{
                            // Embed title - link on 2nd row.
                            title: citadelType + ' offer @ ' + location,
                            // Embed description - text on 3rd row.
                            description: 'Price: ' + price + '\n'
                                + 'Contact person: ' + characterName + '\n'
                                + 'Additional comment: ' + request,
                        }]
                    }),
                    // Content type.
                    contentType: 'application/json',
                    // Success callback.
                    success: function (data) {
                        swal("Form submitted", "Thanks. We will get back to you soon!", "success");
                    },
                    // Error callback.
                    error: function (data) {
                        alert(data.responseText);
                    }
                });
            }
        }
    });
    // Create Steps Image
    $('.steps ul li:first-child a').append('<img src="images/step-1.png" alt="">').append('<img src="images/step-arrow.png" alt="" class="step-arrow">');
    $('.steps ul li:nth-child(2) a').append('<img src="images/step-2.png" alt="">');
    $('.steps ul li:last-child a').append('<img src="images/step-3.png" alt="">');
});

