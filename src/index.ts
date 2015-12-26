import * as util from "./util"

$(document).ready(function() {
    $.getJSON(util.chanPagetoAPI("http://boards.4chan.org/cm/thread/2995241"), data => {
        console.log(data)
    })
})
