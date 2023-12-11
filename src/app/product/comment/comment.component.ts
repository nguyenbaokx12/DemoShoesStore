import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SaleProduct } from 'src/app/model/product/sale/saleproduct';
import { CommentService } from 'src/app/service/comment-service/comment-service.service';
import { SaleproductService } from 'src/app/service/sale-service/saleproduct.service';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  cmtList: Comment[] = []
  saleList: SaleProduct[] = []
  commentForm: FormGroup;
  today: any = Date.now();
  users: any
  products: any
  deleteId: any



  constructor(
    private commentService: CommentService,
    private saleService: SaleproductService,
    private active: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.active.paramMap.subscribe(data => {
      this.users = data.get('id')
    })

    this.active.paramMap.subscribe(data => {
      this.products = data.get('id1')
    })


    this.commentService.GetAll().subscribe(data => {
      this.cmtList = data
    })

    this.saleService.getAllSale().subscribe(data => {
      this.saleList = data
    })


    this.commentForm = new FormGroup(
      {
        productId: new FormControl(this.products, [Validators.required]),
        userId: new FormControl(this.users, [Validators.required]),
        vote: new FormControl('', [Validators.required]),
        dateTime: new FormControl(this.today, [Validators.required]),
        content: new FormControl('', [Validators.required])
      }
    )
  }


  submit() {
    this.commentService.AddNewComment(this.commentForm.value).subscribe(data => {
      this.ngOnInit()
    })
  }

  getStarArray(vote: string): any[] {
    const numStars = parseInt(vote);
    return new Array(numStars);
  }

  GetIdDelete(id){
    this.deleteId = id
  }

  DeleteCmt(){
    this.commentService.DeleteCmt(this.deleteId).subscribe(data => {
      this.ngOnInit()
    })
  }
}
