import { Entity } from '../../common/mixins/entity.mixin';

interface UserRatingProps {
  id: string;
  userId: string;
  guildId: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UserRating extends Entity<UserRatingProps> {
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
}
