import store from '../redux/store';
/**
 * @page page number from previous state
 */
export function pageTurning(page: number) {
    let pageDOMArr: any[] = [];
    for (let i = 0; i < 5; i++) {
        pageDOMArr.push(document.getElementsByClassName('mainPage page0' + String(i + 1))[0]);
    }
    //修改当前页面的透明度（opacity）与显示优先级（z-index）
    let currentPage = store.getState().page;
    pageDOMArr[page - 1].style.opacity = "0";
    pageDOMArr[page - 1].style.zIndex = 0;
    pageDOMArr[currentPage - 1].style.opacity = "1";
    pageDOMArr[currentPage - 1].style.zIndex = 1;
    
    let pageChoose: any = document.getElementsByClassName('sideBar')[0].children;
    for(let i = 0; i < pageChoose.length; i++){
        pageChoose[i].style.backgroundColor = 'white';
    }
    pageChoose[currentPage - 1].style.backgroundColor = 'yellow';
}

export function pageDown() {
    let page: number = store.getState().page;
    if (page === 5) {
        store.dispatch({ type: 2 });
    } else {
        store.dispatch({ type: 1 });
    }
    pageTurning(page);
}

export function pageUp() {
    let page: number = store.getState().page;
    if (page === 1) {
        store.dispatch({ type: 6 });
    } else {
        store.dispatch({ type: -1 });
    }
    pageTurning(page);
}

export function toPage(toPage:number){
    let currentPage: number = store.getState().page; 
    if(toPage === currentPage){
        return ;
    }else{
        store.dispatch({
            type: toPage + 1
        })
    }
    pageTurning(currentPage);
}