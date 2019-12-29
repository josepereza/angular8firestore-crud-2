import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  AddForm: FormGroup;
  error = false;

  validation_messages = {
    'nom': [
      { type: 'required', message: 'Le nom est Obligatoire' }
    ],
    'prenom': [
      { type: 'required', message: 'Le prenom de groupes est Obligatoire' }
    ],
    'email': [
      { type: 'required', message: "L'email de groupes est Obligatoire" }
    ]
  };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: UsersService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.AddForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

    //Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  resetFields() {
    this.AddForm = this.fb.group({
      nom: new FormControl('', Validators.required),
      prenom: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),

    });
  }

   async onSubmit(value) {
   await this.firebaseService.createUser(value);
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
