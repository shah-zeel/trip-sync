import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
} from "typeorm";
import {
  Length,
  IsOptional,
  validateOrReject,
  IsDecimal,
  IsDateString,
  IsDate,
} from "class-validator";
import { getIsInvalidMessage } from "../helper/validation-messages";
import bcrypt from "bcrypt";
import { Trip } from "./Trip";
import ExtendBaseEntity from "./ExtendedBaseEntity";

@Entity()
export class Expense extends ExtendBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 50, {
    message: getIsInvalidMessage("Title"),
  })
  title: string;

  @Column()
  @IsOptional()
  @Length(0, 50, {
    message: getIsInvalidMessage("Description"),
  })
  description: string;

  @Column()
  @IsDecimal(undefined, {
    message: getIsInvalidMessage("Amount"),
  })
  amount: string;

  @Column({
    default: "USD",
  })
  @Length(3, 3, {
    message: getIsInvalidMessage("Currency"),
  })
  @IsOptional()
  currency: string;

  @Column()
  @IsDateString(undefined, {
    message: getIsInvalidMessage("Occured on"),
  })
  occuredOn: string;

  @ManyToOne(() => Trip, (trip) => trip.expenses)
  trip: Trip;
}
