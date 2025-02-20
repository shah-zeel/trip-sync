import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  OneToOne,
} from "typeorm";
import {
  validateOrReject,
  IsEmail,
  IsEnum,
} from "class-validator";
import { getIsInvalidMessage } from "../helper/validation-messages";
import { User } from "./User";
import { Trip } from "./Trip";
import ExtendBaseEntity from "./ExtendedBaseEntity";

export enum InviteStatusType {
  PENDING = 0,
  ACCEPTED = 1,
  DECLINED = 2,
}

@Entity()
export class Invite extends ExtendBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail(undefined, {
    message: getIsInvalidMessage("Recipient Email"),
  })
  recipientEmail: string;

  @ManyToOne(() => User, (user) => user.invites)
  sender: User;

  @ManyToOne(() => Trip, (trip) => trip.invites)
  trip: Trip;

  @Column({
    type: "enum",
    enum: InviteStatusType,
    default: InviteStatusType.PENDING,
  })
  @IsEnum(InviteStatusType, {
    message: getIsInvalidMessage("Status"),
  })
  status: InviteStatusType;
}
