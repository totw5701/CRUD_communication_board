import css from "./css"

module.exports = {
    HTML:function(BrowserTitle,authentication,body, body_sub = ''){
        return`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <style>
                ${css.resetcss}
                ${css.header}
                ${css.control}
                ${css.body}

            </style>

            <title>${BrowserTitle}</title>
        </head>
        <body>
            <div class="main__frame">
                <header class="header__frame">
                    <a href="/"><h1 class="header__title">게시판</h1></a>
                </header>

                <div class="control__frame">
                    <div class="authenticate__frame">
                        ${authentication}
                    </div>
                </div>

                <div class="body_frame">
                    ${body}
                </div>
                <div class="body_frame_sub ">
                    ${body_sub}
                </div>
            </div>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">
        </body>
        </html>
        `
    },
    LIST:function(posts, page_query){
        // pages
        const amounts_posts = posts.length;
        const amounts_pages = parseInt( amounts_posts / 15 ) + 1;

        if(!page_query){
            page_query = amounts_pages;
        }
        
        let list = "<ul>";
        const pg = amounts_posts - 15 * (amounts_pages - page_query);
        let j = 0;
        if(page_query == 1){
            j = pg
        } else {
            j = 15
        }  
        let i = 0;
        while(i < j){
        let created = posts[pg-i-1].created;
        let date = created.getDate()
        let month = created.getMonth()

        list += `<li><a href='/posts/${posts[pg-i-1].id}' class="post__ul"> 
                    <span class="post__list__num">${pg-i-1 + 1}</span>
                    <span class="post__list__title">${posts[pg-i-1].title}</span>
                    <span class="post__list__date">${month}-${date}</span>
                    <span class="post__list__author">${posts[pg-i-1].nickName}</span>
                </a></li>`;
        i = i + 1;
        }
        list += "</ul>";
        return list;
        
    },
    PAGES_SELECTOR:function(posts, page_query){
        const amounts_posts = posts.length;
        const amounts_pages = parseInt( amounts_posts / 15 ) + 1;
        const remainder = amounts_posts % 15 ;
        
        if(!page_query){
            page_query = amounts_pages;
        }

        // 다음 페이지
        const pg_folder = parseInt(amounts_pages/10) + 1;
        const pg_remaind = amounts_pages % 10 ;
        let pg_now = pg_folder;
       
        // page folder 
        let j = 0;
        while(j < pg_folder){
            if(amounts_pages - 10 *(j+1) < page_query && page_query <= amounts_pages - 10*j){
                pg_now = pg_folder - j;
            } 
            j += 1;
        }

        
        let k = 0;
        if(pg_now == 1){
            k = pg_remaind;
        } else {
            k = 10;
        }
        const z = pg_folder - pg_now;
        let i = 0;
        let pages_list = `<a style="margin-right:12px;" href="/?page_num=${amounts_pages -10*z - i +1}"><</a>`;
        while(i < k){
            pages_list += `<a class="post__page-num__element" href="/?page_num=${amounts_pages -10*z - i}">${amounts_pages -10*z - i}</a>`
            i += 1;
        }

        pages_list += `<a style="margin-left: 10px"; href="/?page_num=${amounts_pages -10*z - k}">></a>`;


        return pages_list;


        /*
        let pages_list = "";
        let i = 9;
        while(i >= 0){
            if(page_query -4 + i > amounts_pages){
                i -= 1;
                continue;
            } else if (page_query -4 + i == 0) {
                break;
            }
            pages_list += `<a class="post__page-num__element" href="/?page_num=${page_query -4 + i}">${page_query-4 + i}</a>`
            i -= 1;
        }
        return pages_list;
        */
        
/*
        let pages_list = "";
        let i = 0;
        while(i < amounts_pages){
            let rv = amounts_pages - i
            pages_list += `<a class="post__page-num__element" href="/?page_num=${rv}">${rv}</a>`
            i += 1
        }
        return pages_list;
*/
    }
}


