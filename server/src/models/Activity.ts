import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import {
  Length,
  IsOptional,
  validateOrReject,
  IsDecimal,
  IsDateString,
} from "class-validator";
import { getIsInvalidMessage } from "../helper/validation-messages";
import { Trip } from "./Trip";
import { User } from "./User";
import ExtendBaseEntity from "./ExtendedBaseEntity";

export enum ActivityType {
  OTHER = 0,
  FLIGHT = 1,
  HOTEL = 2,
  FOOD = 3,
  PLACETOVISIT = 4,
  TASK = 5,
}

@Entity()
export class Activity extends ExtendBaseEntity {
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
  @Length(1, 50, {
    message: getIsInvalidMessage("Location"),
  })
  location: string;

  @Column()
  @IsDateString(undefined, {
    message: getIsInvalidMessage("Scheduled Time"),
  })
  scheduledTime: string;

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

  @ManyToMany(() => User, (user) => user.activities)
  participants: User[];

  @ManyToOne(() => Trip, (trip) => trip.activities)
  trip: Trip;
}
