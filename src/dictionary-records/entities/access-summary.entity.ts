import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('access_summaries')
export class AccessSummary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'smallint'})
  totalAccess: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  lastAccessAt: Date;

  @BeforeUpdate()
  updateLastAccessAt() {
    this.lastAccessAt = new Date()
  }
}
