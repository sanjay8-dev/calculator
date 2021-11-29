const http = require('http');
const url = require('url');

const cal = {
    add: (a,b) => a + b,
    subtract: (a,b) => a - b,
    multiple: (a,b) => a * b,
    div: (a,b) => a / b
}


const server = http.createServer((req,res)=>{
    res.writeHead(200, {contentType: 'text/html'})
    const baseURL =  req.protocol + '://' + req.headers.host + '/';
    const reqUrl = new URL(req.url,baseURL);
    
 
    if (reqUrl.pathname == '/cal') {
        const func = reqUrl.searchParams.get("func")
        const a = Number(reqUrl.searchParams.get("a"))
        const b = Number(reqUrl.searchParams.get("b"))
        if(func == null){
         let result = "Division is: " + (cal.div(a, b)).toString();   
         res.write(result);
        }
        else {
            if(func=="multiple"){
                result = "Multiplication is: " + cal[func](a, b);
            }
            else if(func=="add"){
                result = "Addition is: " + cal[func](a, b);
            }
            else{
                result = "Subtraction is: " + cal[func](a, b); 
            }
        res.write(result);
        }
      }
    res.end()
})

server.listen(8000, ()=>{
    console.log("it running")
})