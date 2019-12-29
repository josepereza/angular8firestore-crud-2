import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

//import { AngularFireAuth } from '@angular/fire/auth';
import { MatTableDataSource, MatPaginator } from '@angular/material';



export interface Ifil {

  id: string;
  nom: string;
  prenom: string;
  email: string;
}





@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  displayedColumns: string[] = ['nom', 'prenom', 'email', 'id'];
  items: Array<Ifil>= [];
  dataSource= new MatTableDataSource<Ifil>();
  @ViewChild(MatPaginator, { static: true } ) paginator: MatPaginator;
  doc :any;




  constructor(
    public fil: UsersService,
    private router: Router,
    //public  afAuth:  AngularFireAuth

  ) { }

  ngOnInit() {
    console.log('ok');

    this.getData();


  }

  getData() {
    this.fil.getUsers()
      .subscribe(result => {
        console.log(result);
        
         for (let i = 0 ; i < result.length ; i++) {
          this.items.push(
            {id: result[i].payload.doc.id, nom: result[i].payload.doc.get('nom'), prenom: result[i].payload.doc.get('prenom'), email: result[i].payload.doc.get('email') }
            );

         }
         
         this.dataSource.data = this.items;
         this.dataSource.data.sort();
         this.dataSource.paginator = this.paginator;
         console.log(this.items);

      });

  }

  SupprimerUser(id,nom) {

    if (confirm('êtes-vous sûr de vouloir supprimer la Filière '+ nom +' ?')) {
        this.dataSource.disconnect();
        this.dataSource.data.splice(0, this.dataSource.data.length);
      this.fil.deleteUser(id).then(rr => {

        this.dataSource.connect();
      });

    }


  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



}
