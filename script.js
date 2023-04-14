window.addEventListener('scroll',function(){
    const banner =  document.getElementById('banner');
    const line =  document.getElementById('line');
    const bannerHt = banner.offsetHeight;
    const pageHt = document.body.offsetHeight;
    const scrollPos = window.scrollY;
    const scrollPer = scrollPos / (pageHt - bannerHt);
    const lineW = scrollPer * banner.offsetWidth;
    const maxScroll = pageHt - window.innerHeight
    line.style.width = lineW + 'px';
    if (scrollPos>=maxScroll){
        line.style.width = banner.offsetWidth +'px';
    } else {
        line.style.width = lineW + 'px';
    }
});