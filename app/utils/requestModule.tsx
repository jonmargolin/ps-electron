const request = require('request');
export  default  class RequestModule {
    public static  getFilesPath(orderNumber: number):Promise<string >{
        return new Promise <string >( (resolve, reject) => {
            const download = (url: string, cb: any) => {
                let body = ''
                const options = {
                    url: url,
                    auth: {
                        username: 'test',
                        password: 'test1234'
                    }
                };
                const sendReq = request.get(options);
                // verify response code
                sendReq.on('response', (response: any) => {
                    if (response.statusCode !== 200) {
                        return cb('Response status was ' + response.statusCode);
                    }
                });
                sendReq.on('data', (chunk: any) => {
                    body += chunk;
                })
                sendReq.on('end', () => {
                  console.log(body);
                   return cb(body);
                })
                // check for request errors
                sendReq.on('error', (err: any) => {
                  reject(err.message)
                    //  return cb(err.message);
                });
            };
            download(`http://psdev.pskiss.com/wp-content/installer/winPath/${orderNumber}.json`, ((res: string ) => {
               resolve(res);
            }))
        })
    }
}
