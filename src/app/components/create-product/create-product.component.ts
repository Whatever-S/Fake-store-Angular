import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit{
    constructor(private productService: ProductsService,
      private modalService: ModalService ){

    }
  
  form = new FormGroup({
      title: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(4)
      ])
    })
  
  ngOnInit(): void {
      
  }

  get title(){
    return this.form.controls.title as FormControl
  }

  submit(){
    this.productService.create(
      {
        title: this.form.value.title as string,
        price: 13.5,
        description: 'Best product you`ve ever seen!',
        image: 'https://i.pravatar.cc',
        category: 'electronic',
        rating: {
          rate: 5,
          count: 2
        }
    }
    ).subscribe(()=>{
      this.modalService.close()
    })
}
}
