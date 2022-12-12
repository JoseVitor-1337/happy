import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orphanages } from "./Orphanages";

@Entity("images")
export class Images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  path: string;

  @ManyToOne(() => Orphanages, (orphanage) => orphanage.images)
  @JoinColumn({ name: "orphanage_id" })
  orphanages: Orphanages;
}
