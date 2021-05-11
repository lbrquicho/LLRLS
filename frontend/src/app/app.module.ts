import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { PdfViewerModule, PdfViewerComponent } from 'ng2-pdf-viewer';
import { MatIconModule } from '@angular/material/icon'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatChipsModule} from '@angular/material/chips';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/plugins/link.min.js';
import 'froala-editor/js/plugins/image.min.js';


import { FilterPipe } from './login-module/admin/filter.pipe';
import { AppComponent } from './app.component';
import { AdminComponent } from './login-module/admin/admin.component';
import { LoginComponent } from './login-module/login/login.component';
import { HeaderModuleComponent } from './header-module/header-module.component';
import { UserModuleComponent } from './login-module/admin/user-component-module/user-module.component'
import { UploadModuleComponent } from './login-module/admin/upload-component-module/upload-module.component'
import { ViewModuleComponent } from './login-module/admin/view-component-module/view-module.component'
import { AccountManagementComponent } from './dialog-component/account-management/account-management.component';

import { viewResolutionComponent } from './dialog-component/resolution/view/view-resolution.component';
import { viewOrdinanceComponent } from 'src/app/dialog-component/ordinance/view/view-ordinance.component';
import { DeleteResolutionComponent } from './dialog-component/resolution/delete/delete-resolution.component';
import { DeleteOrdinanceComponent } from './dialog-component/ordinance/delete/delete-ordinance.component';
import { EditResolutionComponent } from './dialog-component/resolution/update/edit-resolution.component';
import { EditOrdinanceComponent } from './dialog-component/ordinance/update/edit-ordinance.component';

import { UserService } from './shared/services/user.service';

import { RouterModule } from '@angular/router'
import { appRoutes } from './routes';

//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    FilterPipe,
    AppComponent,
    AdminComponent,
    LoginComponent,
    UserModuleComponent,
    UploadModuleComponent,
    ViewModuleComponent,
    AccountManagementComponent,
    HeaderModuleComponent,

    viewResolutionComponent,
    DeleteResolutionComponent,
    EditResolutionComponent,
    viewOrdinanceComponent,
    DeleteOrdinanceComponent,
    EditOrdinanceComponent

  ],
  imports: [
    MatListModule,
    MatIconModule,
    MatSidenavModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCheckboxModule,
    RouterModule.forRoot(appRoutes),
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatRadioModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    MatDialogModule,
    AngularEditorModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    PdfViewerModule,
    MatChipsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
