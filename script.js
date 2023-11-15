let klikniete;
const ostatniepole = $(".pole").last().attr("id");
let odjemnik = Math.sqrt(ostatniepole)
$("#main1").css({"width":"100" * odjemnik, "height":"100" * odjemnik})

let iloscpkt = 0;
let tele1 = 37;
let tele2 = 63;
let ruchy = 1000;
let stare = 1;
let polapunktow = [13, 44, 51, 42, 99, 65, 11, 2, 5];

function idz()
{
    if($(".pole").children().is("#kropka"))
    {
        klikniete = event.target.id     
    }
    
    if(((Number(stare) - 1 == klikniete) && !$(event.target).next().is("span")) || ((Number(stare) + 1 == klikniete) && !$(event.target).prev().is("span")) || (Number(stare) - Number(odjemnik) == klikniete) || (Number(stare) + Number(odjemnik) == klikniete))
    {
        if(ruchy > 0)
        {
            ruchy--;
            document.getElementById("iloscruchow").innerHTML = ruchy;
            if($(".pole").children().is("#kropka"))
            {
                punkty();
                $("#kropka").remove()         
                $(event.target).append("<div id='kropka'></div>")
                $(".pole").removeClass("dostepne")
                $(".pole").removeClass("srodkowe")
                animacjaruchu();
                teleport();
                stare = klikniete;
                
                if(!$("#" + klikniete).next().is("span"))
                {
                    document.getElementById((Number(klikniete) + 1)).classList.add("dostepne")
                    dostepnyteleport();
                }                
                if(!$("#" + klikniete).prev().is("span"))
                {
                    document.getElementById((Number(klikniete) - 1)).classList.add("dostepne")
                    dostepnyteleport();
                }
                if(Number(klikniete) + odjemnik <= ostatniepole)
                {
                    document.getElementById(((Number(stare) + Number(odjemnik)))).classList.add("dostepne")
                    dostepnyteleport();
                }
                if(Number(klikniete) - odjemnik > 0)
                {
                    document.getElementById(((Number(stare) - Number(odjemnik)))).classList.add("dostepne")
                    dostepnyteleport();
                }
                document.getElementById(Number(klikniete)).classList.add("srodkowe")
            }
        }
    }
}

function dodajpunkty()
{
    for (let i = 0; i < polapunktow.length; i++)
    {
        $("#" + polapunktow[i]).append("<div class='punkt'></div>")
    }
}

function punkty()
{
    if($(event.target).children().is($(".punkt")))
    {
        $(event.target).empty()
        iloscpkt++;
        document.getElementById("iloscpkt").innerHTML = iloscpkt + "/" + polapunktow.length;
    }
    if(iloscpkt == polapunktow.length)
    {
        console.log("win")
    }
}

function pierwszepole()
{
    document.getElementById("iloscruchow").innerHTML = ruchy;
    document.getElementById("iloscpkt").innerHTML = iloscpkt + "/" + polapunktow.length;
    dodajpunkty();
    $("#" + (stare)).append("<div id='kropka'></div>")
    if(!$("#" + (stare)).next().is("span"))
    {
        document.getElementById((stare + 1)).classList.add("dostepne")
    }
    if(!$("#" + (stare)).prev().is("span"))
    {
        document.getElementById((stare - 1)).classList.add("dostepne")
    }
    if((Number(stare) + odjemnik <= ostatniepole))
    {
        document.getElementById(((Number(stare) + Number(odjemnik)))).classList.add("dostepne")
    }
    if((Number(stare) - odjemnik > 0))
    {
        document.getElementById(((Number(stare) - Number(odjemnik)))).classList.add("dostepne")
    }
    document.getElementById(stare).classList.add("srodkowe")
    $("#" + tele1).addClass("teleport1")
    $("#" + tele2).addClass("teleport2")
}

function animacjaruchu()
{
    if(Number(stare) - 1 == klikniete)
    {
        $("#kropka").css({"transform":"translateX(100px)"}).animate({right: '100px'}, 300)
    }

    if(Number(stare) + 1 == klikniete)
    {
        $("#kropka").css({"transform":"translateX(-100px)"}).animate({left: '100px'}, 300)
    }

    if(Number(stare) - Number(odjemnik) == klikniete)
    {
        $("#kropka").css({"transform":"translateY(100px)"}).animate({bottom: '100px'}, 300)
    }

    if(Number(stare) + Number(odjemnik) == klikniete)
    {
        $("#kropka").css({"transform":"translateY(-100px)"}).animate({top: '100px'}, 300)
    }
}

function teleport()
{
    if($("#kropka").parent().is(".teleport1"))
    {
        $("#kropka").remove()
        $(".teleport2").append("<div id='kropka'></div>")
        let przechowaj = $(".teleport2").attr('id')
        klikniete = przechowaj;
        stare = klikniete;  
        $("#" + tele1).removeClass("teleport1")
        $("#" + tele2).removeClass("teleport2")  
    }
    if($("#kropka").parent().is(".teleport2"))
    {
        $("#kropka").remove()
        $(".teleport1").append("<div id='kropka'></div>")
        let przechowaj = $(".teleport1").attr('id')
        klikniete = przechowaj;
        stare = klikniete;  
        $("#" + tele1).removeClass("teleport1")
        $("#" + tele2).removeClass("teleport2")  
    }
}

function dostepnyteleport()
{
    $(".pole").removeClass("dostepnyteleport")
    let strodjplus = Number(stare) + Number(odjemnik)
    let strodjminus = Number(stare) - Number(odjemnik)
    if($("#" + Number(stare)).next().hasClass("teleport1") || $("#" + Number(stare)).next().hasClass("teleport2"))
    {
        $(".teleport1").addClass("dostepnyteleport")
        $(".teleport2").addClass("dostepnyteleport")
    }
    if($("#" + Number(stare)).prev().hasClass("teleport1") || $("#" + Number(stare)).prev().hasClass("teleport2"))
    {
        $(".teleport1").addClass("dostepnyteleport")
        $(".teleport2").addClass("dostepnyteleport")
    }
    if($("#" + strodjplus).hasClass("teleport1") || $("#" + strodjplus).hasClass("teleport2"))
    {
        $(".teleport1").addClass("dostepnyteleport")
        $(".teleport2").addClass("dostepnyteleport")
    }
    if($("#" + strodjminus).hasClass("teleport1") || $("#" + strodjminus).hasClass("teleport2"))
    {
        $(".teleport1").addClass("dostepnyteleport")
        $(".teleport2").addClass("dostepnyteleport")
    }
}