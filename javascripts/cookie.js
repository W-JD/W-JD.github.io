function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin !== 0) {return null;}
    }
    else
    {
        begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) {
        end = dc.length;
        }
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
}

function Display() {
  if (document.getElementById('login').style.display === 'none') 
  {
    document.getElementById('login').style.display = 'block';
  } else {
    document.getElementById('login').style.display = 'none';
  }
}
    
    
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function putCookie()
  {
    setCookie("login", "true");
    setCookie("Username", document.getElementById("Username").value);
    setCookie("Password", md5(document.getElementById("Password").value));
    return true;
}
  
if (getCookie('login')="true")
  {
    var user = getCookie('Username')
    document.getElementById("loginform").style.display='none';
    var loginstatus=getCookie('Username')+'，欢迎您。<br><br>';
    loginstatus += '<button onclick="Logout()">Logout</button>';
    document.getElementById("loginstatus").innerHTML=loginstatus;
}
    
function Logout(){
  setCookie("login", false);
  document.cookie="Username=;expires=Wed; 01 Jan 1970";
  document.cookie="Password=;expires=Wed; 01 Jan 1970";
}