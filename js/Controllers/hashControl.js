define(
    [],
    function(){
        var hashControl = function () {
            window.addEventListener('hashchange', hashchange);

            function hashchange(){
                var hash = location.hash;
                var hashExample = /#article\/\d/;
                if ((hash !== "#feed") && !(hashExample.test(hash))) {
                    window.location.hash = "#feed";
                }
            }
        };

        return hashControl;
    }
);