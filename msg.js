var loopHandle = null;

// The messageSystem object is where you should do all of your work
// Use any combination of javascript, HTML and CSS that you feeling
// is appropriate
messageSystem = {
    FADEOUT_DELAY : 3000,
    counter : 0,
    messages : new Array(),

    showMessage : function(text) {
        // add new message object
        var msg = {
            id : "msg-"+ messageSystem.counter,
            index : messageSystem.counter,
            text : text,
        }
        messageSystem.counter++;
        messageSystem.messages.push(msg);
        // create the ui
        messageSystem.addMessageToUI(msg);
        // schedule form fade out
        messageSystem.removeMessageFromUI(msg);
    },
    
    removeMessageFromUI : function(msg) {
        $("#"+msg.id)
            .delay(2000)
            .queue(function() {
                // TODO: decide if the msg should fade out
                $(this).dequeue();
            }).fadeOut("slow");
    },
   
    addMessageToUI: function(msg) {
        $template = $("#message-template").clone();
        $template.attr("id", msg.id);
        $template.find(".message-text").html(msg.text);
        $template.appendTo(".panel-body");
    }
}

function showMsg() {
    quotes = [
            "What we've got here is failure to communicate.",
            'Go ahead, make my day.',
            "I've got a bad feeling about this.",
            "I don't know half of you half as well as I should like; and I like less than half of you half as well as you deserve.",
            "I find your lack of faith disturbing.",
            "You're gonna need a bigger boat.",
            "Tell Mike it was only business.",
            "I have come here to chew bubble gum and kick ass, and I'm all out of bubble gum." ];
    messageSystem.showMessage(quotes[Math.floor(Math.random() * quotes.length)]);

}

function loop() {
    showMsg();
    var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    loopHandle = setTimeout(loop, rand);
}

$(function() {
    
    $('#msgButton').click(function() {
        var btn = $(this), btnTxt = btn.text();
        if (btnTxt === 'Start Messages') {
            btn.text('Stop Messages');
            loopHandle = setTimeout(loop, 500);
        } else {
            btn.text('Start Messages');
            clearTimeout(loopHandle);
            loopHandle = null;
        }
    });
    
    
});
