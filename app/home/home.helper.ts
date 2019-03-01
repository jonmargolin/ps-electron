import { concat } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { HttpClient } from '../utils/httpClient';
import { IInputChange } from '../components/ui/input/input.model';
import WooCommerceApi from '../utils/wooCommerceApi';

export class HomeHelper {
  private http = new HttpClient();

  inputChangeHandler(value: string, stateInput: IInputChange) {
    return {
      ...stateInput,
      value,
      touched: true,
      invalid: this.checkValidity(value, stateInput.shouldValidate)
    };
  }

  private checkValidity(value: string, rules: any): boolean {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    return isValid;
  }

  handleSubmitOrder(value: string) {
    return WooCommerceApi.checkOrder(value).pipe(
      concatMap(orderNumber => this.fetchOrders(orderNumber))
    );
  }

  private fetchOrders(orderNumbers: number[]) {
    return concat(
      ...orderNumbers.map(order =>
        this.http.get(
          `http://psdev.pskiss.com/wp-content/installer/winPath/${order}.json`
        )
      )
    );
  }
}
