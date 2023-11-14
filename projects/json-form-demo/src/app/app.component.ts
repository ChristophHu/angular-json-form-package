import { Component } from '@angular/core';
import { GenericControl, JsonFormService, convertArray, convertDependingArray } from '@christophhu/json-form';
import { Observable, map, of, zip, forkJoin } from 'rxjs';

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
  // sign: string = ''
  sign: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArwAAADICAYAAAAKljK9AAAAAXNSR0IArs4c6QAAE2JJREFUeF7t3b+rdEcZB/AnEMHCwkCKFEq0s/QPCERLsUgEg4KIESzSCKaz01QKCsZOsYhWKqSw1EqDFgpCFAsbRYMWFilSBBQSUJ64g+N5d+/du/fMPmdnPwvy5r337Pz4zMj73dk5cx4KLwIECBAgQIAAAQITCzw0cd90jQABAgQIECBAgEAIvCYBAQIECBAgQIDA1AIC79TDq3MECBAgQIAAAQICrzlAgAABAgQIECAwtYDAO/Xw6hwBAgQIECBAgIDAaw4QIECAAAECBAhMLSDwTj28OkeAAAECBAgQICDwmgMECBAgQIAAAQJTCwi8Uw+vzhEgQIAAAQIECAi85gABAgQIECBAgMDUAgLv1MOrcwQIECBAgAABAgKvOUCAAAECBAgQIDC1gMA79fDqHAECBAgQIECAgMBrDhAgQIAAAQIECEwtIPBOPbw6R4AAAQIECBAgIPCaAwQIECBAgAABAlMLCLxTD6/OESBAgAABAgQICLzmAAECBAgQIECAwNQCAu/Uw6tzBAgQIECAAAECAq85QIAAAQIECBAgMLWAwDv18OocAQIECBAgQICAwGsOECBAgAABAgQITC0g8E49vDpHgAABAgQIECAg8JoDBAgQIECAAAECUwsIvFMPr84RIECAAAECBAgIvOYAAQIECBAgQIDA1AIC79TDq3MECBAgQIAAAQICrzlAgAABAgQIECAwtYDAO/Xw6hwBAgQIECBAgIDAaw4QIECAAAECBAhMLSDwTj28OkeAAAECBAgQICDwmgMECBAgQIAAAQJTCwi8Uw+vzhEgQIAAAQIECAi85gABAgQIECBAgMDUAgLv1MOrcwQIECBAgAABAgKvOUCAAAECBAgQIDC1gMA79fDqHAECBAgQIECAgMBrDhAgQIAAAQIECEwtIPBOPbw6R4AAAQIECBAgIPCaAwQIECBAgAABAlMLCLxTD6/OESBAgAABAgQICLzmAAECBAgQIECAwNQCAu/Uw6tzBAgQIECAAAECAq85QIAAAQIECBAgMLWAwDv18OocAQIECBAgQICAwGsOECBAgAABAgQITC0g8E49vDpHgAABAgQIECAg8JoDBAgQIECAAAECUwsIvFMPr84RIECAAAECBAgI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'
  formValue: any = { id: '1', name: 'Thomas', funktion: '2', funktion2: '3', active: true, dayOfBirth: '2021-01-01T00:00', description: '', signature: this.sign }

  options$: Observable<any> = of([
    { id: '1', value: 'Kategorie1' },
    { id: '2', value: 'Kategorie2' },
    { id: '3', value: 'Kategorie3' },
    { id: '4', value: 'Kategorie4' },
    { id: '5', value: 'Kategorie5' }
  ])
  depOptions$: Observable<any> = of([
    { id: '1', value: 'Bestandteil1', dep: 'Kategorie1' },
    { id: '2', value: 'Bestandteil2', dep: 'Kategorie1' },
    { id: '3', value: 'Bestandteil3', dep: 'Kategorie2' },
    { id: '4', value: 'Bestandteil4', dep: 'Kategorie3' },
    { id: '5', value: 'Bestandteil5', dep: 'Kategorie3' },
    { id: '6', value: 'Bestandteil6', dep: 'Kategorie4' },
    { id: '7', value: 'Bestandteil7', dep: 'Kategorie5' },
    { id: '8', value: 'Bestandteil8', dep: 'Kategorie5' },
    { id: '9', value: 'Bestandteil9', dep: 'Kategorie5' }
  ])
  
  constructor(private _jsonFormService: JsonFormService) {
    this.formContent = []

    // merge of two observables to fix depending properties
    zip(this.options$, this.depOptions$)
    .pipe(map(([options, depOptions]) => ({ options, depOptions })))
    .subscribe({
      next: (data) => {
        this.depOptions$ = of(
          data.depOptions.map((item: any) => ({
            ...data.options.find((t: any) => t.value === item.dep).id,
            ...item
          }))
        )
      }
    })

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
            disabled: false,
            hidden: false,
            key: 'id',
            label: 'id',
            placeholder: '000'
          },
          {
            type: 'password',
            disabled: false,
            hidden: false,
            key: 'password',
            label: 'Passwort (with strong validation)',
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
            label: 'ZIP (with validation - 5 numbers required',
            placeholder: '12345',
            validators: [
              { zipCodeValidator: true },
              { required: true }
            ]
          },
          {
            type: 'input',
            defaultValue: '',
            key: 'name',
            label: 'Name (required)',
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
            type: 'toggle',
            defaultValue: false,
            disabled: false,
            key: 'toggle',
            label: 'Aktiv',
            value: false
          },
          {
            type: 'select',
            key: 'funktion',
            label: 'Funktion (required)',
            options: convertArray(data.options, 'value'),
            validators: [
              { required: true }
            ]
          },
          {
            type: 'input',
            class: '',
            defaultValue: 0,
            disabled: true,
            hidden: false,
            key: 'function_id',
            label: 'Depended input (depend on \'Funktion\'))',
            placeholder: '',
            dependOnKey: 'funktion',
            options: convertArray(data.options, 'value'),
          },
          {
            type: 'dependedselect',
            key: 'funktion2',
            label: 'Funktion2 (depend on \'Funktion\' and required)',
            dependOnKey: 'funktion',
            options$:  convertDependingArray(this.depOptions$, 'value', '0'),
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
          // {
          //   type: 'fileupload',
          //   disabled: false,
          //   hidden: false,
          //   key: 'file',
          //   label: 'Datei',
          //   placeholder: 'Datei',
          //   multiple: true,
          //   upload: {
          //     url: 'https://v2.convertapi.com/upload',
          //     type: 'blob'
          //   }
          // },
          // {
          //   type: 'imageslider',
          //   disabled: false,
          //   hidden: false,
          //   key: 'images',
          //   label: 'Galerie'
          // }
          {
            type: 'signature',
            disabled: false,
            hidden: false,
            key: 'signature',
            label: 'Unterschrift (required)',
            description: 'Die sachliche, fachtechnische oder rechnerische Richtigkeit wird durch Unterzeichnung des Vermerks „Sachlich richtig“, „Fachtechnisch richtig“ oder „Rechnerisch richtig“ bescheinigt.',
            validators: [
              { required: true }
            ]
          },
          // {
          //   type: 'input',
          //   class: '',
          //   defaultValu e: 0,
          //   // disabled: true,
          //   hidden: false,
          //   key: 'test',
          //   label: 'Test',
          //   placeholder: '000'
          // }
        )
      }
    })

    this._jsonFormService.setFormData(this.formValue)
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
