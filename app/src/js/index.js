// Reference : https://docs.botui.org/concepts.html

var botui = new BotUI('flixbot');
var username = '';

function greeting() {
    botui.message
        .bot({
            delay: 1000,
            loading: true,
            content: 'Hi! I am Flix Bot.'
        }).then(function() {
            botui.message.bot({
                delay: 1000,
                loading: true,
                content: 'What is your name?'
            }).then(function() {
                setTimeout(function() {
                    getName();
                }, 1000);
            });f
        })
}

function getName() {
    botui.action.text({
        action: {
            placeholder: "Your name"
        }
    }).then(function(res) {
        username = res.value;
        botui.message.add({
            delay: 1000,
            loading: true,
            content: "Hello " + username + ", how can I help you?"
        })
    }).then(function() {
        setTimeout(function() {
            getQuery();
        }, 2000);

    })
}

function getQuery() {
    botui.action.text({
        action: {
            placeholder: 'I want to know about ...'
        }
    }).then(function(res) {
        return botui.message.add({
            delay: 1000,
            loading: true,
            content: "I'm sorry " + username + ", I don't have the data to answer your query."
        })
    }).then(function() {
        return botui.message.add({
            delay: 1000,
            loading: true,
            content: "Can I help you with something else?"
        });
    }).then(function() {
        setTimeout(function() {
            getQuery();
        }, 1000);
    });

}

greeting();