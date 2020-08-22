export default function lazyLoad(){
    let myPic = document.getElementsByClassName('page04-pic')[0];
    let dataSrc = myPic.getAttribute('data-src');
    let src = myPic.getAttribute('src');
    if(src !== dataSrc && dataSrc)
        myPic.setAttribute('src',dataSrc);
}