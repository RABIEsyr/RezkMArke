import { Component, OnInit, ViewChild, ChangeDetectorRef, ElementRef } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-profile-pictrue',
  templateUrl: './profile-pictrue.component.html',
  styleUrls: ['./profile-pictrue.component.scss']
})
export class ProfilePictrueComponent implements OnInit {
 @ViewChild('fileInput') el: ElementRef;
 imageUrl //= 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
 editFile = true;
 removeUpload = false;
 registrationForm = this.fb.group({
  file: [null]
});

  public uploader: FileUploader = new FileUploader({ url: 'http://localhost:3000/upload-photo', itemAlias: 'photo',
   authToken: localStorage.getItem('token') });
  submitted: boolean;

   constructor(private userService: UserService, public fb: FormBuilder, private globalService: GlobalService,
    private cd: ChangeDetectorRef) {}
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         this.userService.getProfilePicture()
        .subscribe(photo => {
             console.log('photo11', photo);
            this.globalService.profilePicture.next(photo);
      });
    };
 }



  uploadFile(event) {
    const reader = new FileReader(); // HTML5 FileReader API
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.registrationForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }
  removeUploadedFile() {
    const newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      file: [null]
    });
  }
  
  onSubmit() {
    this.submitted = true;
    if (!this.registrationForm.valid) {
      alert('Please fill all the required fields to create a super hero!')
      return false;
    } else {
      console.log(this.registrationForm.value)
    }
  }
}
