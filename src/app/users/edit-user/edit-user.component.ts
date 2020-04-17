import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
// import { GridAlignColumnsDirective } from '@angular/flex-layout/grid/typings/align-columns/align-columns';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  ModForm: FormGroup;
  error = false;
  id= '';


  validation_messages = {
    'nom': [
      { type: 'required', message: 'Le nom est Obligatoire' }
    ],
    'prenom': [
      { type: 'required', message: 'Le prenom  est Obligatoire' }
    ],
    'email': [
      { type: 'required', message: ' email  est Obligatoire' }
    ]
  };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private actR: ActivatedRoute,
    public firebaseService: UsersService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.ModForm = this.fb.group({
      nom: [this.actR.snapshot.paramMap.get('nom'), Validators.required],
      prenom: [this.actR.snapshot.paramMap.get('prenom'), Validators.required],
      email: [this.actR.snapshot.paramMap.get('email'), Validators.required],
    });
    this.id = this.actR.snapshot.paramMap.get('id');
  }

  resetFields() {
    this.ModForm = this.fb.group({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),

    });
  }

   async onSubmit(id, nom, prenom, email) {
   await this.firebaseService.updateUser(id, nom, prenom, email);
    this.error = this.firebaseService.erreur;
    console.log(this.error);

    if (this.error === false) {
       this.resetFields();
       this.router.navigate(['/users']);
    }else {
      this.resetFields();
      this.error = true;


    }
  }

}
