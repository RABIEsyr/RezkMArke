import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  selectedFile: File = null;
  fd = new FormData();

  constructor( private router: Router,
        private http: HttpClient) { }

  ngOnInit() {
   
  }

  createFormData(event) {
    this.selectedFile = <File>event.target.files[0];
    this.fd.append('file', this.selectedFile, this.selectedFile.name);
  }

  upload() {
    this.http.post('http://localhost:3000/upload-image', this.fd)
    .subscribe( result => {
      console.log(result)
    });
  }
}
