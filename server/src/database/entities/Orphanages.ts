import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Images } from "./Images";

@Entity("orphanages")
export class Orphanages {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "varchar", length: 200 })
  about: string;

  @Column({ type: "varchar", length: 200 })
  instructions: string;

  @Column({ type: "varchar" })
  opening_hours: string;

  @Column({ type: "text" })
  latitude: string;

  @Column({ type: "text" })
  longitude: string;

  @Column({ type: "boolean", default: false })
  open_on_weekands: string;

  @OneToMany(() => Images, (image) => image.orphanages, {
    cascade: ["insert", "remove", "update"],
  })
  @JoinColumn({ name: "orphanage_id" })
  images: Images[];
}
