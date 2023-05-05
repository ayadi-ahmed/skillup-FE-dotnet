import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormationService} from "../../Services/formation.service";
import {course} from "../../Entities/courses";
import {HttpErrorResponse} from "@angular/common/http";
import { Training } from 'src/app/Entities/Training';

@Component({
    selector: 'app-single-course',
    templateUrl: './single-course.component.html',
    styleUrls: ['./single-course.component.css']
})
export class SingleCourseComponent implements OnInit {

    private courseId = 0;
   /* public course: course = {
        dateDebut: "",
        dateFin: "",
        description: "",
        id: 0,
        img: "",
        nbMaxCan: null,
        prix: null,
        titre: ""

    }*/
  public course:Training = {
    id:0,
    name:""
  }
    constructor(private route: ActivatedRoute,
                private formationService: FormationService) {
    }

    ngOnInit(): void {
        this.getCourseId();
        this.getCourseById();
    }

    getCourseId() {
        this.route.params
            .subscribe(params => {
                this.courseId = params['id']
              console.log("id " + this.courseId)
            });
    }

    getCourseById(){
        this.formationService.getFormationById(this.courseId)
            .subscribe(
                (response: Training) => {
                    this.course = response;
                  console.log("res "+response);
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                }
            )
    }

}
