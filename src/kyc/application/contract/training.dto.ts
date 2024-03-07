import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class TrainingDTO {
  @IsString()
  @IsNotEmpty()
  // @Expose({ name: 'course_title' })
  CourseTitle: string;

  @IsString()
  @IsNotEmpty()
  // @Expose({ name: 'institute_name' })
  InstituteName: string;

  @IsString()
  @IsNotEmpty()
  // @Expose({ name: 'course_content' })
  CourseContent: string;

  @IsString()
  @IsOptional()
  // @Expose({ name: 'result' })
  Result: string;

  @IsDateString()
  @IsOptional()
  // @Expose({ name: 'start_date' })
  StartDate: Date;

  @IsDateString()
  @IsOptional()
  // @Expose({ name: 'end_date' })
  EndDate: Date;
}
