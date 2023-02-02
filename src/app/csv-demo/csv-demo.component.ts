import {
  Component,
  ElementRef,
  Inject,
  LOCALE_ID,
  ViewChild,
} from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';

@Component({
  selector: 'dm2023-csv-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './csv-demo.component.html',
  styleUrls: ['./csv-demo.component.scss'],
})
export class CsvDemoComponent {
  @ViewChild('downloadRef2') downloadRef2?: ElementRef<HTMLLinkElement>;

  pre = '';

  demoData = [
    {
      demoSeq: '123',
      demoDate: '2023-02-02T00:00:00',
      demoCurrency: 'TWD',
      demoTotal: 19832391293,
    },
    {
      demoSeq: '000004324',
      demoDate: '2023-03-01T19:00:00',
      demoCurrency: 'TWD',
      demoTotal: 0.231123,
    },
    {
      demoSeq: 'Bfwer123213f',
      demoDate: '2023-05-09T00:00:00',
      demoCurrency: 'TWD',
      demoTotal: -291032903.12312,
    },
  ];

  constructor(@Inject(LOCALE_ID) private localeId: string) {}

  /**
   * 下載 csv
   */
  downloadCSV2() {
    const headerKey = ['demoSeq', 'demoDate', 'demoTotal'];
    const headerName = ['代號', '時間', '貨幣'];

    const csvFileData = this.demoData.map((x) => {
      const arr: (string | number)[] = [];
      headerKey.forEach((key) => {
        if (key === 'demoTotal') {
          arr.push(
            '"' +
              x.demoCurrency +
              ' ' +
              this._formateThousand((x as any)[key]) +
              '"'
          );
        } else if (key === 'demoDate') {
          arr.push((x as any)[key].split('T')[0]);
        } else {
          arr.push((x as any)[key]);
        }
      });

      return arr;
    });
    // console.log(csvFileData);

    //define the heading for each row of the data
    let csv = headerName.join(',') + '\n';

    //merge the data with CSV
    csvFileData.forEach((row) => {
      row = row.map((r, idx) => {
        if (idx !== 0 && (typeof r === 'number' || !isNaN(+r))) {
          let result = '';

          // 加千分位
          result = this._formateThousand(r);

          return '"' + String(result) + '"';
        } else {
          // 代號 有可能都是數字 要顯示成字串
          if (!isNaN(+r)) {
            return '="' + String(r) + '"';
          }
          return String(r);
        }
      });
      // console.log(row);
      csv += row.join(',');
      csv += '\n';
    });
    // console.log(csv);
    this.pre = csv;
    
    if (this.downloadRef2?.nativeElement) {
      this.downloadRef2.nativeElement.setAttribute(
        'href',
        'data:text/csv;charset=utf-8,\ufeff' + encodeURI(csv)
      );
      this.downloadRef2.nativeElement.setAttribute(
        'download',
        `匯出報表_${formatDate(Date.now(), 'yyyyMMdd', this.localeId)}.csv`
      );
    }
  }

  /**
   * 千分位加逗號
   * @param numberStr string | number
   * @returns string
   */
  private _formateThousand(numberStr: string | number): string {
    let result = '';
    let numStr = String(numberStr);

    const isMinus = numStr[0] === '-' ? true : false;
    if (isMinus) {
      const numStrArr = numStr.split('');
      numStrArr.shift();
      numStr = numStrArr.join('');
    }
    const arr = numStr.split('.');
    const int = arr[0];
    const intArr = int.split('');
    const len = intArr.length;
    let commasCount = Math.floor(len / 3);

    // 被整除的話要減一
    if (len % 3 === 0) {
      commasCount = commasCount - 1;
    }
    // 千分位加逗號
    for (let i = 1; i <= commasCount; i++) {
      intArr.splice(len - 3 * i, 0, ',');
    }

    if (arr.length <= 1) {
      // 沒有小數點以下
      result = intArr.join('');
    } else {
      const point = arr[1];
      // 小數點以下加回
      result = intArr.join('') + '.' + point;
    }

    // 負數要把-加回
    return isMinus ? '-' + result : result;
  }
}
