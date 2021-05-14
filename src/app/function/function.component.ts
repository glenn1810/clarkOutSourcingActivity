import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, ViewEncapsulation, Output, EventEmitter, Input } from "@angular/core";
import { Subscription } from 'rxjs';

@Component({
  selector: "function-algo",
  templateUrl: "./function.component.html",
  styleUrls: ["./function.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FunctionComponent implements OnInit, OnDestroy {

  @Input() name: string;

  title: string = null;

  bubbleSortResult: number[] = [3, 0, 2, 5, -1, 4, 1, 1000, 250, -6, -1000];
  fibonacciResult: number[] = [];
  itemCounter: number = 0;
  inputVerifierResult: string = null;
  extraSpacesResult: string = null;

  ngOnInit(): void {
    this.title = "function algo";
  }



  public createBubbleSort(): void {
    let collections = this.bubbleSortResult;
    let tempVariable: number = 0;

    for (let c: number = 0; c <= collections.length - 2; c++) {
      for (let sc: number = 0; sc <= collections.length - 2; sc++) {

        if (collections[sc] > collections[sc + 1]) {
          tempVariable = collections[sc];
          collections[sc] = collections[sc + 1];
          collections[sc + 1] = tempVariable;
        }

      }
    }

    this.bubbleSortResult = collections;
  }

  public createFibonacci(nth : number): void {

    let a: number = 0;
    let b: number = 1;
    let c: number = 0;

    this.fibonacciResult.push(a);
    this.fibonacciResult.push(b);

    for (let ctr: number = 2; ctr < nth; ctr++) {
      c = a + b;
      this.fibonacciResult.push(c);
      a = b;
      b = c;
    }
  }

  public createItemCounter(word: string): void {
    let array = ["cow", ["fish", "pig", "cow", ["cow", "cat", "cow"]]];
    this.itemCounter = this.runItemCounter(array, word, 0);
  }

  public createRemoveExtraSpaces(str: string): void {
    let spaceFlag: boolean = false;
    let result: string = '';

    for (var i = 0; i < str.length; i++) {
      let ch = str.charAt(i);
  
      if (ch != " ") {
        if (spaceFlag) {
          if (ch == "." || ch == "?" || ch == ",") {

          }
          else {
            result += ' ';
          }
        }

        spaceFlag = false;
        result += ch;
      }
     if (ch == " ") {
        spaceFlag = true;
      }
    }

    this.extraSpacesResult = result;
  }

  public createInputVerifier(input: number): void {
    const min: number = 3;
    const max: number = 10;

    const verify = this.runInputVerifier(min, max);
    this.inputVerifierResult = verify(input);
  }

  private runInputVerifier(min: number, max: number): any {
    function verify(inputVal): string {
      if (inputVal < min) {
        return 'Input is less than minimum value';
      }
      if ((inputVal >= min) && (inputVal <= max)) {
        return 'Input is in range';
      }
      if (inputVal > min) {
        return 'Input is more than maximum value';
      }

      return 'error value did not flow';
    }
    return verify;
  }

  private runItemCounter(array: any, word: string, ctr: number = 0): number {
   for (var i : number = 0; i < array.length; i++)
    {
        var item = array[i];

        if (Array.isArray(item))
        {
          return this.runItemCounter(item, word, ctr);
        }
        else
        {
            if (item === word)
                ctr++;
        }
    }

    return ctr;
  }

  ngOnDestroy(): void {
    //let stringType: string = "asds";
    //stringType.toUpperCase();

    //let anyType: any = "asds";
    //anyType.toUpperCase();

    //let objectType: object = "asds";
    //objectType.();
  }
}
