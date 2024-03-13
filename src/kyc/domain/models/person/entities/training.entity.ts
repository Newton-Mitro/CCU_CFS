import { BaseEntity } from 'src/common/entities/base-entity';

export class TrainingEntity extends BaseEntity {
  private _CourseTitle: string;
  private _InstituteName: string;
  private _CourseContent: string;
  private _Result: string;
  private _StartDate: string;
  private _EndDate: string;

  constructor(
    trainingId: string,
    courseTitle: string,
    instituteName: string,
    courseContent: string,
    result: string,
    startDate: string,
    endDate: string,
  ) {
    super(trainingId);
    this._CourseTitle = courseTitle;
    this._InstituteName = instituteName;
    this._CourseContent = courseContent;
    this._Result = result;
    this._StartDate = startDate;
    this._EndDate = endDate;
  }

  public get CourseTitle(): string {
    return this._CourseTitle;
  }

  public set CourseTitle(value: string) {
    this._CourseTitle = value;
  }

  public get InstituteName(): string {
    return this._InstituteName;
  }

  public set InstituteName(value: string) {
    this._InstituteName = value;
  }

  public get CourseContent(): string {
    return this._CourseContent;
  }

  public set CourseContent(value: string) {
    this._CourseContent = value;
  }

  public get Result(): string {
    return this._Result;
  }

  public set Result(value: string) {
    this._Result = value;
  }

  public get StartDate(): string {
    return this._StartDate;
  }

  public set StartDate(value: string) {
    this._StartDate = value;
  }

  public get EndDate(): string {
    return this._EndDate;
  }

  public set EndDate(value: string) {
    this._EndDate = value;
  }
}
