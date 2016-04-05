
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
        var cutMargin = (cropWidth - image.offsetWidth) / 2
        image.style.margin = cutMargin + ' 0 0 ' + cutMargin
    }

    function setContainerWidth(container, width) {
        container.style.width = width + 'px'
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
            setContainerWidth(container, postListWidth - MAX_WIDTH)
        } else {
            setContainerWidth(container, postListWidth - nextImgWidth)
        }
    }

    Array.prototype.forEach.call(imgContainers, function(container, i) {
        if (isBigImage(i)) {
            setContainerWidthToImgWidth(container, i)
        } else if (i % 2 == 0 && i < imgContainers.length - 1) {
            setContainerWidthBasedOnNextImage(container, ithImageWidth(i+1))
        } else {
            setContainerWidth(container, postListWidth - ithImageWidth(i-1))
        }
    })
}

function orderImages() {
    var postListWidth = document.getElementsByClassName('post-list')[0].offsetWidth
    var imgContainers = document.getElementsByClassName('post-img-container')

    resizeEveryOtherPair(imgContainers, postListWidth - MARGIN)
}

window.onload = orderImages
