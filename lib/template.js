const css = require('./css');


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
        const remainder = amounts_posts % 15 ;


        if(amounts_pages == page_query || !page_query){
            let list = "<ul>";
            let pg = amounts_posts;
            let ri = 1;
            while(ri < remainder+1){
            
            console.log(posts[pg-ri]);

            let created = posts[pg-ri].created;
            let date = created.getDate()
            let month = created.getMonth()

            list += `<li><a href='/posts/${posts[pg-ri].id}' class="post__ul"> 
                        <span class="post__list__num">${pg-ri + 1}</span>
                        <span class="post__list__title">${posts[pg-ri].title}</span>
                        <span class="post__list__date">${month}-${date}</span>
                        <span class="post__list__author">${posts[pg-ri].nickName}</span>
                    </a></li>`;
            ri = ri + 1;
            }
            list += "</ul>";
            return list;

        } else if (page_query > amounts_pages){
            list = "Page cannot be found :("
            return list;
        } else {
            let list = "<ul>";
            let pg = (15 * page_query) - 1
            let ri = 0;
            while(ri < 15){
            
    
            let created = posts[pg-ri].created;
            let date = created.getDate()
            let month = created.getMonth()
    
            list += `<li><a href='/posts/${posts[pg-ri].id}' class="post__ul"> 
                        <span class="post__list__num">${pg-ri + 1}</span>
                        <span class="post__list__title">${posts[pg-ri].title}</span>
                        <span class="post__list__date">${month}-${date}</span>
                        <span class="post__list__author">${posts[pg-ri].nickName}</span>
                    </a></li>`;
            ri = ri + 1;
            }
            list += "</ul>";
            return list;
        }
    },
    PAGES_SELECTOR:function(posts, page_query){
        const amounts_posts = posts.length;
        const amounts_pages = parseInt( amounts_posts / 15 ) + 1;
        const remainder = amounts_posts % 15 ;

        let pages_list = "";
        let i = 0;
        while(i < amounts_pages){
            let rv = amounts_pages - i
            pages_list += `<a class="post__page-num__element" href="/?page_num=${rv}">${rv}</a>`
            i += 1
        }
        return pages_list;
    }
}


