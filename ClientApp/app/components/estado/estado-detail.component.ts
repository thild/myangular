import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { Estado } from '../../shared/estado';
import { FormGroup, FormBuilder } from '@angular/forms';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { Http } from '@angular/http';

@Component({
    selector: 'estado-detail',
    templateUrl: 'estado-detail.component.html'
})

export class EstadoDetailComponent implements OnInit, OnChanges {

    @Input() estado: Estado;
    revertEstado: Estado;
    @Output() estadoAdded = new EventEmitter<Estado>();


    estadoForm: FormGroup; // <--- estadoForm is of type FormGroup

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private fb: FormBuilder) { // <--- inject FormBuilder
        this.createForm();
    }

    createForm() {
        this.estadoForm = this.fb.group({
            nome: '',
        });
    }

    ngOnChanges() {
        this.saveRevert();
    }

    ngOnInit() {
    }

    onSubmit() {
        this.estado = this.prepareSaveEstado();
        if (this.estado.id) {
            this.http.put(this.baseUrl + `api/estados/${this.estado.id}`, this.estado).subscribe(result => {
            }, error => console.error(error));
        } else {
            this.http.post(this.baseUrl + 'api/estados', this.estado).subscribe(result => {
                this.estado = result.json() as Estado;
                this.saveRevert();
                this.estadoAdded.emit(this.estado);
            }, error => console.error(error));
        }
        this.ngOnChanges();
    }

    prepareSaveEstado(): Estado {
        const formModel = this.estadoForm.value;

        const saveEstado: Estado = {
            id: this.estado.id,
            nome: formModel.nome as string,
        };
        return saveEstado;
    }

    revert() {
        this.setForm(this.revertEstado);
    }

    new() {
        this.estado = new Estado();
        this.estado.nome = '';
        this.setForm(this.estado);
    }

    private setForm(estado: Estado) {
        this.estadoForm.setValue({
            nome: estado.nome,
        });
    }

    private saveRevert() {
        if (!this.revertEstado) {
            this.revertEstado = new Estado();
        }
        this.revertEstado.nome = this.estado.nome;
    }
}