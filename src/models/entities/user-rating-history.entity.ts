import { Entity } from '../../common/mixins/entity.mixin';

interface UserRatingHistoryProps {
  id: string;
  userRatingId: string;
  gameResultId: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UserRatingHistory extends Entity<UserRatingHistoryProps> {
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
}
