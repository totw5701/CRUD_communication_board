module.exports = {
    resetcss:`
    /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
    */

    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
    display: block;
    }
    body {
    line-height: 1;
    }
    ol,
    ul {
    list-style: none;
    }
    blockquote,
    q {
    quotes: none;
    }
    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
    content: "";
    content: none;
    }
    table {
    border-collapse: collapse;
    border-spacing: 0;
    }

    input:focus {
    outline: none;
    }

    a {
    color: inherit;
    text-decoration: none;
    }

    button{
      background: inherit ; border:none; box-shadow:none; border-radius:0; padding:0; overflow:visible; cursor:pointer}

    .main__frame {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      height: 100vh;
    }
    `,
    header:`
    .header__frame {
        margin-top: 20px;
        width: 600px;
        border-bottom: solid 3px teal;
        display: flex;
        justify-content: flex-start;
      }
      
      .header__title {
        margin-bottom: 5px;
        color: #3d3d3d;
        font-weight: 900;
        font-size: 40px;
      }
      
    `,
    control:`
    .control__frame {
        margin-top: 20px;
        width: 600px;
        border-bottom: solid 2px teal;
      }

      .authenticate__frame {
        padding-bottom:15px;
        display: flex;
        justify-content: space-between;
        font-weight: 600;
      }
    `,
    body:`
    .body_frame {
        margin-top: 20px;
        width: 600px;
        border-bottom: solid 2px teal;
      }
      
      .body_frame_sub{
        width: 600px;
      }

      .post__top-bar {
        border-bottom: solid 1px teal;
      }
      
      .post__list {
        border-bottom: solid 1px teal;
      }

      .post__top-bar {
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        padding-bottom: 15px;
        margin-bottom: 10px;
      }
      
      .post__ul {
        font-weight: 600;
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
      }
      
      .post__top-bar__num,
      .post__list__num {
        text-align: center;
        width: 60px;
        margin-left: 20px;
      }
      
      .post__top-bar__title {
        text-align: center;
        width: 350px;
      }
      .post__list__title {
        text-align: start;
        width: 350px;
        margin-left: 20px;
      }
      
      .post__top-bar__author,
      .post__list__author {
        text-align: center;
        margin-right: 20px;
        width: 60px;
      }
      
      .post__top-bar__date,
      .post__list__date {
        text-align: center;
        width: 60px;
      }
      
      .post__create {
        display: flex;
        flex-direction: column;
      }
      
      .post_title {
        margin: 15px 15px 0px 15px;
      }
      
      .post_description {
        margin: 15px 15px 0px 15px;
        height: 120px;
        resize: none;
      }
      
      .post_submit {
        margin: 15px 15px 30px 15px;
      }

      .post__bottom-bar{
        margin: 10px 15px 10px 15px;
        display:flex;
        justify-content: space-between;
      }
      
      .searchBox__frame{
        display:flex;
        justify-content:center;
        margin: 10px 0px 20px 0px;
      }

      .searchBox{
        display:flex;
        justify-content:center;
        align-items:center;
        width:350px;
        height:40px;
        text-align: center;
        background-color: teal;
      }
      
      .searchPost__input{
        width:300px;
        height:22px;
        border: solid 1px teal;
        margin-right: 5px;
      }

      .searchPost__button{
        background-color: teal;
        width:22px;
        height:22px;
        font-size:20px;
      }

      .post__detail {
        display: flex;
        flex-direction: column;
        padding: 0px 15px 15px 15px;
      }
      
      .post__detail__title {
        margin-bottom: 10px;
        font-size: 25px;
      }
      
      .post__detail__metaInfo {
        display: flex;
      }
      
      .post__detail__author {
        color: #919191;
        border-right: solid 2px rgb(158, 158, 158);
        font-weight: bolder;
        font-size: 15px;
        padding-right: 15px;
      }
      
      .post__detail__created {
        color: #919191;
        padding-left: 15px;
        font-weight: bolder;
        font-size: 15px;
      }
      
      .post__detail__description {
        overflow:initial;
        margin-top: 10px;
        border-top: solid 2px #979797;
        padding-top: 15px;
        line-height:25px;
      }

      .body_frame_sub{
        border:none;
      }

      .post__detail__control_box{
        display:flex;
      }

      .post__detail__control_box__delete{
        margin-right:10px;
      }

      .posts__delete__button{
        font-size:15px;
      }

      .control__fram__button{
        padding-top:2.35px;
      }
    `
}