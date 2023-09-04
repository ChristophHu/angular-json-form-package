import { Component } from '@angular/core';
import { GenericControl, JsonFormService, convertArray, convertDependingArray } from '@christophhu/json-form';
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
  formValue: any = { id: '1', name: 'Thomas', funktion: '2', funktion2: '3', active: true, dayOfBirth: '2021-01-01T00:00', description: '' }

  options$: Observable<any> = of([
    { id: '1', value: 'Kategorie1' },
    { id: '2', value: 'Kategorie2' },
    { id: '3', value: 'Kategorie3' },
    { id: '4', value: 'Kategorie4' },
    { id: '5', value: 'Kategorie5' }
  ])
  depOptions$: Observable<any> = of([
    { id: '1', value: 'Bestandteil1', dep: 'Kategorie1', dep2: '1' },
    { id: '2', value: 'Bestandteil2', dep: 'Kategorie1', dep2: '1' },
    { id: '3', value: 'Bestandteil3', dep: 'Kategorie2', dep2: '2' },
    { id: '4', value: 'Bestandteil4', dep: 'Kategorie3', dep2: '3' },
    { id: '5', value: 'Bestandteil5', dep: 'Kategorie3', dep2: '3' },
    { id: '6', value: 'Bestandteil6', dep: 'Kategorie4', dep2: '4' },
    { id: '7', value: 'Bestandteil7', dep: 'Kategorie5', dep2: '5' },
    { id: '8', value: 'Bestandteil8', dep: 'Kategorie5', dep2: '5' },
    { id: '9', value: 'Bestandteil9', dep: 'Kategorie5', dep2: '5' }
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
            type: 'password',
            // disabled: true,
            hidden: false,
            key: 'password',
            label: 'Passwort',
            placeholder: 'Passwort',
            show: false,
            validators: [
              { validStrongPassword: true }
            ]
          },
          {
            type: 'input',
            // disabled: true,
            hidden: false,
            key: 'mask',
            label: 'Mask',
            mask: '00-000-00',
            placeholder: '12-345-67'
          },
          {
            type: 'input',
            // disabled: true,
            hidden: false,
            key: 'zip',
            label: 'ZIP',
            placeholder: '12345',
            validators: [
              { zipCodeValidator: true }
            ]
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
            type: 'dependedselect',
            key: 'funktion2',
            label: 'Funktion2',
            dependOnKey: 'funktion',
            options$:  convertDependingArray(this.depOptions$, 'value', 'dep2'),
            // options:  convertArray(data.depOptions, 'value', 'dep'),
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
          },
          {
            type: 'fileupload',
            disabled: false,
            hidden: false,
            key: 'file',
            label: 'Datei',
            placeholder: 'Datei',
            multiple: true,
            upload: {
              url: 'https://v2.convertapi.com/upload',
              type: 'blob'
            }
          },
          {
            type: 'imageslider',
            disabled: false,
            hidden: false,
            key: 'images',
            label: 'Galerie'
          }
        )
      }
    })

    this._jsonFormService.setFormData(this.formValue)

    // this.formData$ = this._jsonFormService.getFormData()
    this._jsonFormService.files$.subscribe({
      next: (files) => {
        console.log('files: ', files)
      }
    })
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
