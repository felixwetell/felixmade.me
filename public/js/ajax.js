$(document).ready(function()
{
    $( "#alert" ).hide();

    $("form").on("submit", function(e)
    {
        $( "#alert" ).hide();
        $( "#alert p" ).text( "" );

        e.preventDefault();
        e.stopPropagation();

        let name  = $( "input[type=text]" ).val();
        let email = $( "input[type=email]" ).val();
        let text  = $( "textarea" ).val();
        let checkbox = $( "input[type=checkbox]" ).is( ":checked");
        let terms;

        if ( checkbox )
        {
            terms = true;
        }

        $.ajaxSetup({
          headers: {
            'X-CSRF-TOKEN': $( 'meta[name="csrf-token"]').attr( 'content' )
          }
        });
        let ajax = $.ajax(
        {
            type: 'POST',
            url: "/contactForm",
            data:
            {
                name  : name,
                email : email,
                text  : text,
                terms : terms,
            },
            dataType: 'json',
            success: function( data )
            {
                console.log( data );
                $( "#alert p" ).text( data.result );
                $( "form" )[0].reset();
                $( "#alert" ).fadeIn( 400 );
                $( "#alert" ).delay( 10000 ).fadeOut( 400 );
            },
            error: function( data )
            {
                console.log( data );
                $( "#alert p" ).text( data.responseJSON );
                $( "#alert" ).fadeIn( 400 );
            }
        });
    });
});
