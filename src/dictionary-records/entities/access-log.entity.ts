import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('access_logs')
export class AccessLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  accessAt: Date
}
