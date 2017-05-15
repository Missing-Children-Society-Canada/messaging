module.exports = function (context, message) {

    context.bindings.out = JSON.stringify({
        id: guid(),
        message: message
    });

    context.done();

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
}