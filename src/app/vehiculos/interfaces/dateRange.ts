import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class DateRange {
  public from: NgbDate;
  public to: NgbDate;

  constructor(from: NgbDate, to: NgbDate) {
    this.from = from;
    this.to = to;
  }

  isValid(): boolean {
    return this.from <= this.to;
  }
}
