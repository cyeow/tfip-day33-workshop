import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  
  title = 'day33-workshop';

  canShare: boolean = false;
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.createForm();
  }
  
  ngAfterViewInit(): void {
    this.canShare = !!navigator.share();
  }

  createForm(): FormGroup {
    return new FormGroup({
      name: new FormControl<string>('', [ Validators.required ]),
      thought: new FormControl<string>('', [ Validators.required, Validators.minLength(10) ])
    })
  }

  share(): void {
    let content: string = this.form.value['name'] + ' says ' + this.form.value['thought'];
    const data = {
      title: content,
      text: content,
      url: 'https://day33-workshop-pearl.vercel.app/'
    }
    navigator.share(data);
    this.reset();
  }

  reset(): void {
    this.form.patchValue({
      name: '',
      thought: ''
    })
  }

  invalid(): boolean {
    return !(this.canShare && this.form.valid);
  }
}
