import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormationService} from "../../Services/formation.service";
import {HttpErrorResponse} from "@angular/common/http";
import {course} from "../../Entities/courses";
import {Router} from "@angular/router";
import {debounceTime, distinctUntilChanged, map, Observable, OperatorFunction} from "rxjs";
import {CategorieService} from "../../Services/categorie.service";
import {Training} from "../../Entities/Training";

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['courses.component.css']
})
export class CoursesComponent implements OnInit, OnDestroy {

    p:any;
    itemsPerPage: number = 5;
    categorieId: any = "";
    public categories: any[] = [];
    maxPrice: number = 0;
    minPrice: number = 0;
    value = [0, 0];
    priceSort: string = "randomPrices";
    formatter = (result: string) => result.toUpperCase();
    searchbytitle: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
        text$.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map((term) =>
                term === '' ? [] : this.courseTitles.filter((f) => f.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10),
            ),
        );
    public formations: Training[] = [];
    public courseTitles: string[] = [];
    public title: string = "";

    constructor(private formationService: FormationService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.getAllFormations();
    }

    ngOnDestroy(): void {
    }

    getAllFormations() {
        this.formationService.getAllFormations().subscribe(
            (response: Training[]) => {
                this.formations = response.map(f=>f);
              console.log(this.formations[0].id)
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    searchByTitle() {
        this.formationService.getFormationByTitle(this.title).subscribe(
            (response: Training[]) => {
                this.formations = response;
                this.value = [this.minPrice, this.maxPrice];
            },
            (error: HttpErrorResponse) => {
                console.log(error.message);
            }
        )
    }

    randomPrices() {
        this.priceSort = "randomPrices";
        this.formations.sort(() => Math.random() - 0.5);
    }





    getDetails(courseId: number) {
        this.router.navigate([`/course/${courseId}`]);
    }




}
