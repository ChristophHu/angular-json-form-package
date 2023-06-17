import { Component } from '@angular/core';
import { GenericControl, JsonFormService, convertArray } from '@christophhu/json-form';
import { Observable, map, of, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title: string = 'Member'

  // formData$: Observable<any> = of()

  formContent: GenericControl[]
  formStatus: any
  formValue: any = { id: '1', name: 'Thomas', funktion: '2', active: true, dayOfBirth: '2021-01-01T00:00', description: '' }

  options$: Observable<any> = of([
    { id: '1', value: 'Option 1', more: 'more' },
    { id: '2', value: 'Option 2', more: 'more' },
    { id: '3', value: 'Option 3', more: 'more' },
    { id: '4', value: 'Option 4', more: 'more' },
    { id: '5', value: 'Option 5', more: 'more' }
  ])
  
  constructor(private _jsonFormService: JsonFormService) {
    this.formContent = []

    zip(this.options$)
    .pipe(
      map(([options]) => ({ options }))
    )
    .subscribe({
      next: (data) => {
        this.formContent.push(
          {
            type: 'input',
            class: '',
            defaultValue: 0,
            // disabled: true,
            hidden: false,
            key: 'id',
            label: 'id',
            placeholder: '000'
          },
          {
            type: 'input',
            defaultValue: '',
            key: 'name',
            label: 'Name',
            placeholder: 'Thomas',
            validators: [
              { required: true }
            ]
          },
          {
            type: 'checkbox',
            defaultValue: false,
            disabled: false,
            key: 'active',
            label: 'Aktiv',
            value: false
          },
          {
            type: 'select',
            key: 'funktion',
            label: 'Funktion',
            options: convertArray(data.options, 'value'),
            validators: [
              { required: true }
            ]
          },
          {
            type: 'datetime-local',
            defaultValue: '',
            hidden: false,
            key: 'dayOfBirth',
            label: 'Geburtstag',
            placeholder: ''
          },
          {
            type: 'textarea',
            defaultValue: '',
            key: 'description',
            label: 'Beschreibung',
            placeholder: 'Beschreibung zur Person'
          }
        )
      }
    })

    this._jsonFormService.setFormData(this.formValue)

    // this.formData$ = this._jsonFormService.getFormData()
  }

  valueChanges(formValue: any) {
    // console.log('valueChanges: ', formValue)
    this.formValue = formValue
  }

  statusChanges(formStatus: any) {
    // console.log('statusChanges: ', formStatus)
    this.formStatus = formStatus
  }
}
