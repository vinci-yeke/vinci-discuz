/**
 * Created by yk on 2016/12/27.
 */
sessionStorage.setItem('post_page', 2);
if($('.page a').length == 0){
    $('.load_commit').css('display', 'none');
}
$('.load_more').on('click', function () {
    var comment = $('.threadlist').text();
    sessionStorage.setItem('comment1', comment);
    //console.log($('.page a'));
    //console.log($('.page a').length);
    $('.load_gif').css('display','inline-block');
    $('.load_commit>i').css('display', 'none');
    if ($('.page a').length == 0){
        var timer1 = setTimeout(function () {
            $('.load_gif').css('display','none');
            $('.load_commit>i').css('display', 'block').html('没有更多回复');
            //$('.load_commit').css('height',"0px");
            clearTimeout(timer1);
            timer1=null;
        },1000);
        console.log('123');
    } else {
        var timer = setTimeout(function () {
            var p_next = $('.page a:last').getAttribute('href');
            console.log(p_next);
            var page = $(".page a").find('#dumppage >option:last').val();
            console.log(page);
            console.log(parseInt(sessionStorage.getItem('post_page')));
            var url_data = p_next.split('php?');
            //console.log(url_data[0] + 'php' + '-------', url_data[1]);
            //console.log(url_data[1].slice(-1)=='2');

            if (parseInt(sessionStorage.getItem('post_page')) <= parseInt(page)) {
                $('.load_commit>i').css('display', 'none');
                $.ajax({
                    type: 'GET',
                    url: url_data[0] + 'php',
                    data: url_data[1].slice(0, -1) + sessionStorage.getItem('post_page'),
                    success: function (data) {
                        console.log(data);
                        var data_step1 = data.split('<!-- main postlist start -->')[1].split('<!-- main postlist end -->')[0];
                        var i = data_step1.indexOf('<div class="plc cl"');
                        var j = data_step1.lastIndexOf('</div>');
                        //console.log(data_step1.length);
                        console.log(data_step1.slice(i, j));
                        //var data_li = data_step1.split('<ul>')[1].split('</ul>')[0];
                        //var data_url=data_step1.split('</label><a')[1].split('class="nxt"')[0].split('forum.php?');
                        //console.log(data_li);
                        var html = $('.postlist').html($('.postlist').html() + data_step1.slice(i, j));
                        //console.log(html.html());
                        $('.load_gif').css('display', 'none');
                        $('.load_commit>i').css('display', 'block');
                        clearTimeout(timer);
                        timer = null;
                    }
                });
            } else {
                $('.load_gif').css('display', 'none');
                $('.load_commit>i').css('display', 'block').html('没有更多回复');
                //$('.load_commit').css('height',"0px");
            }
            //翻页
            sessionStorage.setItem('post_page', Number(sessionStorage.getItem('post_page')) + 1);
        }, 1000);
    }
});
