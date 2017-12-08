import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Estado } from '../../shared/estado'

@Component({
    selector: 'estado-list',
    templateUrl: 'estado-list.component.html'
})

export class EstadoListComponent implements OnInit {

    public estados: Estado[];
    public selectedEstado?: Estado;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/estados').subscribe(result => {
            this.estados = result.json() as Estado[];
        }, error => console.error(error));
    }

    ngOnInit() { }

    selectEstado(estado: Estado) {
        this.selectedEstado = estado;
    }

    delete(estado: Estado) {
        console.log(estado);

        this.http.delete(this.baseUrl + `api/estados/${estado.id}`).subscribe(result => {
            this.estados.splice(this.estados.indexOf(estado), 1);
            this.selectedEstado = undefined;
        }, error => console.error(error));

    }

    onEstadoAdded(estado: Estado) {
        this.estados.push(estado);
        this.selectedEstado = undefined;
    }

    newEstado() {
        this.selectedEstado = new Estado();
    }
}

