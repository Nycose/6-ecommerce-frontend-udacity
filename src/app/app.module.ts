import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter, MomentDateModule } from '@angular/material-moment-adapter';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDividerModule} from '@angular/material/divider';

import { AppComponent } from './app.component';
import { ProductsHomeComponent } from './components/products-home/products-home.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoadingService } from './services/loading.service';
import { QuantityComponent } from './components/quantity/quantity.component';
import { CartHomeComponent } from './components/cart-home/cart-home.component';
import { LoginHomeComponent } from './components/login-home/login-home.component';
import { RegisterHomeComponent } from './components/register-home/register-home.component';
import { CheckoutHomeComponent } from './components/checkout-home/checkout-home.component';
import { CheckoutAccountInfoComponent } from './components/checkout-home/checkout-account-info/checkout-account-info.component';
import { CheckoutPaymentDetailsComponent } from './components/checkout-home/checkout-payment-details/checkout-payment-details.component';
import { CheckoutFinalStepComponent } from './components/checkout-home/checkout-final-step/checkout-final-step.component';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CUSTOM_DATE_FORMATS } from './components/checkout-home/checkout-payment-details/custom-dates';
import { CardNumberPipe } from './pipes/card-number.pipe';
import { ErrorComponent } from './components/error/error.component';
import { MessageService } from './services/message.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductsHomeComponent,
    ProductListComponent,
    ProductCardComponent,
    ProductDetailComponent,
    LoadingComponent,
    QuantityComponent,
    CartHomeComponent,
    LoginHomeComponent,
    RegisterHomeComponent,
    CheckoutHomeComponent,
    CheckoutAccountInfoComponent,
    CheckoutPaymentDetailsComponent,
    CheckoutFinalStepComponent,
    CardNumberPipe,
    ErrorComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatGridListModule,
    MatTooltipModule,
    MatTableModule,
    MatStepperModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MomentDateModule,
    MatExpansionModule,
    MatDividerModule
  ],
  providers: [
    LoadingService,
    MessageService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
