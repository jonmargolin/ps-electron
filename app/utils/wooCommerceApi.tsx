const WooCommerceAPI = require('woocommerce-api');
const WooCommerce = new WooCommerceAPI({
    url:"http://psdev.pskiss.com",
    consumerKey: "ck_3b7e4a7386f90018f5aa0427d40380fcd0f31d92",
    consumerSecret: "cs_0a05dc92c5ddd8c3b84a1a5bd73fd91ac2be358c",
    wpAPI: true,
    version: 'wc/v1'
})

export  default class WooCommerceApi {
    public static async  checkOrder (value: string):Promise<number | number[]>  {
        return new Promise <number | number[]>( (resolve, reject) => {
        WooCommerce.getAsync(`orders/${value}?filter[meta]=true`).then((result: any) => {
    const res =  JSON.parse(result.body);
    if (res.data && res.data.status === 404){
        resolve (res.data.status)
    } else {
        const orderNumbers: number[] =[]
        res.line_items.forEach((item: any) => orderNumbers.push(item.product_id));
        resolve(orderNumbers);
    }
    }).error((err: any)=>{
    reject(err)
    })})
}
}
