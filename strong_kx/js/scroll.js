$(function () {
    A();
    function A() {
        var opacity = 1;
        var scolltop = 0;
        var scollOld = 0;
        $(window).on('scroll', function () {
            scolltop = $(window).scrollTop();
            //scolltop > 100 ? $("div[class=scroll]").fadeIn() : $("div[class=scroll]").fadeOut();
            // console.log(scolltop);
            scollOld = scolltop;
            //opacity -= 0.2;
            //if (opacity == 0) {
            //    opacity = 0;
            //}
            //$('.replyBack a').css('opacity', opacity);
            //$('.btn_pn_reply').css('opacity', opacity);
            var dtop = $(window).scrollTop();
            var off_setY = $(window).height();
            var load_commit = $(document).height();
            //console.log('滚动的距离' + dtop);
            //console.log('匹配元素在当前视口的相对偏移' + off_setY);
            //console.log('加载的高度' + load_commit);
            //监听页面到达底部时触发事件
            if (dtop + off_setY == load_commit) {
                if($('.page a').length == 0){
                    $('.load_commit').css('display', 'none');
                }else{
                    $('.load_commit').css('display', 'block');
                    return;
                }
            }else{
                //$('.load_commit').css('display', 'none');
            }

        });
        //setInterval(function () {
        //    if (scollOld == scolltop) {
        //        $('.replyBack a').css('opacity', 1);
        //        $('.btn_pn_reply').css('opacity', 1);
        //    }
        //}, 100);
        $("#scroll").click(function () {

            $("html,body").animate({scrollTop: 0}, 200);
            //if(){
            //    $('.load_commit').show();
            //}
        })
    }
});