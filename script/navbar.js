function addScrollMenuListener() {
    function down(scroll) {
        return scroll > 56 && scroll > lastScroll + 5
    }

    function up(scroll) {
        return scroll < lastScroll
    }

    function hideMenu() {
        menu.className = menu.className.replace(/is-visible/,'is-hidden')
    }

    function displayMenu() {
        menu.className = menu.className.replace(/is-hidden/,'is-visible')
    }

    var lastScroll = 0
    var menu = document.getElementById('menu')

    window.addEventListener("scroll", function(){ 
        var scroll = window.pageYOffset || document.documentElement.scrollTop

        if (down(scroll)){
            hideMenu()
        } else if (up(scroll)) {
            displayMenu()
        } // else scrolling is stopping, shouldn't to do anything

        lastScroll = scroll
    }, false)
}

addScrollMenuListener()
