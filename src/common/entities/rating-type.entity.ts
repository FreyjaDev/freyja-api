import { Entity } from '../utils/entity';
import { GuildId } from '../values/guild-id';
import { RatingTypeId } from '../values/rating-type-id';
import { RatingTypeName } from '../values/rating-type-name';

interface RatingTypeProps {
  guildId: GuildId;
  name: RatingTypeName;
  ratingTypeId: RatingTypeId;
}

export class RatingType extends Entity<RatingTypeProps> {
  get guildId(): GuildId {
    return this.props.guildId;
  }

  get name(): RatingTypeName {
    return this.props.name;
  }

  get ratingTypeId(): RatingTypeId {
    return this.props.ratingTypeId;
  }

  protected override isEqual(entity: RatingType): boolean {
    return (
      this.props.guildId.equals(entity.guildId) &&
      this.props.name.equals(entity.name) &&
      this.props.ratingTypeId.equals(entity.ratingTypeId)
    );
  }
}
