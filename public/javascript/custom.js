$(document).ready(function () {
    $('.button-collapse').sideNav();

    // define the modal
    $('#noteModal').modal({
    });

    // set up the onclick for the buttons for each note
    $('.noteButton').on('click', function (ret) {

        // if we have a duplicate listener, stop it from listening
        ret.stopImmediatePropagation();

        // select button to work with
        var currentButton = $(this).attr('id');

        // call the populateNote function for the button
        populateNote(currentButton);

        // open the modal
        $('#noteModal').modal('open');

        // set up response of clicking the notebutton
        $('#noteButton').on('click', function (ret) {
            ret.preventDefault();

            // define the text we'll be saving
            var noteText = $('#noteText');

                $.post("/note/" + currentButton, $('#noteForm').serialize())
                    .done(function (data) {
                        populateNote(currentButton);
                    })
                    .fail(function (error) {
                        console.log("could not make the note", error);
                    });

            // empty out the note
            noteText.val('');

            return false;
        });
    });

    // function to read in notes
    function populateNote(id) {

        // first empty the div
        $('.messages').empty();

        // read in the note
        $.get("/note/" + id, function (data) {

            // roll over the notes and populate them
            for (var i = 0; i < data.length; i++) {
                var note = $(
                    '<li class="note collection-item">'
                    + '<p>'
                    + (i+1) + ': ' + data[i].noteText + '</p>'
                    + '<button class="individualNoteButton waves-effect waves-light btn-flat red" data-currentButtonId="' + data[i]._id + '">Delete note #' + (i+1) + '</button>'
                    + '</li>'
                );

                // append the note to the div
                $('.messages').append(note);
            }

        })
        .then(function() {

            // make a listener for deleting the notes
            $(".individualNoteButton").on("click", function() {

                var currentButtonId = $(this).data(currentButtonId);

                // console.log("hit", currentButtonId.currentbuttonid);

                // now make a note delete route and send it the id
                // of the note we want to delete
                $.post("/deleteNote/" + currentButtonId.currentbuttonid, $('#noteForm').serialize())
                    .done(function (data) {

                        // after deleting the note, close the modal
                        $('#noteModal').modal('close');
                    })

                .fail(function () {
                    console.log("could not get notes");
                });

        
            });
        })

    }

})