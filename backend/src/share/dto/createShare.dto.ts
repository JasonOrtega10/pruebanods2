import { Type } from "class-transformer";
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  ValidateNested,
} from "class-validator";
import { ShareSecurityDTO } from "./shareSecurity.dto";

export class CreateShareDTO {
  @IsString()
  @Matches("^[a-zA-Z0-9_-]*$", undefined, {
    message: "ID can only contain letters, numbers, underscores and hyphens",
  })
  @Length(3, 50)
  id: string;


  @IsEmail({}, { each: true })
  recipients: string[];
  
  @IsString()
  expiration: string;

  @IsOptional()
  allowDownload: boolean;

  @IsOptional()
  showEstado: boolean;  
 
  @IsOptional() 
  referencia: string;
  
  @MaxLength(512)
  @IsOptional()
  description: string;


  @ValidateNested()
  @Type(() => ShareSecurityDTO)
  security: ShareSecurityDTO;
}
