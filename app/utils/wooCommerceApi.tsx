import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const WooCommerceAPI = require('woocommerce-api');
const WooCommerce = new WooCommerceAPI({
    url:"http://psdev.pskiss.com",
    consumerKey: "ck_3b7e4a7386f90018f5aa0427d40380fcd0f31d92",
    consumerSecret: "cs_0a05dc92c5ddd8c3b84a1a5bd73fd91ac2be358c",
    wpAPI: true,
    version: 'wc/v1'
})

export  default class WooCommerceApi {
    public static checkOrder (value: string): Observable<number[]>  {
        return from(WooCommerce.getAsync(`orders/${value}?filter[meta]=true`)).pipe(
            map((res: any) => JSON.parse(res.body)),
            map(res => {
                if (res.data && res.data.status === 404){
                    throw new Error(`Order not found. error: ${res.data.status}`);
                } else {
                    return res.line_items.map((item: any) => item.product_id as number);
                }
            })
        );
    }
}
