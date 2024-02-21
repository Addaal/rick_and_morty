$(document).ready(function() {
    var charactersData; // Define charactersData variable outside the AJAX call to make it accessible outside the scope

    $("#button").click(function() {
        callApi();
        $("#buttonandtext").addClass("hidden")
        $(this).prop("disabled", true);
    });

    $(document).mousemove(function(event) {
        var xPos = event.pageX;
        var yPos = event.pageY;
       
    
        // Remove the existing pointer if it exists
        $(".pointer").remove();
        $('body').css('cursor', 'none');
    
        // Create a new pointer element
        var pointerDiv = $("<div>");
        pointerDiv.addClass("pointer h-[50px] w-[50px]");
        pointerDiv.css({
            position: "absolute",
            top: yPos + "px",
            left: xPos + "px",
            pointerEvents: "none"
        });

    
        // Create the pointer image
        var pointerImage = $("<img>");
        pointerImage.attr("src", "pointer2.png");
        pointerImage.addClass("cover")
    
        // Append the pointer image to the pointer element
        pointerDiv.append(pointerImage);
    
        // Append the pointer element to the document body
        $("body").append(pointerDiv);
       
    });
    



    function callApi() {
        $.ajax({
            url: "https://rickandmortyapi.com/api/character",
            method: "GET",
            success: function(data) {
                // Save the response data in the charactersData variable
                charactersData = data;
                printCharacter(data.results);
            },
            error: function(xhr, status, error) {
                console.error("Error fetching data:", error); 
            }
        });
    }

    function printCharacter(data) {
        
        for (var i = 0; i < data.length; i++) {
            
            var randomColor = getRandomColor();
            var newDiv = $("<div>");
            newDiv.addClass(`items-center cursor-none bg-${randomColor.color}-200 rounded  justify-center flex flex-col gap-2 p-5 lg:rounded-lg`);
            
            var name = $("<h2>");
            name.addClass("text-[1.5rem] font-medium")
            name.text(data[i].name);
            newDiv.append(name);
            
            imageDiv = $("<div>");
            imageDiv.attr("id", data[i].name);
            imageDiv.addClass("w-48 h-48 overflow-hidden trigger-hover");
 
            var image = $("<img>");
            image.attr("src", data[i].image);
            image.addClass("hover:scale-150 transition duration-500 pointer-none object-cover image-zoom-trigger");
            
            imageDiv.append(image);
            newDiv.append(imageDiv);

            $("#displayCharacters").append(newDiv);
        }

        // $(".trigger-hover").on("mouseenter", function() {
        //     var id = $(this).attr("id");
        //     var datafiltered = filterByName(id, charactersData);
        //     console.log(datafiltered);
        
        //     // Obtain cursor position and create the pointer block
            
        // });
        
        // // Add a mouseleave event listener to each image
        // $(".trigger-hover").on("mouseleave", function() {
        //     // Remove the pointer block on mouseleave
        //     $(".pointer").remove();
        // });
        
      
        


    }

    function filterByName(name , data) {
        if (data && data.results) {
            var filteredCharacters = data.results.filter(function(character) {
                return character.name.toLowerCase().includes(name.toLowerCase());
            });
            return filteredCharacters;
        } 
    }

    function getRandomColor() {
        // List of Tailwind CSS colors and their corresponding shades
        const colors = [
            { name: 'Gray', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
            { name: 'Red', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
            { name: 'Orange', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
            { name: 'Yellow', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
            { name: 'Green', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
            { name: 'Blue', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
            { name: 'Indigo', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
            { name: 'Purple', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] },
            { name: 'Pink', shades: ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] }
        ];
    
        // Get a random color and shade
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomShade = randomColor.shades[Math.floor(Math.random() * randomColor.shades.length)];
    
        // Construct the Tailwind CSS class name
        const className = `${randomColor.name.toLowerCase()}-${randomShade}`;
    
        // Return an object containing the color name, shade, and Tailwind CSS class name
        return {
            color: randomColor.name.toLowerCase(),
            shade: randomShade,
            className: className
        };
    }

    function getCursorPosition(callback) {
        $(document).mousemove(function(event) {
            var xPos = event.pageX;
            var yPos = event.pageY;
            // Invoke the callback with the cursor position
            callback([xPos, yPos]);
        });
    }
    
})