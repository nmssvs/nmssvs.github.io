
var MARGIN = 10
var MAX_WIDTH = 550

function resizeEveryOtherPair(imgContainers, postListWidth) {
    function isBigImage(i) {
        var big = i % 2 == 0 ? i : i + 1;
        return big % 4 == 0
    }

    function imageUnder(li) {
        return li.firstElementChild.firstElementChild.firstElementChild
    }

    function ithImageWidth(i) {
        return imageUnder(imgContainers[i]).offsetWidth
    }

    function cropImage(image, cropWidth) {
        console.log(image.offsetWidth)
        var cutMargin = (cropWidth - image.offsetWidth) / 2
        image.style.margin = '0 ' + cutMargin + 'px 0 ' + cutMargin +'px'
        console.log(cutMargin, image.offsetWidth)
    }

    function setContainerWidth(container, width) {
        container.style.maxWidth = width + 'px'
    }

    function setContainerWidthToImgWidth(container, i) {
        var imgOffsetWidth = ithImageWidth(i)
        if (imgOffsetWidth > MAX_WIDTH) {
            cropImage(imageUnder(container), MAX_WIDTH)
            setContainerWidth(container, MAX_WIDTH)
        } else {
            setContainerWidth(container, imgOffsetWidth)
        }
    }

    function setContainerWidthBasedOnNextImage(container, nextImgWidth) {
        if (nextImgWidth > MAX_WIDTH) {
            cropImage(imageUnder(container), postListWidth - MAX_WIDTH)
            setContainerWidth(container, postListWidth - MAX_WIDTH)
        } else {
            cropImage(imageUnder(container), postListWidth - nextImgWidth)
            setContainerWidth(container, postListWidth - nextImgWidth)
        }
    }

    Array.prototype.forEach.call(imgContainers, function(container, i) {
        if (isBigImage(i)) {
            setContainerWidthToImgWidth(container, i)
        } else if (i % 2 == 0 && i < imgContainers.length - 1) {
            setContainerWidthBasedOnNextImage(container, ithImageWidth(i+1))
        } else {
            setContainerWidthBasedOnNextImage(container, ithImageWidth(i-1))
        }
    })
}

function removeNojavascriptClasses() {
    var liElements = document.querySelectorAll('.nojavascript')
    for (var i = 0; i < liElements.length; i++) {
        liElements[i].className = liElements[i].className.replace(/nojavascript/,'')
    }
}

function orderImages() {
    var postListWidth = document.getElementsByClassName('post-list')[0].offsetWidth

    if (postListWidth > 900) {
        removeNojavascriptClasses()

        var imgContainers = document.getElementsByClassName('post-img-container')
        resizeEveryOtherPair(imgContainers, postListWidth - MARGIN)
    }
}

window.onload = orderImages
