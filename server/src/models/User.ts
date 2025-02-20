import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  BeforeInsert,
  BeforeUpdate,
  AfterLoad,
  ManyToOne,
  ManyToMany,
  OneToMany,
  JoinTable,
} from "typeorm";
import {
  Length,
  IsEmail,
  Matches,
  IsOptional,
  validateOrReject,
} from "class-validator";
import { getIsInvalidMessage } from "../helper/validation-messages";
import bcrypt from "bcrypt";
import { Trip } from "./Trip";
import { Activity } from "./Activity";
import { Invite } from "./Invite";
import ExtendBaseEntity from "./ExtendedBaseEntity";

@Entity()
@Unique(["email"])
export class User extends ExtendBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail(undefined, {
    message: getIsInvalidMessage("Email"),
  })
  email: string;

  @Column()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: `${getIsInvalidMessage(
      "Password"
    )}. Passords must be minimum eight characters, and have at least one letter and one number:`,
  })
  password: string;

  @Column()
  @Length(1, 50, {
    message: getIsInvalidMessage("First Name"),
  })
  firstName: string;

  @Column()
  @Length(1, 50, {
    message: getIsInvalidMessage("Last Name"),
  })
  lastName: string;

  @Column({
    default: "USD",
  })
  @Length(3, 3, {
    message: getIsInvalidMessage("Currency"),
  })
  @IsOptional()
  currency: string;

  @ManyToMany(() => Trip, (trip) => trip.participants)
  @JoinTable()
  trips: Trip[];

  @ManyToMany(() => Activity, (activity) => activity.participants)
  @JoinTable()
  activities: Activity[];

  @OneToMany(() => Invite, (invite) => invite.sender)
  invites: Invite[];

  // This property stores a cached password to check
  // if the password was changed during an update
  cachedPassword: string;

  @AfterLoad()
  cachePassword() {
    this.cachedPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.cachedPassword === this.password) return;
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async isPasswordValid(inputPassowrd: string): Promise<boolean> {
    return await bcrypt.compare(inputPassowrd, this.password);
  }
}
