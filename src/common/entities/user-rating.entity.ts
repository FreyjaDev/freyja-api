import { Entity } from '../utils/entity';
import { Rating } from '../values/rating';
import { UserId } from '../values/user-id';

interface UserRatingProps {
  rating: Rating;
  userId: UserId;
}

export class UserRating extends Entity<UserRatingProps> {
  get rating(): Rating {
    return this.props.rating;
  }

  get userId(): UserId {
    return this.props.userId;
  }

  protected isEqual(entity: UserRating): boolean {
    return this.props.userId.equals(entity.userId);
  }
}
