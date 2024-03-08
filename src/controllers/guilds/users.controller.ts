import { guildMemberService } from '../../services/guild-member.service';

export const getGuildMemberRating = async (guildId: string, userId: string) => {
  const memberRating = await guildMemberService.getGuildMemberRating(
    guildId,
    userId,
  );

  if (!memberRating) {
    return new Response(
      JSON.stringify({
        code: 'FE001',
        message: 'Member rating not found.',
      }),
      {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }

  return memberRating.toDto();
};
