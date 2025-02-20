import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany,
  OneToMany,
  JoinTable,
} from "typeorm";
import {
  Length,
  IsOptional,
  validateOrReject,
  IsDate,
  IsDecimal,
} from "class-validator";
import { getIsInvalidMessage } from "../helper/validation-messages";
import bcrypt from "bcrypt";
import { User } from "./User";
import { Activity } from "./Activity";
import { Expense } from "./Expense";
import { Invite } from "./Invite";
import ExtendBaseEntity from "./ExtendedBaseEntity";

@Entity()
export class Trip extends ExtendBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(1, 50, {
    message: getIsInvalidMessage("Name"),
  })
  name: string;

  @Column()
  @IsOptional()
  @Length(1, 50, {
    message: getIsInvalidMessage("Destination"),
  })
  destination: string;

  @Column()
  @IsDate({
    message: getIsInvalidMessage("Start Date"),
  })
  startDate: Date;

  @Column()
  @IsDate({
    message: getIsInvalidMessage("End Date"),
  })
  endDate: Date;

  @Column()
  @Length(0, 50, {
    message: getIsInvalidMessage("Description"),
  })
  description: string;

  @Column()
  @IsDecimal(undefined, {
    message: getIsInvalidMessage("Budget"),
  })
  budget: string;

  @Column({
    default: "USD",
  })
  @Length(3, 3, {
    message: getIsInvalidMessage("Currency"),
  })
  @IsOptional()
  currency: string;

  @ManyToMany(() => User, (user) => user.trips)
  participants: User[];

  @OneToMany(() => Activity, (activity) => activity.trip)
  activities: Activity[];

  @OneToMany(() => Expense, (expense) => expense.trip)
  expenses: Expense[];

  @OneToMany(() => Invite, (invite) => invite.trip)
  invites: Expense[];
}
