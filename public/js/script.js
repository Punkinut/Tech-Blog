const pathname = document.location.pathname

for (let i = 0; i < 1000; i++) {
    if ( pathname === '/dashboard' || pathname === `/page/comment/${i}` || pathname === `/profile/${i}`) {
        $('.dash').css('display', 'none')
        $('.home').css('display', 'block')
        $('.title').css('right', '0px')
    }
    if( pathname === `/profile/${i}`) {
        $('.logout').css('display', 'block')
        $('.profile-click').css('display', 'none')
    } 
}

if ( pathname === '/redirect' || pathname === '/changeicon' || pathname === '/addicon') {
    $('.navigation').css('display', 'none')
}