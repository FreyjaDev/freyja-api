import { Entity } from '../../common/mixins/entity.mixin';
import { uuidv7 } from 'uuidv7';
import { UserRating } from './user-rating.entity';
import { GameResult } from './game-result.entity';
import { JsonSerializable } from '../../common/utils/json/props-converter';

interface UserRatingHistoryProps {
  id: string;
  userRatingId: string;
  gameResultId?: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

class UserRatingHistory extends Entity<UserRatingHistoryProps> {
  get id() {
    return this.props.id;
  }
  get userRatingId() {
    return this.props.userRatingId;
  }
  get gameResultId() {
    return this.props.gameResultId;
  }
  get rating() {
    return this.props.rating;
  }
  get createdAt() {
    return this.props.createdAt;
  }
  get updatedAt() {
    return this.props.updatedAt;
  }

  override toDto(): JsonSerializable<typeof this.props> {
    return {
      id: this.id,
      userRatingId: this.userRatingId,
      gameResultId: this.gameResultId ?? null,
      rating: this.rating,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}

export const userRatingHistory = (data: {
  id?: string;
  userRating: UserRating | string;
  gameResult?: GameResult | string;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
}) => {
  return new UserRatingHistory({
    id: data.id ?? uuidv7(),
    userRatingId:
      typeof data.userRating === 'string'
        ? data.userRating
        : data.userRating.id,
    gameResultId: data.gameResult
      ? typeof data.gameResult === 'string'
        ? data.gameResult
        : data.gameResult.id
      : undefined,
    rating: data.rating,
    createdAt: data.createdAt ?? new Date(),
    updatedAt: data.updatedAt ?? new Date(),
  });
};

export type { UserRatingHistory };
