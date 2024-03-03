import { Entity } from '../../common/mixins/entity.mixin';

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

export type { UserRating };
