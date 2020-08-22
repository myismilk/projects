export default function lazyLoad(dom:any) {
    let imgs = dom.getElementsByTagName('img');
    for (let i = 0, len = imgs.length; i < len; i++) {
        let myPic = imgs[i];
        let dataSrc = myPic.getAttribute('data-src');
        let src = myPic.getAttribute('src');
        if (src !== dataSrc && dataSrc)
            myPic.setAttribute('src', dataSrc);
    }

}