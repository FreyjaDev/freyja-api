import { AggregateRoot } from '../../utils/entity';
import { Guild } from '../guild.entity';
import { UserRating } from '../user-rating.entity';
import { User } from '../user.entity';

interface MemberRatingProps {
  guild: Guild;
  rating: UserRating;
  user: User;
}

export class MemberRating extends AggregateRoot<MemberRatingProps> {
  get guild(): Guild {
    return this.props.guild;
  }

  get user(): User {
    return this.props.user;
  }

  protected isEqual(entity: MemberRating): boolean {
    return (
      this.props.guild.equals(entity.guild) &&
      this.props.user.equals(entity.user)
    );
  }
}
