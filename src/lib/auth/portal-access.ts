import { ApiError } from "@/lib/api/response";
import { prisma } from "@/lib/db";

type PortalAuth = {
  role: string;
  session: {
    user?: {
      id?: string;
      email?: string | null;
    };
  };
};

export async function resolveClientScope(auth: PortalAuth) {
  if (auth.role !== "CLIENT") {
    return {};
  }

  const userId = auth.session.user?.id;
  if (!userId) {
    throw new ApiError("Client account is not linked to a user", 403, "CLIENT_SCOPE_REQUIRED");
  }

  const client = await prisma.client.findFirst({
    where: {
      OR: [
        { userId },
        {
          members: {
            some: {
              userId,
              status: "ACTIVE",
            },
          },
        },
      ],
      portalEnabled: true,
      status: "ACTIVE",
    },
  });

  if (!client) {
    throw new ApiError("No active client portal account is linked to this user", 403, "CLIENT_SCOPE_REQUIRED");
  }

  return { clientId: client.id, client };
}
