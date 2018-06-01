const $ = (id) => document.getElementById(id);

const search = [ // Search Engines
  ["", "https://searx.laquadrature.net/?q=", "LQDN SearX instance"],
  ["!x", "https://ixquick.com/do/search?q=", "IxQuick"],
  ["!d", "https://duckduckgo.com/html?q=", "DuckDuckGo"],
  ["!G", "https://encrypted.google.com/search?q=", "Google"],
  ["!i", "https://encrypted.google.com/search?tbm=isch&q=", "Google images"],
  ["!y", "https://www.youtube.com/results?search_query=", "Youtube"],
  ["!w", "https://en.wikipedia.org/w/index.php?search=", "Wikipedia"],
  ["!t", "https://torrentz2.eu/search?f=", "Torrentz2"],
  ["!g", "https://github.com/search?q=", "Github"],
];

const isUrl = (str) => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?'+ // port
  '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
  '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return pattern.test(str);
}

const formatUrl = (url) => {
  var httpString = 'http://', httpsString = 'https://';
  if (url.substr(0, httpString.length) !== httpString && url.substr(0, httpsString.length) !== httpsString)
    url = httpString + url;
  return url;
}

const updateClock = () => {
  const currentTime = new Date()
  const hours = currentTime.getHours()
  const minutes = currentTime.getMinutes()
  const seconds = currentTime.getSeconds()
  if (minutes < 1){
    minutes = "0" + minutes
  }
  if (seconds < 1){
    seconds = "0" + seconds
  }
  let t_str = hours + ":" + minutes + ":" + seconds + " ";

  $('time').innerHTML = t_str;
}

var defaultSearchEngine = "";

const init = () => {
  for(let i=0;i<search.length;i++) if(search[i][0]=="") defaultSearchEngine=search[i][1];
  if (defaultSearchEngine=="") alert("Error: Missing default search engine!");
  showSearchList();
  updateClock();
  window.setInterval(() => {
    updateClock();
  }, 1000);
}

const clearSearchBar = () => {
  $('q').value = "";
  $('q').focus();
}

const handleQuery = (e, q) => {
  const key = e.keyCode || e.which;
  if (key == 13)
  {
    if (q.indexOf("!") == 0)
    {
      for (let i = 0; i < search.length; ++i)
      {
        if (search[i][0] == q.substr(0, 2))
        {
          browse(search[i][1] + encodeURIComponent(q.substr(2)));
          clearSearchBar();
          return;
        }
      }
      browse(defaultSearchEngine + encodeURIComponent(q.substr(2)));
    }
    else
    {
      browse(q)
    }
    clearSearchBar();
  }
}

const browse = (q) => {
  const format = formatUrl(q)
  if (isUrl(q) || isUrl(format))
  {
    window.open(format, '_self');
  }
  else
  {
    window.open(defaultSearchEngine + encodeURIComponent(q), '_self');
  }
}

const showSearchList = () => {
  const ele = $("searchlist");
  for (let i = search.length - 1; i >= 0; --i) {
    const shortcut = search[i][0].toString()
    const caption = search[i][2].toString()
    ele.innerHTML += '<span title="' + caption + '">' + shortcut + '</span>';
    ele.innerHTML += '<br>';
  }
}
