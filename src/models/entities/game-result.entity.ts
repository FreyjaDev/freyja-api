import { Entity } from '../../common/mixins/entity.mixin';

interface GameResultProps {
  id: string;
  guildId: string;
  winUserId: string;
  loseUserId: string;
  createdAt: Date;
  updatedAt: Date;
}
export class GameResult extends Entity<GameResultProps> {
  get id() {
    return this.props.id;
  }
  get guildId() {
    return this.props.guildId;
  }
  get winUserId() {
    return this.props.winUserId;
  }
  get loseUserId() {
    return this.props.loseUserId;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  override toDto() {
    return {
      id: this.id,
      guildId: this.guildId,
      winUserId: this.winUserId,
      loseUserId: this.loseUserId,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
