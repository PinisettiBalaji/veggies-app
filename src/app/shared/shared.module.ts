import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    HeaderComponent,
    LoginModalComponent,
    
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule   
],
  exports: [HeaderComponent,MatIconModule,MatToolbarModule]
})
export class SharedModule { }
