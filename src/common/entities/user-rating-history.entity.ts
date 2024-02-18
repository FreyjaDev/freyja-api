import { Entity } from '../utils/entity';
import { GameResultId } from '../values/game-result-id';
import { Rating } from '../values/rating';
import { UserRatingId } from '../values/user-rating-id';

interface UserRatingHistoryProps {
  gameResultId: GameResultId;
  rating: Rating;
  userRatingId: UserRatingId;
}

export class UserRatingHistory extends Entity<UserRatingHistoryProps> {
  get gameResultId(): GameResultId {
    return this.props.gameResultId;
  }

  get rating(): Rating {
    return this.props.rating;
  }

  get userRatingId(): UserRatingId {
    return this.props.userRatingId;
  }

  protected isEqual(entity: UserRatingHistory): boolean {
    return (
      this.props.userRatingId.equals(entity.userRatingId) &&
      this.props.gameResultId.equals(entity.gameResultId) &&
      this.props.rating.equals(entity.rating)
    );
  }
}
