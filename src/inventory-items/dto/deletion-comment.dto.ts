import { IsString } from 'class-validator';

export class DeletionCommentDto {
  @IsString()
  deletionComment: string;
}
