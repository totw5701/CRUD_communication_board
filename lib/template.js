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
    LIST:function(posts){
        let list = "<ul>";
        let  i = 0;
        while(i < posts.length){
        let ri = posts.length - i -1;

        let created = posts[ri].created;
        let date = created.getDate()
        let month = created.getMonth()

        list += `<li><a href='/posts/${posts[ri].id}' class="post__ul"> 
                    <span class="post__list__num">${ri + 1}</span>
                    <span class="post__list__title">${posts[ri].title}</span>
                    <span class="post__list__date">${month}-${date}</span>
                    <span class="post__list__author">${posts[ri].nickName}</span>
                </a></li>`;
        i = i + 1;
        }
        list += "</ul>";
        return list;
    }
}


