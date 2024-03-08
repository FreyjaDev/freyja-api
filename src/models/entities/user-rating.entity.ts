import { Entity } from '../../common/mixins/entity.mixin';
import { uuidv7 } from 'uuidv7';

interface UserRatingProps {
  id: string;
  userId: string;
  guildId: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

class UserRating extends Entity<UserRatingProps> {
  get id() {
    return this.props.id;
  }
  get userId() {
    return this.props.userId;
  }
  get guildId() {
    return this.props.guildId;
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

  increaseRating(amount: number) {
    this.props.rating += amount;
    this.props.updatedAt = new Date();
  }

  decreaseRating(amount: number) {
    this.props.rating -= amount;
    this.props.updatedAt = new Date();
  }

  override toDto() {
    return {
      id: this.id,
      userId: this.userId,
      guildId: this.guildId,
      rating: this.rating,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}

export const userRating = (data: {
  id?: string;
  userId: string;
  guildId: string;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
}) => {
  return new UserRating({
    id: data.id ?? uuidv7(),
    userId: data.userId,
    guildId: data.guildId,
    rating: data.rating,
    createdAt: data.createdAt ?? new Date(),
    updatedAt: data.updatedAt ?? new Date(),
  });
};

export type { UserRating };
