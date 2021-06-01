
var input1 = document.getElementById("search-box");

input1.addEventListener("input",function(){

    if(input1.value!=""){
        $(".data-row").css("display","none");
        $(".data-row1").css("display","none");
        $.get("http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D",
        function(response){
            function createCard(data){
                var row = $("<div>").attr({
                    class : "data-row1"
                });
                row.css("display","block");
                var id1 = $("<td>").html(data.id).attr({
                    class : "coloumn1"
                });
                var fn = $("<td>").html(data.firstName.replace(input1.value,`<mark>${input1.value}</mark>`)).attr({
                    class : "column2"
                });
                var em = $("<td>").html(data.email.replace(input1.value,`<mark>${input1.value}</mark>`)).attr({
                    class : "column4"
                });
                var ln = $("<td>").html(data.lastName.replace(input1.value,`<mark>${input1.value}</mark>`)).attr({
                    class : "column3"
                });
                var ph = $("<td>").html(data.phone).attr({
                    class : "column5"
                });

                $(row).append(id1,fn,ln,em,ph);
                $(row).on("click",function(){
                    $(".active").removeClass("active");
                    row.addClass("active");
                    var block = $("#info-content").css("display","block");
                    block.empty();  
                    var name2= $("<div>").html(`<b>User selected:</b> ${data.firstName} ${data.lastName}`);
                    $(block).append(name2);
                    var desc2 =$("<div>").html(`<b>Description:</b>`);
                    var descBox = $("<textarea>").html(data.description).attr({
                        cols : "50",
                        rows : "5",
                        readonly : true
                    });
                    var home = $("<div>").html(`<b>Address:</b> ${data.address.streetAddress}`);
                    var city = $("<div>").html(`<b>City:</b> ${data.address.city}`);
                    var state = $("<div>").html(`<b>State:</b> ${data.address.state}`);
                    var pin =$("<div>").html(`<b>Pincode:</b> ${data.address.zip}`);
                    $(desc2).append(descBox);
                    $(block).append(name2,desc2,home,city,state,pin);
                })
                $("#table-body").append(row);
            }

            for(var i=0; i<response.length; i++){
                    var str1 = input1.value.toLowerCase(); 
                    var str2 = response[i].firstName.toLowerCase();
                    var str3 = response[i].lastName.toLowerCase();
                    var str4 = response[i].email.toLowerCase();
                    if( str2.search(str1) == true || str3.search(str1)== true || str4.search(str1)== true){
                       createCard(response[i]); 
                    }
                }
        })
    }
    else{
        $(".data-row").css("display","block");
        $(".data-row1").css("display","none");
        $("#info-content").css("display","none");
    }
});








