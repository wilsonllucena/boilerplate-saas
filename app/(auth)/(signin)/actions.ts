import { db } from '@/server/db';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { env } from '@/env';
export async function authenticateJwt(data: {
  email: string;
  password: string;
}) {
  const email = data.email;
  const password = data.password;

  const userData = await db.user.findFirst({
    select: {
      id: true,
      email: true,
      name: true,
      passwordHash: true,
      companyId: true,
      company: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      }
    },
    where: {
      email: email
    }
  });

  if (!userData || !userData?.passwordHash) {
    return null;
  }

  const isValid = compare(password, userData.passwordHash);

  if (!isValid) {
    return null;
  }

  const secret = env.NEXTAUTH_SECRET;

  const token = sign({ sub: userData.id }, secret, {
    expiresIn: '7d'
  });

  const response = {
    token,
    user: {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      company: {
        id: userData.companyId,
        name: userData.company?.name,
        slug: userData.company?.slug
      }
    }
  };

  return response;
}
