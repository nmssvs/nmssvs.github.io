
function resizeEveryOtherPair(imgContainers, postListWidth) {
    function isBigImage(i) {
        var big = i % 2 == 0 ? i : i + 1;
        return big % 4 == 0
    }

    function imageUnder(li) {
        return li.firstElementChild.firstElementChild.firstElementChild
    }

    function imageWidth(i) {
        return imageUnder(imgContainers[i]).offsetWidth
    }

    function cropImage(image, cropWidth) {
        var cutMargin = (cropWidth - image.offsetWidth) / 2
        image.style.margin = cutMargin + ' 0 0 ' + cutMargin
    }

    Array.prototype.forEach.call(imgContainers, function(container, i) {
        console.log(i)
        if (isBigImage(i)) {
            var imgOffsetWidth = imageWidth(i)
            if (imgOffsetWidth > 550) {
                cropImage(imageUnder(container), 550)
                container.style.width = '550px'
            } else {
                container.style.width = imgOffsetWidth + 'px'
            }
        } else if (i % 2 == 0) {
            var nextImgWidth = imageWidth(i+1)
            if (nextImgWidth > 550) {
                container.style.width = (postListWidth - 550) + 'px'
            } else {
                container.style.width = (postListWidth - nextImgWidth) + 'px'
            }
        } else {
            container.style.width = (postListWidth - imageWidth(i-1)) + 'px'
        }
    })
}

var postListWidth = document.getElementsByClassName('post-list')[0].offsetWidth
var imgContainers = document.getElementsByClassName('post-img-container')
var margin = 10

resizeEveryOtherPair(imgContainers, postListWidth - margin)
