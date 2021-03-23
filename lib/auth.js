

module.exports={
    isLogined:function(req, res){
        if(req.user){
            return true;
        } else {
            return false;
        }
    },
    statusUI:function(req, res){
        let authentication = '';
        if(this.isLogined(req, res) === true){
            const nickName = req.user[0].nickName;
            authentication += `<span>${nickName}님 어서오세요. </span>`;
            authentication += '<span><a href="/author/logout_process">로그아웃</a></span>';
          } else {
            authentication += `<span>어서오세요</span>`
            authentication += '<span><a href="/author/login">로그인</a> | <a href="/author/create">회원가입</a></span>';
          }
        return authentication;
    }
}



