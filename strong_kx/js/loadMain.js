/**
 * Created by yk on 2016/12/27.
 */
sessionStorage.setItem('main_page',2);
$('.load_more').load(function(){
    $('.load_gif').css('display', 'none');
})
//console.log('123');
if($('.page a').length == 0){
    $('.load_commit').css('display', 'none');
}
$('.load_more').on('click',function(){
    (function(){
        var comment = $('.threadlist').text();
        sessionStorage.setItem('comment1', comment);
        //console.log('可以触发翻页效果');

        if ($('.page a').length == 0){
            var timer1 = setTimeout(function () {
                $('.load_gif').css('display', 'none');
                $('.load_commit>i').css('display', 'block').html('没有更多回复');
                clearTimeout(timer1);
                timer1=null;
            },1000);}else {
            var timer = setTimeout(function () {
                var p_next = $('.page a')[2].getAttribute('href');
                // console.log(p_next);
                var page = $(".page a").find('#dumppage option:last').val();
                console.log(page);
                var url_data = p_next.split('php?');
                //console.log(url_data[0] + 'php' + '-------', url_data[1]);
                //console.log(url_data[1].slice(-1)=='2');

                var flag = 1;
                if (parseInt(sessionStorage.getItem('main_page')) <= parseInt(page)) {
                    $('.load_gif').css('display', 'inline-block');
                    $('.load_commit >i').css('display','none');
                    $.ajax({
                        type: 'GET',
                        url: url_data[0] + 'php',
                        data: url_data[1].slice(0, -1) + sessionStorage.getItem('main_page'),
                        success: function (data) {
                            var data_step1 = data.split('<!-- main threadlist start -->')[1].split('<!-- main threadlist end -->')[0];
                            var data_li = data_step1.split('<ul>')[1].split('</ul>')[0];
                            //var data_url=data_step1.split('</label><a')[1].split('class="nxt"')[0].split('forum.php?');
                            //console.log(data_li);
                            var html = $('.threadlist').html($('.threadlist').html() + data_li);
                            //console.log(html.html());
                            $('.load_gif').css('display', 'none');
                            $('.load_commit >i').css('display', 'block');
                            clearTimeout(timer);
                            timer = null;
                        }
                    });
                } else {
                    $('.load_gif').css('display', 'none');
                    $('.load_commit >i').css('display', 'block').html('没有更多回复');
                }
                //翻页
                sessionStorage.setItem('main_page', Number(sessionStorage.getItem('main_page')) + 1);
            }, 1000);
        }
    })();
});
