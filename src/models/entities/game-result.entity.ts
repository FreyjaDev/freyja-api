import { Entity } from '../../common/mixins/entity.mixin';
import { UserRating } from './user-rating.entity';
import { uuidv7 } from 'uuidv7';

interface GameResultProps {
  id: string;
  guildId: string;
  winUserId: string;
  loseUserId: string;
  createdAt: Date;
  updatedAt: Date;
}
class GameResult extends Entity<GameResultProps> {
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

/**
 * Factory function for GameResult entity
 * @param data - GameResult data
 */
export const gameResult = (data: {
  id?: string;
  guildId: string;
  winUser: UserRating | string;
  loseUser: UserRating | string;
  createdAt?: Date;
  updatedAt?: Date;
}) => {
  const id = data.id ?? uuidv7();
  const winUserId =
    typeof data.winUser === 'string' ? data.winUser : data.winUser.id;
  const loseUserId =
    typeof data.loseUser === 'string' ? data.loseUser : data.loseUser.id;
  const now = new Date();
  return new GameResult({
    id,
    guildId: data.guildId,
    winUserId,
    loseUserId,
    createdAt: data.createdAt ?? now,
    updatedAt: data.updatedAt ?? now,
  });
};

export type { GameResult };
