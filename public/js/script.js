const pathname = document.location.pathname

if ( pathname === '/redirect') {
    $('.navigation').css('display', 'none')
}

if ( pathname === '/dashboard' || pathname === '/page/comment/2') {
    $('.dash').css('display', 'none')
    $('.home').css('display', 'block')
    $('.title').css('right', '0px')
}